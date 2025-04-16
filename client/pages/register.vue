<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref("абитуриент");
const router = useRouter();

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Пароли не совпадают!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // Передаем куки
      body: JSON.stringify({ email: email.value, password: password.value, role: role.value })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Регистрация успешна!");
      
      // Определяем маршрут в зависимости от роли
      let profileRoute = "/profileForm"; // По умолчанию - для абитуриентов
      if (role.value === "работодатель") profileRoute = "/employers/profile";
      if (role.value === "вуз") profileRoute = "/universities/profile";

      router.push(profileRoute);
    } else {
      alert(data.message || "Ошибка регистрации");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Ошибка сервера");
  }
};

const registerWithGoogle = () => {
  window.location.href = "http://localhost:5000/auth/google";
};

const registerWithGitHub = () => {
  window.location.href = "http://localhost:5000/auth/github";
};
</script>

<template>
  <div class="register-container">
    <main class="container mt-5">
      <div class="register-box mx-auto">
        <h2 class="text-center mb-4">Регистрация</h2>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control" placeholder="Введите email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input type="password" id="password" class="form-control" placeholder="Введите пароль" v-model="password" required />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Подтвердите пароль</label>
            <input type="password" id="confirmPassword" class="form-control" placeholder="Повторите пароль" v-model="confirmPassword" required />
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">Выберите роль</label>
            <select id="role" class="form-select" v-model="role" required>
              <option value="абитуриент">Абитуриент</option>
              <option value="работодатель">Работодатель</option>
              <option value="вуз">Вуз</option>
            </select>
          </div>
          <button type="submit" class="btn btn-blue w-100">Зарегистрироваться</button>
        </form>
        
        <div class="social-register mt-4">
          <p class="text-center">Или зарегистрируйтесь через:</p>
          <button class="btn btn-outline-primary w-100 mb-2" @click="registerWithGoogle">Google</button>
          <button class="btn btn-outline-dark w-100" @click="registerWithGitHub">GitHub</button>
        </div>
        
        <p class="text-center mt-3">
          Уже есть аккаунт?
          <NuxtLink to="/login" class="text-link">Войти</NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.register-box {
  max-width: 400px;
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

.text-link {
  color: #00A8CC;
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
}
</style>
