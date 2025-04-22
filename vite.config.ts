
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080, // Set to required port 8080
    proxy: {
      // Proxy API endpoint(s) to Flask backend
      '/generate-chapter': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // Optionally, you can rewrite the path if needed (not necessary here)
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
