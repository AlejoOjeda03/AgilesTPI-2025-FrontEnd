import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://ahorcado-agiles-frontend.vercel.app",
    env: {
      BACKEND_URL: "https://ahorcado-agiles-u1qj.onrender.com", 
    },
  },
});
