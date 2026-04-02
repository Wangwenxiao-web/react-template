# React Template

基于 React、TypeScript 和 Vite 的前端模板工程，内置 ESLint、Prettier、Stylelint、Husky 和 Commitlint，用于建立统一的本地开发与提交流程。

## 开发命令

- `pnpm dev`：启动本地开发环境
- `pnpm type-check`：执行 TypeScript 全量类型检查
- `pnpm lint`：执行 ESLint 全量检查
- `pnpm lint:css`：执行 CSS 规则检查
- `pnpm build`：执行类型检查并构建生产产物
- `pnpm format`：执行 Prettier 全量格式化

## Git Hooks

项目通过 Husky 接入 Git Hooks。执行 `pnpm install` 后会自动运行 `prepare` 脚本完成安装。

- `pre-commit`
  - 运行 `lint-staged`
  - 只处理已暂存文件
  - 自动执行 `eslint --fix`、`stylelint --fix` 和 `prettier --write`
- `commit-msg`
  - 运行 `commitlint`
  - 校验提交信息是否符合约定式提交规范
- `pre-push`
  - 运行 `pnpm type-check`
  - 运行 `pnpm lint`
  - 运行 `pnpm build`

## 提交信息规范

提交信息格式：

```text
<type>: <subject>
```

允许的 `type`：

- `feat`
- `fix`
- `refactor`
- `style`
- `docs`
- `test`
- `build`
- `chore`

示例：

```text
feat: 初始化 React 模板
fix: 修复请求实例超时配置
style: 调整全局样式变量命名
```
