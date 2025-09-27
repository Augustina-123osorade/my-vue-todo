<template>
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Todo List</h1>
      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>

    <input
      v-model="search"
      placeholder="Search todos"
      class="border p-2 rounded w-full sm:w-1/2 mb-4"
    />

    <div v-if="loading" class="text-center py-8">
      <p>Loading todos...</p>
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="todo in paginatedTodos"
        :key="todo.id"
        class="p-3 border rounded bg-white flex justify-between items-center hover:shadow-md transition"
      >
        <router-link 
          :to="{ name: 'TodoDetails', params: { id: todo.id } }"
          class="text-black hover:underline flex-1"
        >
          {{ todo.todo }}
        </router-link>
        <span class="text-sm ml-4">
          <template v-if="todo.completed">✔️</template>
          <template v-else>⏳</template>
        </span>
      </li>
    </ul>

    <div v-if="!loading && filteredTodos.length === 0" class="text-center py-8">
      <p class="text-gray-500">No todos found.</p>
    </div>

    <div v-if="totalPages > 1" class="flex justify-between items-center pt-4">
      <button 
        :disabled="page === 1" 
        @click="page--" 
        class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="text-sm">Page {{ page }} of {{ totalPages }}</span>
      <button 
        :disabled="page === totalPages" 
        @click="page++" 
        class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>

    <div class="flex justify-center">
      <router-link :to="{ name: 'MyTodo' }">
        <button class="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          + Create Todo
        </button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchTodos, type Todo } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "TodoList",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const todos = ref<Todo[]>([]);
    const search = ref("");
    const page = ref(1);
    const loading = ref(true);
    const itemsPerPage = 10;

    const filteredTodos = computed(() =>
      todos.value.filter((t) => 
        t.todo.toLowerCase().includes(search.value.toLowerCase())
      )
    );

    const totalPages = computed(() => 
      Math.ceil(filteredTodos.value.length / itemsPerPage)
    );

    const paginatedTodos = computed(() =>
      filteredTodos.value.slice(
        (page.value - 1) * itemsPerPage, 
        page.value * itemsPerPage
      )
    );

    async function loadTodos() {
      try {
        loading.value = true;
        todos.value = await fetchTodos();
      } catch (error) {
        console.error("Failed to load todos:", error);
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
      loadTodos();
    });

    return { 
      todos, 
      search, 
      page, 
      loading,
      totalPages, 
      paginatedTodos, 
      filteredTodos,
      logout 
    };
  },
});
</script>