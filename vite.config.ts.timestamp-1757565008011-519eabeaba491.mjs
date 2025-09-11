// vite.config.ts
import { screenGraphPlugin } from "file:///C:/Users/Zeref/Desktop/Sound/Sound/Sound--main/node_modules/@animaapp/vite-plugin-screen-graph/dist/index.js";
import react from "file:///C:/Users/Zeref/Desktop/Sound/Sound/Sound--main/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwind from "file:///C:/Users/Zeref/Desktop/Sound/Sound/Sound--main/node_modules/tailwindcss/lib/index.js";
import { defineConfig } from "file:///C:/Users/Zeref/Desktop/Sound/Sound/Sound--main/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  const plugins = [
    react(),
    ...mode === "development" ? [screenGraphPlugin()] : []
  ];
  return {
    plugins,
    publicDir: "./public",
    base: "/Sound-/",
    css: {
      postcss: {
        plugins: [tailwind()]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxaZXJlZlxcXFxEZXNrdG9wXFxcXFNvdW5kXFxcXFNvdW5kXFxcXFNvdW5kLS1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxaZXJlZlxcXFxEZXNrdG9wXFxcXFNvdW5kXFxcXFNvdW5kXFxcXFNvdW5kLS1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9aZXJlZi9EZXNrdG9wL1NvdW5kL1NvdW5kL1NvdW5kLS1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgc2NyZWVuR3JhcGhQbHVnaW4gfSBmcm9tIFwiQGFuaW1hYXBwL3ZpdGUtcGx1Z2luLXNjcmVlbi1ncmFwaFwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHRhaWx3aW5kIGZyb20gXCJ0YWlsd2luZGNzc1wiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk9wdGlvbltdID0gW1xuICAgIHJlYWN0KCksXG4gICAgLi4uKG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiA/IFtzY3JlZW5HcmFwaFBsdWdpbigpXSA6IFtdKSxcbiAgXTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnMsXG4gICAgcHVibGljRGlyOiBcIi4vcHVibGljXCIsXG4gICAgYmFzZTogXCIvU291bmQtL1wiLCBcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCldLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBVLFNBQVMseUJBQXlCO0FBQzVXLE9BQU8sV0FBVztBQUNsQixPQUFPLGNBQWM7QUFDckIsU0FBUyxvQkFBa0M7QUFFM0MsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxVQUEwQjtBQUFBLElBQzlCLE1BQU07QUFBQSxJQUNOLEdBQUksU0FBUyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7QUFBQSxFQUN4RDtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDUCxTQUFTLENBQUMsU0FBUyxDQUFDO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
