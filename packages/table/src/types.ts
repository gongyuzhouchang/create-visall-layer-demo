/**
 * 数据格式化函数类型
 */
export type TFormatDataFunction = (
  key: string,
  value: number | string,
  showUnit?: boolean
) => string;

/**
 * 数据元信息解析结果类型
 */
export type TDataMetaInfo = {
  [key: string]: {
    name: string;
    type: 'number' | 'string' | 'date';
    unit?: string;
    format?: string;
  };
};

/**
 * 主题Token类型
 */
export type TToken = {
  colorPrimary?: string;
  colorBorder?: string;
  colorText?: string;
  colorBg?: string;
  fontSize?: number;
  fontFamily?: string;
  borderRadius?: number;
  dvTable?: Record<string, string>;
  dvPagination?: Record<string, string>;
  [key: string]: string | number | Record<string, string> | undefined;
};

/**
 * 自定义事件数据类型
 */
export type TCustomEvent = {
  data: Array<{
    dataIndex: number;
    key: string;
    value: string | number;
  }>;
  selectedType: 'cell' | 'row' | 'column' | 'value';
  selectedValue: string | number;
};

/**
 * Hook类型定义
 */
export interface IHook {
  parseDataMetaInfo: (data: unknown) => TDataMetaInfo;
  formatDataNumberValue: TFormatDataFunction;
}

/**
 * 分页组件属性类型
 */
export type TPaginationProps = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  token?: Partial<TToken>;
  onChange?: (page: number) => void;
}; 