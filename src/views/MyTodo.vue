<template>
  <div class="max-w-xl mx-auto mt-8 space-y-6 px-4">
    <h1 class="text-2xl font-bold">Todo List</h1>

    <form @submit.prevent="handleSubmit" class="flex gap-2 items-start">
      <input
        v-model="newTodo"
        placeholder="Enter todo"
        class="w-full border p-2 rounded"
      />
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        {{ editingId ? "Update" : "Add" }}
      </button>
    </form>

    <ul class="space-y-3">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center justify-between p-3 border rounded bg-white"
      >
        <div class="flex items-center gap-3 flex-1">
          <input type="checkbox" v-model="todo.completed" />
          <span :class="{'line-through text-gray-500': todo.completed}">
            {{ todo.text }}
          </span>
        </div>
        <div class="flex gap-2">
          <button @click="editTodo(todo)" class="border px-2 py-1 rounded">✏️</button>
          <button @click="deleteTodo(todo.id)" class="border px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700">🗑️</button>
        </div>
      </li>
    </ul>

    <div class="flex justify-center">
      <router-link to="/">
        <button class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">Back</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default defineComponent({
  name: "MyTodo",
  setup() {
    const todos = ref<Todo[]>([]);
    const newTodo = ref("");
    const editingId = ref<number | null>(null);

    function handleSubmit() {
      if (!newTodo.value.trim()) return;

      if (editingId.value) {
        const index = todos.value.findIndex((t) => t.id === editingId.value);
        if (index !== -1) todos.value[index].text = newTodo.value;
        editingId.value = null;
      } else {
        todos.value.push({ id: Date.now(), text: newTodo.value, completed: false });
      }

      newTodo.value = "";
    }

    function editTodo(todo: Todo) {
      newTodo.value = todo.text;
      editingId.value = todo.id;
    }

    function deleteTodo(id: number) {
      todos.value = todos.value.filter((t) => t.id !== id);
      if (editingId.value === id) editingId.value = null;
    }

    return { todos, newTodo, editingId, handleSubmit, editTodo, deleteTodo };
  },
});
</script>
