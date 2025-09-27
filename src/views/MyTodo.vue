<template>
  <div class="max-w-xl mx-auto mt-8 space-y-6 px-4">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">My Todo</h1>
      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="flex gap-2 items-start">
      <input
        v-model="newTodo"
        placeholder="Enter todo"
        class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button 
        type="submit" 
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition whitespace-nowrap"
      >
        {{ editingId ? "Update" : "Add" }}
      </button>
    </form>

    <div v-if="todos.length === 0" class="text-center py-8">
      <p class="text-gray-500">No todos yet. Add your first todo above!</p>
    </div>

    <ul v-else class="space-y-3">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center justify-between p-3 border rounded bg-white shadow-sm"
      >
        <div class="flex items-center gap-3 flex-1">
          <input 
            type="checkbox" 
            v-model="todo.completed" 
            class="w-4 h-4"
            @change="saveTodos"
          />
          <span :class="{'line-through text-gray-500': todo.completed}">
            {{ todo.text }}
          </span>
        </div>
        <div class="flex gap-2">
          <button 
            @click="editTodo(todo)" 
            class="border px-2 py-1 rounded hover:bg-gray-50 transition"
            title="Edit todo"
          >
            ✏️
          </button>
          <button 
            @click="deleteTodo(todo.id)" 
            class="border px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
            title="Delete todo"
          >
            🗑️
          </button>
        </div>
      </li>
    </ul>

    <div class="flex justify-center space-x-4 pt-4">
      <router-link :to="{ name: 'TodoList' }">
        <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
          View All Todos
        </button>
      </router-link>
      <router-link :to="{ name: 'Login' }">
        <button class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
          Back to Home
        </button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default defineComponent({
  name: "MyTodo",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const todos = ref<Todo[]>([]);
    const newTodo = ref("");
    const editingId = ref<number | null>(null);

    // Load todos from localStorage
    function loadTodos() {
      const saved = localStorage.getItem('myTodos');
      if (saved) {
        try {
          todos.value = JSON.parse(saved);
        } catch (error) {
          console.error('Error loading todos:', error);
          todos.value = [];
        }
      }
    }

    // Save todos to localStorage
    function saveTodos() {
      localStorage.setItem('myTodos', JSON.stringify(todos.value));
    }

    function handleSubmit() {
      if (!newTodo.value.trim()) return;

      if (editingId.value) {
        const index = todos.value.findIndex((t) => t.id === editingId.value);
        if (index !== -1) {
          todos.value[index].text = newTodo.value.trim();
        }
        editingId.value = null;
      } else {
        todos.value.push({ 
          id: Date.now(), 
          text: newTodo.value.trim(), 
          completed: false 
        });
      }

      newTodo.value = "";
      saveTodos();
    }

    function editTodo(todo: Todo) {
      newTodo.value = todo.text;
      editingId.value = todo.id;
    }

    function deleteTodo(id: number) {
      todos.value = todos.value.filter((t) => t.id !== id);
      if (editingId.value === id) {
        editingId.value = null;
        newTodo.value = "";
      }
      saveTodos();
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
      newTodo, 
      editingId, 
      handleSubmit, 
      editTodo, 
      deleteTodo,
      logout
    };
  },
});
</script>