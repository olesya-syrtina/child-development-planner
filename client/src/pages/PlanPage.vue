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
      skill.ageGroup === childAge &&
      !selectedSkills.value.includes(skill.id),
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
  <main>
    <h1>План занятий</h1>

    <button type="button" @click="goBack">
      ← Вернуться к навыкам
    </button>

    <section v-if="plan.length">
      <div
        v-for="category in categories"
        :key="category"
      >
        <h2>{{ category }}</h2>

        <article
          v-for="item in plan.filter(
            (item) => item.skill.category === category,
          )"
          :key="item.skill.id"
        >

          <div
            v-for="exercise in item.exercises"
            :key="exercise.id"
          >
            <h4>Упражнение: "{{ exercise.title }}"</h4>

            <p>{{ exercise.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <p v-else>
      Все навыки отмечены как освоенные!
    </p>
  </main>
</template>

<style scoped>
section {
  margin-top: 30px;
}

section > div {
  margin-bottom: 35px;
}

article {
  padding: 20px;
  margin-top: 15px;
  background: #ffffff;
  border-left: 5px solid #f59e0b;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgb(217 119 6 / 8%);
}

article h3 {
  margin-top: 0;
  color: #b45309;
}

article h4 {
  margin-bottom: 8px;
  color: #d97706;
}

article p {
  color: #785b3a;
  line-height: 1.6;
}
</style>