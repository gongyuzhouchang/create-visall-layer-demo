/* eslint-disable import/no-cycle */
import EventEmitter from 'eventemitter3';
import Pagination, { type TToken, type PaginationProps } from './components/Pagination';
import { type IHook, type TCustomEvent } from './types';
import { getScrollbarWidth, tableDataTransformation } from './util/helper';
import styles from './assets/styles.module.scss';
import * as tableVariable from './util/const';
import SelectedBox from './component/SelectedBox';
import NormalCell, { type NormalCellOption, type NormalCellEventTypes } from './cells/NormalCell';
import HeaderCell, { type HeaderCellOption, type HeaderCellEventTypes } from './cells/HeaderCell';
import { type TreeTableData } from './tables/TreeTable';

export type CellOption = NormalCellOption & HeaderCellOption;
export type Cell = NormalCell | HeaderCell;
export type CellEventTypes = NormalCellEventTypes & HeaderCellEventTypes;

export type NormalTableData = { [k: string]: number | string };

type TableStyle = {
  /** 表格最大高度 */
  maxHeight: number;
  /** 表格宽度 */
  width: number;
};

type PaginationOpt = {
  /** 一页展示的条数 */
  pageSize?: number;
  /** 当前的页数 */
  currentPage?: number;
  /** 总的数据条数 */
  totalCount?: number;
};

type TableData = NormalTableData[] | TreeTableData[];

export type Option = {
  /** 配置原始数据 */
  data: TableData;
  /** 行表头 */
  rows: string[];
  /** 列表头 */
  columns: string[];
  /** 解析数据字段的元信息 */
  dataMetaInfo: ReturnType<IHook['parseDataMetaInfo']>;
};

export interface TableConfig {
  option: Option;
  formatData: IHook['formatDataNumberValue'];
  pagination?: PaginationOpt;
  token?: Partial<TToken>;
  tableStyle?: TableStyle;
}

/** 与业务前端约定的事件名称，前者表示数据传输，后者表示视图大小发生变动 */
type EventType = 'data_transfer' | 'view_update';

/** 选中单元格后可能触发的事件 */
type EventTypes = {
  'cell:selected': (event: { type: EventType; data: TCustomEvent }) => void;
  'page:changed': (event: { type: EventType; page: number }) => void;
  'tree:selected': (event: { type: EventType; id: string }) => void;
  'cell:expand': (event: { type: EventType; isExpand: boolean }) => void;
};

export default abstract class Table extends EventEmitter<EventTypes> {
  /** 配置信息 */
  protected _option: Option;

  /** 根元素 */
  protected _$dom!: HTMLElement;

  /** 为适配分页器，表格组件存放于根元素的第一个子元素下 */
  protected _$tableDom!: HTMLElement;

  /** 渲染表格时用的数据 */
  protected _tableData: TableData;

  /** 主题配置 */
  protected _token?: Partial<TToken>;

  /** 表格单元实例数组 */
  protected _cells: Cell[] = [];

  /** 普通单元格数组 */
  protected _normalCells: NormalCell[] = [];

  /** 表头单元格数组 */
  protected _headerCells: HeaderCell[] = [];

  /** 高度是否超过指定的最大高度 */
  protected _isYOverflow: boolean = false;

  /** 与当前hover或select单元所关联的所有其他单元(包括选中的单元格) */
  protected _linkedCells: Cell[] = [];

  /** 记录最新一次 select 之后的所有关联单元， 用于在下一次 select 之后，上一次选择的单元格恢复样式 */
  protected _lastSelectedCells: Cell[] = [];

  /** 表格外点击事件处理 */
  protected _addDocumentClickHandler: (event: Event) => void;

  /** 分页器实例 */
  protected _paginationIns: InstanceType<typeof Pagination> | null = null;

  /** 当前页的数据 */
  protected _currentData: TableData | null = null;

  /** 分页器配置 */
  protected _paginationConfig: PaginationProps;

  /** 当前浏览器滚动条宽度 */
  protected _scrollbarWidth = getScrollbarWidth();

  /** 表格样式 */
  protected _tableStyle: TableStyle;

  /** 数据处理函数 */
  protected _formatData: IHook['formatDataNumberValue'];

  public constructor($wrapper: HTMLElement, tableConfig: TableConfig) {
    super();
    const {
      option,
      formatData,
      token,
      pagination = {},
      tableStyle = {
        maxHeight: tableVariable.maxHeight,
        width: tableVariable.width
      }
    } = tableConfig;
    const { pageSize = tableVariable.pageSize, currentPage = tableVariable.currentPage } =
      pagination;
    this._option = option;
    this._tableData = option.data;
    this._tableStyle = tableStyle;
    this._paginationConfig = {
      totalCount: this._option.data.length,
      currentPage,
      pageSize,
      token: token || this._token
    };
    this._token = token || this._token;
    this._formatData = formatData;
    this.__createRootDom($wrapper);
    this._addDocumentClickHandler = this.__addDocumentClickHandler.bind(this);
    this.__initTheme();
    this.__addDocumentClickEvent();
  }

  /**
   * 处理表格外的点击事件，恢复表格的未选中状态
   * @param event - 获取点击的元素
   */
  private __addDocumentClickHandler(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest(`.${styles['main-container']}`)) {
      return;
    }
    SelectedBox.hideSelectedBox();
    this._lastSelectedCells.forEach(selectedLinkedCell => {
      selectedLinkedCell.selected(false);
      selectedLinkedCell.hover(false);
    });
  }

  private __createRootDom($wrapper: HTMLElement) {
    const tableStyle = this._tableStyle;
    this._$dom = document.createElement('div');
    this._$dom.classList.add('main-container', styles['main-container'], styles['theme-container']);
    this._$tableDom = document.createElement('div');
    this._$tableDom.classList.add(styles.outContainer);
    this._$tableDom.style.maxHeight = `${tableStyle.maxHeight}px`;
    this._$tableDom.style.width = `${tableStyle.width}px`;

    $wrapper.appendChild(this._$dom);
    this._$dom.appendChild(this._$tableDom);
  }

  /**
   * 如果布局之后，表格高度超过设定的最大高度，则重新渲染一次
   * 目的是为了消除垂直方向滚动条带来的宽度影响（滚动条占一定宽度）
   */
  protected _updateIfOverflow() {
    if (!this._isYOverflow) {
      return;
    }
    this._update();
  }

  /**
   * 更新表格
   */
  protected _update() {
    this.__removeDom();
    this.__reset();
    this.__addDocumentClickEvent();
    this._updateCurrentData();
    this._layout();
    this._checkVerticalOverflow();
    this._bindEvents();
  }

  /**
   * 移除表格
   */
  private __removeDom() {
    this._$tableDom.innerHTML = '';
  }

  /**
   * 绑定分页组件的事件监听器
   * 此方法用于初始化分页组件时，绑定点击事件处理函数
   * 当分页发生变化时，会触发相应的事件，更新当前页码，并重新获取数据渲染表格
   */
  protected _bindPaginationEvent() {
    if (!this._paginationIns) {
      return;
    }
    this._paginationIns.on('click:changed', event => {
      this.emit('page:changed', { type: 'view_update', page: event.page });
      this._paginationConfig.currentPage = event.page;
      this._update();
    });
  }

  /**
   * 构建分页组件
   *
   * 此方法用于根据当前配置决定是否需要分页，并在需要时创建分页实例
   * 它首先计算总页数是否大于1，以确定是否需要分页如果不需要分页，则直接返回
   * 如果需要分页，则使用当前的DOM包装器和分页配置来创建新的分页实例
   */
  protected _buildPagination() {
    const wrapper = this._$dom;
    // 计算是否需要分页：如果总页数大于1，则需要分页
    const needPagination =
      Math.ceil(this._paginationConfig.totalCount / this._paginationConfig.pageSize) > 1;
    if (!needPagination) {
      return;
    }
    this._paginationIns = new Pagination(wrapper, this._paginationConfig);
  }

  /**
   * 更新当前页数下的数据
   */
  protected _updateCurrentData() {
    this._currentData = this._tableData.slice(
      (this._paginationConfig.currentPage - 1) * this._paginationConfig.pageSize,
      this._paginationConfig.currentPage * this._paginationConfig.pageSize
    );
  }

  /**
   * 初始化主题
   */
  private __initTheme() {
    const themeConfig = this._token?.dvTable as unknown as { [key: string]: string | undefined };
    if (!themeConfig) {
      return;
    }

    Object.keys(themeConfig).forEach(key => {
      if (typeof themeConfig[key] === 'undefined') {
        return;
      }
      // 设置CSS变量，将键作为变量名，值作为变量的值
      this._$dom.style.setProperty(key, themeConfig[key]);
    });
  }

  /**
   * 监听表格外点击事件
   */
  private __addDocumentClickEvent() {
    document.addEventListener('click', this._addDocumentClickHandler);
  }

  /**
   * 移除表格外的点击监听
   */
  private __removeDocumentClickHandler() {
    document.removeEventListener('click', this._addDocumentClickHandler);
  }

  /**
   * 数据转换
   */
  protected _dataTransform(key: string, originalText: string | number, showUnit: boolean): string {
    return tableDataTransformation(
      key,
      originalText,
      showUnit,
      this._option.dataMetaInfo,
      this._formatData
    );
  }

  /**
   * 检查表格的实际高度是否超过了设定的最大高度
   */
  protected _checkVerticalOverflow() {
    if (this._$tableDom.scrollHeight > this._tableStyle.maxHeight) {
      this._isYOverflow = true;
    }
  }

  /**
   * 布局
   */
  abstract _layout(): void;

  /**
   * 创建单元格
   */
  abstract _buildCell(dom: HTMLElement, option: CellOption): void;

  /**
   * 绑定表格事件
   */
  abstract _bindEvents(): void;

  /**
   * 处理用户自定义点击事件
   */
  abstract _onSelected(event: Parameters<CellEventTypes['change:select']>[0]): void;

  /**
   * 重置表格状态
   */
  private __reset() {
    this.__removeDocumentClickHandler();
    this._cells = [];
    this._normalCells = [];
    this._headerCells = [];
    this._linkedCells = [];
    this._lastSelectedCells = [];
  }

  destroy() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this._paginationIns && this._paginationIns.destroy();
    this._cells.forEach(cell => {
      cell?.destroy?.();
    });
    this._normalCells.forEach(cell => {
      cell?.destroy?.();
    });
    this._headerCells.forEach(cell => {
      cell?.destroy?.();
    });
    this.removeAllListeners();
    this.__reset();
    this._$dom.remove();
  }
}
