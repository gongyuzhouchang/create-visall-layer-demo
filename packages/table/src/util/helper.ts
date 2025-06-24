import * as tableVariable from './const';
// eslint-disable-next-line import/no-cycle
import { Cell, type CellEventTypes } from '../Table';
import { type SortType } from '../Cell';
import { type TreeTableData, type BaseTreeTableData } from '../tables/TreeTable';
import SelectedBox, { type SelectedBoxConfig } from '../component/SelectedBox';
import { type IHook } from '../types';
import { measureTextWidth } from './utils';
import styles from '../assets/styles.module.scss';

// 树节点接口
interface TreeNode extends BaseTreeTableData {
  name: string;
  children: TreeNode[];
}

/**
 * @param arr - 原始数组
 * @param size - 子数组长度
 * @returns 二维数组，子数组的长度根据size决定
 */
export function chunkArray(arr: string[], size: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * @param map - 第一列为额外表头的多维表格的列宽信息
 * @returns 转换为第一行为额外表头的多维表格的列宽信息
 */
export function findMaxAtIndices(map: Map<string, number[]>) {
  const maxValues = [];
  const arrayLengths = new Set(Array.from(map.values()).map(arr => arr.length));

  // 确保所有数组长度相同
  if (arrayLengths.size !== 1) {
    throw new Error('数组长度不相等');
  }

  const arrayLength = arrayLengths.values().next().value as number;
  let sumValue = 0;

  for (let i = 0; i < arrayLength; i++) {
    const maxValue = Math.min(
      Math.max(...Array.from(map.values()).map(arr => arr[i])),
      tableVariable.defaultMaxWidth
    );
    maxValues.push(maxValue);
    sumValue += maxValue;
  }

  return {
    maxValues,
    sumValue
  };
}

export function getSelectedBoxConfig(linkedCells: Cell[]): SelectedBoxConfig {
  // 初始化最小矩形区域的坐标
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  // 遍历数组,获取每个元素的DOMRect信息
  for (let i = 0; i < linkedCells.length; i++) {
    const cell = linkedCells[i];
    const rect = cell.getRootBoundingClientRect();

    // 更新最小矩形区域的坐标
    minX = Math.min(minX, rect.left);
    minY = Math.min(minY, rect.top);
    maxX = Math.max(maxX, rect.right);
    maxY = Math.max(maxY, rect.bottom);
  }
  // 由于首行是吸附的，当表格不在最顶上时，selectedBox的计算会漏掉首行
  if (
    linkedCells[0].getRootBoundingClientRect().top > linkedCells[1].getRootBoundingClientRect().top
  ) {
    minY -= linkedCells[0].getRootBoundingClientRect().height;
  }

  // 构造最终的DOMRect对象
  return {
    width: maxX - minX,
    height: maxY - minY,
    x: minX,
    y: minY
  };
}

/** 获取当前浏览器下滚动条的宽度 */
export function getScrollbarWidth() {
  // 创建一个带有滚动条的 div
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  // 强制显示滚动条
  outer.style.overflow = 'scroll';
  // 兼容 IE
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  // 创建一个内部 div
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // 计算滚动条的宽度
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // 移除测试元素
  outer.parentNode!.removeChild(outer);

  return scrollbarWidth;
}

/** 单元格排序状态变换 */
export function stateTransition(currentState: SortType) {
  const currentIndex = tableVariable.sortMap.indexOf(currentState);
  const nextIndex = (currentIndex + 1) % tableVariable.sortMap.length;
  return tableVariable.sortMap[nextIndex] as SortType;
}

export function findDescendantNodes(
  data: TreeTableData[],
  targetId: TreeTableData[string]['id'],
  map: Map<string, boolean>
) {
  const result: TreeTableData[string]['id'][] = [];

  function dfs(nodes: TreeTableData, id: TreeTableData[string]['id']) {
    Object.values(nodes).forEach(node => {
      if (typeof node === 'object' && node !== null && 'id' in node && node.pid === id) {
        // 如果当前节点的父 ID 等于目标 ID，则将该节点的 ID 加入结果
        result.push(node.id);
        // 递归查找该节点的子节点
        if (map.get(String(node.id))) {
          dfs(nodes, node.id);
        }
      }
    });
  }

  data.forEach(nodes => {
    dfs(nodes, targetId);
  });

  return result;
}

/**
 * @param key - 要转换的字段名
 * @param originalText - 要转换的原始文本
 * @param showUnit -  是否显示单位
 * @param dataMetaInfo - 数据元信息
 * @param formatDataNumberValue - 业务方的数据转换规则
 */
export function tableDataTransformation(
  key: string,
  originalText: string | number,
  showUnit: boolean,
  dataMetaInfo: ReturnType<IHook['parseDataMetaInfo']>,
  formatDataNumberValue: IHook['formatDataNumberValue']
) {
  let text = originalText;
  // 如果是数字，则进行数据转换
  if (dataMetaInfo[key]?.isNumber && text) {
    const result = formatDataNumberValue(+originalText, {
      type: 'table',
      unit: dataMetaInfo[key]?.unit
    });
    text = result.value + result.unit;
  }
  // 兼容 undefined 和 null
  if (typeof text === 'undefined' || text === '') {
    text = '--';
  }
  if (text === null) {
    text = '';
  }
  // 是否显示单位
  if (showUnit && text !== '--' && text !== '') {
    text += dataMetaInfo[key]?.unit || '';
  }
  return String(text);
}

export function calculateTextWidth(text: string, fontSize: number = tableVariable.headerFontSize) {
  // 宽度补偿
  const textCompensation =
    tableVariable.cellPadding[1] + tableVariable.cellPadding[3] + tableVariable.textWidthDiff;
  return (
    measureTextWidth(text, fontSize, tableVariable.fontFamily, tableVariable.fontWeight) +
    textCompensation
  );
}

/**
 * 创建一个带有预定义样式的div元素
 * 此函数主要用于简化div元素的创建过程，并为其添加一组预定义的样式（用于通用表格行元素）
 * 它还允许通过参数传递额外的样式类，以实现更灵活的样式定制
 *
 * @param addStyles - 可选参数，包含要额外添加到div的样式类数组
 * @returns 返回创建好的并带有样式的div元素
 */
export function createStyledDiv(addStyles?: string[]) {
  const $element = document.createElement('div');
  $element.classList.add('rows-container', styles['rows-container'], styles['fit-content']);
  if (Array.isArray(addStyles)) {
    $element.classList.add(...addStyles);
  }
  return $element;
}

/**
 * 更新单元格的选中状态
 *
 * 此函数的目的是在用户选择或取消选择单元格时，更新相关单元格的选中状态和视觉效果
 * 它隐藏当前的选中框，恢复上一次选中单元格的默认样式，并更新新选中单元格的样式
 * 如果选中的单元格是表头的一部分，则显示一个新的选中框
 *
 * @param event - 触发的事件，包含有关选中操作的信息
 * @param linkedCells - 与当前选中单元格相关联的单元格数组
 * @param lastSelectedCells - 上一次选中的单元格数组
 * @param target - 事件目标元素，即用户交互的DOM元素
 */
export function updateSelectState(
  event: Parameters<CellEventTypes['change:select']>[0],
  linkedCells: Cell[],
  lastSelectedCells: Cell[],
  target: HTMLElement
) {
  SelectedBox.hideSelectedBox();
  // 更新选中单元格前，应该把之前的选中的单元格恢复默认样式
  lastSelectedCells.forEach(lastLinkedCell => {
    lastLinkedCell.selected(false);
    lastLinkedCell.hover(false);
  });
  // 更新选中的关联单元格样式
  linkedCells.forEach(linkedCell => {
    linkedCell.hover(true);
    linkedCell.selected(true);
  });
  // 除了横向一维表格外的表头选择框
  if (event.data.isHeader) {
    const selectedBoxConfig = getSelectedBoxConfig(linkedCells);
    SelectedBox.showSelectedBox(selectedBoxConfig, target);
  }
}

/**
 * 更新悬停状态
 * 此函数用于将一组单元格的悬停状态设置为false，以反映它们不再是悬停状态
 * 它处理两个单元格数组：linkedCells和lastSelectedCells，确保这两个数组中的所有单元格都不再显示悬停状态
 *
 * @param linkedCells - 一个单元格数组，这些单元格之前可能处于悬停状态，需要更新
 * @param lastSelectedCells - 另一个单元格数组，包含最后选择的单元格，也需要更新悬停状态
 */
export function updateHoverState(linkedCells: Cell[], lastSelectedCells: Cell[]) {
  linkedCells.forEach(linkedCell => {
    linkedCell.hover(false);
  });
  lastSelectedCells.forEach(lastLinkedCell => {
    lastLinkedCell.hover(false);
  });
}

// 将扁平对象转换为树结构
function flatToTree(flatData: TreeTableData): TreeNode[] {
  const result: TreeNode[] = [];
  const map = new Map<string | number, TreeNode>();

  // 先转换成便于处理的数组格式
  const items = Object.entries(flatData).map(([key, value]) => ({
    ...value,
    name: key
  }));

  // 创建节点映射
  items.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  // 构建树结构
  items.forEach(item => {
    const node = map.get(item.id);
    if (node) {
      if (item.pid === 'root') {
        result.push(node);
      } else {
        const parent = map.get(item.pid);
        if (parent) {
          parent.children.push(node);
        }
      }
    }
  });

  return result;
}

// 递归排序函数
function sortTreeNodes(nodes: TreeNode[]): TreeNode[] {
  // 对当前层级按rank排序
  nodes.sort((a, b) => a.rank - b.rank);

  // 递归处理子节点
  nodes.forEach(node => {
    if (node.children && node.children.length > 0) {
      sortTreeNodes(node.children);
    }
  });

  return nodes;
}

// 将树结构转回扁平对象
function treeToFlat(tree: TreeNode[]): TreeTableData {
  const result: TreeTableData = {};

  function traverse(node: TreeNode): void {
    const { name, children, ...rest } = node;
    result[name] = rest;

    if (children) {
      children.forEach(child => traverse(child));
    }
  }

  tree.forEach(node => traverse(node));
  return result;
}

// 处理扁平树状结构排序
export function sortFlatTree(flatData: TreeTableData): TreeTableData {
  // 1. 转换为树结构
  const tree = flatToTree(flatData);

  // 2. 排序
  const sortedTree = sortTreeNodes(tree);

  // 3. 转换回扁平结构
  return treeToFlat(sortedTree);
}
