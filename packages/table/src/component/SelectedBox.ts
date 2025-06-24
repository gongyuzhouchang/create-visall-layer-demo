import styles from '../assets/styles.module.scss';

export type SelectedBoxType = {
  showSelectedBox: (text: string, x: number, y: number) => void;
  hideSelectedBox: () => void;
  destroy: () => void;
};

export type SelectedBoxConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** tooltip单例 */
export default class SelectedBox {
  static instance: SelectedBox | null = null;

  private readonly __$dom: HTMLElement;

  constructor() {
    this.__$dom = document.createElement('div');
    this.__$dom.classList.add(styles['selected-box']);
  }

  /** 获取当前单例 */
  static getInstance() {
    if (!SelectedBox.instance) {
      SelectedBox.instance = new SelectedBox();
    }
    return SelectedBox.instance;
  }

  /** 显示tooltip */
  static showSelectedBox(selectedBoxConfig: SelectedBoxConfig, fatherDom: HTMLElement) {
    if (!SelectedBox.instance) {
      SelectedBox.getInstance();
    }
    SelectedBox.getInstance()._showSelectedBox(selectedBoxConfig, fatherDom);
  }

  /** 隐藏tooltip */
  static hideSelectedBox() {
    if (!SelectedBox.instance) {
      return;
    }
    SelectedBox.getInstance()._hideSelectedBox();
  }

  static destroy() {
    if (!SelectedBox.instance) {
      return;
    }
    SelectedBox.getInstance()._destroy();
  }

  _showSelectedBox(selectedBoxConfig: SelectedBoxConfig, fatherDom: HTMLElement) {
    const $dom = this.__$dom;
    fatherDom.appendChild($dom);
    const fatherDomRect = fatherDom.getBoundingClientRect();
    $dom.style.left = `${selectedBoxConfig.x - fatherDomRect.x + fatherDom.scrollLeft}px`;
    $dom.style.top = `${selectedBoxConfig.y - fatherDomRect.y + fatherDom.scrollTop}px`;
    $dom.style.width = `${selectedBoxConfig.width}px`;
    $dom.style.height = `${selectedBoxConfig.height}px`;
    $dom.style.display = 'block';
  }

  _hideSelectedBox() {
    const $dom = this.__$dom;
    $dom.style.display = 'none';
  }

  _destroy() {
    SelectedBox.instance = null;
    this.__$dom.remove();
  }
}
