<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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
}

const ageSkills = computed(() => {
  return skills.value.filter(
    (skill) => skill.ageGroup === childAge,
  );
});

const categories = computed(() => {
  return [...new Set(ageSkills.value.map((skill) => skill.category))];
});

const toggleSkill = (skillId: number) => {
  if (selectedSkills.value.includes(skillId)) {
    selectedSkills.value = selectedSkills.value.filter(
      (id) => id !== skillId,
    );
  } else {
    selectedSkills.value.push(skillId);
  }
};

const createPlan = () => {
  const url = childId
    ? `http://localhost:3000/api/children/${childId}`
    : "http://localhost:3000/api/children";

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

fetch("http://localhost:3000/api/skills")
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
    <h1>Навыки ребёнка</h1>

    <p class="skills-page__info">
      {{ childName }}, {{ childAge }}
    </p>
    <section class="skills-list">
      <div
        v-for="category in categories"
        :key="category"
        class="skills-category"
      >
        <h2>{{ category }}</h2>

        <label
          v-for="skill in ageSkills.filter(
            (skill) => skill.category === category,
          )"
          :key="skill.id"
          class="skill"
          :class="{ selected: selectedSkills.includes(skill.id) }"
        >
          <input
            type="checkbox"
            :checked="selectedSkills.includes(skill.id)"
            @change="toggleSkill(skill.id)"
          />

          <span>{{ skill.title }}</span>
        </label>
      </div>
    </section>

    <div class="buttons">
      <button
        type="button"
        @click="goBack"
      >
        ← Назад
      </button>

      <button
        type="button"
        @click="createPlan"
      >
        Составить план занятий
      </button>
    </div>
  </main>
</template>


<style scoped>

P {
  text-align: center;
}

.skills-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
}

.skills-page__info {
  margin-bottom: 30px;
  font-size: 18px;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skills-category {
  margin-bottom: 30px;
}

.skills-category h2 {
  margin-bottom: 15px;
  color: #222222;
}
.skill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #ffffff;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.skill:hover {
  background-color: #fffbeb;
  border-color: #fcd34d;
}

.skill.selected {
  background-color: #fef3c7;
  border-color: #f59e0b;
}

.skill input {
  width: 18px;
  height: 18px;
  accent-color: #f59e0b;
}

.buttons {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}
</style>