import {nodeResolve} from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const userTerser = false
/**
 * @param input {String}
 * @param output {Object}
 * @param plugins {{useTerser?: Boolean}}
 */
const createExport = (input, output, plugins) => ({
    input, output,
    plugins: [
        nodeResolve({browser: output.format === "es"}),
        typescript({
            compilerOptions: {
                sourceMap: output.sourcemap,
            },
            sourceMap: userTerser,
        }),
        commonjs(),
        plugins.useTerser && terser(),
        json(),
    ]
})

const exportList = [
    [
        "./src/index.ts",
        {
            file: "./dist/index.js",
            format: "es",
            sourcemap: true
        },
        {
            useTerser: false
        }
    ],
    [
        "./src/index.ts",
        {
            file: "./dist/index.min.js",
            format: "es",
            sourcemap: false,
        },
        {
            useTerser: true
        }
    ],
    [
        "./src/index.ts",
        {
            file: "./dist/index.cjs.js",
            format: "cjs",
            sourcemap: false,
            exports: "auto"
        },
        {
            useTerser: false
        }
    ]
]
export default exportList.map(e => createExport(...e))
