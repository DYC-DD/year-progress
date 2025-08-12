import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/year-progress/",
  plugins: [react()],
  server: {
    open: true,
  },
});
