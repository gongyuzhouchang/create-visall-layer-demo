import Table, {
  type TableConfig,
  type NormalTableData,
  type Option,
  Cell,
  CellOption,
  type CellEventTypes
} from '../Table';
import styles from '../assets/styles.module.scss';
import * as tableVariable from '../util/const';
import {
  stateTransition,
  calculateTextWidth,
  createStyledDiv,
  updateSelectState,
  updateHoverState
} from '../util/helper';
import { transform, type Input } from '../util/dataTransform';
import HeaderCell from '../cells/HeaderCell';
import NormalCell, { NormalCellOption } from '../cells/NormalCell';
import { SortType } from '../Cell';

type MultiTableXOption = TableConfig;

export default class MultiTableX extends Table {
  /** 排序状态映射表 */
  readonly __sortMap = new Map<string, SortType>();

  /** 记录排序状态的键名 */
  sortKey: string | null = null;

  constructor($wrapper: HTMLElement, tableConfig: MultiTableXOption) {
    super($wrapper, tableConfig);

    this.__initSortMap();
    this._updateCurrentData();
    this._layout();
    this._checkVerticalOverflow();
    this._buildPagination();
    this._bindEvents();
    this._bindPaginationEvent();
    this._updateIfOverflow();
  }

  /**
   * 初始化排序映射私有方法
   *
   * 此方法用于遍历列配置，并根据列的数据类型（日期或数字）初始化排序映射
   * 它通过检查数据元信息来确定列的数据类型，并为符合条件的列设置初始排序方式为'original'
   */
  private __initSortMap() {
    const {
      __sortMap: sortMap,
      _option: { dataMetaInfo, columns }
    } = this;
    columns.forEach(column => {
      if (dataMetaInfo[column]?.isDate || dataMetaInfo[column]?.isNumber) {
        sortMap.set(column, 'original');
      }
    });
  }

  /**
   * 获取列的最大宽度
   */
  private __getMaxTextWidth(data: Option['data'], keys: string[]) {
    const tempTextWidthMap = new Map() as Map<string, number[]>;
    const textWidthMap = new Map() as Map<string, number>;
    let sumWidth = 0;
    data.forEach((item, index) => {
      // 计算表头的宽度
      if (index === 0) {
        keys.forEach(key => {
          const measureText = this._option.dataMetaInfo[key]?.unit
            ? `${key} (${this._option.dataMetaInfo[key]?.unit})`
            : key;
          const textWidth = calculateTextWidth(measureText);
          tempTextWidthMap.set(key, [textWidth]);
        });
      }
      // 计算单元格宽度
      keys.forEach(key => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this._dataTransform(key, (item as NormalTableData)[key], false);
        tempTextWidthMap
          .get(key)
          ?.push(calculateTextWidth(tempDiv.textContent!, tableVariable.normalFontSize));
      });
    });

    // 获取列最大宽度，并计算总宽度
    [...tempTextWidthMap.keys()].forEach(key => {
      const maxWidth = Math.min(
        Math.max(...tempTextWidthMap.get(key)!),
        tableVariable.defaultMaxWidth
      );
      textWidthMap.set(key, maxWidth);
      sumWidth += maxWidth;
    });

    return {
      textWidthMap,
      sumWidth
    };
  }

  /**
   * 当表格的宽度小于指定宽度时，进行宽度的补偿
   * @param sumWidth - 计算后表格的总宽度
   * @param textWidthMap - 文本宽度映射表
   */
  private __compensateWidths(sumWidth: number, textWidthMap: Map<string, number>) {
    const option = this._option;
    const { columns } = option;
    const { width } = this._tableStyle;
    const needCompensation = sumWidth < width;
    if (!needCompensation) {
      return;
    }
    // 将缺少的总宽度平均分给每一列的单元格上，使表格的宽度达到容器的宽度
    const offsetWidth =
      (width - sumWidth - (this._isYOverflow ? this._scrollbarWidth : 0)) / columns.length;
    [...textWidthMap.keys()].forEach(key => {
      textWidthMap.set(key, textWidthMap.get(key)! + offsetWidth);
    });
  }

  _layout() {
    const option = this._option;
    const { columns, dataMetaInfo } = option;
    const { width } = this._tableStyle;

    const $headerDom = createStyledDiv([styles['multi-table']]);

    const { textWidthMap, sumWidth } = this.__getMaxTextWidth(this._currentData!, columns);

    this.__compensateWidths(sumWidth, textWidthMap);

    columns.forEach((column, index) => {
      const text = dataMetaInfo[column]?.unit
        ? `${column} (${dataMetaInfo[column]?.unit})`
        : column;
      const isLeftTopCell = index === 0;
      // 配置行表头
      const cellOps = {
        isHeader: true,
        enableSorting: dataMetaInfo[column]?.isNumber || dataMetaInfo[column]?.isDate,
        isRowHeader: isLeftTopCell,
        isNumber: !!dataMetaInfo[column]?.isNumber,
        isColumnHeader: true,
        dataIndex: -1,
        key: column,
        value: '',
        columnIndexes: [index],
        rowIndexes: [0],
        style: {
          text: isLeftTopCell ? '' : text,
          width: textWidthMap.get(column)!,
          maxWidth: sumWidth < width ? textWidthMap.get(column)! : tableVariable.defaultMaxWidth
        }
      };
      this._buildCell($headerDom, cellOps);
    });
    this._$tableDom.appendChild($headerDom);

    this._currentData!.forEach((row, index) => {
      const $rowDom = createStyledDiv([styles['multi-table-first']]);
      columns.forEach((column, idx) => {
        const currentDataIndex =
          idx + (this._paginationConfig.currentPage - 1) * this._paginationConfig.currentPage;
        // 配置普通单元格
        const cellOps = {
          isHeader: idx === 0,
          isRowHeader: idx === 0,
          isNumber: idx !== 0 && !!dataMetaInfo[column]?.isNumber,
          dataIndex: currentDataIndex,
          key: column,
          value: (row as NormalTableData)[column],
          columnIndexes: [idx],
          rowIndexes: [index + 1],
          style: {
            text: this._dataTransform(column, (row as NormalTableData)[column], false),
            width: textWidthMap.get(column)!,
            maxWidth: sumWidth < width ? textWidthMap.get(column)! : tableVariable.defaultMaxWidth
          }
        };
        this._buildCell($rowDom, cellOps);
      });
      this._$tableDom.appendChild($rowDom);
    });
  }

  _buildCell(dom: HTMLElement, option: CellOption) {
    // TODO 工厂模式改造
    if (option.isHeader) {
      const headerCellIns = new HeaderCell(dom, option);
      headerCellIns?.updateIcon(this.__sortMap.get(option.key) as SortType);
      this._headerCells.push(headerCellIns);
    } else {
      this._normalCells.push(new NormalCell(dom, option));
    }
  }

  _bindEvents() {
    const cells = [...this._headerCells, ...this._normalCells];

    cells.forEach(cellIns => {
      // 查找包括当前单元格的所有相关联单元格
      (cellIns as HeaderCell).on('change:enter', e => {
        this.__bindCrossLinkedCell(e);
      });

      (cellIns as HeaderCell).on('change:leave', () => {
        this.__updateHoverState();
      });

      (cellIns as HeaderCell).on('change:select', e => {
        this.__updateSelectState(e);
      });

      (cellIns as HeaderCell).on('icon:sort', e => {
        this.__updateSortState(e);
      });

      (cellIns as NormalCell).on('expandIcon:click', e => {
        this.__updateExpandState(e);
      });
    });
  }

  private __updateExpandState(event: Parameters<CellEventTypes['expandIcon:click']>[0]) {
    this.emit('cell:expand', { type: 'view_update', isExpand: event.isExpand });
  }

  private __updateSortState(event: Parameters<CellEventTypes['icon:sort']>[0]) {
    const lastSortType = this.__sortMap.get(event.sortKey)!;
    if (event.sortKey !== this.sortKey) {
      this.sortKey = event.sortKey;
      this.__initSortMap();
    }
    const sortType = stateTransition(lastSortType);
    if (sortType === 'original') {
      this._tableData = this._option.data;
    } else {
      this._tableData = transform(this._option.data.slice() as unknown as Input[], [
        {
          type: 'sort',
          field: event.sortKey,
          order: sortType
        }
      ]) as Option['data'];
    }
    this.__sortMap.set(event.sortKey, sortType);
    this._update();
  }

  private __updateSelectState(event: Parameters<CellEventTypes['change:select']>[0]) {
    updateSelectState(
      event,
      this._linkedCells,
      this._lastSelectedCells,
      this._$dom.firstChild as HTMLElement
    );
    // 更新选中的关联单元格
    this._lastSelectedCells = this._linkedCells.slice();

    this._onSelected(event);
  }

  private __updateHoverState() {
    updateHoverState(this._linkedCells, this._lastSelectedCells);
  }

  /** 多维表格-获取与当前单元格相关联的其他单元格的 */
  private __bindCrossLinkedCell(event: Parameters<CellEventTypes['change:enter']>[0]) {
    // 多维表格的左上角单元格禁止交互
    if (event.data.isHeader && event.data.isColumnHeader && event.data.isRowHeader) {
      this._linkedCells = [];
      this._lastSelectedCells = [];
      return;
    }
    let linkedCells: Cell[] = [];
    const cells = [...this._headerCells, ...this._normalCells];

    if (event.data.isHeader && !event.data.isRowHeader) {
      linkedCells = cells.filter(
        tempCell => event.data.columnIndexes[0] === tempCell.getOriginalData().columnIndexes[0]
      );
    }
    if (event.data.isHeader && event.data.isRowHeader) {
      linkedCells = cells.filter(
        tempCell => event.data.rowIndexes[0] === tempCell.getOriginalData().rowIndexes[0]
      );
    }
    if (!event.data.isHeader && !event.data.isRowHeader) {
      linkedCells = cells.filter(
        tempCell =>
          (event.data.rowIndexes[0] === tempCell.getOriginalData().rowIndexes[0] &&
            event.data.columnIndexes[0] > tempCell.getOriginalData().columnIndexes[0]) ||
          (event.data.columnIndexes[0] === tempCell.getOriginalData().columnIndexes[0] &&
            event.data.rowIndexes[0] >= tempCell.getOriginalData().rowIndexes[0])
      );
    }

    linkedCells.forEach(tempCell => {
      tempCell.hover(true);
    });

    this._linkedCells = linkedCells;
  }

  /** 处理用户自定义点击事件 */
  _onSelected(event: Parameters<CellEventTypes['change:select']>[0]) {
    if (
      // 多维表格的左上角单元格不支持点击事件
      event.data.isHeader &&
      event.data.isColumnHeader &&
      event.data.isRowHeader
    ) {
      return;
    }

    const selectedLinkedCells = this._lastSelectedCells;
    /** 选择单元格的值 */
    let selectedValue: string | number = '';
    /** 选择单元格取值来源的类型 */
    let selectedType: string = '';
    /** 选中单元格及其关联单元格的原始数据 */
    const data = [];

    selectedType = event.data.isHeader && event.data.isColumnHeader ? 'key' : 'value';
    // 列表头的点击内容
    if (event.data.isHeader && event.data.isColumnHeader) {
      selectedValue = event.data.key;
      selectedLinkedCells.forEach(selectedLinkedCell => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !(selectedLinkedCell as HeaderCell).getOriginalData().isHeader &&
          data.push({
            dataIndex: selectedLinkedCell.getOriginalData().dataIndex,
            key: selectedLinkedCell.getOriginalData().key,
            value: selectedLinkedCell.getOriginalData().value
          });
      });
    }
    // 行表头的点击内容
    if (event.data.isHeader && event.data.isRowHeader && !event.data.isColumnHeader) {
      selectedValue = (event.data as NormalCellOption).isNumber
        ? event.data.style.text
        : event.data.value;
      selectedLinkedCells.forEach(selectedLinkedCell => {
        data.push({
          dataIndex: selectedLinkedCell.getOriginalData().dataIndex,
          key: selectedLinkedCell.getOriginalData().key,
          value: selectedLinkedCell.getOriginalData().value
        });
      });
    }
    // 普通单元格的点击内容
    if (!event.data.isHeader && !event.data.isRowHeader) {
      selectedValue = (event.data as NormalCellOption).isNumber
        ? event.data.style.text
        : event.data.value;
      data.push({
        dataIndex: event.data.dataIndex,
        key: event.data.key,
        value: event.data.value
      });
    }

    this.emit('cell:selected', {
      type: 'data_transfer',
      data: {
        data,
        selectedValue,
        selectedType
      }
    });
  }
}
