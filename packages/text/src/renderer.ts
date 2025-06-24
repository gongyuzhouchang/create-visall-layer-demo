import Text, { type TextConfig } from './Text';

// 需要从主包导入渲染器接口
// 由于packages/text需要独立发布，我们先定义本地接口，后续会通过peerDependencies引用主包
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

export class TextRenderer implements IRenderer {
  readonly name = 'text';
  readonly version = '1.0.0';

  create(container: HTMLElement, options: unknown): IRendererInstance {
    const textInstance = new Text(container, options as TextConfig);
    
    // 确保返回的实例符合IRendererInstance接口
    return {
      destroy: () => textInstance.destroy(),
      on: (event: string, handler: (...args: unknown[]) => void) => 
        textInstance.on(event as any, handler),
      getState: () => {
        // 返回当前文本组件的状态
        return {
          name: this.name,
          version: this.version
        };
      }
    };
  }
}

export default TextRenderer; 