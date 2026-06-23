import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
// export default defineConfig({
//   base: env.VITE_BASE_URL || '/',
//   plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".");

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    test: {
      environment: "node",
      globals: true,
    },
    base: env.VITE_BASE_URL || "/",
  };
});
