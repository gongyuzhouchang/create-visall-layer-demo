import EventEmitter from 'eventemitter3';
import styles from './styles.module.scss';

type CustomEvent = {
  data: {
    dataIndex: number;
    key: string;
    value: string | number;
  }[];
  selectedValue: string | number;
  selectedType: string;
};

export type ThemeConfig = {
  [key: string]: string;
};

type Config = {
  /** 标题 */
  title: string;
  /** 文本内容 */
  text: string;
};

export type TextConfig = {
  config: Config[];
  maxHeight: number;
  width: number;
  themeConfig?: ThemeConfig;
  customEvent?: (data: CustomEvent) => void;
};

type EventTypes = {
  /** 选择事件 */
  'change:selected': (event: { type: string; data: CustomEvent }) => void;
};

function findStringInObject(
  obj: {
    [key: string]: string;
  },
  str: string
) {
  const result: {
    isKey: boolean;
    key: string | null;
    value: string | null;
  } = {
    isKey: false,
    key: null,
    value: null
  };
  if (!obj) {
    return result;
  }

  const keys = Object.keys(obj);
  const values = Object.values(obj);

  if (keys.includes(str)) {
    result.isKey = true;
    result.key = str;
    result.value = obj[str];
  }

  if (values.includes(str)) {
    result.isKey = false;
    result.key = keys[values.indexOf(str)];
    result.value = str;
  }

  return result;
}

export default class Text extends EventEmitter<EventTypes> {
  /** 根元素 */
  private __$dom!: HTMLElement;

  /** 配置数据 */
  private __config: Config[];

  /** 背景元素组 */
  private __backgroundEls: HTMLElement[] = [];

  /** 主题配置 */
  private __themeConfig?: ThemeConfig;

  /**  文本外点击事件处理 */
  private __resetClickHandler: (event: Event) => void;

  constructor($container: HTMLElement, textConfig: TextConfig) {
    super();
    this.__$dom = document.createElement('div');
    this.__$dom.classList.add(styles.main);
    /** 外部数据定义最大高度 */
    this.__$dom.style.maxHeight = `${textConfig.maxHeight}px`;
    /** 外部数据定义宽度 */
    this.__$dom.style.width = `${textConfig.width}px`;
    this.__$dom.classList.add(styles['theme-container']);
    this.__config = textConfig.config || [];
    this.__themeConfig = textConfig.themeConfig;
    this.__resetClickHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles['theme-container']}`)) {
        this.__resetBackgroundColor();
      }
    };

    $container.appendChild(this.__$dom);

    this.__initTheme();
    this.__buildDom();
    this.__bindEvent();
    this.__resetClickEvent();
  }

  /** 表格外点击时，初始化表格的状态 */
  private __resetClickEvent() {
    document.addEventListener('click', this.__resetClickHandler);
  }

  /** 移除表格外的点击事件 */
  private __removeResetClickEvent() {
    document.removeEventListener('click', this.__resetClickHandler);
  }

  /** 初始化主题 */
  private __initTheme() {
    const themeConfig = this.__themeConfig;
    if (!themeConfig) {
      return;
    }

    Object.keys(themeConfig).forEach(key => {
      this.__$dom.style.setProperty(key, themeConfig[key]);
    });
  }

  private __buildDom() {
    const $mainContainer = document.createElement('div');
    $mainContainer.classList.add('text-container', styles['text-container']);

    this.__$dom.appendChild($mainContainer);
    this.__config.forEach(textOps => {
      this.__buildTextItemDom(textOps);
    });
  }

  /** 创建单个文本 */
  private __buildTextItemDom(textOps: Config) {
    const self = this;

    const $contentContainer = document.createElement('div');
    $contentContainer.classList.add('content-container', styles['content-container']);

    const $backgroundContainer = document.createElement('div');
    $backgroundContainer.classList.add('background-color', styles['background-color']);
    $contentContainer.appendChild($backgroundContainer);
    this.__backgroundEls.push($backgroundContainer);

    // 标题
    const $titleDom = document.createElement('div');
    $titleDom.classList.add('content-title', styles['content-title']);
    $titleDom.innerHTML = textOps.title;
    $backgroundContainer.appendChild($titleDom);

    // 内容
    const $textDom = document.createElement('div');
    $textDom.classList.add('content-text', styles['content-text']);
    $textDom.innerHTML = textOps.text;
    $backgroundContainer.appendChild($textDom);

    self.__$dom.firstChild?.appendChild($contentContainer);
  }

  /** 恢复默认状态 */
  private __resetBackgroundColor() {
    this.__backgroundEls.forEach(bgEl => {
      bgEl.classList.remove(styles['background-color-active']);
      bgEl.classList.add(styles['background-color']);
    });
  }

  /** 点击事件 */
  private __bindEvent() {
    this.__backgroundEls.forEach((el, index) => {
      el.addEventListener('click', e => {
        // 点击改变选中颜色
        this.__resetBackgroundColor();
        el.classList.remove(styles['background-color']);
        el.classList.add(styles['background-color-active']);

        // 外部回调函数
        const text = (e.target as HTMLElement).textContent!;
        const result = findStringInObject(this.__config[index], text);
        const defaultValue = this.__config[index].title + this.__config[index].text;

        this.emit('change:selected', {
          type: 'data_transfer',
          data: {
            data: [
              {
                dataIndex: index,
                key: result.key || 'text',
                value: defaultValue
              }
            ],
            selectedType: 'value',
            selectedValue: defaultValue
          }
        });
      });
    });
  }

  /** 
   * 销毁组件实例
   * 清理DOM、事件监听器、定时器等资源
   */
  destroy(): void {
    // 移除事件监听器
    this.__removeResetClickEvent();
    
    // 清理自定义事件
    this.removeAllListeners();
    
    // 清理DOM
    if (this.__$dom && this.__$dom.parentNode) {
      this.__$dom.parentNode.removeChild(this.__$dom);
    }
    
    // 清理引用
    this.__backgroundEls = [];
    this.__config = [];
    this.__themeConfig = undefined;
  }
}
