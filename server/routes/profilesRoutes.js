const express = require('express');
const ProfilesController = require('../controllers/ProfilesController');

const router = express.Router();

// Получение всех профилей
router.get('/', ProfilesController.getAll);

router.get('/profile', ProfilesController.getUserProfile);

// Получение профиля по ID
router.get('/:id', ProfilesController.getById);

// Создание нового профиля
router.post('/', ProfilesController.create);

// Обновление профиля по ID
router.put('/:id', ProfilesController.update);

// Удаление профиля по ID
router.delete('/:id', ProfilesController.delete);

module.exports = router;
