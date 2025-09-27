<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-6xl font-bold text-red-600">404</h1>
    <p class="mt-4 text-lg text-gray-700">Oops! Page not found.</p>
    <router-link 
      to="/"
      class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Go Home
    </router-link>
  </div>
</template>
