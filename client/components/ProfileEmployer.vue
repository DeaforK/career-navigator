<script setup>
import { ref, onMounted, watch } from "vue";

const employer = ref(null);
const vacancies = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchEmployerData = async () => {
  try {
    const response = await fetch("http://localhost:5000/employers/profile", {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Ошибка при загрузке профиля работодателя");

    employer.value = await response.json();
    console.log("Данные работодателя:", employer.value);
  } catch (err) {
    error.value = err.message;
  }
};

const fetchVacancies = async (id) => {
  try {
    if (!id) return;
    console.log(id)

    const response = await fetch(`http://localhost:5000/vacancies/employer/${id}`, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Ошибка при загрузке вакансий");

    vacancies.value = await response.json();
    console.log("Вакансии:", vacancies.value);
  } catch (err) {
    error.value = err.message;
  }
};

// Загружаем профиль работодателя
onMounted(async () => {
  await fetchEmployerData();
  loading.value = false;
});

// Следим за employer и загружаем вакансии, когда появится user_id
watch(employer, (newEmployer) => {
  if (newEmployer?.id) {
    fetchVacancies(newEmployer.id);
  }
});
</script>

<template>
  <div class="profile-section">
    <h3>Профиль работодателя</h3>
    <p>Вы можете публиковать вакансии и просматривать отклики кандидатов.</p>
    
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else-if="employer">
      <p><strong>Компания:</strong> {{ employer.company_name }}</p>
      <p><strong>Отрасль:</strong> {{ employer.industry || "Не указана" }}</p>
      <p><strong>Сайт:</strong> 
        <a v-if="employer.website" :href="employer.website" target="_blank">{{ employer.website }}</a>
        <span v-else>Не указан</span>
      </p>
      <p><strong>Описание:</strong> {{ employer.description || "Нет информации" }}</p>

      <NuxtLink to="/vacancies/create" class="btn btn-orange">Добавить вакансию</NuxtLink>
      
      <h4>Ваши вакансии:</h4>
      <ul v-if="vacancies.length">
        <li v-for="vacancy in vacancies" :key="vacancy.id">
          <NuxtLink :to="`/vacancies/${vacancy.id}`">{{ vacancy.title }}</NuxtLink>
        </li>
      </ul>
      <p v-else>У вас пока нет опубликованных вакансий.</p>
    </div>
  </div>
</template>

<style scoped>
.profile-section {
  background: #ffebd6;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
