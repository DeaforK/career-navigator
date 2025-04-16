<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const university = ref(null);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

const fetchUniversity = async () => {
  try {
    const response = await fetch('http://localhost:5000/universities/profile', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
    }

    university.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Функция для перехода на страницу добавления программы с передачей ID
const goToAddProgram = () => {
  if (university.value?.id) {
    router.push(`/universities/add-program?university_id=${university.value.id}`);
  } else {
    error.value = "Ошибка: ID университета не найден";
  }
};

onMounted(fetchUniversity);
</script>

<template>
  <div class="profile-section">
    <h3>Профиль ВУЗа</h3>

    <p v-if="loading">Загрузка...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    
    <div v-else>
      <p><strong>Название:</strong> {{ university?.name || 'Не указано' }}</p>
      <p><strong>Город:</strong> {{ university?.city || 'Не указан' }}</p>
      <p><strong>Сайт:</strong> <a :href="university?.website" target="_blank">{{ university?.website || 'Нет' }}</a></p>
      <p><strong>Описание:</strong> {{ university?.description || 'Нет описания' }}</p>

      <button @click="goToAddProgram" class="btn btn-green">Добавить программу</button>
    </div>
  </div>
</template>

<style scoped>
.profile-section {
  background: #d4f8d4;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.error {
  color: red;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn:hover {
  background-color: #218838;
}
</style>
