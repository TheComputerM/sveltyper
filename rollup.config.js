import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/cli.js",
    output: {
      file: "dist/bin",
      format: "cjs",
      banner: "#!/usr/bin/env node",
      interop: false,
    },
    plugins: [nodeResolve(), terser()],
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "cjs",
      exports: "default"
    },
    plugins: [terser()]
  },
];
