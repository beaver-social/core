import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@beaver/client",
        replacement: path.resolve(
          __dirname,
          "../../beaver-client/src/index.ts"
        ),
      },
      {
        find: /^@beaver\/react(\/.*)?$/,
        replacement: path.resolve(__dirname, "../src$1"),
      },
    ],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
