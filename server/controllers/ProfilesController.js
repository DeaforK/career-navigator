const Profile  = require('../models/Profile');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

const ProfilesController = {
  async getAll(req, res) {
    try {
      const profiles = await Profile.findAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения профилей' });
    }
  },

  async getById(req, res) {
    try {
      const profile = await Profile.findByPk(req.params.id);
      if (!profile) return res.status(404).json({ error: 'Профиль не найден' });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения профиля' });
    }
  },

  async getUserProfile(req, res) {
    try {
      // Извлекаем токен из куки
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Требуется аутентификация" });
      }

      // Декодируем токен и получаем user_id
      const decoded = jwt.verify(token, SECRET_KEY);
      const profile = await Profile.findByUserId(decoded.id);
      if (!profile) return res.status(404).json({ error: 'Профиль не найден' });

      res.json(profile);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Ошибка получения профиля' });
    }
  },

  async create(req, res) {
    try {
      // Извлекаем токен из куки
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Требуется аутентификация" });
      }

      // Декодируем токен и получаем user_id
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.id;

      // Добавляем user_id в тело запроса
      const profileData = { ...req.body, user_id: userId };

      // Создаём профиль в базе данных
      const profile = await Profile.create(profileData);

      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Ошибка создания профиля" });
    }
  },

  async update(req, res) {
    try {
      const profile = await Profile.findByPk(req.params.id);
      if (!profile) return res.status(404).json({ error: 'Профиль не найден' });
      await profile.update(req.body);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка обновления профиля' });
    }
  },

  async delete(req, res) {
    try {
      const profile = await Profile.findByPk(req.params.id);
      if (!profile) return res.status(404).json({ error: 'Профиль не найден' });
      await profile.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Ошибка удаления профиля' });
    }
  }
};

module.exports = ProfilesController;
