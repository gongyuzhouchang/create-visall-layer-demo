import EventEmitter from 'eventemitter3';
import styles from './assets/styles.module.scss';

export type CustomEvent = {
  data: Array<{
    dataIndex: number;
    key: string;
    value: string | number;
  }>;
  selectedType: 'cell' | 'row' | 'column' | 'value';
  selectedValue: string | number;
};

export type ThemeConfig = {
  [key: string]: string;
};

export type Config = {
  /** 标签名数组 */
  label: string[];
  /** 日期 */
  time: string;
  /** 内容 */
  title: string;
  /** 链接 */
  url?: string;
  /** 重要度 */
  importance: number;
};

export type TimeLineConfig = {
  config: Config[];
  maxHeight: number;
  width: number;
  customEvent?: (data: CustomEvent) => void;
  themeConfig?: {
    [key: string]: string;
  };
};

type EventTypes = {
  /** 选择事件 */
  'change:selected': (event: { type: string; data?: CustomEvent }) => void;
};

function findStringInObject(
  obj: Config,
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
    result.value = Array.isArray(obj[str])
      ? (obj[str] as string[]).join(',')
      : (obj[str] as string);
  }

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (Array.isArray(value) && value.includes(str)) {
      result.isKey = false;
      result.key = keys[i];
      result.value = value.join(',');
    }
    if (value === str) {
      result.isKey = false;
      result.key = keys[i];
      result.value = str;
    }
  }

  return result;
}

export default class TimeLine extends EventEmitter<EventTypes> {
  /** 根元素 */
  private __$dom!: HTMLElement;

  /** 配置数据 */
  private __config: Config[];

  /** 主题配置 */
  private __themeConfig?: ThemeConfig;

  /** 时间事件元素列表 */
  private __timeLineEls: HTMLElement[] = [];

  /** 线元素列表 */
  private __lineEls: HTMLElement[] = [];

  /**  文本外点击事件处理 */
  private __resetClickHandler: (event: Event) => void;

  /** 背景元素数组 */
  private __backgroundEls: HTMLElement[] = [];

  /** 帧循环中处理点击展开收起事件 */
  private __requestAnimationFrame: number = 0;

  constructor($container: HTMLElement, timeLineConfig: TimeLineConfig) {
    super();

    this.__$dom = document.createElement('div');

    this.__$dom.classList.add(styles.main, styles['theme-container']);

    /** 外部数据定义最大高度 */
    this.__$dom.style.maxHeight = `${timeLineConfig.maxHeight}px`;

    /** 外部数据定义宽度 */
    this.__$dom.style.width = `${timeLineConfig.width}px`;

    this.__config = timeLineConfig.config || [];

    this.__themeConfig = timeLineConfig.themeConfig;

    this.__resetClickHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles['theme-container']}`)) {
        this.__resetBackgroundColor();
      }
    };

    $container.appendChild(this.__$dom);

    this.__initTheme();

    this.__buildDom();

    this.__bindEvents();

    this.__resetClickEvent();
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

  /** 文本外点击时，初始化表格的状态 */
  private __resetClickEvent() {
    document.addEventListener('click', this.__resetClickHandler);
  }

  /** 移除文本外的点击事件 */
  private __removeResetClickEvent() {
    document.removeEventListener('click', this.__resetClickHandler);
  }

  private __buildDom() {
    const self = this;
    const data = self.__config;

    const $mainDom = document.createElement('div');
    $mainDom.classList.add('timeLine-container', styles.main);

    this.__$dom.appendChild($mainDom);

    data.forEach((timeLineOps, index) => {
      // 线
      const $line = document.createElement('div');
      this.__lineEls.push($line);
      $line.classList.add(styles.line);
      $mainDom.appendChild($line);
      $mainDom.appendChild(this.__buildTimeLineItem(timeLineOps, index));
    });
  }

  /** 创建时间轴的单个事件 */
  private __buildTimeLineItem(timeLineOps: Config, index: number) {
    const self = this;

    const $mainContainer = document.createElement('div');
    this.__timeLineEls.push($mainContainer);
    $mainContainer.classList.add('timeLineItem-container', styles['timeLineItem-container']);

    // 圆点
    const $imageWrapper = document.createElement('div');
    if (!index) {
      $imageWrapper.classList.add('timeLineItem-image', styles['timeLineItem-image']);
    } else {
      $imageWrapper.classList.add('timeLineItem-image', styles['timeLineItem-image-normal']);
    }
    $mainContainer.appendChild($imageWrapper);

    const $contentContainer = document.createElement('div');
    $contentContainer.classList.add(
      'timeLineItem-content-container',
      styles['timeLineItem-content-container'],
      styles['background-color']
    );
    this.__backgroundEls.push($contentContainer);
    $mainContainer.appendChild($contentContainer);

    // 内容
    const $titleContainer = document.createElement('div');
    $titleContainer.classList.add(
      'timeLineItem-title-container',
      styles['timeLineItem-title-container']
    );
    $contentContainer.appendChild($titleContainer);

    // 链接
    const $titleDom = document.createElement('div');
    $titleDom.classList.add('timeLineItem-title', styles['timeLineItem-title']);
    if (timeLineOps.url) {
      const $linkDom = document.createElement('a');
      $linkDom.classList.add(styles.link);
      $linkDom.href = timeLineOps.url;
      $linkDom.textContent = timeLineOps.title;
      $linkDom.target = '_blank';
      $titleDom.appendChild($linkDom);
    } else {
      $titleDom.innerHTML = timeLineOps.title;
    }
    $titleContainer.appendChild($titleDom);

    const $timeLabelContainer = document.createElement('div');
    $timeLabelContainer.classList.add('timeLineItem-time-label', styles['timeLineItem-time-label']);
    $contentContainer.appendChild($timeLabelContainer);

    // 日期
    const $timeDom = document.createElement('div');
    $timeDom.classList.add('timeLineItem-time', styles['timeLineItem-time']);
    $timeDom.innerHTML = timeLineOps.time;
    const $labelContainer = document.createElement('div');
    $labelContainer.classList.add(
      'timeLineItem-labelContainer',
      styles['timeLineItem-label-container']
    );
    $timeLabelContainer.appendChild($timeDom);
    $timeLabelContainer.appendChild($labelContainer);

    // 标签
    timeLineOps.label?.forEach(labelStr => {
      if (labelStr) {
        const $labelDom = document.createElement('div');
        $labelDom.classList.add('timeLineItem-label', styles['timeLineItem-label']);
        $labelDom.innerHTML = labelStr;
        $labelContainer.appendChild($labelDom);
      }
    });

    // 重要度icon
    if (timeLineOps.importance) {
      const $importanceDom = document.createElement('div');
      $importanceDom.classList.add(styles.importance);
      $timeLabelContainer.appendChild($importanceDom);
    }

    // 展开收起按钮
    const $clickButton = document.createElement('div');
    $clickButton.classList.add('timeLineItem-clickButton', styles['timeLineItem-clickButton']);

    $titleContainer.appendChild($clickButton);

    const $circle = document.createElement('div');
    $circle.classList.add('timeLine-circle', styles['timeLine-circle']);
    const $triangle = document.createElement('div');
    $triangle.classList.add('timeLine-triangle', styles['timeLine-triangle']);
    const $textDom = document.createElement('div');
    $textDom.innerHTML = '展开全部';
    $circle.appendChild($triangle);
    $clickButton.appendChild($circle);
    $clickButton.appendChild($textDom);

    // 展开收起按钮的事件绑定
    self.__requestAnimationFrame = requestAnimationFrame(() => {
      this.__updateLine();
      if ($titleDom.scrollHeight <= $titleDom.clientHeight) {
        $clickButton.style.display = 'none';
        $titleDom.style.height = 'auto';
      } else {
        $clickButton.addEventListener('click', () => {
          if ($clickButton.classList.contains(styles['timeLineItem-clickButton'])) {
            $clickButton.classList.remove(styles['timeLineItem-clickButton']);
            $clickButton.classList.add(styles['timeLineItem-clickButton-expanded']);
            $titleDom.style.height = 'auto';
            $titleDom.style.display = 'block';
            $textDom.innerHTML = '收起';
            $triangle.style.transform = 'translate(-50%, -50%) scaleY(-1)';
          } else {
            $clickButton.classList.remove(styles['timeLineItem-clickButton-expanded']);
            $clickButton.classList.add(styles['timeLineItem-clickButton']);
            $titleDom.style.height = '66px';
            $titleDom.style.display = '-webkit-box';
            $textDom.innerHTML = '展开全部';
            $triangle.style.transform = 'translate(-50%, -50%)';
          }
          this.__updateLine();
        });
      }
    });

    return $mainContainer;
  }

  /** 恢复默认状态 */
  private __resetBackgroundColor() {
    this.__backgroundEls.forEach(bgEl => {
      bgEl.classList.remove(styles['background-color-active']);
      bgEl.classList.add(styles['background-color']);
    });
  }

  /** 处理背景颜色 */
  private __bindEvents() {
    this.__backgroundEls.forEach((el, index) => {
      el.addEventListener('click', e => {
        // 点击改变选中颜色
        this.__resetBackgroundColor();
        el.classList.remove(styles['background-color']);
        el.classList.add(styles['background-color-active']);

        // 外部回调函数
        const text = (e.target as HTMLElement).textContent!;
        const result = findStringInObject(this.__config[index], text);
        const defaultValue = `${this.__config[index].time}：${this.__config[index].title}${
          this.__config[index]?.label?.join(',')
            ? `\ntags：${this.__config[index]?.label?.join(',')}`
            : ''
        }`;

        if ((e.target as HTMLElement).closest('.timeLineItem-clickButton')) {
          this.emit('change:selected', {
            type: 'view_update'
          });
        } else {
          this.emit('change:selected', {
            type: 'data_transfer',
            data: {
              data: [
                {
                  dataIndex: index,
                  key: result.key || 'title',
                  value: defaultValue
                }
              ],
              selectedType: 'value',
              selectedValue: defaultValue
            }
          });
        }
      });
    });
  }

  /** 更新连接线 */
  private __updateLine() {
    this.__timeLineEls.forEach((timeEl, index) => {
      if (index === this.__timeLineEls.length - 1) {
        return;
      }
      const timeElBounding = timeEl.getBoundingClientRect();
      const mainDomBounding = this.__$dom.getBoundingClientRect();
      const $line = this.__lineEls[index];
      $line.style.setProperty('--theme-height', `${timeElBounding.height - 14}px`);
      $line.style.top = `${timeElBounding.top - mainDomBounding.top + 24}px`;
    });
  }

  update(configs: Config[]) {
    this.__removeResetClickEvent();
    this.__$dom.innerHTML = '';
    cancelAnimationFrame(this.__requestAnimationFrame);
    this.__config = configs;
    this.__buildDom();
    this.__bindEvents();
    this.__resetClickEvent();
  }

  destroy() {
    this.__removeResetClickEvent();
    this.__$dom.innerHTML = '';
    cancelAnimationFrame(this.__requestAnimationFrame);
    this.__$dom.remove();
  }
}
