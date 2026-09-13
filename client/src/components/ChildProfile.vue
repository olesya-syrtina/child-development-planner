<script setup lang="ts">
import { ref } from "vue";

const childName = ref("");
const childAge = ref("");

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

const emit = defineEmits<{
  (e: "start", name: string, age: string): void;
}>();

const start = () => {
  emit("start", childName.value, childAge.value);
};
</script>

<template>
  <form @submit.prevent="start">
    <div class="mb-3">
      <label
        for="name"
        class="form-label"
      >
        Имя ребёнка
      </label>

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
      >
        Возраст ребёнка
      </label>

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
</template>

<style scoped>

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