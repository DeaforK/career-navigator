const db = require('../config/db');

class Employer {
  static async initializeTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS employers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT UNIQUE NOT NULL,
          company_name VARCHAR(255) NOT NULL,
          industry VARCHAR(100),
          description TEXT,
          website VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      console.log('✅ Таблица "employers" проверена/создана');
    } catch (error) {
      console.error('❌ Ошибка при создании таблицы "employers":', error);
    }
  }

  static async create({ user_id, company_name, industry, description, website }) {
    const [result] = await db.query(
      'INSERT INTO employers (user_id, company_name, industry, description, website) VALUES (?, ?, ?, ?, ?)',
      [user_id, company_name, industry, description, website]
    );
    return result.insertId;
  }

  static async findByUserId(user_id) {
    const [rows] = await db.query('SELECT * FROM employers WHERE user_id = ?', [user_id]);
    return rows[0];
  }
}

Employer.initializeTable();

module.exports = Employer;
