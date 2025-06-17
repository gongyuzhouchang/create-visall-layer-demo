# create-visall-layer-demo

一键创建 VISALL Layer 演示项目的脚手架工具。

## 使用方法

### 通过 npm create (推荐)

```bash
npm create visall-layer-demo my-project
cd my-project
npm install
npm run dev
```

### 通过 npx

```bash
npx create-visall-layer-demo my-project
cd my-project
npm install
npm run dev
```

## 创建的项目包含

- ✅ 完整的 VISALL Layer 演示项目
- ✅ TypeScript 支持
- ✅ Vite 构建工具
- ✅ ESLint + Prettier 代码规范
- ✅ 测试环境配置
- ✅ Cursor AI 配置和组件开发规范
- ✅ 开箱即用的开发环境

## 生成的项目结构

```
my-project/
├── package.json          # 项目配置
├── index.html           # HTML 入口
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
├── .eslintrc.cjs        # ESLint 配置
├── .prettierrc.yml      # Prettier 配置
├── .cursor/             # Cursor AI 配置
│   └── rules/           # 组件开发规范和最佳实践
├── src/                 # 源码目录
│   ├── main.ts          # 主入口文件
│   ├── types.d.ts       # 类型定义
│   ├── components/      # 组件配置目录
│   └── layers/          # 组件实现目录
└── tests/               # 测试目录
```

## 开发命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产版本
- `npm run test` - 运行测试
- `npm run lint` - 代码检查
- `npm run format` - 代码格式化 