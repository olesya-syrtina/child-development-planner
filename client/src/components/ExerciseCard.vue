<script setup lang="ts">
interface Exercise {
  id: number;
  skillId: number;
  title: string;
  description: string;
}

defineProps<{
  exercises: Exercise[];
}>();
</script>

<template>
  <div class="card exercise-card mb-3">
    <div class="card-body">
      <div
        v-for="exercise in exercises"
        :key="exercise.id"
      >
        <h4 class="card-title">
          Упражнение: "{{ exercise.title }}"
        </h4>

        <p class="card-text">
          {{ exercise.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exercise-card {
  border: 2px solid #fcd34d;
  border-left: 5px solid #f59e0b;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 3px 10px rgb(217 119 6 / 10%);
}

.exercise-card .card-title {
  margin-bottom: 10px;
  color: #d97706;
  font-size: 18px;
  font-weight: 600;
}

.exercise-card .card-text {
  margin-bottom: 0;
  color: #785b3a;
  line-height: 1.6;
}
</style>