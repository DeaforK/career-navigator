const db = require('../config/db');

class CareerTest {
  static async initializeTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS career_tests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          result TEXT NOT NULL,
          recommendations TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      console.log('✅ Таблица "career_tests" проверена/создана');
    } catch (error) {
      console.error('❌ Ошибка при создании таблицы "career_tests":', error);
    }
  }

  static async create({ user_id, result, recommendations }) {
    const [resultQuery] = await db.query(
      'INSERT INTO career_tests (user_id, result, recommendations) VALUES (?, ?, ?)',
      [user_id, result, recommendations]
    );
    return resultQuery.insertId;
  }

  static async findByUserId(user_id) {
    const [rows] = await db.query('SELECT * FROM career_tests WHERE user_id = ?', [user_id]);
    return rows;
  }
}

CareerTest.initializeTable();

module.exports = CareerTest;
