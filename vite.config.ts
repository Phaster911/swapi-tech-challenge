import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(
      mode === "production"
        ? {}
        : {
            plugins: [["@swc/plugin-styled-components", {}]],
          }
    ),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
}));
