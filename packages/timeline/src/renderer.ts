import TimeLine, { type TimeLineConfig } from './TimeLine';

// 需要从主包导入渲染器接口
// 由于packages/timeline需要独立发布，我们先定义本地接口，后续会通过peerDependencies引用主包
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

export class TimeLineRenderer implements IRenderer {
  readonly name = 'timeline';
  readonly version = '1.0.0';

  create(container: HTMLElement, options: unknown): IRendererInstance {
    const timelineInstance = new TimeLine(container, options as TimeLineConfig);
    
    // 确保返回的实例符合IRendererInstance接口
    return {
      destroy: () => timelineInstance.destroy(),
      on: (event: string, handler: (...args: unknown[]) => void) => 
        timelineInstance.on(event as any, handler),
      getState: () => {
        // 返回当前timeline组件的状态
        return {
          name: this.name,
          version: this.version
        };
      }
    };
  }
}

export default TimeLineRenderer; 