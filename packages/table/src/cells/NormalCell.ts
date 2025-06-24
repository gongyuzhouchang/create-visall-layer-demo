import Cell, { type Option as CellOption, type EventTypes as CellEventTypes } from '../Cell';
import styles from '../assets/styles.module.scss';

/**
 * 获取给定 DOM 元素最后一行的度量信息
 *
 * 该函数通过创建一个范围（Range）对象并将其设置为仅包含最后一个文本节点的最后一个字符，
 * 然后使用这个范围来获取最后一行的矩形度量信息，从而可以确定最后一行文本在页面上的位置和尺寸
 *
 * @param dom - 要分析的 DOM 元素
 * @returns 返回一个 DOMRect 对象，表示最后一行的矩形度量信息；如果没有文本节点或无法计算度量信息，则返回 null
 */
function getLastLineMetrics(dom: HTMLElement) {
  const range = document.createRange();
  const textNodes = dom.childNodes;

  if (textNodes.length === 0) {
    return null;
  }

  // 获取最后一个文本节点
  const lastNode = textNodes[textNodes.length - 1];
  const textLength = lastNode?.textContent?.length;

  if (!textLength) {
    return null;
  }

  // 设置 range 选择最后一个字符到最后一个字符的范围
  range.setStart(lastNode, textLength - 1);
  range.setEnd(lastNode, textLength);

  // 返回范围的矩形信息
  return range.getBoundingClientRect();
}

/**
 * 检查按钮是否覆盖了文本的末尾
 *
 * 此函数用于确定当一个按钮和文本在同一容器中时，按钮是否遮挡了文本的末尾
 * 它通过比较文本末尾的位置和按钮的位置来判断是否发生遮挡
 *
 * @param textContainer - 包含文本的HTML元素
 * @param buttonContainer - 包含按钮的HTML元素
 * @returns 如果按钮覆盖了文本的末尾，则返回true；否则返回false
 */
function checkIfButtonCoversText(textContainer: HTMLElement, buttonContainer: HTMLElement) {
  // 按钮的相对位置和尺寸
  const buttonRect = buttonContainer.getBoundingClientRect();

  // 获取最后一行文本的尺寸信息
  const lastLineRect = getLastLineMetrics(textContainer);

  if (lastLineRect) {
    // 判断文本的底部是否超过按钮顶部
    const isCoveredVertically = lastLineRect.bottom > buttonRect.top;

    // 判断最后一行文本的右边是否超过按钮的左边
    const isCoveredHorizontally = lastLineRect.right > buttonRect.left;

    return isCoveredVertically && isCoveredHorizontally;
  }
  return false;
}

export type NormalCellOption = CellOption;

export type NormalCellEventTypes = CellEventTypes & {
  /** 展开收起按钮 */
  'expandIcon:click': (event: { isExpand: boolean }) => void;
};

export default class NormalCell extends Cell<NormalCellEventTypes, NormalCellOption> {
  _option: NormalCellOption;

  /** 是否展开 */
  private __isExpand: boolean = false;

  /** 定时器 */
  readonly __timerId!: ReturnType<typeof setTimeout>;

  constructor($wrapper: HTMLElement, option: NormalCellOption) {
    super($wrapper, option);
    this._option = option;

    this._appendTextDom();
    this.__setCssStyle();
    this._refresh();
    this._bindEvents();

    this.__timerId = setTimeout(() => {
      this.__enableExpand(this._$textDom);
    }, 0);
  }

  /**
   * 启用展开功能，当文本容器中的内容高度超过显示区域高度时添加展开/折叠功能
   * @param textContainer - 包含文本的元素
   */
  private __enableExpand(textContainer: HTMLElement) {
    if (this._getTextScrollHeight() <= this._getTextClientHeight()) {
      return;
    }

    const $cell = this._$dom;
    // 从样式中获取各类所需CSS类名
    const expandIconContainerClass = styles['expand-icon-container'];
    const expandIconContainerCloseClass = styles['expand-icon-container-close'];
    const flexEndClass = styles['flex-end'];
    const expandIconClass = styles['expand-icon'];
    const expandIconCloseClass = styles['expand-icon-close'];

    // 创建展开图标容器
    const $expandIconContainer = document.createElement('div');
    $expandIconContainer.classList.add(expandIconContainerClass);
    $expandIconContainer.textContent = '查看全部';

    // 创建展开图标
    const $expandIcon = document.createElement('div');
    $expandIcon.classList.add(expandIconClass);
    $expandIconContainer.appendChild($expandIcon);

    $expandIconContainer.addEventListener('click', event => {
      event.stopPropagation();
      // 反转展开状态
      this.__isExpand = !this.__isExpand;
      // 触发自定义事件：展开图标点击
      this.emit('expandIcon:click', { isExpand: this.__isExpand });

      // 根据展开状态更新UI
      if (this.__isExpand) {
        // 检查按钮是否遮挡了文本
        const isButtonCoversText = checkIfButtonCoversText(textContainer, $expandIconContainer);
        if (isButtonCoversText) {
          $expandIconContainer.classList.replace(
            expandIconContainerClass,
            expandIconContainerCloseClass
          );
        }
        $cell.classList.add(flexEndClass);
        $expandIcon.classList.add(expandIconCloseClass);
        $expandIconContainer.textContent = '折叠内容';
      } else {
        $expandIconContainer.classList.replace(
          expandIconContainerCloseClass,
          expandIconContainerClass
        );
        $cell.classList.remove(flexEndClass);
        $expandIcon.classList.remove(expandIconCloseClass);
        $expandIconContainer.textContent = '查看全部';
      }
      $expandIconContainer.appendChild($expandIcon);
    });

    $cell.appendChild($expandIconContainer);
  }

  private __setCssStyle() {
    const $cell = this._$dom;
    $cell.classList.add('normal-cell', styles['normal-cell']);
  }

  _bindEvents() {
    const $cell = this._$dom;
    // 进入当前单元格
    const mouseEnterHandler = (): void => {
      this.emit('change:enter', { data: this._option, isHovered: true });
      this.__updateEnterState();
    };
    // 离开当前单元格
    const mouseLeaveHandler = (): void => {
      this.emit('change:leave', { data: this._option, isHovered: false });
      this.__updateLeaveState();
    };
    // 选中当前单元格
    const mouseClickHandler = (): void => {
      this.emit('change:select', { data: this._option, isSelected: !this._selected });
      this.__updateSelectState();
    };
    $cell.addEventListener('mouseenter', mouseEnterHandler);
    $cell.addEventListener('mouseleave', mouseLeaveHandler);
    $cell.addEventListener('click', mouseClickHandler);
  }

  _refresh() {
    this.__refreshHoverState();
    this.__refreshNormalState();
    this.__refreshNormalSelectState();
  }

  /**
   * 重置单元格的悬浮状态
   */
  private __refreshHoverState() {
    if (this._hover && !this._selected) {
      this._$dom.classList.add(styles['normal-cell-hover']);
    } else {
      this._$dom.classList.remove(styles['normal-cell-hover']);
    }
  }

  /**
   * 重置单元格的常规状态
   */
  private __refreshNormalState() {
    if (!this._hover && !this._selected) {
      const classesToRemove = [styles['normal-cell-hover'], styles['select-border']];
      classesToRemove.forEach(cls => this._$dom.classList.remove(cls));
    }
  }

  /**
   * 重置单元格的选中状态
   */
  private __refreshNormalSelectState() {
    if (!this._selected) {
      return;
    }
    this._$dom.classList.remove(styles['header-cell-hover']);
    this._$dom.classList.remove(styles['normal-cell-hover']);
  }

  /**
   * 更新单元格的选中状态
   */
  private __updateSelectState() {
    const $cell = this._$dom;
    $cell.classList.add(styles['select-border']);
  }

  /**
   * 更新单元格的离开状态
   */
  private __updateLeaveState() {
    const $cell = this._$dom;
    this._hover = false;
    if (!this._selected) {
      $cell.classList.remove(styles['header-cell-hover']);
    }
  }

  /**
   * 更新单元格的进入状态
   */
  private __updateEnterState() {
    const $cell = this._$dom;
    if (this._selected) {
      return;
    }
    $cell.classList.remove(styles['normal-cell-hover']);
    $cell.classList.add(styles['header-cell-hover']);
  }
}
