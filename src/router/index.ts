import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Import views (pages)
import Login from "@/views/Login.vue";
import TodoList from "@/views/TodoList.vue";
import MyTodo from "@/views/MyTodo.vue";
import TodoDetails from "@/views/TodoDetails.vue";
import NotFound from "@/views/NotFound.vue";

// Define routes
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/todos",
    name: "TodoList",
    component: TodoList,
    meta: { requiresAuth: true },
  },
  {
    path: "/mytodo",
    name: "MyTodo",
    component: MyTodo,
    meta: { requiresAuth: true },
  },
  {
    path: "/todo/:id",
    name: "TodoDetails",
    component: TodoDetails,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard with better error handling
router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  
  // Small delay to ensure auth state is initialized
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const isAuthenticated = authStore.isAuthenticated;
  
  // Debug logging
  console.log('Navigation to:', to.path);
  console.log('Auth status:', isAuthenticated);
  console.log('User:', authStore.user);

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Redirecting to login - not authenticated');
    next({ name: "Login" });
  } else if (to.name === "Login" && isAuthenticated) {
    console.log('Redirecting to TodoList - already authenticated');
    next({ name: "TodoList" });
  } else {
    console.log('Allowing navigation');
    next();
  }
});

export default router;