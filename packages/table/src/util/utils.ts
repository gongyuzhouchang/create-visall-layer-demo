/**
 * 测量文本
 */
export function measureText(
  text: string,
  fontSize: number,
  fontFamily = 'Microsoft YaHei',
  fontWeight: string | number = 'normal'
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  return ctx.measureText(text);
}

/**
 * 测量文本宽度
 */
export function measureTextWidth(
  text: string,
  fontSize: number,
  fontFamily = 'Microsoft YaHei',
  fontWeight: string | number = 'normal'
) {
  const result = measureText(text, fontSize, fontFamily, fontWeight);

  return result.actualBoundingBoxLeft + result.actualBoundingBoxRight;
}

/**
 * 测量文本行高
 */
export function measureTextLineHeight(
  text: string,
  fontSize: number,
  fontFamily = 'Microsoft YaHei',
  fontWeight: string | number = 'normal'
) {
  const result = measureText(text, fontSize, fontFamily, fontWeight);

  return result.actualBoundingBoxAscent + result.actualBoundingBoxDescent;
} 