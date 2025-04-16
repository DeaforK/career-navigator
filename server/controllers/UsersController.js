const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

const UsersController = {
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения пользователей' });
    }
  },

  async getById(req, res) {
    try {
      // Извлекаем токен из куки
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Требуется аутентификация" });
      }

      // Декодируем токен и получаем user_id
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения пользователя' });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
      await user.update(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка обновления пользователя' });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Ошибка удаления пользователя' });
    }
  }
};

module.exports = UsersController;