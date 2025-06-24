import Table, {
  type TableConfig,
  type NormalTableData,
  type Option as BaseOption,
  Cell,
  CellOption,
  type CellEventTypes
} from '../Table';
import styles from '../assets/styles.module.scss';
import * as tableVariable from '../util/const';
import SelectedBox from '../component/SelectedBox';
import HeaderCell from '../cells/HeaderCell';
import NormalCell from '../cells/NormalCell';
import { chunkArray, calculateTextWidth, updateHoverState } from '../util/helper';

/** 设计针对特定2组列表格的奇数字段时，要将最后一行的表格做特殊处理 */
const SPECIAL_TABLE_COLUMN_NUMBER = 4;

interface HorizontalTableOption extends TableConfig {
  option: BaseOption & {
    columnsNum?: number;
  };
}

export default class HorizontalTable extends Table {
  _option: HorizontalTableOption['option'];

  constructor($wrapper: HTMLElement, tableConfig: HorizontalTableOption) {
    super($wrapper, tableConfig);
    this._option = tableConfig.option;

    this._layout();
    this._checkVerticalOverflow();
    this._bindEvents();
    this._updateIfOverflow();
  }

  /**
   * 计算水平方向上每列的最大宽度
   * 此函数旨在为表格计算每列的表头和内容的最大宽度，以便在显示时确定合适的列宽
   * 它通过比较每列中表头和内容的宽度，找出最大值，并确保这个最大值不超过默认的最大宽度限制
   * @param headers - 二维数组，表示表格的表头，每个元素是一个数组，代表一行表头
   * @param data - 对象，表格的数据，键是表头的标识，值是对应列的内容
   * @returns 返回一个对象，包含每列的最大宽度数组（maxWidths）和这些宽度的总和（sumWidth）
   */
  private __calculateHorizontalMaxWidth(
    headers: string[][],
    data: {
      [key: string]: string | number;
    }
  ) {
    if (!headers.length || !headers[0].length) {
      return { maxWidths: [], sumWidth: 0 };
    }
    const maxWidths: number[] = [];

    Array.from({ length: headers[0].length }).forEach((_, colIndex) => {
      const columnWidths = {
        header: 0,
        content: 0
      };

      // 计算每一行的宽度
      headers.forEach(row => {
        const key = row[colIndex];
        const value = data[key] ?? '';

        // 计算表头宽度
        columnWidths.header = Math.max(columnWidths.header, calculateTextWidth(key));

        // 计算内容宽度
        const contentWidth = this.__getContentWidth(key, value);
        columnWidths.content = Math.max(columnWidths.content, contentWidth);
      });

      // 添加该列的表头和内容最大宽度
      maxWidths.push(
        Math.min(columnWidths.header, tableVariable.defaultMaxWidth),
        Math.min(columnWidths.content, tableVariable.defaultMaxWidth)
      );
    });

    return {
      maxWidths,
      sumWidth: maxWidths.reduce((pre, cur) => cur + pre, 0)
    };
  }

  /**
   * 表格的内容支持传html格式，计算长度时需要计算实际文本的长度，而不是html字符串的长度
   * @param key - 表头值
   * @param value - 单元格值
   * @returns - 文本宽度
   */
  private __getContentWidth(key: string, value: string | number) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this._dataTransform(key, value, true);
    return calculateTextWidth(tempDiv.textContent ?? '', tableVariable.normalFontSize);
  }

  _layout() {
    const { _option: option, _tableData: data } = this;
    const { rows, columnsNum = tableVariable.defaultSplitNum } = option;
    /** 行分组 */
    const chunkRows = chunkArray(rows, columnsNum / tableVariable.defaultSplitNum);

    const { maxWidths, sumWidth } = this.__calculateHorizontalMaxWidth(
      chunkRows,
      (data as NormalTableData[])[0]
    );

    this.__compensateWidths(sumWidth, maxWidths);

    chunkRows.forEach((chunkRow, rowIndex) => {
      const $rowDom = this.__createRowDom(rowIndex);

      // 遍历分组行中的每一行
      chunkRow.forEach((row, idx) => {
        // 生成列数组
        Array(tableVariable.defaultSplitNum)
          .fill(0)
          .forEach((_, colIndex) => {
            // 计算全局索引
            const globalIndex = colIndex + idx * tableVariable.defaultSplitNum;
            const isHeader = globalIndex % tableVariable.defaultSplitNum === 0;
            // 计算单元格宽度
            const cellWidth = this.__calculateCellWidth(
              isHeader,
              colIndex,
              rowIndex,
              sumWidth,
              maxWidths,
              chunkRows,
              idx
            );
            const color = this.__determineCellColor(isHeader, row);

            // 配置单元格参数
            const cellOps = {
              isHeader,
              dataIndex: 0,
              key: row,
              value: (data as NormalTableData[])[0][row],
              columnIndexes: [globalIndex],
              rowIndexes: [rowIndex],
              style: {
                text: isHeader
                  ? row
                  : this._dataTransform(row, (data as NormalTableData[])[0][row], true),
                color,
                width: cellWidth
              }
            };
            this._buildCell($rowDom, cellOps);
          });
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

  /**
   * 设计(张祺睿)提出的红涨绿跌规则,当为表格内容为数字且为负数时，字体为绿色
   * @param isHeader - 是否是表头
   * @param rowKey - 元信息字段
   * @returns string
   */
  private __determineCellColor(isHeader: boolean, rowKey: string) {
    const { _option: option } = this;
    const { dataMetaInfo, data } = option;
    if (!isHeader && dataMetaInfo[rowKey]?.isNumber && Number(data[0][rowKey]) < 0) {
      return '#07AB4B';
    }
    return '';
  }

  /**
   * 特殊处理了特定表格下的单元格宽度
   * @param isHeader - 是否表头
   * @param colIndex - 列数
   * @param rowIndex - 行数
   * @param sumWidth - 所有列的总和宽度
   * @param maxWidths - 所有列的最大宽度数组
   * @param chunkRows - 拆分后的行数组
   * @param idx - 当前行在拆分后的行数组中的索引
   * @returns - 单元格宽度
   */
  private __calculateCellWidth(
    isHeader: boolean,
    colIndex: number,
    rowIndex: number,
    sumWidth: number,
    maxWidths: number[],
    chunkRows: string[][],
    idx: number
  ) {
    const { _option: option } = this;
    const { columnsNum = tableVariable.defaultSplitNum, rows } = option;
    const { width } = this._tableStyle;
    // 一组列表格时，表头取第一列的最大值，第二列取剩下宽度，能撑满表格宽度
    if (columnsNum === tableVariable.defaultSplitNum) {
      return isHeader ? maxWidths[0] : width - maxWidths[0];
    }

    // 设计提出的两组列表格情况下，对奇数情况做通栏处理
    if (
      // eslint-disable-next-line thsjs/expression-complexity
      Number(columnsNum) === SPECIAL_TABLE_COLUMN_NUMBER &&
      chunkRows[chunkRows.length - 1] &&
      rowIndex === chunkRows.length - 1 &&
      rows.length % tableVariable.defaultSplitNum !== 0 &&
      colIndex
    ) {
      return Math.max(sumWidth, width) - maxWidths[0];
    }

    return maxWidths[colIndex + idx * tableVariable.defaultSplitNum];
  }

  private __createRowDom(rowIndex: number) {
    const { _option: option } = this;
    const { columnsNum = tableVariable.defaultSplitNum } = option;
    const $rowDom = document.createElement('div');
    $rowDom.classList.add('rows-container', styles['rows-container'], styles['horizontal-table']);

    if (columnsNum > tableVariable.defaultSplitNum) {
      $rowDom.classList.add(styles['fit-content']);
    }

    // 对第一行表格样式做处理
    if (rowIndex === 0) {
      $rowDom.classList.add(styles['horizontal-table-first']);
      $rowDom.classList.remove(styles['horizontal-table']);
    }

    return $rowDom;
  }

  /**
   * 当表格的宽度小于指定宽度时，进行宽度的补偿
   * @param sumWidth - 计算后表格的总宽度
   * @param compensateWidths - 需要弥补宽度的单元格宽度列表
   */
  private __compensateWidths(sumWidth: number, compensateWidths: number[]) {
    const maxWidths = compensateWidths;
    const { _option: option } = this;
    const { columnsNum = tableVariable.defaultSplitNum } = option;
    const { width } = this._tableStyle;
    const needCompensation = sumWidth < width && columnsNum > tableVariable.defaultSplitNum;
    if (!needCompensation) {
      return;
    }
    maxWidths.forEach((value, index) => {
      const isHeader = index % tableVariable.defaultSplitNum === 0;
      if (isHeader) {
        return;
      }
      // 只针对奇数列做补偿
      const offsetWidth =
        (width - sumWidth - (this._isYOverflow ? this._scrollbarWidth : 0)) /
        (columnsNum / tableVariable.defaultSplitNum);
      maxWidths[index] = value + offsetWidth;
    });
  }

  _bindEvents() {
    const cells = [...this._normalCells, ...this._headerCells];

    cells.forEach(cellIns => {
      (cellIns as HeaderCell).on('change:enter', e => {
        this.__bindHorizontalLinkedCell(e);
      });

      (cellIns as HeaderCell).on('change:leave', () => {
        this.__updateHoverState();
      });

      (cellIns as HeaderCell).on('change:select', e => {
        this.__updateSelectState(e);
      });

      (cellIns as NormalCell).on('expandIcon:click', e => {
        this.__updateExpandState(e);
      });
    });
  }

  private __updateExpandState(event: Parameters<CellEventTypes['expandIcon:click']>[0]) {
    this.emit('cell:expand', { type: 'view_update', isExpand: event.isExpand });
  }

  private __updateSelectState(event: Parameters<CellEventTypes['change:select']>[0]) {
    SelectedBox.hideSelectedBox();
    // 更新选中单元格前，应该把之前的选中的单元格恢复默认样式
    this._lastSelectedCells.forEach(lastLinkedCell => {
      lastLinkedCell.selected(false);
      lastLinkedCell.hover(false);
    });
    // 更新选中的关联单元格样式
    this._linkedCells.forEach(linkedCell => {
      linkedCell.hover(true);
      linkedCell.selected(true);
    });
    // 更新选中的关联单元格
    this._lastSelectedCells = this._linkedCells.slice();

    this._onSelected(event);
  }

  private __updateHoverState() {
    updateHoverState(this._linkedCells, this._lastSelectedCells);
  }

  /**
   * 横向一维表格-获取与当前单元格相关联的其他单元格的
   */
  private __bindHorizontalLinkedCell(event: Parameters<CellEventTypes['change:enter']>[0]) {
    let linkedCells: Cell[] = [];
    const cells = [...this._normalCells, ...this._headerCells];

    linkedCells = cells.filter(
      tempCell =>
        tempCell.getOriginalData().key === event.data.key &&
        event.data.rowIndexes[0] === tempCell.getOriginalData().rowIndexes[0] &&
        tempCell.getOriginalData().value === event.data.value
    );
    // 更新hover状态
    linkedCells.forEach(tempCell => {
      tempCell.hover(true);
    });

    this._linkedCells = linkedCells;
  }

  /**
   * 处理用户自定义点击事件
   */
  _onSelected(event: Parameters<CellEventTypes['change:select']>[0]) {
    /** 选择单元格的值 */
    let selectedValue: string | number = '';
    /** 选择单元格取值来源的类型 */
    let selectedType: string = '';
    /** 选中单元格及其关联单元格的原始数据 */
    const data = [];

    selectedValue = event.data.isHeader ? event.data.key : event.data.style.text;
    // 与业务前端规定，选中的单元格内容是键则为 key ，值则为 value
    selectedType = event.data.isHeader ? 'key' : 'value';
    data.push({
      dataIndex: event.data.dataIndex,
      key: event.data.key,
      value: event.data.value
    });

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
