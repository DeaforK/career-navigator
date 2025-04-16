const express = require('express');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

// Получение пользователя по ID
router.get('/', UsersController.getById);

// Получение всех пользователей
router.get('/all', UsersController.getAll);

// Обновление данных пользователя
router.put('/:id', UsersController.update);

// Удаление пользователя
router.delete('/:id', UsersController.delete);

module.exports = router;
