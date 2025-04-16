const Employer = require('../models/Employer');
const Vacancy = require('../models/Vacancy');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

class VacanciesController {
  // Создание новой вакансии
  static async create(req, res) {
    try {
      const {
        title, description, required_education, competencies,
        salary, city, employment_type, experience, schedule, contact_email, contact_phone
      } = req.body;

      // Извлекаем токен из куки
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Требуется аутентификация" });
      }

      // Декодируем токен и получаем user_id
      const decoded = jwt.verify(token, SECRET_KEY);
      const user_id = decoded.id;
      const employer = await Employer.findByUserId(user_id);
      const employer_id = employer.id;

      // Проверяем обязательные поля
      if (!employer_id || !title || !description || !city || !employment_type || !experience || !schedule) {
        return res.status(400).json({ message: 'Все обязательные поля должны быть заполнены' });
      }

      // Создание вакансии
      const vacancyId = await Vacancy.create({
        employer_id, title, description, required_education, competencies,
        salary, city, employment_type, experience, schedule, contact_email, contact_phone
      });

      res.status(201).json({ message: 'Вакансия успешно добавлена', vacancyId });
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Получение всех вакансий
  static async getAll(req, res) {
    try {
      const vacancies = await Vacancy.findAll();
      res.json(vacancies);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Получение вакансии по ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const vacancy = await Vacancy.findById(id);

      if (!vacancy) {
        return res.status(404).json({ message: 'Вакансия не найдена' });
      }

      res.json(vacancy);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Получение вакансий по ID работодателя
  static async getByEmployer(req, res) {
    try {
      const { employer_id } = req.params;
      const vacancies = await Vacancy.findByEmployer(employer_id);
      res.json(vacancies);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Обновление статуса вакансии
  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['Активная', 'Закрытая'].includes(status)) {
        return res.status(400).json({ message: 'Недопустимый статус вакансии' });
      }

      const updatedRows = await Vacancy.updateStatus(id, status);

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Вакансия не найдена' });
      }

      res.json({ message: 'Статус вакансии обновлён' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }

  // Удаление вакансии
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedRows = await Vacancy.delete(id);

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Вакансия не найдена' });
      }

      res.json({ message: 'Вакансия удалена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  }
}

module.exports = VacanciesController;
