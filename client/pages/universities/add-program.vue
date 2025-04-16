<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const university_id = ref(null);
const program = ref({
  name: '',
  description: '',
  faculty: '',
  entrance_exams: '',
  competencies: '',
  duration: '',
  type: 'Очная',
  price: '',
  university_id: null,
});

const errorMessage = ref('');
const loading = ref(false);

// Получаем university_id из URL
onMounted(() => {
  university_id.value = route.query.university_id;
  if (university_id.value) {
    program.value.university_id = university_id.value;
  } else {
    errorMessage.value = 'Ошибка: ID университета не найден';
  }
});

// Функция отправки данных на сервер
const addProgram = async () => {
  if (!program.value.name || !program.value.faculty || !program.value.duration) {
    errorMessage.value = 'Пожалуйста, заполните все обязательные поля.';
    return;
  }

  errorMessage.value = '';
  loading.value = true;

  try {
    const response = await fetch('http://localhost:5000/programs', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(program.value),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении программы');
    }

    router.push(`/universities/${university_id.value}/programs`);
  } catch (error) {
    errorMessage.value = 'Ошибка при отправке данных. Попробуйте снова.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="form-container">
    <h2>Добавить образовательную программу</h2>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <form @submit.prevent="addProgram">
      <label>Название программы *</label>
      <input v-model="program.name" type="text" required />

      <label>Описание</label>
      <textarea v-model="program.description"></textarea>

      <label>Факультет *</label>
      <input v-model="program.faculty" type="text" required />

      <label>Вступительные экзамены</label>
      <textarea v-model="program.entrance_exams" placeholder="Например: математика, русский язык"></textarea>

      <label>Ключевые компетенции</label>
      <textarea v-model="program.competencies" placeholder="Например: программирование, анализ данных"></textarea>

      <label>Длительность (годы) *</label>
      <input v-model="program.duration" type="number" min="1" required />

      <label>Форма обучения</label>
      <select v-model="program.type">
        <option>Очная</option>
        <option>Заочная</option>
        <option>Очно-заочная</option>
        <option>Дистанционная</option>
      </select>

      <label>Стоимость (руб.)</label>
      <input v-model="program.price" type="number" min="0" step="0.01" />

      <button type="submit" :disabled="loading" class="btn btn-blue">
        {{ loading ? 'Добавление...' : 'Добавить программу' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 80px;
}

.error {
  color: red;
  margin-top: 10px;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-blue {
  background: #4a90e2;
  color: white;
}

.btn-blue:hover {
  background: #357abd;
}
</style>
