<template>
  <div class="login-container">
    <main class="container mt-5">
      <div class="login-box mx-auto">
        <h2 class="text-center mb-4">Вход</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="Введите email"
              v-model="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Введите пароль"
              v-model="password"
              required
            />
          </div>
          <button type="submit" class="btn btn-blue w-100">Войти</button>
          <p class="text-center mt-3">
            <NuxtLink to="/forgot-password" class="text-link">Забыли пароль?</NuxtLink>
          </p>
        </form>
        
        <div class="social-login mt-4">
          <p class="text-center">Или войдите через:</p>
          <button class="btn btn-outline-primary w-100 mb-2" @click="loginWithGoogle">Google</button>
          <button class="btn btn-outline-dark w-100" @click="loginWithGitHub">GitHub</button>
        </div>
        
        <p class="text-center mt-3">
          Еще нет аккаунта? 
          <NuxtLink to="/register" class="text-link">Зарегистрироваться</NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // ВАЖНО: передаем куки
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Успешный вход!");
      router.push("/profile");
    } else {
      alert(data.message || "Ошибка входа");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Ошибка сервера");
  }
};

const loginWithGoogle = () => {
  window.location.href = "http://localhost:5000/auth/google";
};

const loginWithGitHub = () => {
  window.location.href = "http://localhost:5000/auth/github";
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.login-box {
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
