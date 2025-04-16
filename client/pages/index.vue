<template>
  <div>
    <!-- Главный блок приветствия -->
    <section class="hero text-center py-5">
      <div class="container">
        <h1 class="fw-bold">Добро пожаловать в Карьерный Навигатор!</h1>
        <p class="lead">Выберите свой путь: учеба, работа или тестирование.</p>
        <div class="d-flex justify-content-center gap-3 mt-4">
          <NuxtLink to="/universities" class="btn btn-blue">Вузы</NuxtLink>
          <NuxtLink to="/vacancies" class="btn btn-orange">Вакансии</NuxtLink>
          <NuxtLink to="/profile" class="btn btn-outline-light">Личный кабинет</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Раздел: Программы университетов -->
    <section class="container my-5">
      <h2 class="section-title">Программы университетов</h2>
      <div v-if="loadingPrograms" class="text-center">Загрузка...</div>
      <div v-else class="row">
        <div v-for="program in programs" :key="program.id" class="col-md-4">
          <div class="card custom-card">
            <div class="card-body">
              <h5 class="card-title">{{ program.name }}</h5>
              <p class="card-text">{{ program.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Раздел: Университеты -->
    <section class="container my-5">
      <h2 class="section-title">Университеты</h2>
      <div v-if="loadingUniversities" class="text-center">Загрузка...</div>
      <div v-else class="row">
        <div v-for="university in universities" :key="university.id" class="col-md-4">
          <div class="card custom-card">
            <div class="card-body">
              <h5 class="card-title">{{ university.name }}</h5>
              <p class="card-text">{{ university.location }}</p>
              <a :href="university.website" class="btn btn-sm btn-blue" target="_blank">Подробнее</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Раздел: Вакансии -->
    <section class="container my-5">
      <h2 class="section-title">Вакансии</h2>
      <div v-if="loadingVacancies" class="text-center">Загрузка...</div>
      <div v-else class="row">
        <div v-for="vacancy in vacancies" :key="vacancy.id" class="col-md-4">
          <div class="card custom-card">
            <div class="card-body">
              <h5 class="card-title">{{ vacancy.title }}</h5>
              <p class="card-text">{{ vacancy.description }}</p>
              <p class="text-muted">Зарплата: {{ vacancy.salary }} ₽</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const programs = ref([]);
const universities = ref([]);
const vacancies = ref([]);

const loadingPrograms = ref(true);
const loadingUniversities = ref(true);
const loadingVacancies = ref(true);

// Функция для загрузки данных
const fetchData = async (url, targetRef, loadingRef) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    targetRef.value = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    loadingRef.value = false;
  }
};

onMounted(() => {
  fetchData("http://localhost:5000/programs", programs, loadingPrograms);
  fetchData("http://localhost:5000/universities", universities, loadingUniversities);
  fetchData("http://localhost:5000/vacancies", vacancies, loadingVacancies);
});
</script>

<style scoped>
/* Секция приветствия */
.hero {
  background-color: #1E3A8A;
  color: #F5F5F5;
  padding: 60px 0;
}

/* Стили для заголовков разделов */
.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1E3A8A;
  text-align: center;
  margin-bottom: 20px;
}

/* Карточки */
.custom-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Кнопки */
.btn-blue {
  background-color: #1E3A8A;
  color: white;
  border-radius: 8px;
  transition: 0.3s;
}

.btn-blue:hover {
  background-color: #142F6B;
}

.btn-orange {
  background-color: #FF6B35;
  color: white;
  border-radius: 8px;
  transition: 0.3s;
}

.btn-orange:hover {
  background-color: #D45D2E;
}

.btn-outline-light {
  border: 1px solid white;
  color: white;
  border-radius: 8px;
  transition: 0.3s;
}

.btn-outline-light:hover {
  background-color: white;
  color: #1E3A8A;
}
</style>
