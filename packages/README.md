# VISALL 组件包架构 - 第二阶段

## 概述

第二阶段实现了将高频组件（Table和Text）提取到独立的NPM包中，建立了monorepo架构，实现了组件的模块化和独立发布。

## 包结构

```
packages/
├── core/           # 核心包 - 公共类型、工具和基础组件
├── table/          # Table组件包 - 高性能数据表格组件
└── text/           # Text组件包 - 灵活的文本显示组件
```

## 核心包 (@visall/core)

### 功能
- 提供公共类型定义（TToken, TCustomEvent, IHook等）
- 提供工具函数（getScrollbarWidth, calculateTextWidth等）
- 提供基础组件（Pagination等）

### 导出内容
```typescript
// 类型定义
export type TFormatDataFunction = (key: string, value: number | string, showUnit?: boolean) => string;
export type TDataMetaInfo = { [key: string]: { name: string; type: 'number' | 'string' | 'date'; unit?: string; format?: string; } };
export type TToken = { colorPrimary?: string; colorBorder?: string; /* ... */ };
export type TCustomEvent = { data: Array<{ dataIndex: number; key: string; value: string | number; }>; /* ... */ };
export interface IHook = { parseDataMetaInfo: (data: unknown) => TDataMetaInfo; formatDataNumberValue: TFormatDataFunction; };

// 工具函数
export function getScrollbarWidth(): number;
export function calculateTextWidth(text: string, fontSize?: number): number;
export function tableDataTransformation<T>(data: T[], pageSize: number, currentPage: number): T[];

// 组件
export class Pagination extends EventEmitter;
```

## Table组件包 (@visall/table)

### 功能
- 高性能数据表格组件
- 支持多种表格类型（水平、垂直、多表格、树表格）
- 支持分页、排序、选择等功能
- 完整的主题定制支持

### 导出内容
```typescript
export { default as HorizontalTable } from './tables/HorizontalTable';
export { default as VerticalTable } from './tables/VerticalTable';
export { default as MultiTableX } from './tables/MultiTableX';
export { default as MultiTableY } from './tables/MultiTableY';
export { default as TreeTable } from './tables/TreeTable';
export { default as Table } from './Table';

// 类型定义
export type { TableConfig, Option as TableOption, NormalTableData, Cell, CellOption, CellEventTypes };
export type { TreeTableData };
```

### 依赖
- `@visall/core`: 核心类型和工具
- `eventemitter3`: 事件处理

## Text组件包 (@visall/text)

### 功能
- 灵活的文本显示组件
- 支持富文本内容
- 支持主题定制
- 支持交互事件

### 导出内容
```typescript
export { default as Text } from './Text';
export type { ThemeConfig } from './Text';
```

### 依赖
- `@visall/core`: 核心类型和工具
- `eventemitter3`: 事件处理

## 构建配置

每个包都配置了独立的构建系统：

### TypeScript配置
- 继承根目录的tsconfig.json
- 独立的输出目录和声明文件生成
- 支持路径映射和模块解析

### Rollup构建
- 支持CommonJS和ESM双格式输出
- 自动生成类型声明文件
- 支持SCSS模块化样式
- 外部依赖优化

### 包管理
- 使用npm workspaces进行monorepo管理
- 支持并行构建和测试
- 统一的依赖管理

## 使用方式

### 安装
```bash
npm install @visall/core @visall/table @visall/text
```

### 使用示例
```typescript
import { HorizontalTable, TableConfig } from '@visall/table';
import { Text } from '@visall/text';
import { TToken } from '@visall/core';

// 创建表格
const tableConfig: TableConfig = {
  option: {
    data: [...],
    rows: [...],
    columns: [...],
    dataMetaInfo: {...}
  },
  formatData: (key, value) => String(value),
  token: { colorPrimary: '#1890ff' }
};

const table = new HorizontalTable(container, tableConfig);

// 创建文本组件
const text = new Text(container, {
  config: [{ title: '标题', text: '内容' }],
  maxHeight: 300,
  width: 400
});
```

## 优势

1. **模块化**: 组件独立打包，按需加载
2. **类型安全**: 完整的TypeScript类型定义
3. **主题一致**: 统一的主题系统
4. **性能优化**: 独立构建，减少包体积
5. **版本管理**: 独立版本控制，灵活发布
6. **开发体验**: 完整的开发工具链支持

## 下一步计划

第三阶段将：
1. 为新组件优先使用NPM包架构
2. 逐步迁移其他组件到独立包
3. 建立完整的组件文档和示例
4. 优化构建和发布流程 