<script setup>
import { ref, onMounted } from "vue";

// Данные профиля студента
const student = ref(null);
const loading = ref(true);
const error = ref(null);

// Функция загрузки данных профиля
const fetchStudentProfile = async () => {
  try {
    const response = await fetch("http://localhost:5000/profiles/profile", {
      method: "GET",
      credentials: "include", // Передача куки
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Ошибка при загрузке профиля");

    student.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStudentProfile);
</script>

<template>
  <div class="profile-section">
    <h3>Профиль абитуриента</h3>
    <p>Вы можете проходить тестирования и искать образовательные программы.</p>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="student">
      <p><strong>ФИО:</strong> {{ student.full_name }}</p>
      <p><strong>Телефон:</strong> {{ student.phone || "Не указан" }}</p>
      <p><strong>Дата рождения:</strong> {{ student.birth_date || "Не указана" }}</p>
      <p><strong>Уровень образования:</strong> {{ student.education_level || "Не указан" }}</p>
      <p><strong>Город:</strong> {{ student.city || "Не указан" }}</p>
      <p><strong>О себе:</strong> {{ student.about || "Нет информации" }}</p>
      
      <NuxtLink to="/tests" class="btn btn-blue">Пройти тестирование</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.profile-section {
  background: #eef2ff;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
ы