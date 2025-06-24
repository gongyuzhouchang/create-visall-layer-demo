# VISALL 新组件开发指南

## 概述

第三阶段实现了"优先使用NPM包架构"的开发理念。所有新组件都应该按照这个架构进行开发，以确保组件的模块化、可维护性和可复用性。

## 开发原则

### 1. NPM包优先
- 所有新组件都应该作为独立的NPM包开发
- 每个包都应该有清晰的职责边界
- 包之间通过依赖关系进行协作

### 2. 基于核心包构建
- 必须依赖 `@visall/core` 包
- 使用核心包提供的类型和工具函数
- 遵循统一的主题系统

### 3. 现代化开发体验
- 完整的 TypeScript 类型定义
- 支持 CommonJS 和 ESM 双格式
- 完善的构建和测试流程

## 新组件开发流程

### 第一步：创建包结构

```bash
# 在 packages 目录下创建新组件包
mkdir packages/your-component
cd packages/your-component

# 创建基本目录结构
mkdir src tests
```

### 第二步：配置 package.json

```json
{
  "name": "@visall/your-component",
  "version": "1.0.0",
  "type": "module",
  "description": "Your component description",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md"],
  "dependencies": {
    "@visall/core": "^1.0.0",
    "eventemitter3": "^5.0.1"
  },
  "devDependencies": {
    "@rollup/plugin-typescript": "^11.1.5",
    "rollup": "^4.6.1",
    "typescript": "^5.2.2"
  }
}
```

### 第三步：配置构建系统

#### tsconfig.json
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

#### rollup.config.js
```javascript
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const pkg = JSON.parse(readFileSync(resolve('./package.json'), 'utf-8'));

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true, exports: 'named' },
    { file: pkg.module, format: 'esm', sourcemap: true }
  ],
  external: ['eventemitter3', '@visall/core'],
  plugins: [typescript({ tsconfig: './tsconfig.json' })]
};
```

### 第四步：定义类型系统

```typescript
// src/types.ts
import { TToken, TCustomEvent } from '@visall/core';

export interface IYourComponentConfig {
  // 组件特定的配置
  width: number;
  height: number;
  token?: Partial<TToken>;
}

export interface IYourComponentEvents {
  'component:click': (event: TCustomEvent) => void;
  'component:change': (data: unknown) => void;
}
```

### 第五步：实现主组件

```typescript
// src/YourComponent.ts
import EventEmitter from 'eventemitter3';
import { TToken } from '@visall/core';
import { IYourComponentConfig, IYourComponentEvents } from './types';

export default class YourComponent extends EventEmitter<IYourComponentEvents> {
  private _container: HTMLElement;
  private _config: IYourComponentConfig;

  constructor(container: HTMLElement, config: IYourComponentConfig) {
    super();
    this._container = container;
    this._config = this._normalizeConfig(config);
    this._initialize();
  }

  private _normalizeConfig(config: IYourComponentConfig): IYourComponentConfig {
    return {
      token: {
        colorPrimary: '#1890ff',
        // 其他默认主题配置
        ...config.token
      },
      ...config
    };
  }

  private _initialize(): void {
    // 组件初始化逻辑
  }

  public destroy(): void {
    // 清理资源
    this.removeAllListeners();
  }
}
```

### 第六步：配置入口文件

```typescript
// src/index.ts
export { default as YourComponent } from './YourComponent';
export type { IYourComponentConfig, IYourComponentEvents } from './types';
```

### 第七步：编写测试

```typescript
// tests/YourComponent.test.ts
import { YourComponent } from '../src';

describe('YourComponent', () => {
  test('should initialize correctly', () => {
    const container = document.createElement('div');
    const component = new YourComponent(container, {
      width: 400,
      height: 300
    });
    
    expect(component).toBeDefined();
    component.destroy();
  });
});
```

## 最佳实践

### 1. 类型安全
- 为所有公共 API 提供完整的类型定义
- 使用 `@visall/core` 中的基础类型
- 避免使用 `any` 类型

### 2. 事件系统
- 继承 `EventEmitter` 实现事件功能
- 定义清晰的事件接口
- 使用一致的事件命名规范

### 3. 主题系统
- 支持 `TToken` 主题配置
- 提供合理的默认主题
- 确保主题的一致性

### 4. 性能优化
- 适当使用防抖和节流
- 及时清理事件监听器
- 优化渲染性能

### 5. 错误处理
- 提供友好的错误信息
- 验证输入参数
- 优雅地处理异常情况

## 示例：Chart 组件

我们已经创建了一个完整的 Chart 组件示例，位于 `packages/chart/`，展示了：

- ✅ 完整的类型定义系统
- ✅ 基于 `@visall/core` 的架构
- ✅ 现代化的事件系统
- ✅ 灵活的配置系统
- ✅ 动画和交互支持
- ✅ 完整的生命周期管理

## 构建和发布

### 构建单个包
```bash
cd packages/your-component
npm run build
```

### 构建所有包
```bash
npm run packages:build
```

### 测试包
```bash
cd packages/your-component
npm test
```

## 集成示例

参考 `packages/integration-example/` 了解如何在项目中使用这些组件包：

```typescript
import { Chart, ChartType } from '@visall/chart';
import { HorizontalTable } from '@visall/table';
import { Text } from '@visall/text';
import { TToken } from '@visall/core';

// 统一的主题配置
const theme: TToken = {
  colorPrimary: '#1890ff',
  colorText: '#262626'
};

// 使用组件
const chart = new Chart(container, {
  type: ChartType.BAR,
  series: [...],
  width: 400,
  height: 300,
  token: theme
});
```

## 总结

第三阶段的 NPM 包优先架构带来了以下优势：

1. **模块化**: 每个组件都是独立的包，可以单独使用和维护
2. **类型安全**: 完整的 TypeScript 支持，减少运行时错误
3. **主题一致**: 统一的主题系统，确保视觉一致性
4. **性能优化**: 按需加载，减少包体积
5. **开发体验**: 现代化的开发工具链，提高开发效率
6. **可维护性**: 清晰的依赖关系，便于长期维护

通过这个架构，我们为 VISALL 建立了一个可扩展、可维护的组件生态系统。 