<template>
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <input
      v-model="search"
      placeholder="Search todos"
      class="border p-2 rounded w-full sm:w-1/2 mb-4"
    />

    <ul class="space-y-2">
      <li
        v-for="todo in paginatedTodos"
        :key="todo.id"
        class="p-3 border rounded bg-white flex justify-between items-center"
      >
        <router-link :to="{ name: 'TodoDetails', params: { id: todo.id } }"
                     class="text-black hover:underline">
          {{ todo.todo }}
        </router-link>
        <span class="text-sm">
          <template v-if="todo.completed">✔️</template>
          <template v-else>⏳</template>
        </span>
      </li>
    </ul>

    <div class="flex justify-between items-center pt-4">
      <button :disabled="page === 1" @click="page--" class="px-3 py-1 border rounded">Previous</button>
      <span class="text-sm">Page {{ page }} of {{ totalPages }}</span>
      <button :disabled="page === totalPages" @click="page++" class="px-3 py-1 border rounded">Next</button>
    </div>

    <div class="flex justify-center">
      <router-link to="/my-todo">
        <button class="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          + Create Todo
        </button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { fetchTodos } from "@/stores/api";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export default defineComponent({
  name: "TodoList",
  setup() {
    const todos = ref<Todo[]>([]);
    const search = ref("");
    const page = ref(1);
    const itemsPerPage = 10;

    const totalPages = computed(() => Math.ceil(filteredTodos.value.length / itemsPerPage));
    const filteredTodos = computed(() =>
      todos.value.filter((t) => t.todo.toLowerCase().includes(search.value.toLowerCase()))
    );
    const paginatedTodos = computed(() =>
      filteredTodos.value.slice((page.value - 1) * itemsPerPage, page.value * itemsPerPage)
    );

    onMounted(async () => {
      todos.value = await fetchTodos();
    });

    return { todos, search, page, totalPages, paginatedTodos };
  },
});
</script>

