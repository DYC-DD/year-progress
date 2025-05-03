import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/YearProgressBar/",
  plugins: [react()],
  server: {
    open: true,
  },
});
