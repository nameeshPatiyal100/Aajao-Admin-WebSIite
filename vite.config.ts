import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material", "@mui/x-charts"],
        },
      },
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true, // ✅ enable TypeScript type checking
    }),
  ],
  
});

// const ChartsPage = React.lazy(() => import('./pages/ChartsPage'));
