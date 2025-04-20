
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Conditionally import the tagger to avoid errors in local development
let componentTagger = null;
try {
  const taggerModule = require("lovable-tagger");
  componentTagger = taggerModule.componentTagger;
} catch (error) {
  console.warn("lovable-tagger not available, continuing without it");
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
