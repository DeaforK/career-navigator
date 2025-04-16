<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Поля профиля работодателя
const companyName = ref('');
const industry = ref('');
const description = ref('');
const website = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

// Функция отправки данных
const submitProfile = async () => {
  errorMessage.value = '';

  // Проверка обязательных полей
  if (!companyName.value) {
    errorMessage.value = 'Название компании обязательно!';
    return;
  }

  try {
    isLoading.value = true;

    const response = await fetch('http://localhost:5000/employers', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_name: companyName.value,
        industry: industry.value || null,
        description: description.value || null,
        website: website.value || null,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении профиля!');
    }

    // Перенаправление на страницу профиля
    router.push('/employers/profile');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h2>Заполните данные работодателя</h2>

    <form @submit.prevent="submitProfile">
      <div class="form-group">
        <label>Название компании *</label>
        <input v-model="companyName" type="text" required placeholder="Введите название">
      </div>

      <div class="form-group">
        <label>Отрасль</label>
        <input v-model="industry" type="text" placeholder="Введите отрасль">
      </div>

      <div class="form-group">
        <label>Описание</label>
        <textarea v-model="description" placeholder="Введите описание компании"></textarea>
      </div>

      <div class="form-group">
        <label>Сайт</label>
        <input v-model="website" type="url" placeholder="Введите ссылку на сайт">
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Сохранение..." : "Сохранить" }}
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

input, textarea {
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
