const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const careerTestRoutes = require('./routes/careerTestRoutes');
const employersRoutes = require('./routes/employersRoutes');
const profilesRoutes = require('./routes/profilesRoutes');
const programRoutes = require('./routes/programRoutes');
const universityRoutes = require('./routes/universityRoutes');
const userRoutes = require('./routes/userRoutes');
const vacancyRoutes = require('./routes/vacancyRoutes');

const app = express();

// Middleware
app.use(
    cors({
      origin: 'http://localhost:3000', // Разрешенный фронтенд (замени на свой)
      credentials: true, // Разрешаем куки
    })
  );
app.use(express.json());
app.use(cookieParser()); // Подключаем парсер для работы с куками


// Routes
app.use('/auth', authRoutes);
app.use('/career-tests', careerTestRoutes);
app.use('/employers', employersRoutes);
app.use('/profiles', profilesRoutes);
app.use('/programs', programRoutes);
app.use('/universities', universityRoutes);
app.use('/users', userRoutes);
app.use('/vacancies', vacancyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
