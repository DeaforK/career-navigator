const express = require('express');
const EmployersController = require('../controllers/EmployersController');

const router = express.Router();

// Маршрут для создания нового работодателя
router.post('/', EmployersController.create);

// Маршрут для получения работодателя
router.get('/profile', EmployersController.getByUserId);

// Маршрут для получения всех работодателей
router.get('/all', EmployersController.getAll);

module.exports = router;
