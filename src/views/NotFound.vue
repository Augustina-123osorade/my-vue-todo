<template>
  <div class="flex flex-col items-center justify-center h-screen text-center px-4">
    <h1 class="text-6xl font-bold text-red-600 mb-4">404</h1>
    <p class="mt-4 text-lg text-gray-700 mb-8">Oops! Page not found.</p>
    <div class="space-x-4">
      <router-link 
        :to="{ name: 'Login' }"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </router-link>
      <router-link 
        :to="{ name: 'TodoList' }"
        class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
      >
        Todo List
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
});
</script>