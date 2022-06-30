/* eslint-disable */

process.env.NODE_ENV = 'test';
const path = require('path');

require('dotenv').config();
require('ts-node').register({
  files: true,
  project: path.resolve(__dirname, 'tsconfig.json'),
});
require('@babel/register')({
  configFile: false,
  extensions: ['.ts', '.js'],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
});
