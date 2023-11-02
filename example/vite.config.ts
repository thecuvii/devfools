import { defineConfig } from "vite";
import path from "node:path";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS()],
  resolve: {
    alias: {
      "@/": path.join(__dirname, "../src/index.ts"),
    },
  },
});
