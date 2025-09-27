<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
    <div
      class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border border-gray-200"
    >
      <!-- Title -->
      <h1 class="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back</h1>
      <p class="text-gray-500 text-sm mb-6">Login to manage your todos</p>

      <!-- Google Sign In -->
      <button
        @click="signInWithGoogle"
        class="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          class="w-2 h-2"
        />
        Continue with Google
      </button>

      <!-- Divider -->
      <div class="my-6 flex items-center">
        <hr class="flex-grow border-gray-300" />
        <span class="px-3 text-gray-500 text-sm font-medium">or</span>
        <hr class="flex-grow border-gray-300" />
      </div>

      <!-- Email / Password Login -->
      <form @submit.prevent="signInWithEmail" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md font-medium"
        >
          Login
        </button>
      </form>

      <!-- Error message -->
      <p v-if="errorMessage" class="text-red-500 text-sm mt-4">
        {{ errorMessage }}
      </p>

      <!-- Extra link -->
      <p class="mt-6 text-gray-500 text-sm">
        Don’t have an account?
        <a href="#" class="text-blue-600 hover:underline">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthStore } from "@/stores/auth"; // your firebase setup file
import { auth } from "@/stores/auth";
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Google Login
async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("Google User:", result.user);
    router.push("/todo");
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}

// Email/Password Login
async function signInWithEmail() {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("Email User:", userCredential.user);
    router.push("/todo");
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}
</script>
