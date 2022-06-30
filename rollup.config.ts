/// <reference types="node" />

import pluginNodeResolve from '@rollup/plugin-node-resolve';
import pluginBabel from '@rollup/plugin-babel';
import pluginCommonJS from '@rollup/plugin-commonjs';
import pluginTypescript from '@rollup/plugin-typescript';
import path from 'path';
import { defineConfig } from 'rollup';

const extensions = ['.ts', '.js', '.cjs', '.mjs'];
export default defineConfig({
  input: path.resolve(__dirname, 'src/index.ts'),
  external: [
    'chai',
     'fs', 'path', 'util', /@babel\/runtime/],
  output: [
    {
      dir: path.resolve(__dirname, 'dist'),
      strict: true,
      sourcemap: true,
      entryFileNames: 'index.mjs',
      format: 'esm',
      exports: 'named',
    },
    {
      file: path.resolve(__dirname, 'dist/index.cjs'),
      strict: true,
      sourcemap: true,
      format: 'commonjs',
      exports: 'named',
    },
  ],
  plugins: [
    pluginNodeResolve(),
    pluginCommonJS(),
    pluginTypescript(),
    pluginBabel({
      extensions,
      babelHelpers: 'runtime',
      // https://github.com/rollup/plugins/issues/854
      skipPreflightCheck: true,
    }),
  ],
});
