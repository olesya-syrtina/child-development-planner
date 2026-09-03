import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import SkillsPage from "../pages/SkillsPage.vue";
import PlanPage from "../pages/PlanPage.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/skills",
      name: "skills",
      component: SkillsPage,
    },
    {
      path: "/plan",
      name: "plan",
      component: PlanPage,
    },
  ],
});

export default router;
