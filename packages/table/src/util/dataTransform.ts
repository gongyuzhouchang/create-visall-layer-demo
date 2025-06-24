/**
 * 数据转换工具
 */

type Val = number | string;
type Obj = { [k: string]: Val };
export type Input = Val | Obj;

/**
 * 检查是否为有效日期字符串
 */
function isValidDateString(str: string): boolean {
  return !isNaN(Date.parse(str));
}

/**
 * 检查是否为对象
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * 对数值和日期进行排序
 */
function sort<D extends Input[]>(
  data: D,
  params: { field?: string; order: 'ascending' | 'descending' }
): D {
  data.sort((a, b) => {
    let [aVal, bVal] = [a, b] as [number, number];
    if (isObject(a)) {
      [aVal, bVal] = [(a as Obj)[params.field!], (b as Obj)[params.field!]] as [number, number];
    }
    if (typeof aVal === 'string') {
      [aVal, bVal] = isValidDateString(aVal)
        ? [new Date(aVal).getTime(), new Date(bVal).getTime()]
        : [+aVal, +bVal];
    }

    return params.order === 'ascending' ? aVal - bVal : bVal - aVal;
  });

  return data;
}

function deDuplication<D extends Input[]>(data: D, params: { field?: string }): D {
  const set = new Set<Val>();

  return (data as Obj[]).filter(item => {
    const val = params?.field ? item[params.field] : (item as unknown as Val);

    if (set.has(val)) {
      return false;
    }

    set.add(val);

    return true;
  }) as D;
}

function toNumeric<D extends Input[]>(data: D, params: { field?: string }): D {
  if (!isObject(data[0])) {
    return (data as Val[]).map(item =>
      item === null || typeof item === 'undefined' ? null : +item
    ) as D;
  }

  return (data as Obj[]).map(item => {
    const val = item[params.field!];

    return { ...item, [params.field!]: val === null || typeof val === 'undefined' ? null : +val };
  }) as D;
}

function find<D extends Input[], Context>(
  data: D,
  params: {
    cb: (this: NonNullable<Context>, value: Input, index: number, arr: readonly Input[]) => boolean;
    context?: Context;
  }
): D[number] | undefined {
  if (!(data && params.cb)) {
    return undefined;
  }
  for (let i = 0; i < data.length; i++) {
    if (params.cb.call(params.context as NonNullable<Context>, data[i], i, data)) {
      return data[i];
    }
  }
  return undefined;
}

function filter<D extends Input[], Context>(
  data: D,
  params: {
    cb: (this: NonNullable<Context>, value: Input, index: number, arr: readonly Input[]) => boolean;
    context?: Context;
  }
): D[number][] {
  if (!data && !params.cb) {
    return [];
  }
  if (data.filter && data.filter === Array.prototype.filter) {
    return data.filter(params.cb, params.context) as D[number][];
  }

  const result: D[number][] = [];
  for (let i = 0; i < data.length; i++) {
    if (params.cb.call(params.context as NonNullable<Context>, data[i], i, data)) {
      result.push(data[i]);
    }
  }
  return result;
}

const transformsMap = {
  sort,
  deDuplication,
  toNumeric,
  find,
  filter
};

export type TransformItem<T extends keyof typeof transformsMap = keyof typeof transformsMap> = {
  type: T;
} & Parameters<(typeof transformsMap)[T]>[1];

type TransformOutput<T extends keyof typeof transformsMap = keyof typeof transformsMap> =
  ReturnType<(typeof transformsMap)[T]>;

export function transform<D extends Input[]>(data: D, params: TransformItem[]) {
  if (data.length === 0) {
    return [] as unknown as TransformOutput;
  }

  return params.reduce(
    // @ts-ignore
    <T extends keyof typeof transformsMap>(
      result: TransformOutput<T>,
      { type, ...transformParams }: TransformItem<T>
    ) => transformsMap[type](result, transformParams) as TransformOutput<T>,
    data.slice() as D
  ) as TransformOutput;
} 