<script setup>
import { ref, onMounted } from 'vue';

const isAuthenticated = ref(false);

const checkAuth = async () => {
  try {
    const response = await fetch('http://localhost:5000/auth/verify', {
      method: 'GET',
      credentials: 'include', // Важно для передачи куки
    });

    if (response.ok) {
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
    }
  } catch (error) {
    console.error('Ошибка проверки аутентификации:', error);
    isAuthenticated.value = false;
  }
};

// Проверяем аутентификацию при монтировании компонента
onMounted(checkAuth);
</script>

<template>
  <header class="navbar navbar-expand-lg shadow-sm">
    <div class="container">
      <!-- Логотип -->
      <NuxtLink to="/" class="navbar-brand fw-bold text-light">Карьерный Навигатор</NuxtLink>

      <!-- Кнопка для мобильного меню -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Навигационное меню -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/about" class="nav-link">О нас</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/vacancies" class="nav-link">Вакансии</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/universities" class="nav-link">Вузы</NuxtLink>
          </li>
        </ul>

        <!-- Кнопка "Личный кабинет" или "Вход" -->
        <NuxtLink v-if="isAuthenticated" to="/profile" class="btn btn-orange ms-3">Личный кабинет</NuxtLink>
        <NuxtLink v-else to="/login" class="btn btn-outline-light ms-3">Вход</NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Стили для шапки */
header {
  background-color: #1E3A8A; /* Глубокий синий */
  padding: 0.8rem 0;
}

/* Навигационные ссылки */
.nav-link {
  color: #EAE0D5 !important; /* Мягкий бежевый */
  font-size: 1.1rem;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #00A8CC !important; /* Бирюзовый при наведении */
}

/* Кнопки */
.btn-orange {
  background-color: #FF6B35;
  color: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transition: 0.3s;
}

.btn-orange:hover {
  background-color: #D45D2E;
}

.btn-outline-light {
  border-color: #EAE0D5;
  color: #EAE0D5;
}

.btn-outline-light:hover {
  background-color: #EAE0D5;
  color: #1E3A8A;
}
</style>
