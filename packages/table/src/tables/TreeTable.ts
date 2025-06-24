// eslint-disable-next-line import/no-cycle
import Table, {
  type TableConfig,
  type Option,
  Cell,
  CellOption,
  type CellEventTypes
} from '../Table';
import styles from '../assets/styles.module.scss';
import HeaderCell from '../cells/HeaderCell';
import NormalCell, { NormalCellOption } from '../cells/NormalCell';
import * as tableVariable from '../util/const';
import {
  findMaxAtIndices,
  findDescendantNodes,
  calculateTextWidth,
  createStyledDiv,
  updateSelectState,
  updateHoverState
} from '../util/helper';

export interface BaseTreeTableData {
  value: string | number;
  level: number;
  id: string | number;
  pid: string | number;
  rank: number;
  rows?: boolean;
  columns?: boolean;
}

export interface TreeTableData {
  [k: string]: BaseTreeTableData;
}

type TreeTableOption = TableConfig;

export default class TreeTable extends Table {
  /** 树状表格点击状态映射表 */
  readonly __clickMap = new Map<string, boolean>();

  constructor($wrapper: HTMLElement, tableConfig: TreeTableOption) {
    super($wrapper, tableConfig);

    this.__initClickMap();
    this._layout();
    this._bindEvents();
    this._checkVerticalOverflow();
    this._updateIfOverflow();
  }

  /**
   * 初始化树状表格点击状态映射表
   */
  private __initClickMap() {
    (this._tableData as TreeTableData[]).forEach(data => {
      Object.keys(data).forEach(key => {
        this.__clickMap.set(String(data[key].id), true);
      });
    });
  }

  /**
   * 计算最大文本宽度
   * 该方法用于计算给定数据中，特定键对应的文本的最大宽度
   * 主要用于在表格渲染前，确定每列的最大宽度，以优化表格布局
   * @param data - 表格数据，是一个对象数组，每个对象代表一行数据
   * @param keys - 需要计算文本宽度的列的键名数组
   * @returns 返回一个对象，包含每列的最大文本宽度数组（maxValues）和所有列宽的总和（sumValue）
   */
  private __getMaxTextWidth(data: Option['data'], keys: string[]) {
    // 创建一个临时映射，用于存储每个键对应的文本宽度数组
    const tempTextWidthMap = new Map() as Map<string, number[]>;
    data.forEach((item, index) => {
      // 如果是第一行数据（行表头），需要初始化文本宽度映射，并考虑树状结构的缩进
      if (index === 0) {
        keys.forEach(key => {
          const measureText = key;
          // 初始化缩进级别为0
          let level = 0;
          let textWidth = calculateTextWidth(measureText);
          // 如果当前单元格有缩进级别属性，则更新文本宽度以考虑缩进
          if ((item as TreeTableData)[key]?.level) {
            level = (item as TreeTableData)[key].level;
          }
          /** 树状表格的行表头空出空间来放置icon */
          textWidth += level * tableVariable.iconWidth;
          tempTextWidthMap.set(key, [textWidth]);
        });
      }
      keys.forEach(key => {
        // 对于每一列，创建一个临时div元素，将单元格的值转换为文本内容，并计算宽度（允许数据为html字符串）
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this._dataTransform(key, (item as TreeTableData)[key]?.value, false);
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
    // 计算每列需要增加的宽度，考虑是否有垂直滚动条（不考虑垂直滚动条宽度的话，会出现不必要的横向滚动条）
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

    // 遍历列配置，生成表头单元格
    columns.forEach((column, index) => {
      // 标识是否为左上角的单元格
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

    // 获取表格数据的第一条记录来作为信息检索依据
    const dataInfo = (data as TreeTableData[])[0];
    // 遍历行配置，生成数据行
    rows.forEach((row, index) => {
      const $rowDom = createStyledDiv([styles['multi-table-first'], String(dataInfo[row]?.id)]);

      /** 行表头 */
      this._buildCell($rowDom, {
        isHeader: true,
        isRowHeader: true,
        isTree: true,
        isLastLevel: !Object.keys(dataInfo).some(key => dataInfo[key].pid === dataInfo[row].id),
        treeData: data[0][row] as unknown as TreeTableData[string],
        dataIndex: -1,
        key: row,
        value: '',
        columnIndexes: [0],
        rowIndexes: [index + 1],
        style: {
          text: row,
          width: maxWidthArr[0],
          maxWidth: sumWidth < width ? maxWidthArr[0] : tableVariable.defaultMaxWidth
        }
      });

      // 遍历表格数据，生成数据单元格
      data.forEach((column, idx) => {
        // 配置普通单元格
        const cellOps = {
          isHeader: false,
          isNumber: !!dataMetaInfo[row]?.isNumber,
          dataIndex: idx,
          key: row,
          value: (column as TreeTableData)[row].value,
          columnIndexes: [idx + 1],
          rowIndexes: [index + 1],
          style: {
            text: this._dataTransform(row, (column as TreeTableData)[row].value, false),
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
      (cellIns as HeaderCell).on('change:enter', e => {
        this.__bindCrossLinkedCell(e);
      });

      (cellIns as HeaderCell).on('change:leave', () => {
        this.__updateHoverState();
      });

      (cellIns as HeaderCell).on('change:select', e => {
        this.__updateSelectState(e);
      });

      (cellIns as HeaderCell).on('treeIcon:click', e => {
        this.__updateTreeState(e);
      });

      (cellIns as NormalCell).on('expandIcon:click', e => {
        this.__updateExpandState(e);
      });
    });
  }

  /**
   * 更新树形结构的状态
   * 此函数用于处理当用户点击树形图标时，需要更新的树节点状态和视图显示
   * @param event - 包含事件数据的参数，包括节点ID和选择状态
   */
  private __updateTreeState(event: Parameters<CellEventTypes['treeIcon:click']>[0]) {
    const { id } = event.data;
    // 查找所有后代节点，以便更新它们的显示状态
    const targets = findDescendantNodes(this._tableData as TreeTableData[], id, this.__clickMap);
    // 更新点击映射，记录当前节点的选中状态
    this.__clickMap.set(String(id), event.isSelected);
    // 遍历所有目标节点，根据当前选中状态更新它们的显示方式
    targets.forEach(target => {
      const targetEl = this._$tableDom.getElementsByClassName(String(target));
      if (event.isSelected) {
        // 如果节点被选中，显示节点
        (targetEl[0] as HTMLElement).style.display = 'flex';
      } else {
        // 如果节点未被选中，隐藏节点
        (targetEl[0] as HTMLElement).style.display = 'none';
      }
    });
    // 触发树形结构选中事件，通知其他部分视图更新
    this.emit('tree:selected', {
      type: 'view_update',
      id: String(id)
    });
  }

  private __updateExpandState(event: Parameters<CellEventTypes['expandIcon:click']>[0]) {
    this.emit('cell:expand', { type: 'view_update', isExpand: event.isExpand });
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

  /**
   * 绑定交叉链接单元格
   * 当单元格进入时触发，根据不同的单元格类型绑定相应的交叉链接单元格
   * @param event - 单元格进入事件，包含事件数据
   */
  private __bindCrossLinkedCell(event: Parameters<CellEventTypes['change:enter']>[0]) {
    // 多维表格的左上角单元格禁止交互
    if (event.data.isHeader && event.data.isColumnHeader && event.data.isRowHeader) {
      this._linkedCells = [];
      this._lastSelectedCells = [];
      return;
    }
    let linkedCells: Cell[] = [];
    const cells = [...this._headerCells, ...this._normalCells];

    // 目标为列表头时的查找方式
    if (event.data.isHeader && !event.data.isRowHeader) {
      linkedCells = cells.filter(
        tempCell => event.data.columnIndexes[0] === tempCell.getOriginalData().columnIndexes[0]
      );
    }
    // 目标为行表头时的查找方式
    if (event.data.isHeader && event.data.isRowHeader) {
      linkedCells = cells.filter(
        tempCell => event.data.rowIndexes[0] === tempCell.getOriginalData().rowIndexes[0]
      );
    }
    // 目标为普通单元格时的查找方式
    if (!event.data.isHeader && !event.data.isRowHeader) {
      linkedCells = cells.filter(
        tempCell =>
          (event.data.rowIndexes[0] === tempCell.getOriginalData().rowIndexes[0] &&
            event.data.columnIndexes[0] > tempCell.getOriginalData().columnIndexes[0]) ||
          (event.data.columnIndexes[0] === tempCell.getOriginalData().columnIndexes[0] &&
            event.data.rowIndexes[0] >= tempCell.getOriginalData().rowIndexes[0])
      );
    }

    // 更新hover状态
    linkedCells.forEach(tempCell => {
      tempCell.hover(true);
    });

    this._linkedCells = linkedCells;
  }

  /**
   * 处理用户自定义点击事件
   * @param event - 单元格事件对象，包含事件的相关数据
   */
  _onSelected(event: Parameters<CellEventTypes['change:select']>[0]) {
    if (
      // 左上角单元格不支持点击事件
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
