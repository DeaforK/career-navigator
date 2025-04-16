const Employer = require('../models/Employer');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

class EmployersController {
  // Создание нового работодателя
  static async create(req, res) {
    try {
      const { company_name, industry, website, description } = req.body;
      
      // Извлекаем токен из куки
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Требуется аутентификация" });
      }

      // Декодируем токен и получаем user_id
      const decoded = jwt.verify(token, SECRET_KEY);
      const user_id = decoded.id;

      if (!user_id || !company_name || !industry) {
        return res.status(400).json({ message: 'Все обязательные поля должны быть заполнены' });
      }

      const employerId = await Employer.create({ user_id, company_name, industry, website, description });
      res.status(201).json({ message: 'Работодатель добавлен', employerId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Получение всех работодателей
  static async getAll(req, res) {
    try {
      const employers = await Employer.getAll();
      res.json(employers);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Получение данных работодателя по ID пользователя (из токена)
  static async getByUserId(req, res) {
    try {
      // Извлекаем токен из куки
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Требуется аутентификация" });
      }

      // Декодируем токен и получаем user_id
      const decoded = jwt.verify(token, SECRET_KEY);
      const user_id = decoded.id;

      const employer = await Employer.findByUserId(user_id);
      if (!employer) {
        return res.status(404).json({ message: "Работодатель не найден" });
      }

      res.json(employer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }
}

module.exports = EmployersController;
