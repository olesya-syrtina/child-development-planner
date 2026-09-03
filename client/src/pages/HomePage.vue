<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const childName = ref("");
const childAge = ref("");

const router = useRouter();

const ages = [
  "0–3 месяца",
  "4–6 месяцев",
  "7–9 месяцев",
  "10–12 месяцев",
  "1–1,5 года",
  "1,5–2 года",
  "2–3 года",
  "3–4 года",
  "4–5 лет",
  "5–6 лет",
];

const start = () => {
  router.push({
    name: "skills",
    query: {
      name: childName.value,
      age: childAge.value,
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

      <form @submit.prevent="start">
        <div class="mb-3">
          <label
            for="name"
            class="form-label"
          > Имя ребёнка </label>

          <input
            id="name"
            v-model="childName"
            type="text"
            class="form-control"
            placeholder="Введите имя"
            required
          >
        </div>

        <div class="mb-4">
          <label
            for="age"
            class="form-label"
          > Возраст ребёнка </label>

          <select
            id="age"
            v-model="childAge"
            class="form-select"
            required
          >
            <option
              value=""
              disabled
            >
              Выберите возраст
            </option>

            <option
              v-for="age in ages"
              :key="age"
              :value="age"
            >
              {{ age }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          class="btn btn-warning w-100 home__button"
        >
          Продолжить
        </button>
      </form>
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

.form-label {
  color: #3f2a16;
  font-weight: 600;
}

.form-control,
.form-select {
  border: 2px solid #fcd34d;
  background-color: #fffdf5;
}

.form-control:focus,
.form-select:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 0.2rem rgb(245 158 11 / 20%);
}

.home__button {
  padding: 12px;
  background-color: #f59e0b;
  border-color: #f59e0b;
  color: #ffffff;
  font-weight: 600;
}

.home__button:hover {
  background-color: #d97706;
  border-color: #d97706;
}
</style>
