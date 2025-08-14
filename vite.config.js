import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default {
  server: {
    proxy: {
      "/api": {
        target: "https://ton-backend.com", // URL de ton backend
        changeOrigin: true,
      },
    },
  },
};
