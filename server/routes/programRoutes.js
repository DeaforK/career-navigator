const express = require('express');
const ProgramController = require('../controllers/ProgramsController');

const router = express.Router();

// 📌 Создание новой образовательной программы
router.post('/', ProgramController.createProgram);

// 📌 Получение всех образовательных программ
router.get('/', ProgramController.getAllPrograms);

// 📌 Получение программы по ID
router.get('/:id', ProgramController.getProgramById);

// 📌 Получение программ по ID университета
router.get('/university/:university_id', ProgramController.getProgramsByUniversity);

// 📌 Обновление образовательной программы
router.put('/:id', ProgramController.updateProgram);

// 📌 Удаление образовательной программы
router.delete('/:id', ProgramController.deleteProgram);

module.exports = router;
