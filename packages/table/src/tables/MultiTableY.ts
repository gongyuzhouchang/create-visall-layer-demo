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
  findMaxAtIndices,
  stateTransition,
  calculateTextWidth,
  createStyledDiv,
  updateSelectState,
  updateHoverState
} from '../util/helper';
import { transform, type Input } from '../util/dataTransform';
import HeaderCell, { SortType } from '../cells/HeaderCell';
import NormalCell, { NormalCellOption } from '../cells/NormalCell';

type MultiTableYOption = TableConfig;

export default class MultiTableY extends Table {
  /** 排序状态映射表 */
  readonly __sortMap = new Map<string, SortType>();

  /** 记录排序状态的键名 */
  sortKey: string | null = null;

  constructor($wrapper: HTMLElement, tableConfig: MultiTableYOption) {
    super($wrapper, tableConfig);

    this.__initSortMap();
    this._updateCurrentData();
    this._layout();
    this._checkVerticalOverflow();
    this._bindEvents();
    this._updateIfOverflow();
  }

  /** 初始化排序状态映射表 */
  private __initSortMap() {
    const {
      __sortMap: sortMap,
      _option: { dataMetaInfo, rows }
    } = this;
    rows.forEach(row => {
      if (dataMetaInfo[row]?.isDate || dataMetaInfo[row]?.isNumber) {
        sortMap.set(row, 'original');
      }
    });
  }

  /** 获取列的最大宽度 */
  private __getMaxTextWidth(data: Option['data'], keys: string[]) {
    const tempTextWidthMap = new Map() as Map<string, number[]>;
    data.forEach((item, index) => {
      if (index === 0) {
        keys.forEach(key => {
          const measureText = this._option.dataMetaInfo[key]?.unit
            ? `${key} (${this._option.dataMetaInfo[key]?.unit})`
            : key;
          const textWidth = calculateTextWidth(measureText);
          tempTextWidthMap.set(key, [textWidth]);
        });
      }
      keys.forEach(key => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this._dataTransform(key, (item as NormalTableData)[key], false);
        tempTextWidthMap
          .get(key)
          ?.push(calculateTextWidth(tempDiv.textContent!, tableVariable.normalFontSize));
      });
    });
    /** 第一行为额外表头的多维表格的列宽计算 */
    const { maxValues, sumValue } = findMaxAtIndices(tempTextWidthMap);

    return {
      sumValue,
      maxValues
    };
  }

  /**
   * 当表格的宽度小于指定宽度时，进行宽度的补偿
   * @param sumWidth - 计算后表格的总宽度
   * @param compensateWidths - 需要弥补宽度的单元格宽度列表
   */
  private __compensateWidths(sumWidth: number, compensateWidths: number[]) {
    const maxWidthArr = compensateWidths;
    const option = this._option;
    const { columns } = option;
    const { width } = this._tableStyle;
    const needCompensation = sumWidth < width;
    if (!needCompensation) {
      return;
    }
    const offsetWidth =
      (width - sumWidth - (this._isYOverflow ? this._scrollbarWidth : 0)) / columns.length;
    maxWidthArr.forEach((value, index) => {
      maxWidthArr[index] = value + offsetWidth;
    });
  }

  _layout() {
    const { _option: option, _tableData: data } = this;
    const { columns, rows, dataMetaInfo } = option;
    const { width } = this._tableStyle;

    const $headerDom = createStyledDiv([styles['multi-table']]);

    const { maxValues: maxWidthArr, sumValue: sumWidth } = this.__getMaxTextWidth(
      data,
      rows.concat(columns)
    );
    this.__compensateWidths(sumWidth, maxWidthArr);

    columns.forEach((column, index) => {
      const isLeftTopCell = index === 0;
      const cellOps = {
        isHeader: true,
        isRowHeader: isLeftTopCell,
        isNumber: !!dataMetaInfo[columns[0]]?.isNumber,
        isColumnHeader: true,
        dataIndex: index - 1,
        key: columns[0],
        value: column,
        columnIndexes: [index],
        rowIndexes: [0],
        style: {
          text: isLeftTopCell ? '' : column,
          width: maxWidthArr[index],
          maxWidth: sumWidth < width ? maxWidthArr[index] : tableVariable.defaultMaxWidth
        }
      };
      this._buildCell($headerDom, cellOps);
    });
    this._$tableDom.appendChild($headerDom);

    rows.forEach((row, index) => {
      const $rowDom = createStyledDiv([styles['multi-table-first']]);

      /** 行表头 */
      const rowText = dataMetaInfo[row]?.unit ? `${row} (${dataMetaInfo[row]?.unit})` : row;
      this._buildCell($rowDom, {
        isHeader: true,
        isRowHeader: true,
        dataIndex: -1,
        key: row,
        value: '',
        columnIndexes: [0],
        rowIndexes: [index + 1],
        style: {
          text: rowText,
          width: maxWidthArr[0],
          maxWidth: sumWidth < width ? maxWidthArr[0] : tableVariable.defaultMaxWidth
        }
      });

      data.forEach((column, idx) => {
        // 配置普通单元格
        const cellOps = {
          isHeader: false,
          isNumber: !!dataMetaInfo[row]?.isNumber,
          dataIndex: idx,
          key: row,
          value: (column as NormalTableData)[row],
          columnIndexes: [idx + 1],
          rowIndexes: [index + 1],
          style: {
            text: this._dataTransform(row, (column as NormalTableData)[row], false),
            width: maxWidthArr[idx + 1],
            maxWidth: sumWidth < width ? maxWidthArr[idx + 1] : tableVariable.defaultMaxWidth
          }
        };
        this._buildCell($rowDom, cellOps);
      });
      this._$tableDom.appendChild($rowDom);
    });
  }

  _buildCell(dom: HTMLElement, option: CellOption) {
    if (option.isHeader) {
      this._headerCells.push(new HeaderCell(dom, option));
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

    selectedType = event.data.isHeader && event.data.isRowHeader ? 'key' : 'value';
    // 列表头的点击内容
    if (event.data.isHeader && !event.data.isRowHeader) {
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
    // 行表头的点击内容
    if (event.data.isHeader && event.data.isRowHeader) {
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
