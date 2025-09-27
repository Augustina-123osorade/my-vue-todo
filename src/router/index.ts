import { createRouter, createWebHistory} from "vue-router";
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
    meta: { requiresAuth: true }, // ✅ protected route
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
    props: true, // pass route params as props
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

// ✅ Navigation Guard (protect routes that need login)
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" }); // redirect to login
  } else if (to.name === "Login" && isAuthenticated) {
    next({ name: "TodoList" }); // redirect logged-in users to TodoList
  } else {
    next();
  }
});

export default router;



