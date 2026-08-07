import { resolve } from "path";
import { defineConfig } from "vite";

// We pass { command } to check if we are running 'dev' or 'build'
export default defineConfig(({ command }) => ({
  root: "src/",

  // Adjusted to look inside the src/ directory
  publicDir: "public",

  // Using root '/' for local dev, and your repo name for the GitHub build!
  base: command === "build" ? "/storeKeepwdd330/" : "/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        product: resolve(__dirname, "src/products.html"),
        order: resolve(__dirname, "src/orders.html"),
        weather: resolve(__dirname, "src/weather.html"),
        sitePlan: resolve(__dirname, "src/siteplan.html"),
      },
    },
  },
}));
