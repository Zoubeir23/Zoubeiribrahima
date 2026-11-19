import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { resourceGuidePreviewPlugin } from "./src/lib/resource-guide-preview/resource-guide-preview-vite-plugin";

export default defineConfig({
  plugins: [react(), resourceGuidePreviewPlugin()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
