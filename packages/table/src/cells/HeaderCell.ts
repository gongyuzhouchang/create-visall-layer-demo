/* eslint-disable import/no-cycle */
import Cell, { type Option as CellOption } from '../Cell';
import styles from '../assets/styles.module.scss';
import * as tableVariable from '../util/const';
import { TreeTableData } from '../tables/TreeTable';

/** 为了留出树状icon的空间 */
const INDENT_SIZE = 3;

/**
 * 辅助函数：创建带有类名的 div 元素
 * @param className - 需要添加的类名
 * @returns 带有类名的 div 元素
 */
function createDivWithClassName(className: string): HTMLDivElement {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
}

/**
 * 创建树形图标
 */
function createTreeIcon(): HTMLElement {
  const icon = document.createElement('div');
  icon.classList.add(styles['tree-icon']);
  return icon;
}

/**
 * 计算缩进空格
 * @param level - 层级
 * @returns 缩进字符串
 */
function calculateIndent(level: number): string {
  return '&nbsp;'.repeat(level * INDENT_SIZE);
}

/**
 * 创建树形图标容器
 */
function createTreeIconContainer(): HTMLElement {
  const container = document.createElement('div');
  container.classList.add(styles['tree-icon-container']);
  return container;
}

/**
 * 创建树形结构容器
 */
function createTreeContainer(): HTMLElement {
  const container = document.createElement('div');
  container.classList.add(styles['tree-container']);
  return container;
}

export type HeaderCellOption = CellOption & {
  /** 是否表头单元格 */
  isHeader: boolean;
  /** 是否行表头 */
  isRowHeader?: boolean;
  /** 是否列表头 */
  isColumnHeader?: boolean;
  /** 是否开启排序功能 */
  enableSorting?: boolean;
  /** 是否是树状表格 */
  isTree?: boolean;
  /** 树状单元的信息 */
  treeData?: TreeTableData[string];
  /** 是否树状表格的最后一层 */
  isLastLevel?: boolean;
};

/** original表示初始状态，ascending表示升序，descending表示降序 */
export type SortType = (typeof tableVariable.sortMap)[number];

export type HeaderCellEventTypes = {
  /** 选择事件 */
  'change:select': (event: { data: HeaderCellOption; isSelected: boolean }) => void;
  /** 进入单元格事件 */
  'change:enter': (event: { data: HeaderCellOption; isHovered: boolean }) => void;
  /** 离开单元格事件 */
  'change:leave': (event: { data: HeaderCellOption; isHovered: boolean }) => void;
  /** 点击排序按钮 */
  'icon:sort': (event: { sortKey: string }) => void;
  /** 点击树状表格展开收起按钮 */
  'treeIcon:click': (event: { data: TreeTableData[string]; isSelected: boolean }) => void;
};

export default class HeaderCell extends Cell<HeaderCellEventTypes, HeaderCellOption> {
  _option: HeaderCellOption;

  /** 功能按钮根元素 */
  private __$iconContainer: HTMLElement | null = null;

  /** icon是否被点击排序 */
  private __isIconSelected: boolean = false;

  constructor($wrapper: HTMLElement, option: HeaderCellOption) {
    super($wrapper, option);
    this._option = option;

    this.__setCssStyle();
    this.__enableSorting();
    this.__enableTree();
    this._refresh();
    this._bindEvents();
  }

  /**
   * 根据配置启用树形结构或文本DOM
   *
   * 此方法检查是否需要启用树形结构如果配置项中isTree属性为true，则调用创建树形结构的方法
   * 否则，调用追加文本DOM的方法
   */
  private __enableTree() {
    const option = this._option;
    const { isTree = false } = option;
    if (isTree) {
      this.__createTreeStructure();
    } else {
      this._appendTextDom();
    }
  }

  /**
   * 处理树形图标点击事件
   * @param icon - 树形图标元素
   */
  private __handleTreeIconClick(icon: HTMLElement) {
    const option = this._option;
    const { treeData = {} } = option;
    let isSelected = true;

    icon.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      icon.classList.toggle(styles['tree-icon-selected']);
      isSelected = !isSelected;

      this.emit('treeIcon:click', {
        data: treeData as TreeTableData[string],
        isSelected
      });
    });
  }

  /**
   * 设置树节点文本
   */
  private __setTreeNodeText(): void {
    const { style } = this._option;
    this._$textDom.innerHTML = String(style.text);
  }

  /**
   * 创建树形结构
   */
  private __createTreeStructure(): void {
    const { isLastLevel = false, treeData = {} } = this._option;
    const { level } = treeData as TreeTableData[string];

    const treeContainer = createTreeContainer();
    const $iconContainer = createTreeIconContainer();

    if (isLastLevel) {
      // 根据当前节点的层级计算并设置缩进
      $iconContainer.innerHTML = calculateIndent(level);
    } else {
      // 如果不是最后一级节点，根据当前节点的层级减一计算并设置缩进
      $iconContainer.innerHTML = calculateIndent(level - 1);
      const $treeIcon = createTreeIcon();
      $iconContainer.appendChild($treeIcon);
      this.__handleTreeIconClick($treeIcon);
    }

    this.__setTreeNodeText();

    treeContainer.appendChild($iconContainer);
    treeContainer.appendChild(this._$textDom);
    this._$dom.appendChild(treeContainer);
  }

  /**
   * 此方法根据配置选项启用或禁用排序功能
   * 当用户点击排序图标时，将触发'sort'事件，传递排序所需的键值给上层表格
   */
  private __enableSorting() {
    const option = this._option;
    const $cell = this._$dom;

    const { enableSorting = false } = option;
    if (!enableSorting) {
      return;
    }
    // 创建并添加排序图标容器
    const $iconContainer = createDivWithClassName(styles['icon-container']);
    this.__$iconContainer = $iconContainer;

    // 创建并添加实际的排序图标
    const $sortIconContainer = createDivWithClassName(styles['sort-icon-container']);
    $iconContainer.appendChild($sortIconContainer);

    const $upSort = createDivWithClassName(styles['up-sort']);
    const $downSort = createDivWithClassName(styles['down-sort']);

    $sortIconContainer.appendChild($upSort);
    $sortIconContainer.appendChild($downSort);

    $iconContainer.addEventListener('click', event => {
      event.stopPropagation();
      this.emit('icon:sort', { sortKey: this._option.key });
    });

    $cell.appendChild($iconContainer);
  }

  /**
   * 根据排序类型更新图标状态
   * 此函数用于根据当前的排序类型（升序、降序或原始状态）来更新用户界面上的排序图标
   *
   * @param sortType - 当前的排序类型，可以是 'ascending'（升序）、'descending'（降序）或 'original'（原始状态）
   */
  updateIcon(sortType: SortType) {
    if (!this._option.enableSorting) {
      return;
    }
    const $upSort = this.__$iconContainer?.querySelector(`.${styles['up-sort']}`);
    const $downSort = this.__$iconContainer?.querySelector(`.${styles['down-sort']}`);

    // 移除升序和降序图标的选中状态，以及容器的选中状态
    $upSort?.classList.remove(styles['up-sort-enable']);
    $downSort?.classList.remove(styles['down-sort-enable']);
    this.__$iconContainer?.classList.remove(styles['icon-container-selected']);
    this.__isIconSelected = false;

    // 根据排序类型添加相应的CSS类以显示选中状态
    if (sortType !== 'original') {
      this.__$iconContainer?.classList.remove(styles['hide-icon']);
      this.__isIconSelected = true;
      if (sortType === 'ascending') {
        $upSort?.classList.add(styles['up-sort-enable']);
      }
      if (sortType === 'descending') {
        $downSort?.classList.add(styles['down-sort-enable']);
      }
    }
  }

  private __setCssStyle() {
    const option = this._option;
    const $cell = this._$dom;
    const { isHeader, isRowHeader = false, isColumnHeader = false } = option;
    if (isHeader) {
      // 表头样式
      $cell.classList.add('header-cell', styles['header-cell']);
    }
    if ((isHeader && isColumnHeader) || (isHeader && !isRowHeader)) {
      // 列表头样式
      $cell.classList.add(styles['column-header']);
    }
    if (isHeader && isColumnHeader && isRowHeader) {
      // 二维表中左上角单元格样式
      $cell.classList.remove(styles['cursor-pointer']);
    }
  }

  _bindEvents() {
    const $cell = this._$dom;
    const { isHeader, isColumnHeader = false, isRowHeader = false } = this._option;
    if (isHeader && isColumnHeader && isRowHeader) {
      return;
    }
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

  private __updateSelectState() {
    const $cell = this._$dom;
    const { isRowHeader = false, isColumnHeader = false } = this._option;
    if (isRowHeader || isColumnHeader) {
      return;
    }
    $cell.classList.add(styles['select-border']);
  }

  private __updateLeaveState() {
    const $cell = this._$dom;
    this._hover = false;
    if (!this._selected) {
      $cell.classList.remove(styles['header-cell-hover']);
    }
  }

  private __updateEnterState() {
    const $cell = this._$dom;
    if (this._selected) {
      return;
    }
    $cell.classList.remove(styles['normal-cell-hover']);
    $cell.classList.add(styles['header-cell-hover']);
  }

  _refresh() {
    this.__refreshHoverState();
    this.__refreshNormalState();
    this.__refreshHeaderState();
    this.__refreshNormalSelectState();
    this.__refreshIconState();
  }

  private __refreshIconState() {
    if (!this._option.enableSorting) {
      return;
    }

    const iconContainer = this.__$iconContainer;
    if (!iconContainer) {
      return;
    }

    if (this._hover && !this._selected) {
      iconContainer.classList.add(styles['icon-container-hover']);
      iconContainer.classList.remove(styles['icon-container']);
      if (!this.__isIconSelected) {
        iconContainer.classList.add(styles['show-icon']);
        iconContainer.classList.remove(styles['hide-icon']);
      }
    } else if (!this._hover && !this._selected) {
      iconContainer.classList.remove(styles['icon-container-hover']);
      iconContainer.classList.add(styles['icon-container']);
      if (!this.__isIconSelected) {
        iconContainer.classList.remove(styles['show-icon']);
        iconContainer.classList.add(styles['hide-icon']);
      }
    }

    if (this._selected) {
      iconContainer.classList.remove(styles['icon-container-hover']);
      iconContainer.classList.remove(styles['icon-container']);
      iconContainer.classList.add(styles['icon-container-selected']);
    } else {
      iconContainer.classList.remove(styles['icon-container-selected']);
    }
  }

  private __refreshHoverState() {
    if (this._hover && !this._selected) {
      this._$dom.classList.add(styles['header-cell-hover']);
    } else {
      this._$dom.classList.remove(styles['header-cell-hover']);
    }
  }

  private __refreshHeaderState() {
    const { isHeader, isColumnHeader, isRowHeader } = this._option;
    if (isHeader && this._selected) {
      this._$dom.classList.add(styles['header-cell-select']);
      if (isColumnHeader) {
        this._$dom.classList.add(styles['header-border-bottom-select']);
      }
      if (isRowHeader) {
        this._$dom.classList.add(styles['header-border-right-select']);
      }
    }
  }

  private __refreshNormalState() {
    if (!this._hover && !this._selected) {
      const classesToRemove = [
        styles['header-cell-hover'],
        styles['header-cell-select'],
        styles['select-border'],
        styles['header-border-bottom-select'],
        styles['header-border-right-select']
      ];
      classesToRemove.forEach(cls => this._$dom.classList.remove(cls));
    }
  }

  private __refreshNormalSelectState() {
    const { isHeader } = this._option;
    if (isHeader || !this._selected) {
      return;
    }
    this._$dom.classList.remove(styles['header-cell-hover']);
  }
}
