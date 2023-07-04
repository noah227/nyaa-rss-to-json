const {nodeResolve} = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const typescript = require("@rollup/plugin-typescript")
const terser = require("@rollup/plugin-terser")
const json = require("@rollup/plugin-json")

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
        json()
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

module.exports = exportList.map(e => createExport(...e))
