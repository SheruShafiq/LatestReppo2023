/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    // browser: {
    //   enabled: true,
    //   name: "safari",
    // },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
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
