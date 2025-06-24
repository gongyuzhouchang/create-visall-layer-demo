import EventEmitter from 'eventemitter3';
import styles from './assets/styles.module.scss';
import * as tableVariable from './util/const';

export type Option = {
  /** 数据源下标 */
  dataIndex: number;
  /** 对应源数据的键 */
  key: string;
  /** 对应源数据的值 */
  value: string | number;
  /** 对应表格中的行位置 */
  rowIndexes: number[];
  /** 对应表格中的列位置 */
  columnIndexes: number[];
  /** 是否是数字单元格 */
  isNumber?: boolean;
  /** 样式 */
  style: {
    /** 单元格宽度 */
    width: number | string;
    /** 单元格文本内容 */
    text: string | number;
    /** 列的最大宽度 */
    maxWidth?: number;
    /** 文本颜色 */
    color?: string;
  };
};

export type SortType = (typeof tableVariable.sortMap)[number];

export type EventTypes = {
  /** 选择事件 */
  'change:select': (event: { data: Option; isSelected: boolean }) => void;
  /** 进入单元格事件 */
  'change:enter': (event: { data: Option; isHovered: boolean }) => void;
  /** 离开单元格事件 */
  'change:leave': (event: { data: Option; isHovered: boolean }) => void;
};

export default abstract class Cell<T, U> extends EventEmitter<EventTypes & T> {
  /** 配置数据 */
  protected _option: Option & U;

  /** 单元格根元素 */
  protected _$dom!: HTMLElement;

  /** 文本容器 */
  protected _$textDom!: HTMLElement;

  /** 功能按钮根元素 */
  protected _$iconContainer: HTMLElement | null = null;

  /** 是否选中 */
  protected _selected: boolean = false;

  /** 是否悬浮 */
  protected _hover: boolean = false;

  constructor($wrapper: HTMLElement, option: Option & U) {
    super();

    this._option = option;

    this.__createRootDom();
    this._init();
    $wrapper.appendChild(this._$dom);
  }

  /**
   * 初始化单元格的结构与样式
   */
  protected _init() {
    this.__setDefaultCssStyle();

    // 单元格内容
    this.__setTextContent();
  }

  private __createRootDom() {
    this._$dom = document.createElement('div');
  }

  private __setTextContent() {
    const { style } = this._option;
    const $textDom = document.createElement('div');
    $textDom.classList.add('cell-text', styles['cell-text']);
    $textDom.innerHTML = String(style.text);
    if (style.color) {
      $textDom.style.color = style.color;
    }
    this._$textDom = $textDom;
  }

  protected _appendTextDom() {
    const $cell = this._$dom;
    $cell.appendChild(this._$textDom);
  }

  private __setDefaultCssStyle() {
    const { style, isNumber } = this._option;
    const $cell = this._$dom;
    $cell.classList.add(styles['cursor-pointer'], styles['main-cell']);
    $cell.style.width = `${style.width}px`;
    $cell.style.maxWidth = `${style.maxWidth}px`;
    $cell.style.minHeight = `${tableVariable.minBodyCellHeight}px`;
    if (isNumber) {
      // 数值单元格的样式
      $cell.classList.add(styles['number-cell']);
    }
  }

  /**
   * 获取原始数据
   */
  getOriginalData() {
    return this._option;
  }

  /**
   * 获取根元素的包围盒
   */
  getRootBoundingClientRect() {
    return this._$dom.getBoundingClientRect();
  }

  /**
   * 获取文本元素的滚动高度
   */
  protected _getTextScrollHeight() {
    return (this._$dom.firstChild! as HTMLElement).scrollHeight;
  }

  /**
   * 获取文本元素的视口高度
   */
  protected _getTextClientHeight() {
    return (this._$dom.firstChild! as HTMLElement).clientHeight;
  }

  /**
   * 主动触发hover的函数，更新hover状态
   */
  hover(isHover?: boolean) {
    if (typeof isHover !== 'undefined') {
      this._hover = isHover;
      this._refresh();
    }

    return this._hover;
  }

  /**
   * 主动触发select的函数，更新select状态
   */
  selected(isSelected?: boolean) {
    if (typeof isSelected !== 'undefined') {
      this._selected = isSelected;
      this._refresh();
    }

    return this._selected;
  }

  /**
   * 事件绑定
   */
  abstract _bindEvents(): void;

  /**
   * 刷新 Dom
   */
  abstract _refresh(): void;

  destroy() {
    this.removeAllListeners();
    this._$dom.remove();
  }
}
