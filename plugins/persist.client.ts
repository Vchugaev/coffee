import { useAuthStore } from "~/store/auth";

// plugins/persist.client.ts
export default defineNuxtPlugin(() => {
  const auth = useAuthStore();
  auth.isAuthenticated = localStorage.getItem("authenticated") === "true";

  auth.$subscribe(() => {
    localStorage.setItem("authenticated", String(auth.isAuthenticated));
  });
});
