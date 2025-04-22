import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@beaver/client": path.resolve(__dirname, "../beaver-client/src"),
      "@beaver/react": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["@beaver/client"],
  },
});
