<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

// Динамический импорт компонентов для разных ролей
const ProfileApplicant = defineAsyncComponent(() => import('@/components/ProfileApplicant.vue'));
const ProfileEmployer = defineAsyncComponent(() => import('@/components/ProfileEmployer.vue'));
const ProfileUniversity = defineAsyncComponent(() => import('@/components/ProfileUniversity.vue'));

const user = ref(null);
const router = useRouter();

// Функция получения профиля пользователя
const fetchUserProfile = async () => {
  try {
    const responseUser = await fetch(`http://localhost:5000/users`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });

    if (!responseUser.ok) {
      throw new Error(`Ошибка при получении пользователя: ${responseUser.statusText}`);
    }

    const userData = await responseUser.json();
    console.log("Ответ сервера (пользователь):", userData);

    user.value = { ...userData };
  } catch (error) {
    console.error('Ошибка загрузки профиля:', error);
    router.push('/login');
  }
};

// Функция выхода из аккаунта
const logout = async () => {
  try {
    const response = await fetch(`http://localhost:5000/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Ошибка при выходе из аккаунта');
    }

    user.value = null;
    router.push('/login');
  } catch (error) {
    console.error("Ошибка при выходе:", error);
  }
};

// Определение компонента профиля в зависимости от роли
const roleComponent = computed(() => {
  switch (user.value?.role) {
    case 'абитуриент': return ProfileApplicant;
    case 'работодатель': return ProfileEmployer;
    case 'вуз': return ProfileUniversity;
    default: return null;
  }
});

onMounted(fetchUserProfile);
</script>

<template>
  <div class="profile-container">
    <div class="profile-card" v-if="user">
      <h2>Личный кабинет</h2>

      <div class="profile-info">
        <p><strong>Email:</strong> {{ user.email || "Не указан" }}</p>
        <p><strong>Роль:</strong> {{ user.role || "Не указана" }}</p>
      </div>

      <component :is="roleComponent"></component>

      <button @click="logout" class="btn btn-red">Выйти</button>
    </div>

    <p v-else>Загрузка...</p>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.profile-info {
  margin-bottom: 1rem;
  text-align: left;
}

.profile-info p {
  margin: 5px 0;
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  margin-top: 15px;
}

.btn-red {
  background: #ff4b5c;
  color: white;
}

.btn-red:hover {
  background: #d43f4a;
}
</style>
