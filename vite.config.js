import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // nécessaire pour résoudre les chemins

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  json: {
    namedExports: true,
    stringify: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@locales": path.resolve(__dirname, "src/locales"),
      "@components": path.resolve(__dirname, "src/components"), // <-- ajouté
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: "esnext",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
