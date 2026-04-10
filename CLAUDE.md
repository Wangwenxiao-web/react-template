# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个**正在开发中**的后台管理系统模板，从前端演示工程改造而来。开发计划详见 `admin_template_plan.md`，按 P0→P1→P2→P3 优先级推进，当前处于 **P0 阶段**（后台骨架尚未完成）。

技术栈：React 19 + TypeScript + Vite + antd 6 + TailwindCSS 4 + react-router-dom 7 + axios

## 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # TypeScript 检查 + Vite 构建
pnpm type-check   # 仅 TypeScript 检查
pnpm lint         # ESLint
pnpm lint:css     # Stylelint（仅 CSS 文件）
pnpm format       # Prettier 格式化
pnpm preview      # 预览构建产物
```

> 包管理器强制使用 pnpm（`preinstall` hook 会阻止其他包管理器）。

## 架构与模块说明

### 主题系统

项目有**两套 antd 主题 hook**，均通过 `<ConfigProvider>` 注入：

- `src/hooks/useAntdTheme.ts`：从 CSS 变量（`variables.scss`）读取颜色，映射为 antd token。适合与 TailwindCSS 颜色系统联动。
- `src/hooks/useShadcnTheme.ts`：内联硬编码 antd token，风格接近 shadcn/ui 的视觉效果，同时通过 `antd-style` 注入组件级 classNames 覆盖。

当前 `Layout.tsx` 使用 `useShadcnTheme`。CSS 变量源定义在 `src/styles/variables.scss`，所有颜色 token 以 `--color-` 前缀命名。

### 布局结构

```
Layout.tsx (antd ConfigProvider)
├── BaseSide.tsx  →  sidebar（通过 appConfig 动态选 AntdMenu 或 CustomMenu）
├── BaseHeader.tsx
└── BaseMain.tsx
```

菜单实现由 `src/config/app.config.json` 的 `layout.sidebar.menu.implementation` 字段控制（`"antd"` 或 `"custom"`），该字段在运行时通过 `src/config/app.config.ts` 解析和校验。

### 路由

`src/router/index.ts` 使用 react-router-dom v7。当前路由结构尚未分层（P0 待完成），目标架构为：

- 公共路由层：`/login`
- 后台受保护路由层：`/`（需要 `AdminLayout` + 路由守卫）
- 异常路由层：`/403`、`/404`

路由元信息通过 `handle` 字段携带（如 `handle: { title: '...' }`）。

### 请求层

`src/lib/request.ts` 是 axios 实例：

- `baseURL` 来自环境变量 `VITE_API_BASE_URL`
- 请求拦截器：自动注入 `localStorage.getItem('token')` 为 Bearer token
- 响应拦截器：剥离 `.data` 层返回

当前缺少 401 处理、业务错误码统一处理（P0 待完成）。

### 路径别名

`@` 映射到 `./src`（在 `vite.config.ts` 和 `tsconfig.json` 中均已配置）。

### UI 技术路线

- **antd**：页面级主组件体系（后台表格、表单、弹层等）
- **shadcn/ui（Radix UI）**：仅保留为原子组件补充，`src/components/ui/` 下已有少量组件
- TailwindCSS 4：布局与间距工具类

两套 UI 并存是历史原因，新开发应以 antd 为主。

## 当前状态与注意事项

- `src/views/Auth/Login.tsx` 有 ESLint 忽略注释，P2 需清理
- 暂无测试（P2 阶段补充）
- 无 `.env` 文件，环境变量类型未定义（`VITE_API_BASE_URL` 等，P2 阶段补充）
- `src/stores/index.ts`、`src/api/index.ts`、`src/constants/index.ts` 均为占位文件
