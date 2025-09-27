<template>
  <main class="max-w-xl mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-semibold">Todo Details</h1>

    <section v-if="todo" class="p-4 border rounded-md shadow-sm bg-white">
      <p><strong>ID:</strong> {{ todo.id }}</p>
      <p><strong>Title:</strong> {{ todo.todo }}</p>
      <p>
        <strong>Status:</strong>
        <span :class="todo.completed ? 'text-green-600' : 'text-yellow-600'">
          <template v-if="todo.completed">✔️ Completed</template>
          <template v-else>⏳ In Progress</template>
        </span>
      </p>
      <p><strong>User ID:</strong> {{ todo.userId }}</p>
    </section>

    <p v-else class="text-center py-4 text-gray-500">Loading...</p>

    <div class="flex justify-center">
      <router-link to="/">
        <button class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
          Back
        </button>
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TodoDetails",
  setup() {
    const route = useRoute();
    const todo = ref<any>(null);

    onMounted(async () => {
      const res = await fetch(`https://dummyjson.com/todos/${route.params.id}`);
      if (res.ok) {
        todo.value = await res.json();
      }
    });

    return { todo };
  },
});
</script>
