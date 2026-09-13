<script setup lang="ts">
import SkillCard from "./SkillCard.vue";

interface Skill {
  id: number;
  category: string;
  title: string;
  ageGroup: string;
}

defineProps<{
  categories: string[];
  skills: Skill[];
  selectedSkills: number[];
}>();

const emit = defineEmits<{
  (e: "toggle", skillId: number): void;
}>();
</script>

<template>
  <section class="skills-list">
    <div
      v-for="category in categories"
      :key="category"
      class="skills-category"
    >
      <h2>{{ category }}</h2>

      <SkillCard
        v-for="skill in skills.filter(
          (skill) => skill.category === category,
        )"
        :key="skill.id"
        :skill="skill"
        :selected="selectedSkills.includes(skill.id)"
        @toggle="emit('toggle', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
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
  font-weight: 700;
}
</style>