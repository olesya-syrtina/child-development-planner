<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SkillsList from "../components/SkillsList.vue";

interface Skill {
  id: number;
  category: string;
  title: string;
  ageGroup: string;
}

const route = useRoute();
const router = useRouter();

const childName = route.query.name as string;
const childAge = route.query.age as string;
const childId = route.query.childId as string;

const skills = ref<Skill[]>([]);

const selectedSkills = ref<number[]>([]);

if (childId) {
  fetch(`${import.meta.env.VITE_API_URL}/api/children/${childId}`)
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
}

const ageSkills = computed(() => {
  return skills.value.filter((skill) => skill.ageGroup === childAge);
});

const categories = computed(() => {
  return [...new Set(ageSkills.value.map((skill) => skill.category))];
});

const toggleSkill = (skillId: number) => {
  if (selectedSkills.value.includes(skillId)) {
    selectedSkills.value = selectedSkills.value.filter((id) => id !== skillId);
  } else {
    selectedSkills.value.push(skillId);
  }
};

const createPlan = () => {
   const url = childId
    ? `${import.meta.env.VITE_API_URL}/api/children/${childId}`
    : `${import.meta.env.VITE_API_URL}/api/children`;

  const method = childId ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: childName,
      age: childAge,
      selectedSkills: selectedSkills.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Не удалось сохранить данные ребёнка");
      }

      return response.json();
    })
    .then((data) => {
      router.push({
        name: "plan",
        query: {
          name: childName,
          age: childAge,
          childId: data.id,
        },
      });
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

const goBack = () => {
  router.push({
    name: "home",
  });
};

fetch(`${import.meta.env.VITE_API_URL}/api/skills`)
  .then((response) => response.json())
  .then((data) => {
    skills.value = data;
  })
  .catch((error) => {
    console.error("Ошибка загрузки навыков:", error);
  });
</script>

<template>
  <main class="skills-page">
    <div class="container py-5">
      <h1>Навыки ребёнка</h1>

      <p class="skills-page__info">
        {{ childName }}, {{ childAge }}
      </p>

      <SkillsList
        :categories="categories"
        :skills="ageSkills"
        :selected-skills="selectedSkills"
        @toggle="toggleSkill"
      />
      <div class="buttons">
        <button
          type="button"
          class="btn btn-outline-warning"
          @click="goBack"
        >
          ← Назад
        </button>

        <button
          type="button"
          class="btn btn-warning"
          @click="createPlan"
        >
          Составить план занятий
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.skills-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff7d6, #ffe0a3);
}

.skills-page h1 {
  margin-bottom: 10px;
  color: #d97706;
  font-weight: 700;
  text-align: center;
}

.skills-page__info {
  margin-bottom: 30px;
  color: #785b3a;
  font-size: 18px;
  text-align: center;
}

.buttons {
  display: flex;
  gap: 12px;
  margin-top: 30px;
  padding-bottom: 20px;
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

.btn-outline-warning {
  border-color: #f59e0b;
  color: #d97706;
  font-weight: 600;
}

.btn-outline-warning:hover {
  background-color: #f59e0b;
  border-color: #f59e0b;
  color: #ffffff;
}
</style>
