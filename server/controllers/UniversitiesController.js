const University = require('../models/University');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

class UniversitiesController {
  // Добавление нового вуза
  static async create(req, res) {
    try {
      // Извлекаем токен из куки
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Требуется аутентификация" });
      }

      // Декодируем токен и получаем user_id
      const decoded = jwt.verify(token, SECRET_KEY);
      const user_id = decoded.id;

      const { name, city, website, description } = req.body;

      if (!user_id || !name || !city) {
        return res.status(400).json({ message: 'Все обязательные поля должны быть заполнены' });
      }

      const universityId = await University.create({ user_id, name, city, website, description });
      res.status(201).json({ message: 'Вуз добавлен', universityId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Получение всех вузов
  static async getAll(req, res) {
    try {
      const universities = await University.findAll();
      res.json(universities);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Получение университета по ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const university = await University.findById(id);

      if (!university) {
        return res.status(404).json({ message: "Вуз не найден" });
      }

      res.json(university);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Получение данных университета по ID пользователя (из токена)
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
      const university = await University.findByUserId(user_id);
      if (!university) {
        return res.status(404).json({ message: "Вуз не найден" });
      }

      res.json(university);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Обновление данных вуза
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, city, website, description } = req.body;

      const updated = await University.update(id, { name, city, website, description });

      if (!updated) {
        return res.status(404).json({ message: "Вуз не найден или данные не изменены" });
      }

      res.json({ message: "Данные вуза обновлены" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Удаление вуза
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await University.delete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Вуз не найден" });
      }

      res.json({ message: "Вуз удален" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }
}

module.exports = UniversitiesController;
