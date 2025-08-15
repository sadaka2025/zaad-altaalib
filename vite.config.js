import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
      "@": "/src",
      "@locales": "/src/locales",
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
