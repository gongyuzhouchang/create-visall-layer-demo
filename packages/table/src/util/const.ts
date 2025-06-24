// * -------------------- page
export const pageSize = 10;
export const currentPage = 1;

// * -------------------- table
/** 表格最大高度 */
export const maxHeight = 520;
/** 表格宽度 */
export const width = 570;
/** 单元格的padding */
export const cellPadding = [4, 12, 4, 12];
/** 行高 */
const lineHeight = 22;
/** 最大行数 */
const lineClamp = 10;
/** 最小单元格高 */
export const minBodyCellHeight = lineHeight + cellPadding[0] + cellPadding[2] + 1;
/** 最大单元格高 */
export const maxBodyCellHeight = lineHeight * lineClamp + cellPadding[0] + cellPadding[2] + 1;
/** 表头字号 */
export const headerFontSize = 12;
/** 普通单元格字号 */
export const normalFontSize = 14;
/** 字体 */
export const fontFamily = 'PingFangSC-Regular';
/** 字重 */
export const fontWeight = 400;
/** 横向一维表格默认的切割数字，由于实现上要把对象拆为键值对数组，所以会根据奇偶判断是普通单元格还是表头 */
export const defaultSplitNum = 2;

// * -------------------- cell
/** 默认最大列宽 */
export const defaultMaxWidth = 200;
/** 单元格排序状态，original表示初始状态，ascending表示升序，descending表示降序 */
export const sortMap = ['original', 'ascending', 'descending'] as const;
/** 弥补中文和数字之间的宽度差异 */
export const textWidthDiff = 4;

// * -------------------- icon
/** icon 宽度,在计算单元格宽度时需要考虑树状表格的 icon 宽度 */
export const iconWidth = 16;
