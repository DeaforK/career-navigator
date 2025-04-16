<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const fullName = ref("");
const phone = ref("");
const birthDate = ref("");
const educationLevel = ref("Среднее");
const city = ref("");
const about = ref("");

// Функция отправки данных
const submitProfile = async () => {
  try {
    const response = await fetch("http://localhost:5000/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Передаем куки с токеном
      body: JSON.stringify({
        full_name: fullName.value,
        phone: phone.value,
        birth_date: birthDate.value,
        education_level: educationLevel.value,
        city: city.value,
        about: about.value,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Профиль успешно заполнен!");
      router.push("/profile");
    } else {
      alert(data.error || "Ошибка при сохранении профиля");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Ошибка сервера");
  }
};
</script>

<template>
  <div class="profile-form-container">
    <main class="container mt-5">
      <div class="profile-box mx-auto">
        <h2 class="text-center mb-4">Заполнение профиля</h2>
        <form @submit.prevent="submitProfile">
          <div class="mb-3">
            <label for="fullName" class="form-label">ФИО</label>
            <input type="text" id="fullName" class="form-control" placeholder="Введите ФИО" v-model="fullName" required />
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">Телефон</label>
            <input type="tel" id="phone" class="form-control" placeholder="Введите телефон" v-model="phone" />
          </div>

          <div class="mb-3">
            <label for="birthDate" class="form-label">Дата рождения</label>
            <input type="date" id="birthDate" class="form-control" v-model="birthDate" />
          </div>

          <div class="mb-3">
            <label for="educationLevel" class="form-label">Уровень образования</label>
            <select id="educationLevel" class="form-select" v-model="educationLevel">
              <option value="Среднее">Среднее</option>
              <option value="Среднее специальное">Среднее специальное</option>
              <option value="Высшее">Высшее</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="city" class="form-label">Город</label>
            <input type="text" id="city" class="form-control" placeholder="Введите город" v-model="city" />
          </div>

          <div class="mb-3">
            <label for="about" class="form-label">О себе</label>
            <textarea id="about" class="form-control" placeholder="Коротко о себе" v-model="about"></textarea>
          </div>

          <button type="submit" class="btn btn-blue w-100">Сохранить</button>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.profile-form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.profile-box {
  max-width: 500px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-blue {
  background-color: #1E3A8A;
  color: white;
  border-radius: 8px;
  transition: 0.3s;
}

.btn-blue:hover {
  background-color: #142F6B;
}
</style>
