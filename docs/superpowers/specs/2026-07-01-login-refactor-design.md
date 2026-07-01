# Login 页面重构设计文档

## 项目背景

当前 `src/pages/login.tsx` 使用浅色背景、装饰性渐变圆球、下划线输入框和圆角不统一的按钮，整体视觉偏老旧、杂乱。用户要求重构为**简洁**风格，并加入品牌 Logo。

## 设计目标

- 去除多余装饰，呈现干净、现代的深色界面
- 保留现有全部功能：用户名/密码登录、显示密码切换、错误提示、登录 loading
- 不引入新的依赖或表单库
- 使用用户提供的 Logo：`C:\Users\12202\Desktop\wj-LOGO\yugutou_logo.png`

## 方案选择

选择方案 **A. 深色卡片聚焦**。其他方案（全屏无卡片、左右分屏）因可读性或复杂度问题未采用。

## 视觉规范

### 颜色

| Token | 值 | 用途 |
|-------|-----|------|
| `bg-page` | `#0a0a0a` | 页面背景 |
| `bg-card` | `#141414` | 卡片背景 |
| `border-card` | `rgba(255,255,255,0.08)` | 卡片边框 |
| `text-primary` | `#fafafa` | 主标题、输入文字 |
| `text-secondary` | `#a1a1aa` | 占位符、副标题 |
| `bg-input` | `#1a1a1a` | 输入框背景 |
| `border-input` | `rgba(255,255,255,0.1)` | 输入框默认边框 |
| `border-input-focus` | `rgba(255,255,255,0.4)` | 输入框聚焦边框 |
| `btn-bg` | `#ffffff` | 主按钮背景 |
| `btn-text` | `#0a0a0a` | 主按钮文字 |
| `btn-bg-hover` | `rgba(255,255,255,0.9)` | 主按钮 hover |
| `error-text` | `#ef4444` | 错误文字 |
| `error-bg` | `rgba(239,68,68,0.1)` | 错误背景块 |

### 布局

```
<body> bg-page
  └── <main> flex min-h-screen items-center justify-center px-4
       └── <form/card> w-full max-w-[420px] rounded-2xl border border-card bg-card p-8
            ├── Logo 区域（居中）
            │     ├── <img> Logo, w-14
            │     ├── <h1> "鱼骨", text-2xl font-semibold text-primary mt-4
            │     └── <p> "欢迎回来", text-sm text-secondary mt-1
            │
            ├── 表单区域，space-y-5 mt-10
            │     ├── 用户名输入框
            │     └── 密码输入框（带显示/隐藏切换）
            │
            ├── 错误提示（条件渲染）
            │     └── rounded-lg px-3 py-2 text-sm error-text error-bg
            │
            └── 登录按钮
                  └── w-full rounded-lg h-11 bg-white text-black font-medium
```

### 输入框

- 高度 44px，圆角 `rounded-lg`
- 背景 `bg-input`，边框 `border-input`
- 左侧内嵌图标：`mdi-account-outline`、`mdi-lock-outline`
- 聚焦时边框变为 `border-input-focus`
- 右侧密码框放置眼睛图标按钮，切换 `mdi-eye` / `mdi-eye-off`

### 按钮

- 宽度 100%，高度 44px，圆角 `rounded-lg`
- 背景白色，文字黑色，字号 15px，font-medium
- hover 背景 `rgba(255,255,255,0.9)`
- active 时 `scale(0.98)`
- loading 时显示"登录中…"，opacity 0.7

## 交互与动画

| 元素 | 状态 | 行为 |
|------|------|------|
| 输入框 | focus | 边框颜色过渡 200ms |
| 密码眼睛按钮 | hover | 颜色从 secondary 变浅 |
| 登录按钮 | hover | 背景变淡 200ms |
| 登录按钮 | active | scale 0.98，30ms |
| 登录按钮 | loading | 文字变为"登录中…"，opacity 0.7 |
| 错误提示 | 出现/消失 | fade-in / fade-out 200ms |
| 卡片 | 页面加载 | 轻微向上淡入 |

## 响应式

- 不针对移动端做单独断点设计
- 卡片使用 `max-w-[420px]` 和 `w-full`，自然适配各种宽度
- 页面水平内边距 `px-4` 保证窄屏不贴边

## 数据流与错误处理

保持现有逻辑：

1. `handleSubmit` 阻止默认行为
2. `setLoading(true)`，清空错误
3. 调用 `login(username, password)`
4. 成功：`router.navigate({ to: '/' })`
5. 失败：`setError((err as Error).message)`
6. `finally`：`setLoading(false)`

## 文件变更范围

- 修改 `src/pages/login.tsx`
- 可能需要将 Logo 复制到项目 `public/` 目录中引用

## 约束

- 不引入 shadcn/ui 或新表单库
- 继续使用 Tailwind CSS v4 和现有 mdi 图标
- 保持 TypeScript 类型安全
