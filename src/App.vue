<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
    <!-- Simple Navbar -->
    <header class="bg-white shadow-md">
      <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600">Vue Todo</h1>

        <nav class="space-x-4">
          <RouterLink
            to="/"
            class="hover:text-blue-600 font-medium transition"
            active-class="text-blue-700 underline"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/todo"
            class="hover:text-blue-600 font-medium transition"
            active-class="text-blue-700 underline"
          >
            Todos
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Render the active page -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 text-center py-4 text-sm text-gray-500">
      © 2025 Vue Todo App. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
// no extra logic needed for App.vue, just acts as the shell
</script>

<style>
/* Optional global tweaks */
body {
  font-family: 'Inter', sans-serif;
}
</style>
