const Program = require('../models/Program');

class ProgramController {
  // Создание новой образовательной программы
  static async createProgram(req, res) {
    try {
      const { university_id, name, description, faculty, entrance_exams, competencies, duration, type, price } = req.body;
      console.log(req.body)

      if (!university_id || !name || !duration || !type) {
        return res.status(400).json({ message: 'Обязательные поля: university_id, name, duration, type' });
      }

      const programId = await Program.create({ university_id, name, description, faculty, entrance_exams, competencies, duration, type, price });
      res.status(201).json({ message: 'Программа успешно создана', programId });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка создания программы', error: error.message });
    }
  }

  // Получение всех образовательных программ
  static async getAllPrograms(req, res) {
    try {
      const programs = await Program.findAll();
      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка получения программ', error: error.message });
    }
  }

  // Получение программы по ID
  static async getProgramById(req, res) {
    try {
      const { id } = req.params;
      const program = await Program.findById(id);

      if (!program) {
        return res.status(404).json({ message: 'Программа не найдена' });
      }

      res.status(200).json(program);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка получения программы', error: error.message });
    }
  }

  // Получение программ по университету
  static async getProgramsByUniversity(req, res) {
    try {
      const { university_id } = req.params;
      const programs = await Program.findByUniversity(university_id);

      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка получения программ', error: error.message });
    }
  }

  // Обновление образовательной программы
  static async updateProgram(req, res) {
    try {
      const { id } = req.params;
      const { name, description, faculty, entrance_exams, competencies, duration, type, price } = req.body;

      const updatedRows = await Program.update(id, { name, description, faculty, entrance_exams, competencies, duration, type, price });

      if (!updatedRows) {
        return res.status(404).json({ message: 'Программа не найдена' });
      }

      res.status(200).json({ message: 'Программа успешно обновлена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка обновления программы', error: error.message });
    }
  }

  // Удаление образовательной программы
  static async deleteProgram(req, res) {
    try {
      const { id } = req.params;
      const deletedRows = await Program.delete(id);

      if (!deletedRows) {
        return res.status(404).json({ message: 'Программа не найдена' });
      }

      res.status(200).json({ message: 'Программа успешно удалена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка удаления программы', error: error.message });
    }
  }
}

module.exports = ProgramController;
