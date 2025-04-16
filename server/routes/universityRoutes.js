const express = require('express');
const UniversitiesController = require('../controllers/UniversitiesController');

const router = express.Router();

// Добавление нового вуза
router.post('/', UniversitiesController.create);

// Получение всех вузов
router.get('/', UniversitiesController.getAll);

// Получение вуза по ID пользователя (из токена)
router.get('/profile', UniversitiesController.getByUserId);

// Получение вуза по ID
router.get('/:id', UniversitiesController.getById);

// Обновление данных вуза
router.put('/:id', UniversitiesController.update);

// Удаление вуза
router.delete('/:id', UniversitiesController.delete);

module.exports = router;
