<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const vacancy = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchVacancy = async () => {
  try {
    const id = route.params.id;
    const response = await fetch(`http://localhost:5000/vacancies/${id}`, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Ошибка при загрузке вакансии");

    vacancy.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchVacancy);
</script>

<template>
  <div class="vacancy-page">
    <h2>Вакансия</h2>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="vacancy">
      <h3>{{ vacancy.title }}</h3>
      <p><strong>Компания:</strong> {{ vacancy.company_name || "Не указано" }}</p>
      <p><strong>Город:</strong> {{ vacancy.city }}</p>
      <p><strong>Зарплата:</strong> {{ vacancy.salary ? `${vacancy.salary} руб.` : "Не указана" }}</p>
      <p><strong>Тип занятости:</strong> {{ vacancy.employment_type }}</p>
      <p><strong>Опыт:</strong> {{ vacancy.experience }}</p>
      <p><strong>График:</strong> {{ vacancy.schedule }}</p>
      <p><strong>Образование:</strong> {{ vacancy.required_education || "Не указано" }}</p>
      <p><strong>Навыки:</strong> {{ vacancy.competencies || "Не указаны" }}</p>
      <p><strong>Описание:</strong> {{ vacancy.description }}</p>

      <div class="contacts">
        <h4>Контакты:</h4>
        <p v-if="vacancy.contact_email">📧 {{ vacancy.contact_email }}</p>
        <p v-if="vacancy.contact_phone">📞 {{ vacancy.contact_phone }}</p>
      </div>

      <NuxtLink to="/vacancies" class="btn btn-orange">Назад к вакансиям</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.vacancy-page {
  background: #fff4e5;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: orange;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
