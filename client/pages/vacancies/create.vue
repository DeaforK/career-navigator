<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Поля вакансии
const title = ref('');
const description = ref('');
const salary = ref('');
const required_education = ref('');
const competencies = ref('');
const city = ref('');
const employment_type = ref('');
const experience = ref('');
const schedule = ref('');
const contact_email = ref('');
const contact_phone = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

// Возможные значения для выбора
const educationLevels = ['Среднее', 'Среднее специальное', 'Высшее'];
const employmentTypes = ['Полный день', 'Частичная занятость', 'Удалённая работа', 'Стажировка'];
const experienceLevels = ['Без опыта', 'От 1 года', 'От 3 лет', 'От 5 лет'];
const scheduleTypes = ['Гибкий', 'Сменный', 'Вахтовый', 'Стандартный'];

// Функция отправки данных
const submitVacancy = async () => {
  errorMessage.value = '';

  // Проверка обязательных полей
  if (!title.value || !description.value || !city.value || !employment_type.value || !experience.value || !schedule.value) {
    errorMessage.value = 'Пожалуйста, заполните все обязательные поля!';
    return;
  }

  try {
    isLoading.value = true;

    const response = await fetch('http://localhost:5000/vacancies', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        salary: salary.value || null,
        required_education: required_education.value || null,
        competencies: competencies.value || null,
        city: city.value,
        employment_type: employment_type.value,
        experience: experience.value,
        schedule: schedule.value,
        contact_email: contact_email.value || null,
        contact_phone: contact_phone.value || null
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании вакансии!');
    }

    // Перенаправление на список вакансий
    router.push('/vacancies');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h2>Добавить вакансию</h2>

    <form @submit.prevent="submitVacancy">
      <div class="form-group">
        <label>Название вакансии *</label>
        <input v-model="title" type="text" required placeholder="Введите название">
      </div>

      <div class="form-group">
        <label>Описание *</label>
        <textarea v-model="description" required placeholder="Введите описание"></textarea>
      </div>

      <div class="form-group">
        <label>Зарплата (₽)</label>
        <input v-model="salary" type="number" placeholder="Введите зарплату">
      </div>

      <div class="form-group">
        <label>Требуемый уровень образования</label>
        <select v-model="required_education">
          <option v-for="level in educationLevels" :key="level" :value="level">{{ level }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Компетенции</label>
        <textarea v-model="competencies" placeholder="Введите компетенции"></textarea>
      </div>

      <div class="form-group">
        <label>Город *</label>
        <input v-model="city" type="text" required placeholder="Введите город">
      </div>

      <div class="form-group">
        <label>Тип занятости *</label>
        <select v-model="employment_type" required>
          <option v-for="type in employmentTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Опыт работы *</label>
        <select v-model="experience" required>
          <option v-for="exp in experienceLevels" :key="exp" :value="exp">{{ exp }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>График работы *</label>
        <select v-model="schedule" required>
          <option v-for="sched in scheduleTypes" :key="sched" :value="sched">{{ sched }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Email для связи</label>
        <input v-model="contact_email" type="email" placeholder="Введите email">
      </div>

      <div class="form-group">
        <label>Телефон для связи</label>
        <input v-model="contact_phone" type="tel" placeholder="Введите телефон">
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Создание..." : "Добавить вакансию" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 100px;
  resize: none;
}

.error {
  color: red;
  text-align: center;
}

button {
  width: 100%;
  padding: 10px;
  background: #1E3A8A;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}
</style>
