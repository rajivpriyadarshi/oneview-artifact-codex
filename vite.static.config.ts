import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Static SPA build used for GitHub Pages. The app page is entirely client-side,
// so it needs no Worker, RSC, or D1 binding. `npm run dev` still uses vinext.
export default defineConfig({
  root: path.resolve(import.meta.dirname, "static"),
  // Relative base so the bundle works under any Pages sub-path (/<repo>/).
  base: process.env.BASE_PATH ?? "./",
  publicDir: path.resolve(import.meta.dirname, "public"),
  plugins: [react()],
  // `root` is static/, so point PostCSS at the project-level config.
  css: { postcss: import.meta.dirname },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist-static"),
    emptyOutDir: true,
  },
});
