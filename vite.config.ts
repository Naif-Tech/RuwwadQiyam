import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import glsl from "vite-plugin-glsl";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "/RuwwadQiyam/", // ضروري لتعمل GitHub Pages بشكل صحيح
  plugins: [
    react(),
    runtimeErrorOverlay(),
    glsl(), // دعم مؤثرات GLSL
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
 build: {
  outDir: path.resolve(__dirname, "dist"),
  emptyOutDir: true,
  assetsInclude: ["**/*.mp3", "**/*.ogg", "**/*.wav"], // ✅ هذا مهم
},

  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp3", "**/*.ogg", "**/*.wav"],
});
