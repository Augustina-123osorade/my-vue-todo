<template>
  <main class="max-w-xl mx-auto p-6 space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-semibold">Todo Details</h1>
      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p>Loading todo details...</p>
    </div>

    <section v-else-if="todo" class="p-4 border rounded-md shadow-sm bg-white">
      <p class="mb-2"><strong>ID:</strong> {{ todo.id }}</p>
      <p class="mb-2"><strong>Title:</strong> {{ todo.todo }}</p>
      <p class="mb-2">
        <strong>Status:</strong>
        <span :class="todo.completed ? 'text-green-600' : 'text-yellow-600'">
          <template v-if="todo.completed">✔️ Completed</template>
          <template v-else>⏳ In Progress</template>
        </span>
      </p>
      <p><strong>User ID:</strong> {{ todo.userId }}</p>
    </section>

    <div v-else class="text-center py-8">
      <p class="text-red-500">Todo not found or failed to load.</p>
    </div>

    <div class="flex justify-center space-x-4">
      <router-link :to="{ name: 'TodoList' }">
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Back to List
        </button>
      </router-link>
      <router-link :to="{ name: 'MyTodo' }">
        <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          My Todos
        </button>
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchTodoById, type Todo } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "TodoDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const todo = ref<Todo | null>(null);
    const loading = ref(true);

    async function loadTodo() {
      const id = route.params.id as string;
      if (!id) {
        router.push({ name: 'NotFound' });
        return;
      }

      try {
        loading.value = true;
        todo.value = await fetchTodoById(id);
      } catch (error) {
        console.error("Failed to load todo:", error);
      } finally {
        loading.value = false;
      }
    }

    async function logout() {
      try {
        await authStore.logout();
        router.push({ name: "Login" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }

    onMounted(() => {
      loadTodo();
    });

    return { todo, loading, logout };
  },
});
</script>