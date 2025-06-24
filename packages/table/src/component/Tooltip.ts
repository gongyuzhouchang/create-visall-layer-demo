import styles from '../assets/styles.module.scss';

export type TooltipType = {
  showTooltip: (text: string, x: number, y: number) => void;
  hideTooltip: () => void;
  destroy: () => void;
};

/** tooltip单例 */
export default class Tooltip {
  static instance: Tooltip | null = null;

  private __$dom: HTMLElement;

  private __$body: HTMLElement = document.body;

  constructor() {
    this.__$dom = document.createElement('div');
    this.__$dom.classList.add(styles.tooltip, styles['theme-container']);
    this.__$body.appendChild(this.__$dom);
  }

  /** 获取当前单例 */
  static getInstance() {
    if (!Tooltip.instance) {
      Tooltip.instance = new Tooltip();
    }
    return Tooltip.instance;
  }

  /** 初始化主题 */
  static initTheme(theme: { [key: string]: string }) {
    if (!Tooltip.instance) {
      Tooltip.getInstance();
    }
    Tooltip.getInstance()._initTheme(theme);
  }

  /** 显示tooltip */
  static showTooltip(text: string, x: number, y: number) {
    if (!Tooltip.instance) {
      Tooltip.getInstance();
    }
    Tooltip.getInstance()._showTooltip(text, x, y);
  }

  /** 隐藏tooltip */
  static hideTooltip() {
    if (!Tooltip.instance) {
      return;
    }
    Tooltip.getInstance()._hideTooltip();
  }

  static destroy() {
    if (!Tooltip.instance) {
      return;
    }
    Tooltip.getInstance()._destroy();
  }

  _initTheme(theme: { [key: string]: string }) {
    if (!theme) {
      return;
    }

    Object.keys(theme).forEach(key => {
      this.__$dom.style.setProperty(key, theme[key]);
    });
  }

  _showTooltip(text: string, x: number, y: number) {
    const $dom = this.__$dom;
    $dom.textContent = text;
    $dom.style.left = `${x}px`;
    $dom.style.top = `${y}px`;
    $dom.style.display = 'block';
  }

  _hideTooltip() {
    const $dom = this.__$dom;
    $dom.style.display = 'none';
  }

  _destroy() {
    Tooltip.instance = null;
    this.__$body.removeChild(this.__$dom);
    this.__$dom.remove();
  }
}
