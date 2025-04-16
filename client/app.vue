<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Шапка -->
    <HeaderComponent />

    <!-- Основной контент -->
    <main class="flex-grow-1 py-4">
      <div class="container">
        <NuxtPage />
      </div>
    </main>

    <!-- Подвал -->
    <footer class="bg-dark text-white text-center py-4 mt-auto shadow-lg">
      <div class="container">
        <p class="mb-1">© 2025 Карьерный Навигатор</p>
        <p class="small mb-0">Разработано с ❤️ для будущего карьеры</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
header {
  background-color: #1E3A8A;
}
/* Улучшаем стиль ссылок */
.nav-link {
  font-size: 1.1rem;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #ffdd57 !important; /* Красивый жёлтый цвет при наведении */
}
</style>
