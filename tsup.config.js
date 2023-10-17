import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  target: ["es2020"],
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  loader: {
    ".js": "jsx",
  },
});
