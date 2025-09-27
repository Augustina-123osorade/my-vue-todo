import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import type { User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtrjr9vCUNjRi9vcjoST6NQi1pu3myQ4s",
  authDomain: "todo-app-541f3.firebaseapp.com",
  projectId: "todo-app-541f3",
  storageBucket: "todo-app-541f3.appspot.com",
  messagingSenderId: "861991327437",
  appId: "1:861991327437:web:08ba5cf64335458a7abb84",
  measurementId: "G-R1G4ZDVQQ1"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const useAuthStore = defineStore("auth", () => {
  // 🔹 State
  const user = ref<User | null>(null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!user.value);

  // 🔹 Actions
  async function login() {
    try {
      loading.value = true;
      const result = await signInWithPopup(auth, provider);
      user.value = result.user;
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      user.value = null;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // 🔹 Auth state listener
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });

  return { user, loading, login, logout, isAuthenticated };
});
