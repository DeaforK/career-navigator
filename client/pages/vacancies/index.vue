<script setup>
import { ref, onMounted, computed } from "vue";

// Храним вакансии и фильтры
const vacancies = ref([]);
const loading = ref(true);
const error = ref(null);

// Фильтры
const searchQuery = ref("");
const selectedCity = ref("");
const selectedEmploymentType = ref("");
const selectedExperience = ref("");

// Доступные фильтры (заполняются автоматически)
const cities = ref(new Set());
const employmentTypes = ref(new Set());
const experiences = ref(new Set());

// Запрос вакансий
const fetchVacancies = async () => {
  try {
    const response = await fetch("http://localhost:5000/vacancies", {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Ошибка при загрузке вакансий");

    const data = await response.json();
    vacancies.value = data;

    // Заполняем фильтры уникальными значениями
    data.forEach(vacancy => {
      if (vacancy.city) cities.value.add(vacancy.city);
      if (vacancy.employment_type) employmentTypes.value.add(vacancy.employment_type);
      if (vacancy.experience) experiences.value.add(vacancy.experience);
    });

  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Фильтрация вакансий
const filteredVacancies = computed(() => {
  return vacancies.value.filter(vacancy => {
    return (
      (!searchQuery.value || vacancy.title.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!selectedCity.value || vacancy.city === selectedCity.value) &&
      (!selectedEmploymentType.value || vacancy.employment_type === selectedEmploymentType.value) &&
      (!selectedExperience.value || vacancy.experience === selectedExperience.value)
    );
  });
});

onMounted(fetchVacancies);
</script>

<template>
  <div class="vacancies-container">
    <h2>Все вакансии</h2>

    <!-- Фильтры -->
    <div class="filters">
      <input type="text" v-model="searchQuery" placeholder="Поиск по названию вакансии" />

      <select v-model="selectedCity">
        <option value="">Все города</option>
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>

      <select v-model="selectedEmploymentType">
        <option value="">Все типы занятости</option>
        <option v-for="type in employmentTypes" :key="type" :value="type">{{ type }}</option>
      </select>

      <select v-model="selectedExperience">
        <option value="">Любой опыт</option>
        <option v-for="exp in experiences" :key="exp" :value="exp">{{ exp }}</option>
      </select>
    </div>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Список вакансий -->
    <ul v-else-if="filteredVacancies.length">
      <li v-for="vacancy in filteredVacancies" :key="vacancy.id">
        <NuxtLink :to="`/vacancies/${vacancy.id}`">
          <h3>{{ vacancy.title }}</h3>
          <p><strong>Компания:</strong> {{ vacancy.company_name || "Не указано" }}</p>
          <p><strong>Город:</strong> {{ vacancy.city || "Не указан" }}</p>
          <p><strong>Занятость:</strong> {{ vacancy.employment_type || "Не указана" }}</p>
          <p><strong>Опыт:</strong> {{ vacancy.experience || "Не указан" }}</p>
        </NuxtLink>
      </li>
    </ul>
    <p v-else>Нет подходящих вакансий</p>
  </div>
</template>

<style scoped>
.vacancies-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters input,
.filters select {
  flex: 1;
  padding: 8px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  color: #ff6600;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
