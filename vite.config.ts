/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // browser: {
    //   enabled: true,
    //   name: "safari",
    // },
    globals: true,
    environment: "jsdom",
    css: true,
    // setupFiles: ["./src/test/setup.ts"],
  },
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
