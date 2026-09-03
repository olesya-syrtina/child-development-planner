<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Skill {
  id: number;
  category: string;
  title: string;
  ageGroup: string;
}

interface Exercise {
  id: number;
  skillId: number;
  title: string;
  description: string;
}

const route = useRoute();
const router = useRouter();

const childAge = route.query.age as string;

const skills = ref<Skill[]>([]);
const exercises = ref<Exercise[]>([]);

const childId = route.query.childId as string;

const selectedSkills = ref<number[]>([]);

fetch(`http://localhost:3000/api/children/${childId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Не удалось получить данные ребёнка");
    }

    return response.json();
  })
  .then((data) => {
    selectedSkills.value = data.selectedSkills;
  })
  .catch((error) => {
    console.error("Ошибка загрузки ребёнка:", error);
  });

const notSelectedSkills = computed(() => {
  return skills.value.filter(
    (skill) =>
      skill.ageGroup === childAge && !selectedSkills.value.includes(skill.id),
  );
});

const plan = computed(() => {
  return notSelectedSkills.value.map((skill) => {
    const skillExercises = exercises.value.filter(
      (exercise) => exercise.skillId === skill.id,
    );

    return {
      skill,
      exercises: skillExercises,
    };
  });
});

const categories = computed(() => {
  return [...new Set(plan.value.map((item) => item.skill.category))];
});

const goBack = () => {
  router.push({
    name: "skills",
    query: {
      name: route.query.name,
      age: childAge,
      childId,
    },
  });
};

fetch("http://localhost:3000/api/skills")
  .then((response) => response.json())
  .then((data) => {
    skills.value = data;
  })
  .catch((error) => {
    console.error("Ошибка загрузки навыков:", error);
  });

onMounted(() => {
  fetch("http://localhost:3000/api/exercises")
    .then((response) => response.json())
    .then((data) => {
      exercises.value = data;
    })
    .catch((error) => {
      console.error("Ошибка загрузки упражнений:", error);
    });
});
</script>

<template>
  <main class="plan-page">
    <div class="container py-5">
      <div class="plan-header mb-4">
        <h1>План занятий</h1>

        <button
          type="button"
          class="btn btn-warning"
          @click="goBack"
        >
          ← Вернуться к навыкам
        </button>
      </div>

      <section v-if="plan.length">
        <div
          v-for="category in categories"
          :key="category"
          class="mb-5"
        >
          <h2 class="category-title">
            {{ category }}
          </h2>

          <div
            v-for="item in plan.filter(
              (item) => item.skill.category === category,
            )"
            :key="item.skill.id"
            class="card exercise-card mb-3"
          >
            <div class="card-body">
              <div
                v-for="exercise in item.exercises"
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
        </div>
      </section>

      <div
        v-else
        class="alert alert-warning"
        role="alert"
      >
        Все навыки отмечены как освоенные!
      </div>
    </div>
  </main>
</template>

<style scoped>
.plan-page {
  min-height: 100vh;
  padding-bottom: 40px;
  background: linear-gradient(135deg, #fff7d6, #ffe0a3);
}

.plan-header {
  text-align: center;
}

.plan-header h1 {
  margin-bottom: 20px;
  color: #d97706;
  font-weight: 700;
}

.category-title {
  margin-bottom: 15px;
  color: #222222;
  font-weight: 700;
}

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

.btn-warning {
  background-color: #f59e0b;
  border-color: #f59e0b;
  color: #ffffff;
  font-weight: 600;
}

.btn-warning:hover {
  background-color: #d97706;
  border-color: #d97706;
  color: #ffffff;
}
</style>
