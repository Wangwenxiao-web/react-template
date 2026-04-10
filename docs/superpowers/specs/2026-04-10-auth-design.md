# 鉴权系统设计文档

**日期**：2026-04-10  
**状态**：已确认，待实施

---

## 背景与目标

为后台管理模板接入页面鉴权系统。需求：

- 有 token = 已登录，可访问受保护路由
- 无 token = 未登录，跳转至登录页
- 不需要角色/权限区分（RBAC 不在本期范围）
- 401 响应：直接跳转登录页（弹窗确认功能预留，暂不实现）
- 不需要 token 自动刷新（入口预留）
- `returnUrl` 通过查询参数传递，登录后回跳

---

## Section 1：Auth Store

**文件**：`src/stores/auth.ts`

### 状态结构

```typescript
type AuthState = {
  token: string | null
  // 预留：authModalVisible: boolean
}

type AuthActions = {
  login: (token: string) => void
  logout: () => void
  // 预留：showAuthModal: () => void
  // 预留：hideAuthModal: () => void
}
```

### 初始化

创建 store 时直接读取 `localStorage.getItem('token')` 作为初始值，不使用 Zustand `persist` 中间件（避免过度封装）。

### Actions

- `login(token)`: 写入 `state.token` + `localStorage.setItem('token', token)`
- `logout()`: 清空 `state.token` + `localStorage.removeItem('token')`

---

## Section 2：路由守卫

**文件**：`src/router/guards.ts`（已在 router/index.ts 注释中预留）

### AuthGuard 组件

```
props: { children: ReactNode }

逻辑：
  token = useAuthStore(state => state.token)
  无 token → <Navigate to="/login?redirect={encodeURIComponent(pathname + search)}" replace />
  有 token → 渲染 children
```

### 路由结构

```
/login   →  LoginPage                        （公开，无守卫）
/        →  AuthGuard                        （守卫层）
               └── Suspense → AppLayout      （布局层）
                     └── 子路由（index → HomePage, ...）
```

`AuthGuard` 位于 `Suspense` 外层，守卫检查在懒加载触发之前同步执行。

---

## Section 3：请求层 401 处理 + Router 实例迁移

### 3a. Router 实例迁移

将 `router` 实例从 `AppRoot.tsx` 移至 `src/router/index.ts` 创建并导出，使其可在 React 组件树之外（如 axios 拦截器）调用 `router.navigate()`。

```
src/router/index.ts   → 新增：export const router = createBrowserRouter(routes)
src/AppRoot.tsx       → 改为：import { router } from '@/router'，不再自建
```

### 3b. request.ts 401 拦截

在响应拦截器的 error 分支中新增 401 处理：

```
if (err.response?.status === 401) {
  useAuthStore.getState().logout()
  const returnUrl = encodeURIComponent(window.location.pathname + window.location.search)
  router.navigate(`/login?redirect=${returnUrl}`, { replace: true })
  // 预留：useAuthStore.getState().showAuthModal()
  return  // 不向下 reject，避免业务层重复处理
}
// 其他错误保持原有 Promise.reject(err) 行为
```

---

## Section 4：登录页重设计

**文件**：`src/views/Auth/Login.tsx`（覆盖现有文件）

### UI 结构

全屏居中布局，极简 antd 卡片，无动画：

```
全屏居中（flex h-screen items-center justify-center）
└── 卡片容器（w-[360px]）
      ├── Brand 标题（文字）
      ├── antd Form
      │     ├── Form.Item：用户名（Input）
      │     ├── Form.Item：密码（Input.Password）
      │     └── Form.Item：登录按钮（Button block，loading 态）
      └── 错误提示（antd Alert type="error"，仅在错误时渲染）
```

### 登录逻辑

```
handleSubmit:
  1. 调用登录接口（当前 mock：校验固定账号密码）
  2. 成功 → useAuthStore.getState().login(token)
  3. 读取 searchParams.get('redirect')
     - 有值 → navigate(redirect)
     - 无值 → navigate('/')
  4. 失败 → 显示错误 Alert
```

---

## 涉及文件清单

| 操作 | 文件                                                                |
| ---- | ------------------------------------------------------------------- |
| 新建 | `src/stores/auth.ts`                                                |
| 新建 | `src/router/guards.ts`                                              |
| 修改 | `src/router/index.ts`（导出 router 实例，AuthGuard 包裹受保护路由） |
| 修改 | `src/AppRoot.tsx`（import router，不再 createBrowserRouter）        |
| 修改 | `src/lib/request.ts`（401 处理）                                    |
| 覆盖 | `src/views/Auth/Login.tsx`（极简重写）                              |

---

## 不在本期范围

- RBAC 角色权限控制
- 401 弹窗提示（预留注释占位）
- Token 自动刷新（预留注释占位）
- `/403`、`/404` 异常页（P0 阶段其他任务）
