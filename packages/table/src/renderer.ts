import HorizontalTable from './tables/HorizontalTable';
import VerticalTable from './tables/VerticalTable';
import MultiTableX from './tables/MultiTableX';
import MultiTableY from './tables/MultiTableY';
import TreeTable from './tables/TreeTable';
import { type TableConfig } from './Table';

// 需要从主包导入渲染器接口
// 由于packages/table需要独立发布，我们先定义本地接口，后续会通过peerDependencies引用主包
interface IRendererInstance {
  destroy(): void;
  on?(event: string, handler: (...args: unknown[]) => void): void;
  getState?(): unknown;
}

interface IRenderer {
  readonly name: string;
  readonly version: string;
  create(container: HTMLElement, options: unknown): IRendererInstance;
}

export interface TableRendererConfig extends TableConfig {
  /** 表格类型：horizontal(水平), vertical(垂直), multiX(多表X), multiY(多表Y), tree(树形) */
  tableType?: 'horizontal' | 'vertical' | 'multiX' | 'multiY' | 'tree';
}

export class TableRenderer implements IRenderer {
  readonly name = 'table';
  readonly version = '1.0.0';

  create(container: HTMLElement, options: unknown): IRendererInstance {
    const config = options as TableRendererConfig;
    const { tableType = 'horizontal', ...tableConfig } = config;
    
    let tableInstance;
    
    // 根据tableType创建对应的表格实例
    switch (tableType) {
      case 'vertical':
        tableInstance = new VerticalTable(container, tableConfig);
        break;
      case 'multiX':
        tableInstance = new MultiTableX(container, tableConfig);
        break;
      case 'multiY':
        tableInstance = new MultiTableY(container, tableConfig);
        break;
      case 'tree':
        tableInstance = new TreeTable(container, tableConfig);
        break;
      case 'horizontal':
      default:
        tableInstance = new HorizontalTable(container, tableConfig);
        break;
    }
    
    // 确保返回的实例符合IRendererInstance接口
    return {
      destroy: () => tableInstance.destroy(),
      on: (event: string, handler: (...args: unknown[]) => void) => 
        tableInstance.on(event as any, handler),
      getState: () => {
        // 返回当前表格组件的状态
        return {
          name: this.name,
          version: this.version,
          tableType
        };
      }
    };
  }
}

export default TableRenderer; 