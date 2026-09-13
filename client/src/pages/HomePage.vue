<script setup lang="ts">
import { useRouter } from "vue-router";
import ChildProfile from "../components/ChildProfile.vue";

const router = useRouter();

const start = (name: string, age: string) => {
  router.push({
    name: "skills",
    query: {
      name,
      age,
    },
  });
};
</script>

<template>
  <main class="home">
    <div class="home__content">
      <h1>Развивайка</h1>

      <p class="home__description">
        Подберем развивающие занятия для вашего ребёнка!
      </p>

      <ChildProfile @start="start" />
    </div>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #fff7d6, #ffe0a3);
}

.home__content {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  background: #ffffff;
  border: 2px solid #fcd34d;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgb(217 119 6 / 15%);
}

.home__content h1 {
  margin-bottom: 15px;
  color: #d97706;
  text-align: center;
  font-weight: 700;
}

.home__description {
  margin-bottom: 30px;
  color: #785b3a;
  text-align: center;
}
</style>
