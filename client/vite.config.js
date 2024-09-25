import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactRefresh from "@vitejs/plugin-react-refresh";
import reactIcons from "vite-plugin-react-icons";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true, // Enable sourcemaps for the build
    outDir: 'dist'
  },
  server: {
    proxy: {
      "/api": {
        target: "https://sumits-portfolio-backend.onrender.com",
        secure: false,
      },
    },
    historyApiFallback: true, // Add this line
  },
  plugins: [react(), reactRefresh(), reactIcons],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      process: 'process/browser' // Add this alias to polyfill process
    }
  },
  define: {
    'process.env': {} // Define process.env as an empty object
  },
  optimizeDeps: {
    include: ['process'] // Include process in optimized dependencies
  }
});