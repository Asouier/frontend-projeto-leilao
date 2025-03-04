import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
const routes: RouteRecordRaw[] = [
  {
    component: Home,
    path: "/",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
