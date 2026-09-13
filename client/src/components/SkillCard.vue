<script setup lang="ts">
interface Skill {
  id: number;
  category: string;
  title: string;
  ageGroup: string;
}

defineProps<{
  skill: Skill;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", skillId: number): void;
}>();
</script>

<template>
  <label
    class="skill"
    :class="{ selected }"
  >
    <input
      type="checkbox"
      class="form-check-input"
      :checked="selected"
      @change="emit('toggle', skill.id)"
    >

    <span>{{ skill.title }}</span>
  </label>
</template>

<style scoped>
.skill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 12px;
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

.skill .form-check-input {
  width: 18px;
  height: 18px;
  margin: 0;
  border-color: #f59e0b;
  cursor: pointer;
}

.skill .form-check-input:checked {
  background-color: #f59e0b;
  border-color: #f59e0b;
}
</style>