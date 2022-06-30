# test-notes

一个自用的 JavaScript / TypeScript 快照测试工具库。

## 本地使用

在 `test-notes` 目录中使用 pnpm 7 安装依赖并构建：

```bash
pnpm install --frozen-lockfile
pnpm run build
```

在 Mocha 测试文件中引用构建结果，按实际目录调整路径：

```javascript
const notes = require('./path/to/test-notes/dist/index.cjs').default;

beforeEach(function () {
  notes.currentTest.file = this.currentTest.file;
  notes.currentTest.key = this.currentTest.titlePath().join('/');
});

it('matches the output', async function () {
  await notes.matchJSON({ a: 1 });
});
```

## 测试

```bash
pnpm test
```

Node.js 24 环境需设置 `NODE_OPTIONS=--no-experimental-strip-types`。
