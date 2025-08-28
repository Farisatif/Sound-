import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig, PluginOption } from "vite";

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [
    react(),
    ...(mode === "development" ? [screenGraphPlugin()] : []),
  ];

  return {
    plugins,
    publicDir: "./static",
    base: "./",
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
  };
});
