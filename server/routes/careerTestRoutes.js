const express = require('express');
const CareerTestController = require('../controllers/CareerTestsController');

const router = express.Router();

// Маршрут для создания теста профориентации
router.post('/', CareerTestController.createTest);

// Маршрут для получения тестов по ID пользователя
router.get('/:user_id', CareerTestController.getTestsByUserId);

module.exports = router;
