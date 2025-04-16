const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey'; // Ключ для подписи JWT
const SALT_ROUNDS = 10; // Количество раундов хеширования пароля

class AuthController {
  // Регистрация пользователя
  static async register(req, res) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await User.create({ email, password: hashedPassword, role });

      // Генерируем JWT токен
      const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY, { expiresIn: '7d' });

      // Устанавливаем токен в куки
      res.cookie('token', token, {
        httpOnly: true, // Доступ только через HTTP (JS на фронте не сможет прочитать)
        secure: process.env.NODE_ENV === 'production', // Включать secure в продакшене
        sameSite: 'Strict', // Защита от CSRF-атак
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      });

      res.status(201).json({ message: 'Пользователь зарегистрирован', userId: newUser.id });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Вход в систему
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email и пароль обязательны' });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '7d' });

      // Устанавливаем токен в куки
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ message: 'Успешный вход' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Выход из системы (очистка куки)
  static async logout(req, res) {
    res.cookie('token', '', { maxAge: 0 }); // Удаляем куку
    res.json({ message: 'Выход выполнен' });
  }

  // Проверка токена
  static async verifyToken(req, res) {
    try {
      const token = req.cookies.token; // Получаем токен из куки
      if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен' });
      }

      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Недействительный токен' });
        }
        res.json({ message: 'Токен действителен', user: decoded });
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }
}

module.exports = AuthController;
