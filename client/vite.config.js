import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactRefresh from "@vitejs/plugin-react-refresh";
import reactIcons from "vite-plugin-react-icons";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true, // Enable sourcemaps for the build
    outDir: 'dist'
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react(), reactRefresh(), reactIcons],
});
