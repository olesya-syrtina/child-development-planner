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
        <div class="form-field">
          <label for="name">Имя ребёнка</label>

          <input
            id="name"
            v-model="childName"
            type="text"
            placeholder="Введите имя"
            required
          />
        </div>

        <div class="form-field">
          <label for="age">Возраст ребёнка</label>

          <select id="age" v-model="childAge" required>
            <option value="" disabled>
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

        <button type="submit">
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
}

.home__content {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 6px 25px rgb(217 119 6 / 12%);
}

.home__description {
  margin-bottom: 30px;
  color: #785b3a;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.form-field input,
.form-field select {
  padding: 12px;
  border: 2px solid #fcd34d;
  border-radius: 10px;
  background: #fffdf5;
}

.form-field input:focus,
.form-field select:focus {
  outline: none;
  border-color: #f59e0b;
}

.home button {
  width: 100%;
  margin-top: 10px;
}
</style>