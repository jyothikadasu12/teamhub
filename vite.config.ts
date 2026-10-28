
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  
test: {
  environment: "jsdom",
  globals: true,
  include: ["src/tests/**/*.{test,spec}.{ts,tsx}"],
  setupFiles: ["./src/tests/setup.ts"],
},

});
