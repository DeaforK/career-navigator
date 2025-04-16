const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

// Проверяем подключение к БД
db.getConnection()
  .then(connection => {
    console.log('✅ Подключение к базе данных успешно');
    connection.release();
  })
  .catch(error => {
    console.error('❌ Ошибка подключения к базе данных:', error);
  });

module.exports = db;
