const CareerTest = require('../models/CareerTest');

class CareerTestController {
  // Создание теста профориентации
  static async createTest(req, res) {
    try {
      const { user_id, result, recommendations } = req.body;
      if (!user_id || !result || !recommendations) {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }
      const testId = await CareerTest.create({ user_id, result, recommendations });
      res.status(201).json({ message: 'Тест профориентации создан', testId });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Получение тестов по ID пользователя
  static async getTestsByUserId(req, res) {
    try {
      const { user_id } = req.params;
      const tests = await CareerTest.findByUserId(user_id);
      if (!tests.length) {
        return res.status(404).json({ message: 'Тесты не найдены' });
      }
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }
}

module.exports = CareerTestController;
