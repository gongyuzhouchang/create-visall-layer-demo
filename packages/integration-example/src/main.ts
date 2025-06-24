/**
 * VISALL 组件包集成示例
 * 演示如何使用新的NPM包架构
 */

import { HorizontalTable, VerticalTable, MultiTableX, MultiTableY, TreeTable } from '@visall/table';
import type { TToken } from '@visall/table';
import { Text } from '@visall/text';
import { TimeLine } from '@visall/timeline';

// 主题配置
const themeToken: TToken = {
  colorPrimary: '#1890ff',
  colorBorder: '#d9d9d9',
  colorText: '#262626',
  colorBg: '#ffffff',
  fontSize: 14,
  fontFamily: 'Microsoft YaHei',
  borderRadius: 4
};

// 示例数据
const sampleData = [
  { name: '销售额', Q1: 120, Q2: 150, Q3: 180, Q4: 200 },
  { name: '利润', Q1: 80, Q2: 90, Q3: 100, Q4: 120 },
  { name: '成本', Q1: 40, Q2: 60, Q3: 80, Q4: 80 }
];

// 数据元信息
const dataMetaInfo = {
  name: { name: '指标名称', type: 'string' as const },
  Q1: { name: '第一季度', type: 'number' as const, unit: '万元' },
  Q2: { name: '第二季度', type: 'number' as const, unit: '万元' },
  Q3: { name: '第三季度', type: 'number' as const, unit: '万元' },
  Q4: { name: '第四季度', type: 'number' as const, unit: '万元' }
};

// 格式化函数
const formatData = (key: string, value: number | string, showUnit = true): string => {
  if (typeof value === 'number') {
    const unit = dataMetaInfo[key]?.unit || '';
    return showUnit && unit ? `${value}${unit}` : String(value);
  }
  return String(value);
};

/**
 * 创建水平表格示例
 */
function createHorizontalTableExample() {
  const container = document.createElement('div');
  container.id = 'horizontal-table-example';
  container.innerHTML = '<h3>水平表格示例</h3>';
  
  const tableContainer = document.createElement('div');
  container.appendChild(tableContainer);

  const table = new HorizontalTable(tableContainer, {
    option: {
      data: sampleData,
      rows: ['name'],
      columns: ['Q1', 'Q2', 'Q3', 'Q4'],
      dataMetaInfo
    },
    formatData,
    token: themeToken,
    width: 600,
    maxHeight: 400
  });

  return container;
}

/**
 * 创建垂直表格示例
 */
function createVerticalTableExample() {
  const container = document.createElement('div');
  container.id = 'vertical-table-example';
  container.innerHTML = '<h3>垂直表格示例</h3>';
  
  const tableContainer = document.createElement('div');
  container.appendChild(tableContainer);
  console.log('container: ', container);

  const table = new VerticalTable(tableContainer, {
    "option": {
        "data": [
            {
                "概念Id": "301209",
                "板块Id": "885456",
                "是否置顶": 0,
                "龙头股": "银之杰，华信永道，艾融软件",
                "排序权重": 100000,
                "最佳贡献者": "WYJ_002",
                "股票简称": "同花顺",
                "概念名称": "互联网金融",
                "概念解析": "中国金融信息服务业第一家上市公司，移动互联网证券第三方平台龙头，股票 APP月活量超东方财富和大智慧之和，业内最完整的互联网金融产品公司之一，拥有融合了人工智能大数据等技术的iFinD金融终端、\"问财\"和\"投资机器人\"，业务包括网上行情交易系统、金融资讯及数据服务等。",
                "股票代码": "300033"
            },
            {
                "概念Id": "309126",
                "板块Id": "886074",
                "是否置顶": 0,
                "龙头股": "同花顺，上海钢联，值得买",
                "排序权重": 9000,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "AI语料",
                "概念解析": "根据2023年年报，公司自研的问财 HithinkGPT 大模型是公司从训练语料、训练框架到模型结构的设计，均从零开始、创新构建，预训练金融语料达到万亿级 tokens，涵盖了股票、债券、期货、外汇、商品价格、宏观经济指标、行业数据等多个方面的数据。问财 HithinkGPT 大模型具有全面的实时金融数据、 强大的语义理解、专业的投顾建议、生动的表达形式、可控的内容生成等特点，经过前期多轮测试与优化，该模型在金融场景中表现出色，能够高分通过多个金融领域的专业考试。",
                "股票代码": "300033"
            },
            {
                "概念Id": "309025",
                "板块Id": "886019",
                "是否置顶": 0,
                "龙头股": "华信永道，恒银科技，东方财富",
                "排序权重": 8000,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "AIGC概念",
                "概念解析": "据公司2020年、2021年年报显示：公司的iFinD产品实现了基于语音交互与智能搜索服务、机器阅读研报、研报知识图谱自动生成等一整套智能化解决方案；公司在研智能金融服务平台具有研究基于知识图谱，深度学习技术的内容自动生成技术。",
                "股票代码": "300033"
            },
            {
                "概念Id": "300186",
                "板块Id": "885420",
                "是否置顶": 0,
                "龙头股": "银之杰，恒银科技，同花顺",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "电子商务",
                "概念解析": "公司是最大的网上证券交易、互联网安全密码通讯产品、互联网电子商务软件供应商之一。",
                "股票代码": "300033"
            },
            {
                "概念Id": "300816",
                "板块Id": "885517",
                "是否置顶": 0,
                "龙头股": "赢时胜，润和软件，同花顺",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "机器人概念",
                "概念解析": "公司在金融领域应用人工智能,大数据和云计算等新兴技术，研发具有自然语言语义识别,深度学习，能进行投资逻辑分析,可自动进化演变的“金融大脑”—投资机器人。",
                "股票代码": "300033"
            },
            {
                "概念Id": "302035",
                "板块Id": "885728",
                "是否置顶": 0,
                "龙头股": "银之杰，华信永道，艾融软件",
                "排序权重": 100,
                "最佳贡献者": "mt_682908773",
                "股票简称": "同花顺",
                "概念名称": "人工智能",
                "概念解析": "根据2023年年报，公司继续加大人工智能技术应用研发，尤其是重点加大人工智能大模型相关的技术与公司现有的产品和服务体系之间的融合，为用户提供更好的产品及服务质量，进一步提升公司产品的竞争力。公司致力于打造基于人工智能技术应用的生态圈，推动其成为公司业绩增长的新引擎。同花顺 AI 开放平台目前可面向客户提供数字虚拟人、短视频生成、文章生成、智能金融问答、智能语音、智能客服机器人、智能质检机器人、会议转写系统、智慧政务平台、智能医疗辅助系统等多项 AI 产品及服务，以及智慧金融、智慧政务、智慧医疗、智慧营销、智慧法律等行业解决方案。",
                "股票代码": "300033"
            },
            {
                "概念Id": "300910",
                "板块Id": null,
                "是否置顶": 0,
                "龙头股": "",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "转融券标的",
                "概念解析": "公司是转融券标的股。",
                "股票代码": "300033"
            },
            {
                "概念Id": "307994",
                "板块Id": null,
                "是否置顶": 0,
                "龙头股": "",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "智能金融",
                "概念解析": "公司主要业务是为各类机构客户提供软件产品和系统维护服务、金融数据服务、智能推广服务，为个人投资者提供金融资讯、投资理财分析工具、理财产品投资交易等服务。同时公司已构建同花顺AI开放平台，可面向客户提供智能语音、智能客服、智能金融问答、智能投顾、智能质检机、会议转写系统、智能医疗辅助系统等多项AI产品及服务，可为银行、证券、保险、基金、私募、高校、政府等行业提供智能化解决方案。当前同花顺AI产品及服务正在积极拓展至生活、医疗、教育等更多领域。",
                "股票代码": "300033"
            },
            {
                "概念Id": "307916",
                "板块Id": null,
                "是否置顶": 0,
                "龙头股": "",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "服务机器人",
                "概念解析": "公司在金融领域应用人工智能，大数据和云计算等新兴技术，研发具有自然语言语义识别，深度学习，能进行投资逻辑分析，可自动进化演变的“金融大脑”—投资机器人。",
                "股票代码": "300033"
            },
            {
                "概念Id": "309046",
                "板块Id": "886031",
                "是否置顶": 0,
                "龙头股": "艾融软件，润和软件，同花顺",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "ChatGPT概念",
                "概念解析": "同花顺自主研发的“语音识别技术”在语音识别领域处于第一梯队；据公司2022年年报显示：公司重点打造的 i 问财目前是财经领域落地较为成功的自然语言、语音对话交互问答系统。",
                "股票代码": "300033"
            },
            {
                "概念Id": "300682",
                "板块Id": "885402",
                "是否置顶": 0,
                "龙头股": "同花顺，中科创达，恒银科技",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "智能医疗",
                "概念解析": "同花顺为医疗行业提供智能化解决方案，已构建AI开放平台面向客户提供智能医疗辅助系统等多项AI产品及服务。",
                "股票代码": "300033"
            },
            {
                "概念Id": "309060",
                "板块Id": "886041",
                "是否置顶": 0,
                "龙头股": "银之杰，安硕信息，英方软件",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "数据要素",
                "概念解析": "据2022年年报：公司主要业务是为各类机构客户提供软件产品和系统维护服务、金融数据服务、智能推广服务等；公司拥有来源丰富的海量金融数据资源，具有高效的数据处理与服务能力，为公司进行差异化竞争奠定良好的基础。",
                "股票代码": "300033"
            },
            {
                "概念Id": "301715",
                "板块Id": "885663",
                "是否置顶": 0,
                "龙头股": "金融街，同花顺，东方财富",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "证金持股",
                "概念解析": "",
                "股票代码": "300033"
            },
            {
                "概念Id": "308731",
                "板块Id": "885923",
                "是否置顶": 0,
                "龙头股": "华信永道，艾融软件，润和软件",
                "排序权重": 100,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "鸿蒙概念",
                "概念解析": "根据同花顺智能科技：2023年12月7日，同花顺与华为举行鸿蒙全面合作暨原生应用Beta版本开发完成仪式，宣布已完成同花顺鸿蒙原生应用Beta版本开发，并继续推进全量版本开发。",
                "股票代码": "300033"
            },
            {
                "概念Id": "301636",
                "板块Id": "885694",
                "是否置顶": 0,
                "龙头股": "银之杰，海能达，赢时胜",
                "排序权重": 10,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "深股通",
                "概念解析": "该股是深股通标的。",
                "股票代码": "300033"
            },
            {
                "概念Id": "300900",
                "板块Id": "885338",
                "是否置顶": 0,
                "龙头股": "银之杰，华信永道，艾融软件",
                "排序权重": 10,
                "最佳贡献者": "",
                "股票简称": "同花顺",
                "概念名称": "融资融券",
                "概念解析": "公司是融资融券标的股。",
                "股票代码": "300033"
            }
        ],
        "columns": [
            "概念名称",
            "股票简称",
            "概念解析"
        ],
        "rows": [],
        "dataMetaInfo": {
            "股票简称": {
                "unit": null,
                "isNumber": false,
                "isDate": false,
                "isPercentage": false
            },
            "股票代码": {
                "unit": null,
                "isNumber": false,
                "isDate": false,
                "isPercentage": false
            },
            "概念名称": {
                "unit": "",
                "isNumber": false,
                "isDate": false,
                "isPercentage": false
            },
            "龙头股": {
                "unit": "",
                "isNumber": false,
                "isDate": false,
                "isPercentage": false
            },
            "概念解析": {
                "unit": "",
                "isNumber": false,
                "isDate": false,
                "isPercentage": false
            },
            "概念Id": {
                "unit": "",
                "isNumber": false,
                "isDate": false,
                "isPercentage": false
            },
            "最佳贡献者": {
                "unit": "",
                "isNumber": false,
                "isDate": false,
                "isPercentage": false
            },
            "是否置顶": {
                "unit": "",
                "isNumber": true,
                "isDate": false,
                "isPercentage": false
            },
            "板块Id": {
                "unit": "",
                "isNumber": false,
                "isDate": false,
                "isPercentage": false
            },
            "排序权重": {
                "unit": "",
                "isNumber": true,
                "isDate": false,
                "isPercentage": false
            }
        }
    },
    "pagination": {
        "pageSize": 10,
        "currentPage": 1
    },
    formatData,
    "token": {
        "textStyle": {
            "fontFamily": "Microsoft YaHei",
            "fontWeight": "normal",
            "fontSize": 12,
            "lineHeight": 12
        },
        "dvStandardChart": {
            "baseOption": {
                "grid": {
                    "containLabel": true,
                    "top": 10,
                    "bottom": 5,
                    "left": 0,
                    "right": 5
                },
                "tooltip": {
                    "backgroundColor": "#fff",
                    "extraCssText": "border-radius: 4px; padding: 8px; border-color: transparent; box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);",
                    "confine": true,
                    "textStyle": {
                        "color": "rgba(0, 0, 0, 0.84)",
                        "lineHeight": 16
                    },
                    "dvTitleStyle": {
                        "color": "rgba(15, 15, 15, 0.45)"
                    },
                    "axisPointer": {
                        "label": {
                            "show": true,
                            "backgroundColor": "#3366FF",
                            "padding": [
                                2,
                                4,
                                2,
                                4
                            ],
                            "margin": 5
                        }
                    }
                },
                "dataZoom": [
                    {
                        "type": "slider",
                        "moveOnMouseMove": false,
                        "zoomOnMouseWheel": false,
                        "backgroundColor": "#1D273F",
                        "fillerColor": "#303B65",
                        "dvScrollColor": "#374152",
                        "borderColor": "#60656C",
                        "show": false,
                        "handleIcon": "image://data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDIwPC90aXRsZT4KICAgIDxnIGlkPSLlm77ooajop4TojIPlrozmlbTniYgiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QtMjAiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiLz4KICAgICAgICAgICAgPGcgaWQ9Iuaal+iJsua7keWdlyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4wMDAwMDAsIDAuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjYsMC40IEM2LjE1MjI4NDc1LDAuNCA2LjY1MjI4NDc1LDAuNjIzODU3NjI1IDcuMDE0MjEzNTYsMC45ODU3ODY0MzggQzcuMzc2MTQyMzcsMS4zNDc3MTUyNSA3LjYsMS44NDc3MTUyNSA3LjYsMi40IEw3LjYsMi40IEw3LjYsMTMuNiBDNy42LDE0LjE1MjI4NDcgNy4zNzYxNDIzNywxNC42NTIyODQ3IDcuMDE0MjEzNTYsMTUuMDE0MjEzNiBDNi42NTIyODQ3NSwxNS4zNzYxNDI0IDYuMTUyMjg0NzUsMTUuNiA1LjYsMTUuNiBMNS42LDE1LjYgTDIuNCwxNS42IEMxLjg0NzcxNTI1LDE1LjYgMS4zNDc3MTUyNSwxNS4zNzYxNDI0IDAuOTg1Nzg2NDM4LDE1LjAxNDIxMzYgQzAuNjIzODU3NjI1LDE0LjY1MjI4NDcgMC40LDE0LjE1MjI4NDcgMC40LDEzLjYgTDAuNCwxMy42IEwwLjQsMi40IEMwLjQsMS44NDc3MTUyNSAwLjYyMzg1NzYyNSwxLjM0NzcxNTI1IDAuOTg1Nzg2NDM4LDAuOTg1Nzg2NDM4IEMxLjM0NzcxNTI1LDAuNjIzODU3NjI1IDEuODQ3NzE1MjUsMC40IDIuNCwwLjQgTDIuNCwwLjQgTDIuNCwwLjQgWiIgaWQ9Iui3r+W+hCIgc3Ryb2tlPSIjODI4RkExIiBzdHJva2Utd2lkdGg9IjAuOCIgZmlsbD0iIzU0NUU3MSIvPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuNSwxMCBDNS43NzYxNDIzNywxMCA2LDEwLjIyMzg1NzYgNiwxMC41IEM2LDEwLjc3NjE0MjQgNS43NzYxNDIzNywxMSA1LjUsMTEgTDIuNSwxMSBDMi4yMjM4NTc2MywxMSAyLDEwLjc3NjE0MjQgMiwxMC41IEMyLDEwLjIyMzg1NzYgMi4yMjM4NTc2MywxMCAyLjUsMTAgTDUuNSwxMCBaIE01LjUsNy41IEM1Ljc3NjE0MjM3LDcuNSA2LDcuNzIzODU3NjMgNiw4IEM2LDguMjc2MTQyMzcgNS43NzYxNDIzNyw4LjUgNS41LDguNSBMMi41LDguNSBDMi4yMjM4NTc2Myw4LjUgMiw4LjI3NjE0MjM3IDIsOCBDMiw3LjcyMzg1NzYzIDIuMjIzODU3NjMsNy41IDIuNSw3LjUgTDUuNSw3LjUgWiBNNS41LDUgQzUuNzc2MTQyMzcsNSA2LDUuMjIzODU3NjMgNiw1LjUgQzYsNS43NzYxNDIzNyA1Ljc3NjE0MjM3LDYgNS41LDYgTDIuNSw2IEMyLjIyMzg1NzYzLDYgMiw1Ljc3NjE0MjM3IDIsNS41IEMyLDUuMjIzODU3NjMgMi4yMjM4NTc2Myw1IDIuNSw1IEw1LjUsNSBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjQzRDQUQ1Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
                    }
                ],
                "xAxis": {
                    "axisLine": {
                        "lineStyle": {
                            "color": "#828FA1"
                        },
                        "show": true
                    },
                    "axisPointer": {
                        "shadowStyle": {
                            "opacity": 0.08,
                            "color": "#FFFFFF"
                        },
                        "label": {
                            "margin": 5,
                            "padding": [
                                2,
                                4,
                                2,
                                4
                            ]
                        }
                    },
                    "nameTextStyle": {
                        "dvZ": 5,
                        "align": "right",
                        "verticalAlign": "top",
                        "fontFamily": "Microsoft YaHei",
                        "fontSize": 12,
                        "lineHeight": 12,
                        "padding": [
                            -30,
                            0,
                            0,
                            0
                        ]
                    },
                    "splitLine": {
                        "dvZ": 0,
                        "lineStyle": {}
                    },
                    "nameLocation": "end",
                    "dvNameLocation": "end",
                    "nameGap": 0,
                    "axisTick": {
                        "show": false,
                        "lineStyle": {}
                    },
                    "axisLabel": {
                        "fontFamily": "Microsoft YaHei",
                        "fontSize": 12,
                        "lineHeight": 12,
                        "margin": 8,
                        "showMinLabel": true,
                        "showMaxLabel": true,
                        "hideOverlap": true,
                        "dvAlignEdge": true,
                        "dvIntervalStrategy": "gt16"
                    }
                },
                "yAxis": {
                    "axisLine": {
                        "lineStyle": {
                            "color": "#858585"
                        }
                    },
                    "nameTextStyle": {
                        "dvZ": 5,
                        "align": "left",
                        "verticalAlign": "top",
                        "fontFamily": "Microsoft YaHei",
                        "fontSize": 12,
                        "lineHeight": 12,
                        "padding": [
                            4,
                            0,
                            0,
                            4
                        ]
                    },
                    "splitLine": {
                        "dvZ": 0,
                        "show": true,
                        "lineStyle": {}
                    },
                    "nameLocation": "end",
                    "nameGap": 0,
                    "axisLabel": {
                        "fontFamily": "Microsoft YaHei",
                        "fontSize": 12,
                        "lineHeight": 12
                    },
                    "axisPointer": {
                        "label": {
                            "margin": 5,
                            "padding": [
                                2,
                                4,
                                2,
                                4
                            ]
                        }
                    }
                },
                "xAxis3D": {
                    "axisLine": {
                        "lineStyle": {
                            "color": "#858585"
                        }
                    }
                },
                "yAxis3D": {
                    "axisLine": {
                        "lineStyle": {
                            "color": "#858585"
                        }
                    }
                },
                "zAxis3D": {
                    "axisLine": {
                        "lineStyle": {
                            "color": "#858585"
                        }
                    }
                },
                "grid3D": {
                    "light": {
                        "main": {
                            "intensity": 1.2,
                            "shadow": true
                        },
                        "ambient": {
                            "intensity": 0.3
                        }
                    }
                },
                "dvInsight": [
                    {
                        "textSummary": {
                            "circleStyle": {
                                "type": "circle",
                                "shape": {
                                    "cx": 0,
                                    "cy": 0,
                                    "r": 4
                                },
                                "style": {
                                    "fill": "#FFFFFF",
                                    "stroke": "transparent"
                                },
                                "z2": 9999
                            },
                            "lineStyle": {
                                "type": "line",
                                "style": {
                                    "stroke": "#FFFFFF",
                                    "lineWidth": 1,
                                    "lineHeight": 24
                                },
                                "z2": 9999
                            },
                            "rectStyle": {
                                "type": "rect",
                                "shape": {
                                    "r": 4
                                },
                                "style": {
                                    "fill": "#FFFFFF",
                                    "opacity": 0.8
                                },
                                "z": 9999,
                                "z2": 9999
                            },
                            "textStyle": {
                                "type": "text",
                                "style": {
                                    "x": 0,
                                    "y": 0,
                                    "fill": "#000",
                                    "padding": [
                                        4,
                                        6
                                    ]
                                },
                                "z": 9999,
                                "z2": 9999
                            }
                        },
                        "line": {
                            "lineStyle": {
                                "width": 1,
                                "color": "#F2920D"
                            },
                            "label": {
                                "color": "#F2920D",
                                "textShadowColor": "black",
                                "textShadowBlur": 2
                            }
                        },
                        "referenceLine": {
                            "symbol": "image://data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiPgogICAgPHRpdGxlPuS4ieinkuW9ojwvdGl0bGU+CiAgICA8ZyBpZD0i5Zu+6KGo5rSe5a+fIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMDEu5Zu+6KGo5rSe5a+fbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTQyLjAwMDAwMCwgLTI0NzUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSLkuInop5LlvaIiIHBvaW50cz0iMTE0OCAyNDc1IDExNTQgMjQ4MSAxMTQyIDI0ODEiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
                            "symbolSize": [
                                10,
                                8
                            ],
                            "symbolOffset": [
                                0,
                                "50%"
                            ],
                            "lineStyle": {
                                "width": 2,
                                "color": "#FFF",
                                "type": "solid"
                            }
                        },
                        "axisReferenceLine": {
                            "lineStyle": {
                                "width": 1,
                                "color": "#fff",
                                "type": [
                                    1,
                                    3
                                ]
                            },
                            "label": {
                                "color": "white",
                                "distance": 2,
                                "backgroundColor": "#7E8DFF",
                                "padding": [
                                    4,
                                    6,
                                    2,
                                    6
                                ],
                                "borderRadius": 2,
                                "dvZ": 1000,
                                "dvZ2": 10
                            }
                        },
                        "area": {
                            "itemStyle": {
                                "color": "#F2920D",
                                "opacity": 0.2
                            }
                        },
                        "blurSeries": {
                            "itemStyle": {
                                "opacity": 0.2,
                                "colorAlpha": 0.2
                            },
                            "lineStyle": {
                                "opacity": 0.2
                            },
                            "areaStyle": {
                                "opacity": 0.2
                            }
                        }
                    },
                    {
                        "type": "Trend",
                        "line": {
                            "lineStyle": {
                                "color": "#fff"
                            },
                            "label": {
                                "color": "#fff"
                            }
                        },
                        "textSummary": {
                            "circleStyle": {
                                "type": "circle",
                                "invisible": true
                            }
                        }
                    },
                    {
                        "type": "Interval",
                        "line": {
                            "lineStyle": {
                                "color": "#fff"
                            },
                            "label": {
                                "color": "#fff"
                            }
                        }
                    },
                    {
                        "type": "Text",
                        "textStyle": {
                            "color": "#FFF"
                        }
                    }
                ],
                "series": [
                    {
                        "type": "wordCloud",
                        "dvTextColors": [
                            "#FAFBFC",
                            "#E9EDF6",
                            "#E0E4EA",
                            "#828FA1",
                            "#545E71",
                            "#545E71",
                            "#545E71"
                        ]
                    },
                    {
                        "type": "line",
                        "symbolSize": 8,
                        "emphasis": {
                            "borderWidth": 1.5,
                            "itemStyle": {
                                "opacity": 1
                            }
                        },
                        "endLabel": {
                            "dvZ": 10,
                            "show": false,
                            "offset": [
                                6,
                                -6
                            ],
                            "padding": [
                                6,
                                8,
                                6,
                                8
                            ],
                            "backgroundColor": "rgba(255,255,255,0.7)",
                            "borderColor": "rgba(232,232,232,1)",
                            "borderWidth": 0.5,
                            "borderRadius": 2
                        },
                        "lineStyle": {
                            "width": 1.5
                        },
                        "itemStyle": {
                            "opacity": 0
                        },
                        "stateAnimation": {
                            "duration": 0
                        }
                    },
                    {
                        "type": "bar3D",
                        "shading": "lambert",
                        "label": {
                            "fontSize": 16,
                            "borderWidth": 1
                        }
                    },
                    {
                        "type": "pie",
                        "emphasis": {
                            "itemStyle": {
                                "shadowBlur": 10,
                                "shadowOffsetX": 0,
                                "shadowColor": "rgba(0, 0, 0, 0)"
                            }
                        },
                        "labelLine": {
                            "length": 5
                        },
                        "label": {
                            "color": "#FFF"
                        }
                    },
                    {
                        "type": "gauge",
                        "axisTick": {
                            "show": false,
                            "length": 8,
                            "lineStyle": {
                                "color": "#181E24",
                                "width": 2
                            }
                        },
                        "splitLine": {
                            "show": false,
                            "length": 30,
                            "lineStyle": {
                                "color": "#181E24",
                                "width": 4
                            }
                        },
                        "pointer": {
                            "show": false,
                            "itemStyle": {
                                "color": "auto"
                            }
                        },
                        "title": {
                            "show": false,
                            "fontSize": 12,
                            "lineHeight": 12
                        },
                        "detail": {
                            "show": false,
                            "height": 12,
                            "fontWeight": "normal",
                            "fontSize": 12,
                            "lineHeight": 12,
                            "padding": [
                                2,
                                8,
                                2,
                                8
                            ],
                            "color": "inherit",
                            "borderColor": "inherit",
                            "borderWidth": 1
                        }
                    },
                    {
                        "type": "scatter3D",
                        "shading": "lambert",
                        "label": {
                            "fontSize": 16,
                            "borderWidth": 1
                        }
                    },
                    {
                        "type": "treemap",
                        "itemStyle": {
                            "gapWidth": 1
                        }
                    },
                    {
                        "type": "bar",
                        "barGap": "30%",
                        "barCategoryGap": "20%",
                        "barMaxWidth": 14,
                        "label": {
                            "color": "#FFF"
                        },
                        "axisLabel": {
                            "showMaxLabel": true,
                            "hideOverlap": true,
                            "showMinLabel": true
                        },
                        "dvReferenceLine": {
                            "show": true,
                            "color": "#828FA1"
                        }
                    },
                    {
                        "type": "dvScatter",
                        "dvItemStyle": [
                            {
                                "id": "circle",
                                "textContent": {
                                    "style": {
                                        "fill": "#C8CBD0"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "type": "sankey"
                    }
                ],
                "legend": {
                    "backgroundColor": "transparent",
                    "textStyle": {
                        "fontSize": 12,
                        "lineHeight": 16,
                        "color": "#F2F5FA",
                        "dvDisabledTextColor": "rgba(250,251,252,0.2)"
                    },
                    "dvPagination": {
                        "color": "#F2F5FA",
                        "image": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDY8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjAyLuaXtumXtOi9tOe7hOS7tuminOiJsuaYoOWwhOihqOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NC4wMDAwMDAsIC0xNTc2LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTY45aSH5Lu9LTEzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMi4wMDAwMDAsIDE1MjIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEyLjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJ0cmFuc3BhcmVudC1yZWN0YW5nbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgcm90YXRlKC00NTAuMDAwMDAwKSB0cmFuc2xhdGUoLTguMDAwMDAwLCAtOC4wMDAwMDApICIgcG9pbnRzPSIwIDkuNzk3MTc0MzllLTE2IDE2IDkuNzk3MTc0MzllLTE2IDE2IDE2IDAgMTYiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjI0NDA3NzY4LDUuMjUxMDUxMzMgQzMuNTQ0NDgwOTgsNC45NDIwNjUwOCA0LjAxNzE3MzUzLDQuOTE4Mjk2OSA0LjM0NDA4Mjg3LDUuMTc5NzQ2ODEgTDQuNDIyNTg4OTgsNS4yNTEwNTEzMyBMOCw4LjkzIEwxMS41Nzc0MTEsNS4yNTEwNTEzMyBDMTEuODc3ODE0Myw0Ljk0MjA2NTA4IDEyLjM1MDUwNjksNC45MTgyOTY5IDEyLjY3NzQxNjIsNS4xNzk3NDY4MSBMMTIuNzU1OTIyMyw1LjI1MTA1MTMzIEMxMy4wNTYzMjU2LDUuNTYwMDM3NTggMTMuMDc5NDMzNiw2LjA0NjIzNTYzIDEyLjgyNTI0NjIsNi4zODI0ODUyNCBMMTIuNzU1OTIyMyw2LjQ2MzIzNDM4IEw4LjU4OTI1NTY1LDEwLjc0ODk0ODcgQzguMjg4ODUyMzUsMTEuMDU3OTM0OSA3LjgxNjE1OTgsMTEuMDgxNzAzMSA3LjQ4OTI1MDQ2LDEwLjgyMDI1MzIgTDcuNDEwNzQ0MzUsMTAuNzQ4OTQ4NyBMMy4yNDQwNzc2OCw2LjQ2MzIzNDM4IEMyLjkxODY0MDc3LDYuMTI4NDk5MjggMi45MTg2NDA3Nyw1LjU4NTc4NjQ0IDMuMjQ0MDc3NjgsNS4yNTEwNTEzMyBaIiBpZD0i6Lev5b6ELTMiIGZpbGw9IiNDOENCRDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
                        "imageHover": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDY8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjAyLuaXtumXtOi9tOe7hOS7tuminOiJsuaYoOWwhOihqOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NC4wMDAwMDAsIC0xNTc2LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTY45aSH5Lu9LTEzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMi4wMDAwMDAsIDE1MjIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEyLjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJ0cmFuc3BhcmVudC1yZWN0YW5nbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgcm90YXRlKC00NTAuMDAwMDAwKSB0cmFuc2xhdGUoLTguMDAwMDAwLCAtOC4wMDAwMDApICIgcG9pbnRzPSIwIDkuNzk3MTc0MzllLTE2IDE2IDkuNzk3MTc0MzllLTE2IDE2IDE2IDAgMTYiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjI0NDA3NzY4LDUuMjUxMDUxMzMgQzMuNTQ0NDgwOTgsNC45NDIwNjUwOCA0LjAxNzE3MzUzLDQuOTE4Mjk2OSA0LjM0NDA4Mjg3LDUuMTc5NzQ2ODEgTDQuNDIyNTg4OTgsNS4yNTEwNTEzMyBMOCw4LjkzIEwxMS41Nzc0MTEsNS4yNTEwNTEzMyBDMTEuODc3ODE0Myw0Ljk0MjA2NTA4IDEyLjM1MDUwNjksNC45MTgyOTY5IDEyLjY3NzQxNjIsNS4xNzk3NDY4MSBMMTIuNzU1OTIyMyw1LjI1MTA1MTMzIEMxMy4wNTYzMjU2LDUuNTYwMDM3NTggMTMuMDc5NDMzNiw2LjA0NjIzNTYzIDEyLjgyNTI0NjIsNi4zODI0ODUyNCBMMTIuNzU1OTIyMyw2LjQ2MzIzNDM4IEw4LjU4OTI1NTY1LDEwLjc0ODk0ODcgQzguMjg4ODUyMzUsMTEuMDU3OTM0OSA3LjgxNjE1OTgsMTEuMDgxNzAzMSA3LjQ4OTI1MDQ2LDEwLjgyMDI1MzIgTDcuNDEwNzQ0MzUsMTAuNzQ4OTQ4NyBMMy4yNDQwNzc2OCw2LjQ2MzIzNDM4IEMyLjkxODY0MDc3LDYuMTI4NDk5MjggMi45MTg2NDA3Nyw1LjU4NTc4NjQ0IDMuMjQ0MDc3NjgsNS4yNTEwNTEzMyBaIiBpZD0i6Lev5b6ELTMiIGZpbGw9IiM3RThERkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
                        "imageDisabled": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDY8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjAyLuaXtumXtOi9tOe7hOS7tuminOiJsuaYoOWwhOihqOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NC4wMDAwMDAsIC0xNTc2LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTY45aSH5Lu9LTEzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMi4wMDAwMDAsIDE1MjIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEyLjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJ0cmFuc3BhcmVudC1yZWN0YW5nbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgcm90YXRlKC00NTAuMDAwMDAwKSB0cmFuc2xhdGUoLTguMDAwMDAwLCAtOC4wMDAwMDApICIgcG9pbnRzPSIwIDkuNzk3MTc0MzllLTE2IDE2IDkuNzk3MTc0MzllLTE2IDE2IDE2IDAgMTYiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjI0NDA3NzY4LDUuMjUxMDUxMzMgQzMuNTQ0NDgwOTgsNC45NDIwNjUwOCA0LjAxNzE3MzUzLDQuOTE4Mjk2OSA0LjM0NDA4Mjg3LDUuMTc5NzQ2ODEgTDQuNDIyNTg4OTgsNS4yNTEwNTEzMyBMOCw4LjkzIEwxMS41Nzc0MTEsNS4yNTEwNTEzMyBDMTEuODc3ODE0Myw0Ljk0MjA2NTA4IDEyLjM1MDUwNjksNC45MTgyOTY5IDEyLjY3NzQxNjIsNS4xNzk3NDY4MSBMMTIuNzU1OTIyMyw1LjI1MTA1MTMzIEMxMy4wNTYzMjU2LDUuNTYwMDM3NTggMTMuMDc5NDMzNiw2LjA0NjIzNTYzIDEyLjgyNTI0NjIsNi4zODI0ODUyNCBMMTIuNzU1OTIyMyw2LjQ2MzIzNDM4IEw4LjU4OTI1NTY1LDEwLjc0ODk0ODcgQzguMjg4ODUyMzUsMTEuMDU3OTM0OSA3LjgxNjE1OTgsMTEuMDgxNzAzMSA3LjQ4OTI1MDQ2LDEwLjgyMDI1MzIgTDcuNDEwNzQ0MzUsMTAuNzQ4OTQ4NyBMMy4yNDQwNzc2OCw2LjQ2MzIzNDM4IEMyLjkxODY0MDc3LDYuMTI4NDk5MjggMi45MTg2NDA3Nyw1LjU4NTc4NjQ0IDMuMjQ0MDc3NjgsNS4yNTEwNTEzMyBaIiBpZD0i6Lev5b6ELTMiIGZpbGw9IiM2MDY1NkMiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                    }
                },
                "graphic": {
                    "elements": [
                        {
                            "type": "text",
                            "style": {
                                "fill": "rgba(90, 90, 90, 0.2)"
                            }
                        }
                    ]
                },
                "polar": {
                    "radius": [
                        30,
                        "78%"
                    ],
                    "show": false
                }
            }
        },
        "dvTimeline": {
            "theme": "pc",
            "domCSSText": "padding: 0; box-shadow: none; border-color: transparent;background: #181E25;",
            "config": {
                "axis": {
                    "background": {
                        "style": {
                            "backgroundColor": "#1D273F",
                            "height": "10px"
                        }
                    },
                    "marker": {
                        "style": {
                            "backgroundImage": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDI8L3RpdGxlPgogICAgPGcgaWQ9IuWbvuihqOinhOiMg+WujOaVtOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Iue8lue7hC0yIj4KICAgICAgICAgICAgPHBhdGggZD0iTTUuMTI3NzcwNCwtMi4wNzE2ODA2MmUtMTYgTDEwLjg3MjIyOTYsMi4wNzE2ODA2MmUtMTYgQzEyLjY1NTI2NzEsLTEuMjAzNzA2MWUtMTYgMTMuMzAxODM5NiwwLjE4NTY1MTIyMiAxMy45NTM2OTE0LDAuNTM0MjY1NDA4IEMxNC42MDU1NDMzLDAuODgyODc5NTkzIDE1LjExNzEyMDQsMS4zOTQ0NTY3NCAxNS40NjU3MzQ2LDIuMDQ2MzA4NTkgQzE1LjgxNDM0ODgsMi42OTgxNjA0NCAxNiwzLjM0NDczMjkyIDE2LDUuMTI3NzcwNCBMMTYsMTAuODcyMjI5NiBDMTYsMTIuNjU1MjY3MSAxNS44MTQzNDg4LDEzLjMwMTgzOTYgMTUuNDY1NzM0NiwxMy45NTM2OTE0IEMxNS4xMTcxMjA0LDE0LjYwNTU0MzMgMTQuNjA1NTQzMywxNS4xMTcxMjA0IDEzLjk1MzY5MTQsMTUuNDY1NzM0NiBDMTMuMzAxODM5NiwxNS44MTQzNDg4IDEyLjY1NTI2NzEsMTYgMTAuODcyMjI5NiwxNiBMNS4xMjc3NzA0LDE2IEMzLjM0NDczMjkyLDE2IDIuNjk4MTYwNDQsMTUuODE0MzQ4OCAyLjA0NjMwODU5LDE1LjQ2NTczNDYgQzEuMzk0NDU2NzQsMTUuMTE3MTIwNCAwLjg4Mjg3OTU5MywxNC42MDU1NDMzIDAuNTM0MjY1NDA4LDEzLjk1MzY5MTQgQzAuMTg1NjUxMjIyLDEzLjMwMTgzOTYgOC4wMjQ3MDczMmUtMTcsMTIuNjU1MjY3MSAtMS4zODExMjA0MWUtMTYsMTAuODcyMjI5NiBMMS4zODExMjA0MWUtMTYsNS4xMjc3NzA0IEMtOC4wMjQ3MDczMmUtMTcsMy4zNDQ3MzI5MiAwLjE4NTY1MTIyMiwyLjY5ODE2MDQ0IDAuNTM0MjY1NDA4LDIuMDQ2MzA4NTkgQzAuODgyODc5NTkzLDEuMzk0NDU2NzQgMS4zOTQ0NTY3NCwwLjg4Mjg3OTU5MyAyLjA0NjMwODU5LDAuNTM0MjY1NDA4IEMyLjY5ODE2MDQ0LDAuMTg1NjUxMjIyIDMuMzQ0NzMyOTIsMS4yMDM3MDYxZS0xNiA1LjEyNzc3MDQsLTIuMDcxNjgwNjJlLTE2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiM4MjhGQTEiLz4KICAgICAgICAgICAgPGxpbmUgeDE9IjUiIHkxPSI2IiB4Mj0iNSIgeTI9IjEwIiBpZD0i6Lev5b6EIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgICAgICA8bGluZSB4MT0iOCIgeTE9IjYiIHgyPSI4IiB5Mj0iMTAiIGlkPSLot6/lvoQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMSIgeTE9IjYiIHgyPSIxMSIgeTI9IjEwIiBpZD0i6Lev5b6E5aSH5Lu9IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
                            ":hover": {
                                "backgroundImage": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDU8L3RpdGxlPgogICAgPGcgaWQ9IuWbvuihqOinhOiMg+WujOaVtOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Iue8lue7hC01Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTUuMTI3NzcwNCwtMi4wNzE2ODA2MmUtMTYgTDEwLjg3MjIyOTYsMi4wNzE2ODA2MmUtMTYgQzEyLjY1NTI2NzEsLTEuMjAzNzA2MWUtMTYgMTMuMzAxODM5NiwwLjE4NTY1MTIyMiAxMy45NTM2OTE0LDAuNTM0MjY1NDA4IEMxNC42MDU1NDMzLDAuODgyODc5NTkzIDE1LjExNzEyMDQsMS4zOTQ0NTY3NCAxNS40NjU3MzQ2LDIuMDQ2MzA4NTkgQzE1LjgxNDM0ODgsMi42OTgxNjA0NCAxNiwzLjM0NDczMjkyIDE2LDUuMTI3NzcwNCBMMTYsMTAuODcyMjI5NiBDMTYsMTIuNjU1MjY3MSAxNS44MTQzNDg4LDEzLjMwMTgzOTYgMTUuNDY1NzM0NiwxMy45NTM2OTE0IEMxNS4xMTcxMjA0LDE0LjYwNTU0MzMgMTQuNjA1NTQzMywxNS4xMTcxMjA0IDEzLjk1MzY5MTQsMTUuNDY1NzM0NiBDMTMuMzAxODM5NiwxNS44MTQzNDg4IDEyLjY1NTI2NzEsMTYgMTAuODcyMjI5NiwxNiBMNS4xMjc3NzA0LDE2IEMzLjM0NDczMjkyLDE2IDIuNjk4MTYwNDQsMTUuODE0MzQ4OCAyLjA0NjMwODU5LDE1LjQ2NTczNDYgQzEuMzk0NDU2NzQsMTUuMTE3MTIwNCAwLjg4Mjg3OTU5MywxNC42MDU1NDMzIDAuNTM0MjY1NDA4LDEzLjk1MzY5MTQgQzAuMTg1NjUxMjIyLDEzLjMwMTgzOTYgOC4wMjQ3MDczMmUtMTcsMTIuNjU1MjY3MSAtMS4zODExMjA0MWUtMTYsMTAuODcyMjI5NiBMMS4zODExMjA0MWUtMTYsNS4xMjc3NzA0IEMtOC4wMjQ3MDczMmUtMTcsMy4zNDQ3MzI5MiAwLjE4NTY1MTIyMiwyLjY5ODE2MDQ0IDAuNTM0MjY1NDA4LDIuMDQ2MzA4NTkgQzAuODgyODc5NTkzLDEuMzk0NDU2NzQgMS4zOTQ0NTY3NCwwLjg4Mjg3OTU5MyAyLjA0NjMwODU5LDAuNTM0MjY1NDA4IEMyLjY5ODE2MDQ0LDAuMTg1NjUxMjIyIDMuMzQ0NzMyOTIsMS4yMDM3MDYxZS0xNiA1LjEyNzc3MDQsLTIuMDcxNjgwNjJlLTE2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiM1NDVFNzEiLz4KICAgICAgICAgICAgPGxpbmUgeDE9IjUiIHkxPSI2IiB4Mj0iNSIgeTI9IjEwIiBpZD0i6Lev5b6EIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgICAgICA8bGluZSB4MT0iOCIgeTE9IjYiIHgyPSI4IiB5Mj0iMTAiIGlkPSLot6/lvoQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMSIgeTE9IjYiIHgyPSIxMSIgeTI9IjEwIiBpZD0i6Lev5b6E5aSH5Lu9IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                            },
                            ":active": {
                                "backgroundImage": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDc8L3RpdGxlPgogICAgPGcgaWQ9IuWbvuihqOinhOiMg+WujOaVtOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Iue8lue7hC03Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTUuMTI3NzcwNCwtMi4wNzE2ODA2MmUtMTYgTDEwLjg3MjIyOTYsMi4wNzE2ODA2MmUtMTYgQzEyLjY1NTI2NzEsLTEuMjAzNzA2MWUtMTYgMTMuMzAxODM5NiwwLjE4NTY1MTIyMiAxMy45NTM2OTE0LDAuNTM0MjY1NDA4IEMxNC42MDU1NDMzLDAuODgyODc5NTkzIDE1LjExNzEyMDQsMS4zOTQ0NTY3NCAxNS40NjU3MzQ2LDIuMDQ2MzA4NTkgQzE1LjgxNDM0ODgsMi42OTgxNjA0NCAxNiwzLjM0NDczMjkyIDE2LDUuMTI3NzcwNCBMMTYsMTAuODcyMjI5NiBDMTYsMTIuNjU1MjY3MSAxNS44MTQzNDg4LDEzLjMwMTgzOTYgMTUuNDY1NzM0NiwxMy45NTM2OTE0IEMxNS4xMTcxMjA0LDE0LjYwNTU0MzMgMTQuNjA1NTQzMywxNS4xMTcxMjA0IDEzLjk1MzY5MTQsMTUuNDY1NzM0NiBDMTMuMzAxODM5NiwxNS44MTQzNDg4IDEyLjY1NTI2NzEsMTYgMTAuODcyMjI5NiwxNiBMNS4xMjc3NzA0LDE2IEMzLjM0NDczMjkyLDE2IDIuNjk4MTYwNDQsMTUuODE0MzQ4OCAyLjA0NjMwODU5LDE1LjQ2NTczNDYgQzEuMzk0NDU2NzQsMTUuMTE3MTIwNCAwLjg4Mjg3OTU5MywxNC42MDU1NDMzIDAuNTM0MjY1NDA4LDEzLjk1MzY5MTQgQzAuMTg1NjUxMjIyLDEzLjMwMTgzOTYgOC4wMjQ3MDczMmUtMTcsMTIuNjU1MjY3MSAtMS4zODExMjA0MWUtMTYsMTAuODcyMjI5NiBMMS4zODExMjA0MWUtMTYsNS4xMjc3NzA0IEMtOC4wMjQ3MDczMmUtMTcsMy4zNDQ3MzI5MiAwLjE4NTY1MTIyMiwyLjY5ODE2MDQ0IDAuNTM0MjY1NDA4LDIuMDQ2MzA4NTkgQzAuODgyODc5NTkzLDEuMzk0NDU2NzQgMS4zOTQ0NTY3NCwwLjg4Mjg3OTU5MyAyLjA0NjMwODU5LDAuNTM0MjY1NDA4IEMyLjY5ODE2MDQ0LDAuMTg1NjUxMjIyIDMuMzQ0NzMyOTIsMS4yMDM3MDYxZS0xNiA1LjEyNzc3MDQsLTIuMDcxNjgwNjJlLTE2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiNBOUIyQkUiLz4KICAgICAgICAgICAgPGxpbmUgeDE9IjUiIHkxPSI2IiB4Mj0iNSIgeTI9IjEwIiBpZD0i6Lev5b6EIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgICAgICA8bGluZSB4MT0iOCIgeTE9IjYiIHgyPSI4IiB5Mj0iMTAiIGlkPSLot6/lvoQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMSIgeTE9IjYiIHgyPSIxMSIgeTI9IjEwIiBpZD0i6Lev5b6E5aSH5Lu9IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                            }
                        }
                    },
                    "tickLine": {
                        "main": {
                            "style": {
                                "backgroundColor": "#545E71"
                            }
                        },
                        "sub": {
                            "style": {
                                "backgroundColor": "#2A354E"
                            }
                        }
                    },
                    "tickValue": {
                        "style": {
                            "color": "#A9B2BE",
                            "fontSize": "12px"
                        }
                    },
                    "tooltip": {
                        "style": {
                            "backgroundColor": "#545E71",
                            "color": "#FAFBFC",
                            "borderColor": "transparent"
                        },
                        "textStyle": {
                            "color": "#F2F5FA"
                        },
                        "arrowStyle": {
                            "borderColor": "#545E71 transparent transparent transparent"
                        }
                    }
                },
                "operation": {
                    "playButton": {
                        "style": {
                            "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+R3JvdXAgNjE3PC90aXRsZT4KICAgIDxnIGlkPSLnu4Tku7bop4TliJnnrKzkuozniYgiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLml7bpl7TovbRsaWdodOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg0LjAwMDAwMCwgLTEzNy4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Imljb25fcGxheSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMDAwMDAwLCA0OC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBDMTguNjI3NDE3LC0xLjIxNzQzNjc1ZS0xNSAyNCw1LjM3MjU4MyAyNCwxMiBDMjQsMTguNjI3NDE3IDE4LjYyNzQxNywyNCAxMiwyNCBDNS4zNzI1ODMsMjQgOC4xMTYyNDUwMWUtMTYsMTguNjI3NDE3IDAsMTIgQy04LjExNjI0NTAxZS0xNiw1LjM3MjU4MyA1LjM3MjU4MywxLjIxNzQzNjc1ZS0xNSAxMiwwIFoiIGlkPSLnn6nlvaIiIGZpbGw9IiM3RThERkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTQyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3LjUwMDAwMCwgNi43NTAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsMCBMMTAuNSwwIEwxMC41LDEwLjUgTDAsMTAuNSBMMCwwIFoiIGlkPSLnn6nlvaIiIG9wYWNpdHk9IjAuNDAwMDAwMDA2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05LjQwMTgxODA2LDQuNDQ5MzMyMDMgQzkuNzE4MjkwNDUsNC42MjU5ODMzNiA5LjgzMTYzNzcxLDUuMDI1NzM5MDggOS42NTQ5ODYzOSw1LjM0MjIxMTQ4IEM5LjU5OTA0NCw1LjQ0MjQzMjc3IDkuNTE3Nzk0MjEsNS41MjYyMjg4OSA5LjQxOTM0Njg0LDUuNTg1MjM3MTMgTDIuMTAxNDgzODMsOS45NzE0ODA4NSBDMS43OTA2MTI5OSwxMC4xNTc4MTMzIDEuMzg3NTUwMDMsMTAuMDU2ODU1MiAxLjIwMTIxNzYsOS43NDU5ODQzMyBDMS4xNDAxMjAxNyw5LjY0NDA1MTQxIDEuMTA3ODQ5MTIsOS41Mjc0NDA3OSAxLjEwNzg0OTEyLDkuNDA4NTk5NjUgTDEuMTA3ODQ5MTIsMC45Mzc2MDY3OCBDMS4xMDc4NDkxMiwwLjU3NTE2OTkyOSAxLjQwMTY2MjIzLDAuMjgxMzU2ODEyIDEuNzY0MDk5MDcsMC4yODEzNTY4MTIgQzEuODc2MDcxODEsMC4yODEzNTY4MTIgMS45ODYxODIzMiwwLjMxMDAwNzQxOCAyLjA4Mzk1NDYxLDAuMzY0NTgyODE0IEw5LjQwMTgxODA2LDQuNDQ5MzMyMDMgWiIgaWQ9IuefqeW9oiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+')"
                        }
                    },
                    "pauseButton": {
                        "style": {
                            "backgroundImage": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+aWNvbl9wbGF55aSH5Lu9PC90aXRsZT4KICAgIDxnIGlkPSLnu4Tku7bop4TliJnnrKzkuozniYgiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLml7bpl7TovbRsaWdodOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTkwLjAwMDAwMCwgLTEwMjguMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJpY29uX3BsYXnlpIfku70iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkwLjAwMDAwMCwgMTAyOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMiwwIEMxOC42Mjc0MTcsLTEuMjE3NDM2NzVlLTE1IDI0LDUuMzcyNTgzIDI0LDEyIEMyNCwxOC42Mjc0MTcgMTguNjI3NDE3LDI0IDEyLDI0IEM1LjM3MjU4MywyNCA4LjExNjI0NTAxZS0xNiwxOC42Mjc0MTcgMCwxMiBDLTguMTE2MjQ1MDFlLTE2LDUuMzcyNTgzIDUuMzcyNTgzLDEuMjE3NDM2NzVlLTE1IDEyLDAgWiIgaWQ9IuefqeW9oiIgZmlsbD0iIzYwNjU2QyIvPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4wMDAwMDAsIDcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgb3BhY2l0eT0iMC40MDAwMDAwMDYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjgxMjUsMC42MjUgQzMuMTU3Njc3OTcsMC42MjUgMy40Mzc1LDAuOTA0ODIyMDMxIDMuNDM3NSwxLjI1IEwzLjQzNzUsOC43NSBDMy40Mzc1LDkuMDk1MTc3OTcgMy4xNTc2Nzc5Nyw5LjM3NSAyLjgxMjUsOS4zNzUgTDIuMTg3NSw5LjM3NSBDMS44NDIzMjIwMyw5LjM3NSAxLjU2MjUsOS4wOTUxNzc5NyAxLjU2MjUsOC43NSBMMS41NjI1LDEuMjUgQzEuNTYyNSwwLjkwNDgyMjAzMSAxLjg0MjMyMjAzLDAuNjI1IDIuMTg3NSwwLjYyNSBMMi44MTI1LDAuNjI1IFogTTcuODEyNSwwLjYyNSBDOC4xNTc2Nzc5NywwLjYyNSA4LjQzNzUsMC45MDQ4MjIwMzEgOC40Mzc1LDEuMjUgTDguNDM3NSw4Ljc1IEM4LjQzNzUsOS4wOTUxNzc5NyA4LjE1NzY3Nzk3LDkuMzc1IDcuODEyNSw5LjM3NSBMNy4xODc1LDkuMzc1IEM2Ljg0MjMyMjAzLDkuMzc1IDYuNTYyNSw5LjA5NTE3Nzk3IDYuNTYyNSw4Ljc1IEw2LjU2MjUsMS4yNSBDNi41NjI1LDAuOTA0ODIyMDMxIDYuODQyMzIyMDMsMC42MjUgNy4xODc1LDAuNjI1IEw3LjgxMjUsMC42MjUgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0ZGRkZGRiIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
                            "text": "暂停"
                        }
                    },
                    "previousButton": {
                        "style": {
                            "backgroundColor": "#1D273F",
                            "color": "#A9B2BE",
                            "borderColor": "rgba(84,94,113,1)",
                            ":hover": {
                                "borderColor": "#7E8DFF",
                                "color": "#7E8DFF",
                                "::before": {
                                    "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbl9saXN0X29wZW5OZXc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaXtumXtOi9tGxpZ2h05aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQwLjAwMDAwMCwgLTE0My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC005aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9saXN0X29wZW5OZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC01NDAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4yODMxNzcxNywzLjA5NDEyMDYyIEw4LjQ4MTc0MTc2LDUuNTUzNTgyODEgQzguODA4Nzg4Nyw1Ljc0NTE2MjQ4IDguOTE4NjA2NjMsNi4xNjU1OTI0MiA4LjcyNzAyNjk3LDYuNDkyNjM5MzYgQzguNjY3NjE4MzIsNi41OTQwNTYyNyA4LjU4MzE1ODY2LDYuNjc4NTE1OTMgOC40ODE3NDE3Niw2LjczNzkyNDU3IEw0LjI4MzE3NzE3LDkuMTk3Mzg2NzcgQzMuOTU2MTMwMjMsOS4zODg5NjY0MyAzLjUzNTcwMDI4LDkuMjc5MTQ4NSAzLjM0NDEyMDYyLDguOTUyMTAxNTUgQzMuMjgyNDg3NzUsOC44NDY4ODc2NyAzLjI1LDguNzI3MTUyNjMgMy4yNSw4LjYwNTIxNTg4IEwzLjI1LDMuNjg2MjkxNSBDMy4yNSwzLjMwNzI2MzE3IDMuNTU3MjYzMTcsMyAzLjkzNjI5MTUsMyBDNC4wNTgyMjgyNSwzIDQuMTc3OTYzMjksMy4wMzI0ODc3NSA0LjI4MzE3NzE3LDMuMDk0MTIwNjIgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzdFOERGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                                }
                            },
                            ":disabled": {
                                "borderColor": "rgba(84,94,113,0.4)",
                                "color": "rgba(242,245,250,0.4)",
                                "::before": {
                                    "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbl9saXN0X29wZW5OZXc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaXtumXtOi9tGxpZ2h05aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQwLjAwMDAwMCwgLTE0My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC005aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9saXN0X29wZW5OZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC01NDAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4yODMxNzcxNywzLjA5NDEyMDYyIEw4LjQ4MTc0MTc2LDUuNTUzNTgyODEgQzguODA4Nzg4Nyw1Ljc0NTE2MjQ4IDguOTE4NjA2NjMsNi4xNjU1OTI0MiA4LjcyNzAyNjk3LDYuNDkyNjM5MzYgQzguNjY3NjE4MzIsNi41OTQwNTYyNyA4LjU4MzE1ODY2LDYuNjc4NTE1OTMgOC40ODE3NDE3Niw2LjczNzkyNDU3IEw0LjI4MzE3NzE3LDkuMTk3Mzg2NzcgQzMuOTU2MTMwMjMsOS4zODg5NjY0MyAzLjUzNTcwMDI4LDkuMjc5MTQ4NSAzLjM0NDEyMDYyLDguOTUyMTAxNTUgQzMuMjgyNDg3NzUsOC44NDY4ODc2NyAzLjI1LDguNzI3MTUyNjMgMy4yNSw4LjYwNTIxNTg4IEwzLjI1LDMuNjg2MjkxNSBDMy4yNSwzLjMwNzI2MzE3IDMuNTU3MjYzMTcsMyAzLjkzNjI5MTUsMyBDNC4wNTgyMjgyNSwzIDQuMTc3OTYzMjksMy4wMzI0ODc3NSA0LjI4MzE3NzE3LDMuMDk0MTIwNjIgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzYwNjU2QyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                                }
                            },
                            "::before": {
                                "backgroundImage": "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='12px' height='12px' viewBox='0 0 12 12' version='1.1'%3E%3Ctitle%3Eicon_list_openNew%3C/title%3E%3Cg id='组件规则第二版' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='时间轴light备份' transform='translate(-140.000000, -143.000000)'%3E%3Cg id='编组-4' transform='translate(68.000000, 89.000000)'%3E%3Cg id='编组-4备份-3' transform='translate(16.000000, 48.000000)'%3E%3Cg id='编组-19' transform='translate(48.000000, 0.000000)'%3E%3Cg id='icon_list_openNew' transform='translate(14.000000, 12.000000) scale(1, -1) rotate(-540.000000) translate(-14.000000, -12.000000) translate(8.000000, 6.000000)'%3E%3Crect id='矩形' x='0' y='0' width='12' height='12'/%3E%3Cpath d='M4.28317717,3.09412062 L8.48174176,5.55358281 C8.8087887,5.74516248 8.91860663,6.16559242 8.72702697,6.49263936 C8.66761832,6.59405627 8.58315866,6.67851593 8.48174176,6.73792457 L4.28317717,9.19738677 C3.95613023,9.38896643 3.53570028,9.2791485 3.34412062,8.95210155 C3.28248775,8.84688767 3.25,8.72715263 3.25,8.60521588 L3.25,3.6862915 C3.25,3.30726317 3.55726317,3 3.9362915,3 C4.05822825,3 4.17796329,3.03248775 4.28317717,3.09412062 Z' id='形状结合' fill='%23A9B2BE'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                            }
                        }
                    },
                    "nextButton": {
                        "style": {
                            "backgroundColor": "#1D273F",
                            "color": "#A9B2BE",
                            "borderColor": "rgba(84,94,113,1)",
                            ":hover": {
                                "borderColor": "#7E8DFF",
                                "color": "#7E8DFF",
                                "::before": {
                                    "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbl9saXN0X29wZW5OZXc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaXtumXtOi9tGxpZ2h05aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQwLjAwMDAwMCwgLTE0My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC005aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9saXN0X29wZW5OZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC01NDAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4yODMxNzcxNywzLjA5NDEyMDYyIEw4LjQ4MTc0MTc2LDUuNTUzNTgyODEgQzguODA4Nzg4Nyw1Ljc0NTE2MjQ4IDguOTE4NjA2NjMsNi4xNjU1OTI0MiA4LjcyNzAyNjk3LDYuNDkyNjM5MzYgQzguNjY3NjE4MzIsNi41OTQwNTYyNyA4LjU4MzE1ODY2LDYuNjc4NTE1OTMgOC40ODE3NDE3Niw2LjczNzkyNDU3IEw0LjI4MzE3NzE3LDkuMTk3Mzg2NzcgQzMuOTU2MTMwMjMsOS4zODg5NjY0MyAzLjUzNTcwMDI4LDkuMjc5MTQ4NSAzLjM0NDEyMDYyLDguOTUyMTAxNTUgQzMuMjgyNDg3NzUsOC44NDY4ODc2NyAzLjI1LDguNzI3MTUyNjMgMy4yNSw4LjYwNTIxNTg4IEwzLjI1LDMuNjg2MjkxNSBDMy4yNSwzLjMwNzI2MzE3IDMuNTU3MjYzMTcsMyAzLjkzNjI5MTUsMyBDNC4wNTgyMjgyNSwzIDQuMTc3OTYzMjksMy4wMzI0ODc3NSA0LjI4MzE3NzE3LDMuMDk0MTIwNjIgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzdFOERGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                                }
                            },
                            ":disabled": {
                                "borderColor": "rgba(84,94,113,0.4)",
                                "color": "rgba(242,245,250,0.4)",
                                "::before": {
                                    "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbl9saXN0X29wZW5OZXc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaXtumXtOi9tGxpZ2h05aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQwLjAwMDAwMCwgLTE0My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC005aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9saXN0X29wZW5OZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC01NDAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4yODMxNzcxNywzLjA5NDEyMDYyIEw4LjQ4MTc0MTc2LDUuNTUzNTgyODEgQzguODA4Nzg4Nyw1Ljc0NTE2MjQ4IDguOTE4NjA2NjMsNi4xNjU1OTI0MiA4LjcyNzAyNjk3LDYuNDkyNjM5MzYgQzguNjY3NjE4MzIsNi41OTQwNTYyNyA4LjU4MzE1ODY2LDYuNjc4NTE1OTMgOC40ODE3NDE3Niw2LjczNzkyNDU3IEw0LjI4MzE3NzE3LDkuMTk3Mzg2NzcgQzMuOTU2MTMwMjMsOS4zODg5NjY0MyAzLjUzNTcwMDI4LDkuMjc5MTQ4NSAzLjM0NDEyMDYyLDguOTUyMTAxNTUgQzMuMjgyNDg3NzUsOC44NDY4ODc2NyAzLjI1LDguNzI3MTUyNjMgMy4yNSw4LjYwNTIxNTg4IEwzLjI1LDMuNjg2MjkxNSBDMy4yNSwzLjMwNzI2MzE3IDMuNTU3MjYzMTcsMyAzLjkzNjI5MTUsMyBDNC4wNTgyMjgyNSwzIDQuMTc3OTYzMjksMy4wMzI0ODc3NSA0LjI4MzE3NzE3LDMuMDk0MTIwNjIgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzYwNjU2QyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                                }
                            },
                            "::before": {
                                "backgroundImage": "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='12px' height='12px' viewBox='0 0 12 12' version='1.1'%3E%3Ctitle%3Eicon_list_openNew%3C/title%3E%3Cg id='组件规则第二版' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='时间轴light备份' transform='translate(-140.000000, -143.000000)'%3E%3Cg id='编组-4' transform='translate(68.000000, 89.000000)'%3E%3Cg id='编组-4备份-3' transform='translate(16.000000, 48.000000)'%3E%3Cg id='编组-19' transform='translate(48.000000, 0.000000)'%3E%3Cg id='icon_list_openNew' transform='translate(14.000000, 12.000000) scale(1, -1) rotate(-540.000000) translate(-14.000000, -12.000000) translate(8.000000, 6.000000)'%3E%3Crect id='矩形' x='0' y='0' width='12' height='12'/%3E%3Cpath d='M4.28317717,3.09412062 L8.48174176,5.55358281 C8.8087887,5.74516248 8.91860663,6.16559242 8.72702697,6.49263936 C8.66761832,6.59405627 8.58315866,6.67851593 8.48174176,6.73792457 L4.28317717,9.19738677 C3.95613023,9.38896643 3.53570028,9.2791485 3.34412062,8.95210155 C3.28248775,8.84688767 3.25,8.72715263 3.25,8.60521588 L3.25,3.6862915 C3.25,3.30726317 3.55726317,3 3.9362915,3 C4.05822825,3 4.17796329,3.03248775 4.28317717,3.09412062 Z' id='形状结合' fill='%23A9B2BE'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                            }
                        }
                    }
                }
            }
        },
        "backgroundColor": "transparent",
        "--color-visualization": [
            "#3366FF",
            "#FF4019",
            "#ff9500",
            "#62b312",
            "#14ccbd",
            "#199fff",
            "#4433ff",
            "#ff33aa",
            "#ff33aa",
            "#858585"
        ],
        "--color-text-inverse-primary": "rgba(255,255,255,0.84)",
        "--color-text-inverse-secondary": "rgba(255,255,255,0.6)",
        "--color-text-inverse-tertiary": "rgba(255,255,255,0.4)",
        "--color-text-inverse-quaternary": "rgba(255,255,255,0.24)",
        "--font-weight-regular": 400,
        "--font-weight-medium": 500,
        "--font-weight-bold": 600,
        "--font-size-super-large": 24,
        "--font-size-extra-large": 20,
        "--font-size-large": 18,
        "--font-size-base": 16,
        "--font-size-small": 13,
        "--font-size-extra-small": 12,
        "--font-size-super-small": 11,
        "--font-size-xxs": 10,
        "--font-size-xxxs": 9,
        "--line-height-super-large": 30,
        "--line-height-extra-large": 24,
        "--line-height-large": 22,
        "--line-height-base": 20,
        "--line-height-medium": 18,
        "--line-height-small": 16,
        "--line-height-extra-small": 14,
        "--line-height-super-small": 12,
        "--line-height-xxs": 10,
        "theme": "dark",
        "dvCardBackgroundColor": "#10182E",
        "dvHXKLine": {
            "hxKLine": {
                "option": {
                    "yAxis": {
                        "inside": false,
                        "size": "auto",
                        "tickText": {
                            "family": "Microsoft YaHei"
                        }
                    },
                    "xAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        },
                        "isCenter": false
                    },
                    "candle": {
                        "tooltip": {
                            "showRule": "none",
                            "custom": []
                        },
                        "priceMark": {
                            "show": false
                        },
                        "area": {
                            "lineColor": "#555CF7",
                            "backgroundColor": []
                        }
                    },
                    "indicator": {
                        "yAxis": {
                            "show": true,
                            "position": "right"
                        },
                        "tooltip": {
                            "showRule": "none"
                        },
                        "bars": [
                            {
                                "upColor": "red",
                                "downColor": "green"
                            }
                        ]
                    }
                }
            },
            "hxKLineAndBar": {
                "option": {
                    "xAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        }
                    },
                    "yAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        }
                    },
                    "candle": {
                        "priceMark": {
                            "show": false
                        },
                        "bar": {
                            "upColor": "rgba(250, 82, 80, 0.4)",
                            "downColor": "rgba(50, 189, 168, .4)",
                            "noChangeColor": "rgba(100, 100, 100, .4)",
                            "upBorderColor": "rgba(250, 82, 80, 0.4)",
                            "downBorderColor": "rgba(50, 189, 168, .4)",
                            "noChangeBorderColor": "rgba(100, 100, 100, .4)",
                            "upWickColor": "rgba(250, 82, 80, 0.4)",
                            "downWickColor": "rgba(50, 189, 168, .4)",
                            "noChangeWickColor": "rgba(100, 100, 100, .4)"
                        },
                        "tooltip": {
                            "showRule": "none",
                            "custom": []
                        }
                    },
                    "crosshair": {
                        "horizontal": {
                            "show": false
                        }
                    }
                }
            },
            "hxKLineAndDynamicLine": {
                "option": {
                    "xAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        }
                    },
                    "yAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        }
                    },
                    "candle": {
                        "priceMark": {
                            "show": false
                        },
                        "bar": {
                            "upColor": "rgba(250, 82, 80, 0.4)",
                            "downColor": "rgba(50, 189, 168, .4)",
                            "noChangeColor": "rgba(100, 100, 100, .4)",
                            "upBorderColor": "rgba(250, 82, 80, 0.4)",
                            "downBorderColor": "rgba(50, 189, 168, .4)",
                            "noChangeBorderColor": "rgba(100, 100, 100, .4)",
                            "upWickColor": "rgba(250, 82, 80, 0.4)",
                            "downWickColor": "rgba(50, 189, 168, .4)",
                            "noChangeWickColor": "rgba(100, 100, 100, .4)"
                        },
                        "tooltip": {
                            "showRule": "none",
                            "custom": []
                        }
                    },
                    "crosshair": {
                        "horizontal": {
                            "show": false
                        }
                    },
                    "overlay": {
                        "point": {
                            "color": "rgba(255, 255, 255, 0)",
                            "borderColor": "rgba(255, 255, 255, 0)",
                            "activeColor": "rgba(255, 255, 255, 0)",
                            "activeBorderColor": "rgba(255, 255, 255, 0)"
                        }
                    }
                }
            },
            "hxKLineAndMultiIndicatorLine": {
                "option": {
                    "xAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        }
                    },
                    "yAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        }
                    },
                    "candle": {
                        "priceMark": {
                            "show": false
                        },
                        "bar": {
                            "upColor": "rgba(250, 82, 80, 0.4)",
                            "downColor": "rgba(50, 189, 168, .4)",
                            "noChangeColor": "rgba(100, 100, 100, .4)",
                            "upBorderColor": "rgba(250, 82, 80, 0.4)",
                            "downBorderColor": "rgba(50, 189, 168, .4)",
                            "noChangeBorderColor": "rgba(100, 100, 100, .4)",
                            "upWickColor": "rgba(250, 82, 80, 0.4)",
                            "downWickColor": "rgba(50, 189, 168, .4)",
                            "noChangeWickColor": "rgba(100, 100, 100, .4)"
                        },
                        "tooltip": {
                            "showRule": "none",
                            "custom": []
                        }
                    },
                    "crosshair": {
                        "horizontal": {
                            "show": false
                        }
                    },
                    "overlay": {
                        "point": {
                            "color": "rgba(255, 255, 255, 0)",
                            "borderColor": "rgba(255, 255, 255, 0)",
                            "activeColor": "rgba(255, 255, 255, 0)",
                            "activeBorderColor": "rgba(255, 255, 255, 0)"
                        }
                    }
                }
            },
            "hxKLineAndTag": {
                "rect": {
                    "borderColor": "#545E71",
                    "backgroundColor": "rgba(84, 94, 113, 0.16)",
                    "hoverBackgroundColor": "rgba(99, 111, 255, 0.08)",
                    "activeBackgroundColor": "rgba(99, 111, 255, 0.16)",
                    "activeBorderColor": "#636FFF",
                    "hoverBorderColor": "#636FFF"
                },
                "option": {
                    "xAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        }
                    },
                    "yAxis": {
                        "tickText": {
                            "family": "Microsoft YaHei"
                        },
                        "position": "left"
                    },
                    "candle": {
                        "priceMark": {
                            "show": false
                        },
                        "tooltip": {
                            "showRule": "none",
                            "custom": []
                        }
                    },
                    "crosshair": {
                        "horizontal": {
                            "show": false
                        }
                    }
                }
            },
            "tooltip": {
                "text": {
                    "color": "rgba(255, 255, 255, 0.6)"
                }
            },
            "dataZoom": {
                "backgroundColor": "#60656C",
                "fillerColor": "rgba(15,98,254,0.2)",
                "handleIcon": "image://data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDIwPC90aXRsZT4KICAgIDxnIGlkPSLlm77ooajop4TojIPlrozmlbTniYgiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QtMjAiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiLz4KICAgICAgICAgICAgPGcgaWQ9Iuaal+iJsua7keWdlyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4wMDAwMDAsIDAuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjYsMC40IEM2LjE1MjI4NDc1LDAuNCA2LjY1MjI4NDc1LDAuNjIzODU3NjI1IDcuMDE0MjEzNTYsMC45ODU3ODY0MzggQzcuMzc2MTQyMzcsMS4zNDc3MTUyNSA3LjYsMS44NDc3MTUyNSA3LjYsMi40IEw3LjYsMi40IEw3LjYsMTMuNiBDNy42LDE0LjE1MjI4NDcgNy4zNzYxNDIzNywxNC42NTIyODQ3IDcuMDE0MjEzNTYsMTUuMDE0MjEzNiBDNi42NTIyODQ3NSwxNS4zNzYxNDI0IDYuMTUyMjg0NzUsMTUuNiA1LjYsMTUuNiBMNS42LDE1LjYgTDIuNCwxNS42IEMxLjg0NzcxNTI1LDE1LjYgMS4zNDc3MTUyNSwxNS4zNzYxNDI0IDAuOTg1Nzg2NDM4LDE1LjAxNDIxMzYgQzAuNjIzODU3NjI1LDE0LjY1MjI4NDcgMC40LDE0LjE1MjI4NDcgMC40LDEzLjYgTDAuNCwxMy42IEwwLjQsMi40IEMwLjQsMS44NDc3MTUyNSAwLjYyMzg1NzYyNSwxLjM0NzcxNTI1IDAuOTg1Nzg2NDM4LDAuOTg1Nzg2NDM4IEMxLjM0NzcxNTI1LDAuNjIzODU3NjI1IDEuODQ3NzE1MjUsMC40IDIuNCwwLjQgTDIuNCwwLjQgTDIuNCwwLjQgWiIgaWQ9Iui3r+W+hCIgc3Ryb2tlPSIjODI4RkExIiBzdHJva2Utd2lkdGg9IjAuOCIgZmlsbD0iIzU0NUU3MSIvPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuNSwxMCBDNS43NzYxNDIzNywxMCA2LDEwLjIyMzg1NzYgNiwxMC41IEM2LDEwLjc3NjE0MjQgNS43NzYxNDIzNywxMSA1LjUsMTEgTDIuNSwxMSBDMi4yMjM4NTc2MywxMSAyLDEwLjc3NjE0MjQgMiwxMC41IEMyLDEwLjIyMzg1NzYgMi4yMjM4NTc2MywxMCAyLjUsMTAgTDUuNSwxMCBaIE01LjUsNy41IEM1Ljc3NjE0MjM3LDcuNSA2LDcuNzIzODU3NjMgNiw4IEM2LDguMjc2MTQyMzcgNS43NzYxNDIzNyw4LjUgNS41LDguNSBMMi41LDguNSBDMi4yMjM4NTc2Myw4LjUgMiw4LjI3NjE0MjM3IDIsOCBDMiw3LjcyMzg1NzYzIDIuMjIzODU3NjMsNy41IDIuNSw3LjUgTDUuNSw3LjUgWiBNNS41LDUgQzUuNzc2MTQyMzcsNSA2LDUuMjIzODU3NjMgNiw1LjUgQzYsNS43NzYxNDIzNyA1Ljc3NjE0MjM3LDYgNS41LDYgTDIuNSw2IEMyLjIyMzg1NzYzLDYgMiw1Ljc3NjE0MjM3IDIsNS41IEMyLDUuMjIzODU3NjMgMi4yMjM4NTc2Myw1IDIuNSw1IEw1LjUsNSBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjQzRDQUQ1Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
                "borderColor": "#60656C",
                "textStyle": {
                    "color": "#DADDE0"
                },
                "borderRadius": 1,
                "handleSize": "100%",
                "dataBackground": {
                    "areaStyle": {
                        "color": "#FFFFFF",
                        "opacity": 0
                    },
                    "lineStyle": {
                        "color": "#FFFFFF",
                        "opacity": 0
                    }
                },
                "selectedDataBackground": {
                    "areaStyle": {
                        "opacity": 0
                    },
                    "lineStyle": {
                        "opacity": 0
                    }
                },
                "moveHandleIcon": "path://",
                "moveHandleSize": -32,
                "moveHandleStyle": {
                    "opacity": 0
                },
                "dvMoveHandleOffset": -16
            },
            "constants": {
                "DEFAULT_COLOR_UP": "#FF2436",
                "DEFAULT_COLOR_UP_1": "#802028",
                "DEFAULT_COLOR_UP_2": "#CC2F3C",
                "DEFAULT_COLOR_UP_3": "#F7525F",
                "DEFAULT_COLOR_UP_4": "#FAA1A4",
                "DEFAULT_COLOR_DOWN": "#07AB4B",
                "DEFAULT_COLOR_DOWN_1": "#004D40",
                "DEFAULT_COLOR_DOWN_2": "#06806B",
                "DEFAULT_COLOR_DOWN_3": "#22ABA8",
                "DEFAULT_COLOR_DOWN_4": "#70CCBD",
                "DEFAULT_COLOR_NOCHANGE": "#FF2436",
                "DEFAULT_COLOR_NOCHANGE_1": "#787B86",
                "DEFAULT_COLOR_NOCHANGE_2": "#9598A1",
                "DEFAULT_COLOR_NOCHANGE_3": "#B2B5BE",
                "DEFAULT_COLOR_NOCHANGE_4": "#D1D4DC",
                "DEFAULT_PRIMARY_COLOR": "#7E8DFF",
                "DEFAULT_PRIMARY_COLOR_1": "#143EB2",
                "DEFAULT_PRIMARY_COLOR_2": "#1E53E5",
                "DEFAULT_PRIMARY_COLOR_3": "#3179FE",
                "DEFAULT_PRIMARY_COLOR_4": "#90BFF9",
                "DEFAULT_FONT_SIZE": 10,
                "DEFAULT_FONT_COLOR": "rgba(255, 255, 255, 0.6)",
                "DEFAULT_FONT_COLOR_DEEP": "#FAFBFC",
                "DEFAULT_FONT_COLOR_REVERSE": "#FFFFFF",
                "DEFAULT_FONT_WEIGHT": "normal",
                "DEFAULT_FONT_FAMILY": "-apple-system,BlinkMacSystemFont,Trebuchet MS,Roboto,Ubuntu,sans-serif",
                "DEFAULT_CONTAINER_BG_COLOR": "transparent",
                "DEFAULT_CONTAINER_BG_2_COLOR": "#DDDDDD",
                "DEFAULT_BG_MASK_COLOR": "rgba(0, 0, 0, 0.08)",
                "DEFAULT_LINE_COLOR": "#000000",
                "DEFAULT_LINE_COLOR_1": "#FF9600",
                "DEFAULT_LINE_COLOR_2": "#935EBD",
                "DEFAULT_LINE_COLOR_3": "#2196F3",
                "DEFAULT_LINE_COLOR_4": "#E11D74",
                "DEFAULT_LINE_COLOR_5": "#01C5C4",
                "DEFAULT_GRID_LINE_COLOR": "rgba(255, 255, 255, 0.06)",
                "DEFAULT_TICK_LINE_COLOR": "rgba(255, 255, 255, 0.06)",
                "DEFAULT_CROSSHAIR_LINE_COLOR": "#C4CAD5",
                "DEFAULT_CROSSHAIR_BG_COLOR": "#3366FF",
                "DEFAULT_LINE_DASH_VALUE": [
                    4,
                    2
                ],
                "DEFAULT_TOOLBAR_BG_COLOR": "#FFFFFF",
                "DEFAULT_TOOLBAR_SHADOW_COLOR": "rgba(0, 0, 0, 0.2)",
                "DEFAULT_TOOLBAR_HOVER_COLOR": "rgb(242, 243, 245)",
                "DEFAULT_TOOLBAR_ACTIVE_COLOR": "rgb(229, 230, 235)",
                "DEFAULT_TOOLBAR_BORDER_COLOR": "#dbdbdb",
                "DEFAULT_TOOLBAR_BORDER_HOVER_COLOR": "#bababa",
                "DEFAULT_TOOLBAR_SLIDER_TRACK_BG_COLOR": "#e6e6e6",
                "DEFAULT_TOOLBAR_SLIDER_THUMB_BG_COLOR": "#76808F"
            }
        },
        "dvSelect": {
            "--theme-background": "#181E25",
            "--theme-background-hover": "#313438",
            "--theme-background-select": "#272E50",
            "--theme-border": "#60656C",
            "--theme-option": "#FAFBFC",
            "--theme-label": "#FAFBFC",
            "--theme-label-select": "#6C6BFF",
            "--theme-placeHolder": "#C8CBD0",
            "--theme-option-background": "#313438",
            "--theme-dropdown-icon": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDY8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjAyLuaXtumXtOi9tOe7hOS7tuminOiJsuaYoOWwhOihqOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NC4wMDAwMDAsIC0xNTc2LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTY45aSH5Lu9LTEzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMi4wMDAwMDAsIDE1MjIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEyLjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJ0cmFuc3BhcmVudC1yZWN0YW5nbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgcm90YXRlKC00NTAuMDAwMDAwKSB0cmFuc2xhdGUoLTguMDAwMDAwLCAtOC4wMDAwMDApICIgcG9pbnRzPSIwIDkuNzk3MTc0MzllLTE2IDE2IDkuNzk3MTc0MzllLTE2IDE2IDE2IDAgMTYiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjI0NDA3NzY4LDUuMjUxMDUxMzMgQzMuNTQ0NDgwOTgsNC45NDIwNjUwOCA0LjAxNzE3MzUzLDQuOTE4Mjk2OSA0LjM0NDA4Mjg3LDUuMTc5NzQ2ODEgTDQuNDIyNTg4OTgsNS4yNTEwNTEzMyBMOCw4LjkzIEwxMS41Nzc0MTEsNS4yNTEwNTEzMyBDMTEuODc3ODE0Myw0Ljk0MjA2NTA4IDEyLjM1MDUwNjksNC45MTgyOTY5IDEyLjY3NzQxNjIsNS4xNzk3NDY4MSBMMTIuNzU1OTIyMyw1LjI1MTA1MTMzIEMxMy4wNTYzMjU2LDUuNTYwMDM3NTggMTMuMDc5NDMzNiw2LjA0NjIzNTYzIDEyLjgyNTI0NjIsNi4zODI0ODUyNCBMMTIuNzU1OTIyMyw2LjQ2MzIzNDM4IEw4LjU4OTI1NTY1LDEwLjc0ODk0ODcgQzguMjg4ODUyMzUsMTEuMDU3OTM0OSA3LjgxNjE1OTgsMTEuMDgxNzAzMSA3LjQ4OTI1MDQ2LDEwLjgyMDI1MzIgTDcuNDEwNzQ0MzUsMTAuNzQ4OTQ4NyBMMy4yNDQwNzc2OCw2LjQ2MzIzNDM4IEMyLjkxODY0MDc3LDYuMTI4NDk5MjggMi45MTg2NDA3Nyw1LjU4NTc4NjQ0IDMuMjQ0MDc3NjgsNS4yNTEwNTEzMyBaIiBpZD0i6Lev5b6ELTMiIGZpbGw9IiNGQUZCRkMiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-label-hover": "#6C6BFF"
        },
        "dvText": {
            "--theme-background": "transparent",
            "--theme-text-color": "#C4CAD5",
            "--theme-title-color": "#FFD993",
            "--theme-text-background-normal": "#131C30",
            "--theme-text-background-hover": "#1D273F",
            "--theme-text-background-select": "#2C375D"
        },
        "dvTimeLine": {
            "--theme-background": "transparent",
            "--theme-border": "#7E8DFF",
            "--theme-line-border": "#545E71",
            "--theme-label": "#828FA1",
            "--theme-label-background": "rgba(99,111,255,0.28)",
            "--theme-time": "#828FA1",
            "--theme-text": "#FFD993",
            "--theme-link": "#7E8DFF",
            "--theme-text-hover": "#1D273F",
            "--theme-text-select": "#2C375D",
            "--theme-button-color": "#7E8DFF"
        },
        "dvTable": {
            "--theme-border": "#2A354E",
            "--theme-border-select": "#7E8DFF",
            "--theme-header-background": "#1D273F",
            "--theme-header-text": "#C4CAD5",
            "--theme-normal-background": "#10182E",
            "--theme-normal-text": "#FFD993",
            "--theme-header-hover": "#2A354E",
            "--theme-normal-hover": "#1D273F",
            "--theme-header-select": "#2C375D",
            "--theme-icon-container": "linear-gradient(90deg, rgba(49,52,56,0.00) 0%, #1D273F 20%)",
            "--theme-icon-container-hover": "linear-gradient(90deg, rgba(72,76,81,0.00) 0%, #2A354E 20%)",
            "--theme-icon-container-selected": "linear-gradient(90deg, rgba(59,63,95,0.00) 0%, #2C375D 20%)",
            "--theme-expand-icon-background": "linear-gradient(90deg, rgba(16,24,46,0.00) 0%, #10182E 20%)",
            "--theme-sort-icon-container-hover": "#545E71",
            "--theme-tree-icon-hover": "#545E71",
            "--theme-icon-up": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwMi4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaLlpIfku70tMTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSI2Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuNDUyMDQzOTMsMC41Njk4NDU1MDIgTDIuNDUyOTg1NjQsNC4xMzg0NzI5NSBDMi4xNDY5NzUwNiw0LjUwMjU5OTg0IDIuNDYzMzM1OTIsNSAzLjAwMDk0MTcxLDUgTDguOTk5MDU4MjksNSBDOS41MzY2NjQwOCw1IDkuODUzMDI0OTQsNC41MDI1OTk4NCA5LjU0NzAxNDM2LDQuMTM4NDcyOTUgTDYuNTQ3OTU2MDcsMC41Njk4NDU1MDIgQzYuMjgyOTM3NzMsMC4yNTQ0OTU5NDQgNS43MTcwNjIyNywwLjI1NDQ5NTk0NCA1LjQ1MjA0MzkzLDAuNTY5ODQ1NTAyIFoiIGlkPSLot6/lvoQiIGZpbGw9IiNDOENCRDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-icon-up-enable": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwMi4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaLlpIfku70tMTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSI2Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuNDUyMDQzOTMsMC41Njk4NDU1MDIgTDIuNDUyOTg1NjQsNC4xMzg0NzI5NSBDMi4xNDY5NzUwNiw0LjUwMjU5OTg0IDIuNDYzMzM1OTIsNSAzLjAwMDk0MTcxLDUgTDguOTk5MDU4MjksNSBDOS41MzY2NjQwOCw1IDkuODUzMDI0OTQsNC41MDI1OTk4NCA5LjU0NzAxNDM2LDQuMTM4NDcyOTUgTDYuNTQ3OTU2MDcsMC41Njk4NDU1MDIgQzYuMjgyOTM3NzMsMC4yNTQ0OTU5NDQgNS43MTcwNjIyNywwLjI1NDQ5NTk0NCA1LjQ1MjA0MzkzLDAuNTY5ODQ1NTAyIFoiIGlkPSLot6/lvoQiIGZpbGw9IiM3RThERkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-icon-down": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwOC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA5LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC05LjAwMDAwMCkgdHJhbnNsYXRlKDAuMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9LTEyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS40NTIwNDM5MywwLjU2OTg0NTUwMiBMMi40NTI5ODU2NCw0LjEzODQ3Mjk1IEMyLjE0Njk3NTA2LDQuNTAyNTk5ODQgMi40NjMzMzU5Miw1IDMuMDAwOTQxNzEsNSBMOC45OTkwNTgyOSw1IEM5LjUzNjY2NDA4LDUgOS44NTMwMjQ5NCw0LjUwMjU5OTg0IDkuNTQ3MDE0MzYsNC4xMzg0NzI5NSBMNi41NDc5NTYwNywwLjU2OTg0NTUwMiBDNi4yODI5Mzc3MywwLjI1NDQ5NTk0NCA1LjcxNzA2MjI3LDAuMjU0NDk1OTQ0IDUuNDUyMDQzOTMsMC41Njk4NDU1MDIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0M4Q0JEMCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-icon-down-enable": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwOC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA5LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC05LjAwMDAwMCkgdHJhbnNsYXRlKDAuMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9LTEyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS40NTIwNDM5MywwLjU2OTg0NTUwMiBMMi40NTI5ODU2NCw0LjEzODQ3Mjk1IEMyLjE0Njk3NTA2LDQuNTAyNTk5ODQgMi40NjMzMzU5Miw1IDMuMDAwOTQxNzEsNSBMOC45OTkwNTgyOSw1IEM5LjUzNjY2NDA4LDUgOS44NTMwMjQ5NCw0LjUwMjU5OTg0IDkuNTQ3MDE0MzYsNC4xMzg0NzI5NSBMNi41NDc5NTYwNywwLjU2OTg0NTUwMiBDNi4yODI5Mzc3MywwLjI1NDQ5NTk0NCA1LjcxNzA2MjI3LDAuMjU0NDk1OTQ0IDUuNDUyMDQzOTMsMC41Njk4NDU1MDIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iIzdFOERGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-expand-icon-text": "#828FA1",
            "--theme-expand-icon-down": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwOC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA5LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC05LjAwMDAwMCkgdHJhbnNsYXRlKDAuMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9LTEyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS40NTIwNDM5MywwLjU2OTg0NTUwMiBMMi40NTI5ODU2NCw0LjEzODQ3Mjk1IEMyLjE0Njk3NTA2LDQuNTAyNTk5ODQgMi40NjMzMzU5Miw1IDMuMDAwOTQxNzEsNSBMOC45OTkwNTgyOSw1IEM5LjUzNjY2NDA4LDUgOS44NTMwMjQ5NCw0LjUwMjU5OTg0IDkuNTQ3MDE0MzYsNC4xMzg0NzI5NSBMNi41NDc5NTYwNywwLjU2OTg0NTUwMiBDNi4yODI5Mzc3MywwLjI1NDQ5NTk0NCA1LjcxNzA2MjI3LDAuMjU0NDk1OTQ0IDUuNDUyMDQzOTMsMC41Njk4NDU1MDIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iIzgyOEZBMSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
        },
        "dvDropdown": {
            "--theme-text": "#FAFBFC",
            "--theme-text-hover": "#6C6BFF",
            "--theme-background": "#181E25",
            "--theme-background-hover": "#313438",
            "--theme-background-select": "#272E50",
            "--theme-border": "#60656C",
            "--theme-kline-text": "#C8CBD0",
            "--theme-kline-text-hover": "#FAFBFC",
            "--theme-dropdown": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiBmaWxsPSJub25lIj4KICAgICAgPHBhdGggZD0iTTguOTgwOTEgMy45NzExOUM4LjkwMDgzIDMuOTcxMTkgOC44MjU1OSA0LjAwOTU2IDguNzc4NTYgNC4wNzQzOUw1Ljk5OTc0IDcuOTA0NjdMMy4yMjA5MiA0LjA3NDM5QzMuMTczODkgNC4wMDk1NiAzLjA5ODY1IDMuOTcxMTkgMy4wMTg1NyAzLjk3MTE5SDIuMDA1MzZDMS45Mzc1NiAzLjk3MTE5IDEuODk4MTMgNC4wNDc4NCAxLjkzNzU3IDQuMTAyOTlMMy4yOTE3MSA1Ljk5Njg2TDUuNjUyODcgOS4yNTJDNS44MjQyOSA5LjQ4NzcxIDYuMTc1MTkgOS40ODc3MSA2LjM0NTI4IDkuMjUyTDguNzA2NDQgNS45OTY4NkwxMC4wNjA2IDQuMTAyOTlDMTAuMSA0LjA0Nzg0IDEwLjA2MDYgMy45NzExOSA5Ljk5Mjc5IDMuOTcxMTlIOC45ODA5MVoiIGZpbGw9IiNGQUZCRkMiIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgogICAgPC9zdmc+')",
            "--theme-default-dropdown": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiBmaWxsPSJub25lIj4KICAgICAgPHBhdGggZD0iTTMuODUzNTUgNS44NTM1NUMzLjUzODU3IDUuNTM4NTcgMy43NjE2NSA1IDQuMjA3MTEgNUg4Ljc5Mjg5QzkuMjM4MzUgNSA5LjQ2MTQzIDUuNTM4NTcgOS4xNDY0NSA1Ljg1MzU1TDcuMjA3MTEgNy43OTI4OUM2LjgxNjU4IDguMTgzNDIgNi4xODM0MiA4LjE4MzQyIDUuNzkyODkgNy43OTI4OUwzLjg1MzU1IDUuODUzNTVaIiBmaWxsPSIjRkFGQkZDIi8+CiAgICA8L3N2Zz4=')"
        },
        "dvPagination": {
            "--theme-button": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjA1Lum7keeZveeJiOWvueavlOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MjEuMDAwMDAwLCAtMjA1LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTI05aSH5Lu9LTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MTcuMDAwMDAwLCAyMDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCAzLjgwMDAwMCkiIGZpbGw9IiNGQUZCRkMiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IEMtMC4yNDg5NDQ0NDMsLTAuNzQxMDA1MDUxIDAuMTM0NjYzMTMsLTAuNzY1NjA4MDgxIDAuNDA4MjA4ODg4LC0wLjU2ODc4MzgzOCBMMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IEw0LjY5NDk3NDc1LDMuNzA1MDI1MjUgQzQuOTQxMDA1MDUsMy45NTEwNTU1NiA0Ljk2NTYwODA4LDQuMzM0NjYzMTMgNC43Njg3ODM4NCw0LjYwODIwODg5IEw0LjY5NDk3NDc1LDQuNjk0OTc0NzUgTDAuNDk0OTc0NzQ3LDguODk0OTc0NzUgQzAuMjIxNjA3NzQzLDkuMTY4MzQxNzUgLTAuMjIxNjA3NzQzLDkuMTY4MzQxNzUgLTAuNDk0OTc0NzQ3LDguODk0OTc0NzUgQy0wLjc0MTAwNTA1MSw4LjY0ODk0NDQ0IC0wLjc2NTYwODA4MSw4LjI2NTMzNjg3IC0wLjU2ODc4MzgzOCw3Ljk5MTc5MTExIEwtMC40OTQ5NzQ3NDcsNy45MDUwMjUyNSBMMy4yMTEsNC4yIEwtMC40OTQ5NzQ3NDcsMC40OTQ5NzQ3NDcgQy0wLjc0MTAwNTA1MSwwLjI0ODk0NDQ0MyAtMC43NjU2MDgwODEsLTAuMTM0NjYzMTMgLTAuNTY4NzgzODM4LC0wLjQwODIwODg4OCBMLTAuNDk0OTc0NzQ3LC0wLjQ5NDk3NDc0NyBaIiBpZD0i6Lev5b6EIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-more": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDg8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjA1Lum7keeZveeJiOWvueavlOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2NjEuMDAwMDAwLCAtMjMzLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0NjUuMDAwMDAwLCAyMjkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOTIuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIuMDAwMDAwLCAxMi4wMDAwMDApIHJvdGF0ZSgtMjcwLjAwMDAwMCkgdHJhbnNsYXRlKC0xMi4wMDAwMDAsIC0xMi4wMDAwMDApIHRyYW5zbGF0ZSg0LjAwMDAwMCwgNC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgcm90YXRlKC0yNzAuMDAwMDAwKSB0cmFuc2xhdGUoLTguMDAwMDAwLCAtOC4wMDAwMDApIHRyYW5zbGF0ZSgyLjQwMDAwMCwgNi44MDAwMDApIiBmaWxsPSIjRkFGQkZDIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9IuakreWchuW9oiIgY3g9IjEuMTIiIGN5PSIxLjIiIHJ4PSIxLjEyIiByeT0iMS4yIj48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0i5qSt5ZyG5b2iIiBjeD0iNS42IiBjeT0iMS4yIiByeD0iMS4xMiIgcnk9IjEuMiI+PC9lbGxpcHNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9IuakreWchuW9oiIgY3g9IjEwLjA4IiBjeT0iMS4yIiByeD0iMS4xMiIgcnk9IjEuMiI+PC9lbGxpcHNlPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-fast": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjA1Lum7keeZveeJiOWvueavlOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MjEuMDAwMDAwLCAtMjMzLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTI05aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MTcuMDAwMDAwLCAyMjkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIvPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuODAwMDAwLCAzLjgwMDAwMCkiIGZpbGw9IiM3RThERkYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IEMtMC4yNDg5NDQ0NDMsLTAuNzQxMDA1MDUxIDAuMTM0NjYzMTMsLTAuNzY1NjA4MDgxIDAuNDA4MjA4ODg4LC0wLjU2ODc4MzgzOCBMMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IEw0LjY5NDk3NDc1LDMuNzA1MDI1MjUgQzQuOTQxMDA1MDUsMy45NTEwNTU1NiA0Ljk2NTYwODA4LDQuMzM0NjYzMTMgNC43Njg3ODM4NCw0LjYwODIwODg5IEw0LjY5NDk3NDc1LDQuNjk0OTc0NzUgTDAuNDk0OTc0NzQ3LDguODk0OTc0NzUgQzAuMjIxNjA3NzQzLDkuMTY4MzQxNzUgLTAuMjIxNjA3NzQzLDkuMTY4MzQxNzUgLTAuNDk0OTc0NzQ3LDguODk0OTc0NzUgQy0wLjc0MTAwNTA1MSw4LjY0ODk0NDQ0IC0wLjc2NTYwODA4MSw4LjI2NTMzNjg3IC0wLjU2ODc4MzgzOCw3Ljk5MTc5MTExIEwtMC40OTQ5NzQ3NDcsNy45MDUwMjUyNSBMMy4yMTEsNC4yIEwtMC40OTQ5NzQ3NDcsMC40OTQ5NzQ3NDcgQy0wLjc0MTAwNTA1MSwwLjI0ODk0NDQ0MyAtMC43NjU2MDgwODEsLTAuMTM0NjYzMTMgLTAuNTY4NzgzODM4LC0wLjQwODIwODg4OCBMLTAuNDk0OTc0NzQ3LC0wLjQ5NDk3NDc0NyBaIiBpZD0i6Lev5b6EIi8+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjcwNTAyNTI1LC0wLjQ5NDk3NDc0NyBDMy45NTEwNTU1NiwtMC43NDEwMDUwNTEgNC4zMzQ2NjMxMywtMC43NjU2MDgwODEgNC42MDgyMDg4OSwtMC41Njg3ODM4MzggTDQuNjk0OTc0NzUsLTAuNDk0OTc0NzQ3IEw4Ljg5NDk3NDc1LDMuNzA1MDI1MjUgQzkuMTQxMDA1MDUsMy45NTEwNTU1NiA5LjE2NTYwODA4LDQuMzM0NjYzMTMgOC45Njg3ODM4NCw0LjYwODIwODg5IEw4Ljg5NDk3NDc1LDQuNjk0OTc0NzUgTDQuNjk0OTc0NzUsOC44OTQ5NzQ3NSBDNC40MjE2MDc3NCw5LjE2ODM0MTc1IDMuOTc4MzkyMjYsOS4xNjgzNDE3NSAzLjcwNTAyNTI1LDguODk0OTc0NzUgQzMuNDU4OTk0OTUsOC42NDg5NDQ0NCAzLjQzNDM5MTkyLDguMjY1MzM2ODcgMy42MzEyMTYxNiw3Ljk5MTc5MTExIEwzLjcwNTAyNTI1LDcuOTA1MDI1MjUgTDcuNDExLDQuMiBMMy43MDUwMjUyNSwwLjQ5NDk3NDc0NyBDMy40NTg5OTQ5NSwwLjI0ODk0NDQ0MyAzLjQzNDM5MTkyLC0wLjEzNDY2MzEzIDMuNjMxMjE2MTYsLTAuNDA4MjA4ODg4IEwzLjcwNTAyNTI1LC0wLjQ5NDk3NDc0NyBaIiBpZD0i6Lev5b6EIi8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-button-disabled": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjA1Lum7keeZveeJiOWvueavlOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MjEuMDAwMDAwLCAtMjA1LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTI05aSH5Lu9LTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MTcuMDAwMDAwLCAyMDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCAzLjgwMDAwMCkiIGZpbGw9InJnYmEoMjUwLDI1MSwyNTIsMC40KSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTS0wLjQ5NDk3NDc0NywtMC40OTQ5NzQ3NDcgQy0wLjI0ODk0NDQ0MywtMC43NDEwMDUwNTEgMC4xMzQ2NjMxMywtMC43NjU2MDgwODEgMC40MDgyMDg4ODgsLTAuNTY4NzgzODM4IEwwLjQ5NDk3NDc0NywtMC40OTQ5NzQ3NDcgTDQuNjk0OTc0NzUsMy43MDUwMjUyNSBDNC45NDEwMDUwNSwzLjk1MTA1NTU2IDQuOTY1NjA4MDgsNC4zMzQ2NjMxMyA0Ljc2ODc4Mzg0LDQuNjA4MjA4ODkgTDQuNjk0OTc0NzUsNC42OTQ5NzQ3NSBMMC40OTQ5NzQ3NDcsOC44OTQ5NzQ3NSBDMC4yMjE2MDc3NDMsOS4xNjgzNDE3NSAtMC4yMjE2MDc3NDMsOS4xNjgzNDE3NSAtMC40OTQ5NzQ3NDcsOC44OTQ5NzQ3NSBDLTAuNzQxMDA1MDUxLDguNjQ4OTQ0NDQgLTAuNzY1NjA4MDgxLDguMjY1MzM2ODcgLTAuNTY4NzgzODM4LDcuOTkxNzkxMTEgTC0wLjQ5NDk3NDc0Nyw3LjkwNTAyNTI1IEwzLjIxMSw0LjIgTC0wLjQ5NDk3NDc0NywwLjQ5NDk3NDc0NyBDLTAuNzQxMDA1MDUxLDAuMjQ4OTQ0NDQzIC0wLjc2NTYwODA4MSwtMC4xMzQ2NjMxMyAtMC41Njg3ODM4MzgsLTAuNDA4MjA4ODg4IEwtMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IFoiIGlkPSLot6/lvoQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')",
            "--theme-background-color-disabled": "rgba(24,30,37,0.4)",
            "--theme-background-color": "#181E25",
            "--theme-border-color": "#60656C",
            "--theme-background-color-selected": "#2C375D",
            "--theme-font-color-selected": "#7E8DFF",
            "--theme-border-color-selected": "#7E8DFF",
            "--theme-background-color-hover": "#313438",
            "--theme-font-color-hover": "#FFFFFF",
            "--theme-font-color": "#FFFFFF"
        },
        "dvButtonGroup": {
            "--theme-container-background-color": "#60656C",
            "--theme-color": "#C8CBD0",
            "--theme-color-hover": "#7E8DFF",
            "--theme-background-color-selected": "#24282E",
            "--theme-color-selected": "#7E8DFF",
            "--theme-background-color": "#181E25"
        },
        "dvScrollButtonGroup": {
            "--theme-background-color": "#313438",
            "--theme-color": "#C8CBD0",
            "--theme-background-color-hover": "#60656C",
            "--theme-color-hover": "#FAFBFC",
            "--theme-color-selected": "#7E8DFF",
            "--theme-background-color-selected": "#2D3461"
        },
        "dvTreemapLevelStyle": {
            "labelOpenIcon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExIDVWN0gxMlY0SDlWNUgxMVoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuODQiLz4KPHBhdGggZD0iTTUgMTFWOUg0VjEySDdWMTFINVoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuODQiLz4KPHBhdGggZD0iTTEzIDJDMTMuNTUyMyAyIDE0IDIuNDQ3NzIgMTQgM1YxM0MxNCAxMy41NTIzIDEzLjU1MjMgMTQgMTMgMTRIM0MyLjQ0NzcyIDE0IDIgMTMuNTUyMyAyIDEzVjNDMiAyLjQ0NzcyIDIuNDQ3NzIgMiAzIDJIMTNaTTEzIDNIM1YxM0gxM1YzWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC44NCIvPgo8L3N2Zz4K",
            "labelCloseIcon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEzNjFfMTQ2NTkpIj4KPHBhdGggZD0iTTEzIDJDMTMuNTUyMyAyIDE0IDIuNDQ3NzIgMTQgM1YxM0MxNCAxMy41NTIzIDEzLjU1MjMgMTQgMTMgMTRIM0MyLjQ0NzcyIDE0IDIgMTMuNTUyMyAyIDEzVjNDMiAyLjQ0NzcyIDIuNDQ3NzIgMiAzIDJIMTNaTTEzIDNIM1YxM0gxM1YzWk0xMiA5VjEwSDEwVjEySDlWOUgxMlpNNyA0VjdINFY2SDZWNEg3WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC44NCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEzNjFfMTQ2NTkiPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==",
            "labelColor": "#fff",
            "level_2": {
                "itemStyleBorderColor": "rgba(42, 53, 78, 1)",
                "upperLabelBackgroundColorE": "rgba(48, 61, 89, 1)",
                "upperLabelBackgroundColor": "rgba(42, 53, 78, 1)"
            },
            "level_3": {
                "upperLabelBackgroundColorE": "rgba(91, 102, 122, 1)",
                "upperLabelBackgroundColor": "rgba(84, 94, 113, 1)"
            }
        },
        "dvMarkerLine": {
            "titleColor": "#fff",
            "descColor": "#C4CAD5",
            "scatterBorderColor": "#fff",
            "markerBackground": "rgba(0, 0, 0, 0.5)",
            "markerCircleColor": "#000"
        },
        "dvRadar": {
            "axisLine": {
                "lineStyle": {
                    "color": "#2A354E"
                }
            },
            "splitLine": {
                "lineStyle": {
                    "color": "#2A354E"
                }
            },
            "axisName": {
                "color": "#F2F5FA"
            },
            "splitArea": {
                "areaStyle": {
                    "color": []
                }
            }
        },
        "seriesCnt": "12",
        "titleColor": "#fafbfc",
        "subtitleColor": "#C4CAD5",
        "textColorShow": false,
        "textColor": "#333",
        "markTextColor": "#313438",
        "color": [
            "#636FFF",
            "#FF7A01",
            "#33B2CC",
            "#B388FF",
            "#A6C8FF",
            "#F06292",
            "#33B1FF",
            "#FFAD3B",
            "#3147A4",
            "#DA1E28"
        ],
        "borderColor": "#000000",
        "borderWidth": "1",
        "visualMapColor": [
            "#ff6c6f",
            "#e63c47",
            "#ad0126",
            "#7c0105",
            "#004e1a",
            "#007a39",
            "#2fa861",
            "#6bc78b",
            "#ffbebf"
        ],
        "legendTextColor": "#92989f",
        "kColor": "#ff4a4a",
        "kColor0": "#00b36b",
        "kBorderColor": "#ff4a4a",
        "kBorderColor0": "#00b36b",
        "kBorderWidth": 1,
        "lineWidth": 2,
        "symbolSize": "8",
        "symbol": "circle",
        "symbolBorderWidth": "2",
        "lineSmooth": false,
        "graphLineWidth": 1,
        "graphLineColor": "#aeb2b7",
        "mapLabelColor": "#000",
        "mapLabelColorE": "rgb(100,0,0)",
        "mapBorderColor": "#444",
        "mapBorderColorE": "#444",
        "mapBorderWidth": 0.5,
        "mapBorderWidthE": 1,
        "mapAreaColor": "#eee",
        "mapAreaColorE": "rgba(255,215,0,0.8)",
        "axes": [
            {
                "type": "all",
                "name": "通用坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#2A354E",
                "axisTickShow": false,
                "axisTickColor": "#484c51",
                "axisLabelShow": true,
                "axisLabelColor": "#A9B2BE",
                "splitLineShow": true,
                "splitLineColor": [
                    "#1D273F"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "#eeeeee"
                ]
            },
            {
                "type": "category",
                "name": "类目坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#333",
                "axisTickShow": true,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#333",
                "splitLineShow": false,
                "splitLineColor": [
                    "#1D273F"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            },
            {
                "type": "value",
                "name": "数值坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#333",
                "axisTickShow": true,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#333",
                "splitLineShow": true,
                "splitLineColor": [
                    "#1D273F"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            },
            {
                "type": "log",
                "name": "对数坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#333",
                "axisTickShow": true,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#333",
                "splitLineShow": true,
                "splitLineColor": [
                    "#1D273F"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            },
            {
                "type": "time",
                "name": "时间坐标轴",
                "axisLineShow": true,
                "axisLineColor": "#333",
                "axisTickShow": true,
                "axisTickColor": "#333",
                "axisLabelShow": true,
                "axisLabelColor": "#333",
                "splitLineShow": true,
                "splitLineColor": [
                    "#1D273F"
                ],
                "splitAreaShow": false,
                "splitAreaColor": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        ],
        "axisSeperateSetting": false,
        "toolboxColor": "#c8cbd0",
        "toolboxEmphasisColor": "#7e8dff",
        "tooltipAxisColor": "#fafbfc",
        "tooltipAxisWidth": "1",
        "timelineLineColor": "#60656c",
        "timelineLineWidth": 1,
        "timelineItemColor": "#60656c",
        "timelineItemColorE": "#60656c",
        "timelineCheckColor": "#636fff",
        "timelineCheckBorderColor": "#636fff",
        "timelineItemBorderWidth": 1,
        "timelineControlColor": "#60656c",
        "timelineControlBorderColor": "#60656c",
        "timelineControlBorderWidth": "0",
        "timelineLabelColor": "#dadde0",
        "datazoomBackgroundColor": "#60656C",
        "datazoomDataColor": "rgba(255,255,255,0.3)",
        "datazoomFillColor": "rgba(15,98,254,0.2)",
        "datazoomHandleColor": "#a7b7cc",
        "datazoomHandleWidth": "100",
        "datazoomLabelColor": "#DADDE0"
    },
    "tableStyle": {
        "maxHeight": 420,
        "width": 570
    }
});

  return container;
}

/**
 * 创建文本组件示例
 */
function createTextExample() {
  const container = document.createElement('div');
  container.id = 'text-example';
  container.innerHTML = '<h3>文本组件示例</h3>';
  
  const textContainer = document.createElement('div');
  container.appendChild(textContainer);

  const text = new Text(textContainer, {
    config: [
      {
        title: '数据概览',
        text: '本季度业绩表现良好，销售额较上季度增长15%，利润率保持稳定。'
      },
      {
        title: '重点指标',
        text: 'Q4季度销售额达到200万元，超出预期目标10%。'
      }
    ],
    maxHeight: 200,
    width: 400,
    themeConfig: {
      '--color-primary': themeToken.colorPrimary,
      '--color-text': themeToken.colorText,
      '--font-size': `${themeToken.fontSize}px`
    }
  });

  return container;
}

/**
 * 创建多表格X示例
 */
function createMultiTableXExample() {
  const container = document.createElement('div');
  container.id = 'multi-table-x-example';
  container.innerHTML = '<h3>多表格X示例（可排序分页）</h3>';
  
  const tableContainer = document.createElement('div');
  container.appendChild(tableContainer);

  // 多表格X数据（行数据数组）
  const multiTableXData = [
    { product: '产品A', sales: '1200', profit: 800, market: 25 },
    { product: '产品B', sales: 950, profit: 600, market: 18 },
    { product: '产品C', sales: 1500, profit: 1000, market: 32 },
    { product: '产品D', sales: 800, profit: 450, market: 15 },
    { product: '产品E', sales: 2000, profit: 1300, market: 40 },
    { product: '产品F', sales: 750, profit: 380, market: 12 },
    { product: '产品G', sales: 1100, profit: 720, market: 22 },
    { product: '产品H', sales: 1350, profit: 900, market: 28 }
  ];

  const multiTableXDataMetaInfo = {
    product: { name: '产品名称', type: 'string' as const },
    sales: { name: '销售额', type: 'number' as const, unit: '万元', isNumber: true },
    profit: { name: '利润', type: 'number' as const, unit: '万元', isNumber: true },
    market: { name: '市场份额', type: 'number' as const, unit: '%', isNumber: true }
  };

  const multiTableX = new MultiTableX(tableContainer, {
    option: {
      data: multiTableXData,
      rows: ['product'],
      columns: ['product', 'sales', 'profit', 'market'],
      dataMetaInfo: multiTableXDataMetaInfo
    },
    formatData,
    token: themeToken,
    width: 600,
    maxHeight: 400
  });

  return container;
}

/**
 * 创建多表格Y示例
 */
function createMultiTableYExample() {
  const container = document.createElement('div');
  container.id = 'multi-table-y-example';
  container.innerHTML = '<h3>多表格Y示例（纵向多表格）</h3>';
  
  const tableContainer = document.createElement('div');
  container.appendChild(tableContainer);

  // 多表格Y数据（列数据数组）
  const multiTableYData = [
    { month: '1月', revenue: 150, cost: 80, profit: 70 },
    { month: '2月', revenue: 180, cost: 90, profit: 90 },
    { month: '3月', revenue: 200, cost: 100, profit: 100 },
    { month: '4月', revenue: 220, cost: 110, profit: 110 },
    { month: '5月', revenue: 250, cost: 120, profit: 130 },
    { month: '6月', revenue: 280, cost: 140, profit: 140 }
  ];

  const multiTableYDataMetaInfo = {
    month: { name: '月份', type: 'string' as const },
    revenue: { name: '收入', type: 'number' as const, unit: '万元', isNumber: true },
    cost: { name: '成本', type: 'number' as const, unit: '万元', isNumber: true },
    profit: { name: '利润', type: 'number' as const, unit: '万元', isNumber: true }
  };

  const multiTableY = new MultiTableY(tableContainer, {
    option: {
      data: multiTableYData,
      rows: ['month', 'revenue', 'cost', 'profit'],
      columns: ['1月', '2月', '3月', '4月', '5月', '6月'],
      dataMetaInfo: multiTableYDataMetaInfo
    },
    formatData,
    token: themeToken,
    width: 700,
    maxHeight: 300
  });

  return container;
}

/**
 * 创建树形表格示例
 */
function createTreeTableExample() {
  const container = document.createElement('div');
  container.id = 'tree-table-example';
  container.innerHTML = '<h3>树形表格示例（层级数据）</h3>';
  
  const tableContainer = document.createElement('div');
  container.appendChild(tableContainer);

  const treeTable = new TreeTable(tableContainer, {
    "option": {
        "data": [
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "12.6151",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6637",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "6.5679",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2041",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-15.52752300",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "9.5000",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2023",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "631037084.8000",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-16.7433",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "1.2181",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "6.5679",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "26.9039",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "2334720341.0700",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-1.58819900",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "85.6871",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "9.5986",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "10.2314",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2023",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2024三季报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "1.2100",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "27.8799",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "650963893.6500",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.3681",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "12.1039",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6637",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "6.7417",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4583",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-20.99139300",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "5.2500",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4565",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "344418463.9100",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-23.2584",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.5661",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "6.7417",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "24.8182",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1389443967.1800",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-5.51208500",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "84.8549",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "5.5769",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "9.6955",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4565",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2024中报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6800",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "26.1158",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "362892634.6600",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.3301",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "11.6146",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6637",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "8.2381",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.1428",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-15.02780700",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "1.4100",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.1420",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "98960278.1300",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-14.5751",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "-0.0939",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "8.2381",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "27.1352",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "618822422.1500",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1.47484000",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "82.5387",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "1.6635",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "9.2137",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.1420",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2024一季报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.1900",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "16.7814",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "103866228.7700",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.3724",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "13.6145",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6637",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "4.6393",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4210",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-17.06605600",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "20.1900",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4168",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1368922316.8000",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-15.2719",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "2.9611",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "4.6393",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "25.6531",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "3564260219.0500",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "0.14393300",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "89.0860",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "19.1617",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "11.2205",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4168",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2023年报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "2.6100",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "39.3483",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1402468555.2300",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.3451",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "12.4691",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6637",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "4.8942",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.0552",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-12.67113900",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "11.3900",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.0522",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "757941846.5000",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-10.5637",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "1.3939",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "4.8942",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "21.5858",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "2372398760.9100",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "4.25087000",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "88.0623",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "11.4960",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "10.0475",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.0522",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2023三季报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "1.4300",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "32.4807",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "770622473.6000",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.2753",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "11.8957",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6637",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "5.2450",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2485",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-5.28582200",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "6.7300",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2464",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "448803081.8400",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-3.4846",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.7834",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "5.2450",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "26.9240",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1470499130.0600",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "5.82952600",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "86.0057",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "7.1822",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "9.4684",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2464",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2023中报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.8500",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "31.2330",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "459307724.2400",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.3684",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "11.1924",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6636",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "6.0421",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4072",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "9.25912000",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "1.6700",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4044",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "115844834.9800",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "7.0616",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.1406",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "6.0421",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "25.4164",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "609828431.3600",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "18.41761300",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "82.3977",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "2.0315",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "8.8414",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.4044",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2023一季报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.2300",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "20.0443",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "122235551.2600",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.3408",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "13.4769",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6636",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "3.9638",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.5286",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-11.51826700",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "25.5500",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.5229",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1606750514.2000",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-14.8110",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "3.2545",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "3.9638",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "19.7436",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "3559137454.2100",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1.40383200",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "89.6147",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "23.3422",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "11.1140",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.5229",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2022年报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "3.1500",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "47.5167",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1691066996.7800",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.2460",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "11.9891",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6636",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "5.0581",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.0332",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-10.92361200",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "13.9900",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.0307",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "847466008.5600",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-14.1348",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "1.6687",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "5.0581",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "21.5348",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "2275663278.7900",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "4.14895100",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "88.4207",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "13.6910",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "9.6097",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "4.0307",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2022三季报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "1.6400",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "38.7771",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "882437333.9200",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.2745",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            },
            {
                "每股净资产": {
                    "id": "calc_per_net_assets",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "11.1947",
                    "rank": 9,
                    "columns": false,
                    "rows": true
                },
                "每股资本公积金": {
                    "id": "per_capital_reserve",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.6636",
                    "rank": 10,
                    "columns": false,
                    "rows": true
                },
                "成长能力指标": {
                    "id": "成长能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 0,
                    "columns": false,
                    "rows": true
                },
                "营业周期": {
                    "id": "business_cycle",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "5.6725",
                    "rank": 19,
                    "columns": false,
                    "rows": true
                },
                "流动比率": {
                    "id": "current_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2144",
                    "rank": 22,
                    "columns": false,
                    "rows": true
                },
                "归母净利润同比增长率": {
                    "id": "calculate_parent_holder_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-15.97973200",
                    "rank": 2,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率": {
                    "id": "index_weighted_avg_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "7.7600",
                    "rank": 16,
                    "columns": false,
                    "rows": true
                },
                "速动比率": {
                    "id": "quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2126",
                    "rank": 23,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润": {
                    "id": "index_deduct_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "465006524.4600",
                    "rank": 3,
                    "columns": false,
                    "rows": true
                },
                "扣非净利润同比增长率": {
                    "id": "deduct_net_profit_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "-18.9221",
                    "rank": 4,
                    "columns": false,
                    "rows": true
                },
                "每股经营现金流": {
                    "id": "index_per_operating_cash_flow_net",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.7151",
                    "rank": 12,
                    "columns": false,
                    "rows": true
                },
                "每股指标": {
                    "id": "每股指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 7,
                    "columns": false,
                    "rows": true
                },
                "应收账款周转天数": {
                    "id": "receive_accounts_turnover_days",
                    "level": 2,
                    "pid": "运营能力指标",
                    "value": "5.6725",
                    "rank": 20,
                    "columns": false,
                    "rows": true
                },
                "资产负债率": {
                    "id": "assets_debt_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "27.1817",
                    "rank": 26,
                    "columns": false,
                    "rows": true
                },
                "营运能力指标": {
                    "id": "运营能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 18,
                    "columns": false,
                    "rows": true
                },
                "营业总收入": {
                    "id": "operating_income_total",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "1389497988.9800",
                    "rank": 5,
                    "columns": false,
                    "rows": true
                },
                "营业总收入同比增长率": {
                    "id": "calculate_operating_income_total_yoy_growth_ratio",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "4.68611600",
                    "rank": 6,
                    "columns": false,
                    "rows": true
                },
                "销售毛利率": {
                    "id": "sale_gross_margin",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "87.5449",
                    "rank": 15,
                    "columns": false,
                    "rows": true
                },
                "净资产收益率-摊薄": {
                    "id": "index_full_diluted_roe",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "8.0578",
                    "rank": 17,
                    "columns": false,
                    "rows": true
                },
                "偿债能力指标": {
                    "id": "偿债能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 21,
                    "columns": false,
                    "rows": true
                },
                "每股未分配利润": {
                    "id": "per_undistributed_profits",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "8.8703",
                    "rank": 11,
                    "columns": false,
                    "rows": true
                },
                "盈利能力指标": {
                    "id": "盈利能力指标",
                    "level": 1,
                    "pid": "root",
                    "value": null,
                    "rank": 13,
                    "columns": false,
                    "rows": true
                },
                "保守速动比率": {
                    "id": "conservative_quick_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "3.2126",
                    "rank": 24,
                    "columns": false,
                    "rows": true
                },
                "时间": {
                    "id": "mock_time_id",
                    "level": 1,
                    "pid": "root",
                    "value": "2022中报",
                    "rank": null,
                    "columns": true,
                    "rows": false
                },
                "基本每股收益": {
                    "id": "basic_eps",
                    "level": 2,
                    "pid": "每股指标",
                    "value": "0.9000",
                    "rank": 8,
                    "columns": false,
                    "rows": true
                },
                "销售净利率": {
                    "id": "sale_net_interest_ratio",
                    "level": 2,
                    "pid": "盈利能力指标",
                    "value": "34.9004",
                    "rank": 14,
                    "columns": false,
                    "rows": true
                },
                "归母净利润": {
                    "id": "parent_holder_net_profit",
                    "level": 2,
                    "pid": "成长能力指标",
                    "value": "484940831.0700",
                    "rank": 1,
                    "columns": false,
                    "rows": true
                },
                "产权比率": {
                    "id": "equity_ratio",
                    "level": 2,
                    "pid": "偿债能力指标",
                    "value": "0.3733",
                    "rank": 25,
                    "columns": false,
                    "rows": true
                }
            }
        ],
        "columns": [
            "时间",
            "2024三季报",
            "2024中报",
            "2024一季报",
            "2023年报",
            "2023三季报",
            "2023中报",
            "2023一季报",
            "2022年报",
            "2022三季报",
            "2022中报"
        ],
        "rows": [
            "成长能力指标",
            "归母净利润",
            "归母净利润同比增长率",
            "扣非净利润",
            "扣非净利润同比增长率",
            "营业总收入",
            "营业总收入同比增长率",
            "每股指标",
            "基本每股收益",
            "每股净资产",
            "每股资本公积金",
            "每股未分配利润",
            "每股经营现金流",
            "盈利能力指标",
            "销售净利率",
            "销售毛利率",
            "净资产收益率",
            "净资产收益率-摊薄",
            "营运能力指标",
            "营业周期",
            "应收账款周转天数",
            "偿债能力指标",
            "流动比率",
            "速动比率",
            "保守速动比率",
            "产权比率",
            "资产负债率"
        ],
        "isTree": true,
        "dataMetaInfo": {}
    },
    "pagination": {
        "pageSize": 10,
        "currentPage": 1
    },
    "token": {
        "textStyle": {
            "fontFamily": "Microsoft YaHei",
            "fontWeight": "normal",
            "fontSize": 12,
            "lineHeight": 12
        },
        "dvTimeline": {
            "theme": "pc",
            "domCSSText": "padding: 0; box-shadow: none; border-color: transparent;background: #181E25;",
            "config": {
                "axis": {
                    "background": {
                        "style": {
                            "backgroundColor": "#1D273F",
                            "height": "10px"
                        }
                    },
                    "marker": {
                        "style": {
                            "backgroundImage": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDI8L3RpdGxlPgogICAgPGcgaWQ9IuWbvuihqOinhOiMg+WujOaVtOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Iue8lue7hC0yIj4KICAgICAgICAgICAgPHBhdGggZD0iTTUuMTI3NzcwNCwtMi4wNzE2ODA2MmUtMTYgTDEwLjg3MjIyOTYsMi4wNzE2ODA2MmUtMTYgQzEyLjY1NTI2NzEsLTEuMjAzNzA2MWUtMTYgMTMuMzAxODM5NiwwLjE4NTY1MTIyMiAxMy45NTM2OTE0LDAuNTM0MjY1NDA4IEMxNC42MDU1NDMzLDAuODgyODc5NTkzIDE1LjExNzEyMDQsMS4zOTQ0NTY3NCAxNS40NjU3MzQ2LDIuMDQ2MzA4NTkgQzE1LjgxNDM0ODgsMi42OTgxNjA0NCAxNiwzLjM0NDczMjkyIDE2LDUuMTI3NzcwNCBMMTYsMTAuODcyMjI5NiBDMTYsMTIuNjU1MjY3MSAxNS44MTQzNDg4LDEzLjMwMTgzOTYgMTUuNDY1NzM0NiwxMy45NTM2OTE0IEMxNS4xMTcxMjA0LDE0LjYwNTU0MzMgMTQuNjA1NTQzMywxNS4xMTcxMjA0IDEzLjk1MzY5MTQsMTUuNDY1NzM0NiBDMTMuMzAxODM5NiwxNS44MTQzNDg4IDEyLjY1NTI2NzEsMTYgMTAuODcyMjI5NiwxNiBMNS4xMjc3NzA0LDE2IEMzLjM0NDczMjkyLDE2IDIuNjk4MTYwNDQsMTUuODE0MzQ4OCAyLjA0NjMwODU5LDE1LjQ2NTczNDYgQzEuMzk0NDU2NzQsMTUuMTE3MTIwNCAwLjg4Mjg3OTU5MywxNC42MDU1NDMzIDAuNTM0MjY1NDA4LDEzLjk1MzY5MTQgQzAuMTg1NjUxMjIyLDEzLjMwMTgzOTYgOC4wMjQ3MDczMmUtMTcsMTIuNjU1MjY3MSAtMS4zODExMjA0MWUtMTYsMTAuODcyMjI5NiBMMS4zODExMjA0MWUtMTYsNS4xMjc3NzA0IEMtOC4wMjQ3MDczMmUtMTcsMy4zNDQ3MzI5MiAwLjE4NTY1MTIyMiwyLjY5ODE2MDQ0IDAuNTM0MjY1NDA4LDIuMDQ2MzA4NTkgQzAuODgyODc5NTkzLDEuMzk0NDU2NzQgMS4zOTQ0NTY3NCwwLjg4Mjg3OTU5MyAyLjA0NjMwODU5LDAuNTM0MjY1NDA4IEMyLjY5ODE2MDQ0LDAuMTg1NjUxMjIyIDMuMzQ0NzMyOTIsMS4yMDM3MDYxZS0xNiA1LjEyNzc3MDQsLTIuMDcxNjgwNjJlLTE2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiM4MjhGQTEiLz4KICAgICAgICAgICAgPGxpbmUgeDE9IjUiIHkxPSI2IiB4Mj0iNSIgeTI9IjEwIiBpZD0i6Lev5b6EIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgICAgICA8bGluZSB4MT0iOCIgeTE9IjYiIHgyPSI4IiB5Mj0iMTAiIGlkPSLot6/lvoQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMSIgeTE9IjYiIHgyPSIxMSIgeTI9IjEwIiBpZD0i6Lev5b6E5aSH5Lu9IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
                            ":hover": {
                                "backgroundImage": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDU8L3RpdGxlPgogICAgPGcgaWQ9IuWbvuihqOinhOiMg+WujOaVtOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Iue8lue7hC01Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTUuMTI3NzcwNCwtMi4wNzE2ODA2MmUtMTYgTDEwLjg3MjIyOTYsMi4wNzE2ODA2MmUtMTYgQzEyLjY1NTI2NzEsLTEuMjAzNzA2MWUtMTYgMTMuMzAxODM5NiwwLjE4NTY1MTIyMiAxMy45NTM2OTE0LDAuNTM0MjY1NDA4IEMxNC42MDU1NDMzLDAuODgyODc5NTkzIDE1LjExNzEyMDQsMS4zOTQ0NTY3NCAxNS40NjU3MzQ2LDIuMDQ2MzA4NTkgQzE1LjgxNDM0ODgsMi42OTgxNjA0NCAxNiwzLjM0NDczMjkyIDE2LDUuMTI3NzcwNCBMMTYsMTAuODcyMjI5NiBDMTYsMTIuNjU1MjY3MSAxNS44MTQzNDg4LDEzLjMwMTgzOTYgMTUuNDY1NzM0NiwxMy45NTM2OTE0IEMxNS4xMTcxMjA0LDE0LjYwNTU0MzMgMTQuNjA1NTQzMywxNS4xMTcxMjA0IDEzLjk1MzY5MTQsMTUuNDY1NzM0NiBDMTMuMzAxODM5NiwxNS44MTQzNDg4IDEyLjY1NTI2NzEsMTYgMTAuODcyMjI5NiwxNiBMNS4xMjc3NzA0LDE2IEMzLjM0NDczMjkyLDE2IDIuNjk4MTYwNDQsMTUuODE0MzQ4OCAyLjA0NjMwODU5LDE1LjQ2NTczNDYgQzEuMzk0NDU2NzQsMTUuMTE3MTIwNCAwLjg4Mjg3OTU5MywxNC42MDU1NDMzIDAuNTM0MjY1NDA4LDEzLjk1MzY5MTQgQzAuMTg1NjUxMjIyLDEzLjMwMTgzOTYgOC4wMjQ3MDczMmUtMTcsMTIuNjU1MjY3MSAtMS4zODExMjA0MWUtMTYsMTAuODcyMjI5NiBMMS4zODExMjA0MWUtMTYsNS4xMjc3NzA0IEMtOC4wMjQ3MDczMmUtMTcsMy4zNDQ3MzI5MiAwLjE4NTY1MTIyMiwyLjY5ODE2MDQ0IDAuNTM0MjY1NDA4LDIuMDQ2MzA4NTkgQzAuODgyODc5NTkzLDEuMzk0NDU2NzQgMS4zOTQ0NTY3NCwwLjg4Mjg3OTU5MyAyLjA0NjMwODU5LDAuNTM0MjY1NDA4IEMyLjY5ODE2MDQ0LDAuMTg1NjUxMjIyIDMuMzQ0NzMyOTIsMS4yMDM3MDYxZS0xNiA1LjEyNzc3MDQsLTIuMDcxNjgwNjJlLTE2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiM1NDVFNzEiLz4KICAgICAgICAgICAgPGxpbmUgeDE9IjUiIHkxPSI2IiB4Mj0iNSIgeTI9IjEwIiBpZD0i6Lev5b6EIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgICAgICA8bGluZSB4MT0iOCIgeTE9IjYiIHgyPSI4IiB5Mj0iMTAiIGlkPSLot6/lvoQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMSIgeTE9IjYiIHgyPSIxMSIgeTI9IjEwIiBpZD0i6Lev5b6E5aSH5Lu9IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                            },
                            ":active": {
                                "backgroundImage": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDc8L3RpdGxlPgogICAgPGcgaWQ9IuWbvuihqOinhOiMg+WujOaVtOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Iue8lue7hC03Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTUuMTI3NzcwNCwtMi4wNzE2ODA2MmUtMTYgTDEwLjg3MjIyOTYsMi4wNzE2ODA2MmUtMTYgQzEyLjY1NTI2NzEsLTEuMjAzNzA2MWUtMTYgMTMuMzAxODM5NiwwLjE4NTY1MTIyMiAxMy45NTM2OTE0LDAuNTM0MjY1NDA4IEMxNC42MDU1NDMzLDAuODgyODc5NTkzIDE1LjExNzEyMDQsMS4zOTQ0NTY3NCAxNS40NjU3MzQ2LDIuMDQ2MzA4NTkgQzE1LjgxNDM0ODgsMi42OTgxNjA0NCAxNiwzLjM0NDczMjkyIDE2LDUuMTI3NzcwNCBMMTYsMTAuODcyMjI5NiBDMTYsMTIuNjU1MjY3MSAxNS44MTQzNDg4LDEzLjMwMTgzOTYgMTUuNDY1NzM0NiwxMy45NTM2OTE0IEMxNS4xMTcxMjA0LDE0LjYwNTU0MzMgMTQuNjA1NTQzMywxNS4xMTcxMjA0IDEzLjk1MzY5MTQsMTUuNDY1NzM0NiBDMTMuMzAxODM5NiwxNS44MTQzNDg4IDEyLjY1NTI2NzEsMTYgMTAuODcyMjI5NiwxNiBMNS4xMjc3NzA0LDE2IEMzLjM0NDczMjkyLDE2IDIuNjk4MTYwNDQsMTUuODE0MzQ4OCAyLjA0NjMwODU5LDE1LjQ2NTczNDYgQzEuMzk0NDU2NzQsMTUuMTE3MTIwNCAwLjg4Mjg3OTU5MywxNC42MDU1NDMzIDAuNTM0MjY1NDA4LDEzLjk1MzY5MTQgQzAuMTg1NjUxMjIyLDEzLjMwMTgzOTYgOC4wMjQ3MDczMmUtMTcsMTIuNjU1MjY3MSAtMS4zODExMjA0MWUtMTYsMTAuODcyMjI5NiBMMS4zODExMjA0MWUtMTYsNS4xMjc3NzA0IEMtOC4wMjQ3MDczMmUtMTcsMy4zNDQ3MzI5MiAwLjE4NTY1MTIyMiwyLjY5ODE2MDQ0IDAuNTM0MjY1NDA4LDIuMDQ2MzA4NTkgQzAuODgyODc5NTkzLDEuMzk0NDU2NzQgMS4zOTQ0NTY3NCwwLjg4Mjg3OTU5MyAyLjA0NjMwODU5LDAuNTM0MjY1NDA4IEMyLjY5ODE2MDQ0LDAuMTg1NjUxMjIyIDMuMzQ0NzMyOTIsMS4yMDM3MDYxZS0xNiA1LjEyNzc3MDQsLTIuMDcxNjgwNjJlLTE2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiNBOUIyQkUiLz4KICAgICAgICAgICAgPGxpbmUgeDE9IjUiIHkxPSI2IiB4Mj0iNSIgeTI9IjEwIiBpZD0i6Lev5b6EIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgICAgICA8bGluZSB4MT0iOCIgeTE9IjYiIHgyPSI4IiB5Mj0iMTAiIGlkPSLot6/lvoQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMSIgeTE9IjYiIHgyPSIxMSIgeTI9IjEwIiBpZD0i6Lev5b6E5aSH5Lu9IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                            }
                        }
                    },
                    "tickLine": {
                        "main": {
                            "style": {
                                "backgroundColor": "#545E71"
                            }
                        },
                        "sub": {
                            "style": {
                                "backgroundColor": "#2A354E"
                            }
                        }
                    },
                    "tickValue": {
                        "style": {
                            "color": "#A9B2BE",
                            "fontSize": "12px"
                        }
                    },
                    "tooltip": {
                        "style": {
                            "backgroundColor": "#545E71",
                            "color": "#FAFBFC",
                            "borderColor": "transparent"
                        },
                        "textStyle": {
                            "color": "#F2F5FA"
                        },
                        "arrowStyle": {
                            "borderColor": "#545E71 transparent transparent transparent"
                        }
                    }
                },
                "operation": {
                    "playButton": {
                        "style": {
                            "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+R3JvdXAgNjE3PC90aXRsZT4KICAgIDxnIGlkPSLnu4Tku7bop4TliJnnrKzkuozniYgiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLml7bpl7TovbRsaWdodOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg0LjAwMDAwMCwgLTEzNy4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Imljb25fcGxheSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMDAwMDAwLCA0OC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBDMTguNjI3NDE3LC0xLjIxNzQzNjc1ZS0xNSAyNCw1LjM3MjU4MyAyNCwxMiBDMjQsMTguNjI3NDE3IDE4LjYyNzQxNywyNCAxMiwyNCBDNS4zNzI1ODMsMjQgOC4xMTYyNDUwMWUtMTYsMTguNjI3NDE3IDAsMTIgQy04LjExNjI0NTAxZS0xNiw1LjM3MjU4MyA1LjM3MjU4MywxLjIxNzQzNjc1ZS0xNSAxMiwwIFoiIGlkPSLnn6nlvaIiIGZpbGw9IiM3RThERkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTQyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3LjUwMDAwMCwgNi43NTAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsMCBMMTAuNSwwIEwxMC41LDEwLjUgTDAsMTAuNSBMMCwwIFoiIGlkPSLnn6nlvaIiIG9wYWNpdHk9IjAuNDAwMDAwMDA2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05LjQwMTgxODA2LDQuNDQ5MzMyMDMgQzkuNzE4MjkwNDUsNC42MjU5ODMzNiA5LjgzMTYzNzcxLDUuMDI1NzM5MDggOS42NTQ5ODYzOSw1LjM0MjIxMTQ4IEM5LjU5OTA0NCw1LjQ0MjQzMjc3IDkuNTE3Nzk0MjEsNS41MjYyMjg4OSA5LjQxOTM0Njg0LDUuNTg1MjM3MTMgTDIuMTAxNDgzODMsOS45NzE0ODA4NSBDMS43OTA2MTI5OSwxMC4xNTc4MTMzIDEuMzg3NTUwMDMsMTAuMDU2ODU1MiAxLjIwMTIxNzYsOS43NDU5ODQzMyBDMS4xNDAxMjAxNyw5LjY0NDA1MTQxIDEuMTA3ODQ5MTIsOS41Mjc0NDA3OSAxLjEwNzg0OTEyLDkuNDA4NTk5NjUgTDEuMTA3ODQ5MTIsMC45Mzc2MDY3OCBDMS4xMDc4NDkxMiwwLjU3NTE2OTkyOSAxLjQwMTY2MjIzLDAuMjgxMzU2ODEyIDEuNzY0MDk5MDcsMC4yODEzNTY4MTIgQzEuODc2MDcxODEsMC4yODEzNTY4MTIgMS45ODYxODIzMiwwLjMxMDAwNzQxOCAyLjA4Mzk1NDYxLDAuMzY0NTgyODE0IEw5LjQwMTgxODA2LDQuNDQ5MzMyMDMgWiIgaWQ9IuefqeW9oiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+')"
                        }
                    },
                    "pauseButton": {
                        "style": {
                            "backgroundImage": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+aWNvbl9wbGF55aSH5Lu9PC90aXRsZT4KICAgIDxnIGlkPSLnu4Tku7bop4TliJnnrKzkuozniYgiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLml7bpl7TovbRsaWdodOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTkwLjAwMDAwMCwgLTEwMjguMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJpY29uX3BsYXnlpIfku70iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkwLjAwMDAwMCwgMTAyOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMiwwIEMxOC42Mjc0MTcsLTEuMjE3NDM2NzVlLTE1IDI0LDUuMzcyNTgzIDI0LDEyIEMyNCwxOC42Mjc0MTcgMTguNjI3NDE3LDI0IDEyLDI0IEM1LjM3MjU4MywyNCA4LjExNjI0NTAxZS0xNiwxOC42Mjc0MTcgMCwxMiBDLTguMTE2MjQ1MDFlLTE2LDUuMzcyNTgzIDUuMzcyNTgzLDEuMjE3NDM2NzVlLTE1IDEyLDAgWiIgaWQ9IuefqeW9oiIgZmlsbD0iIzYwNjU2QyIvPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4wMDAwMDAsIDcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgb3BhY2l0eT0iMC40MDAwMDAwMDYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjgxMjUsMC42MjUgQzMuMTU3Njc3OTcsMC42MjUgMy40Mzc1LDAuOTA0ODIyMDMxIDMuNDM3NSwxLjI1IEwzLjQzNzUsOC43NSBDMy40Mzc1LDkuMDk1MTc3OTcgMy4xNTc2Nzc5Nyw5LjM3NSAyLjgxMjUsOS4zNzUgTDIuMTg3NSw5LjM3NSBDMS44NDIzMjIwMyw5LjM3NSAxLjU2MjUsOS4wOTUxNzc5NyAxLjU2MjUsOC43NSBMMS41NjI1LDEuMjUgQzEuNTYyNSwwLjkwNDgyMjAzMSAxLjg0MjMyMjAzLDAuNjI1IDIuMTg3NSwwLjYyNSBMMi44MTI1LDAuNjI1IFogTTcuODEyNSwwLjYyNSBDOC4xNTc2Nzc5NywwLjYyNSA4LjQzNzUsMC45MDQ4MjIwMzEgOC40Mzc1LDEuMjUgTDguNDM3NSw4Ljc1IEM4LjQzNzUsOS4wOTUxNzc5NyA4LjE1NzY3Nzk3LDkuMzc1IDcuODEyNSw5LjM3NSBMNy4xODc1LDkuMzc1IEM2Ljg0MjMyMjAzLDkuMzc1IDYuNTYyNSw5LjA5NTE3Nzk3IDYuNTYyNSw4Ljc1IEw2LjU2MjUsMS4yNSBDNi41NjI1LDAuOTA0ODIyMDMxIDYuODQyMzIyMDMsMC42MjUgNy4xODc1LDAuNjI1IEw3LjgxMjUsMC42MjUgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0ZGRkZGRiIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                        }
                    },
                    "previousButton": {
                        "style": {
                            "backgroundColor": "#1D273F",
                            "color": "#A9B2BE",
                            "borderColor": "rgba(84,94,113,1)",
                            ":hover": {
                                "borderColor": "#7E8DFF",
                                "color": "#7E8DFF",
                                "::before": {
                                    "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbl9saXN0X29wZW5OZXc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaXtumXtOi9tGxpZ2h05aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQwLjAwMDAwMCwgLTE0My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC005aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9saXN0X29wZW5OZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC01NDAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4yODMxNzcxNywzLjA5NDEyMDYyIEw4LjQ4MTc0MTc2LDUuNTUzNTgyODEgQzguODA4Nzg4Nyw1Ljc0NTE2MjQ4IDguOTE4NjA2NjMsNi4xNjU1OTI0MiA4LjcyNzAyNjk3LDYuNDkyNjM5MzYgQzguNjY3NjE4MzIsNi41OTQwNTYyNyA4LjU4MzE1ODY2LDYuNjc4NTE1OTMgOC40ODE3NDE3Niw2LjczNzkyNDU3IEw0LjI4MzE3NzE3LDkuMTk3Mzg2NzcgQzMuOTU2MTMwMjMsOS4zODg5NjY0MyAzLjUzNTcwMDI4LDkuMjc5MTQ4NSAzLjM0NDEyMDYyLDguOTUyMTAxNTUgQzMuMjgyNDg3NzUsOC44NDY4ODc2NyAzLjI1LDguNzI3MTUyNjMgMy4yNSw4LjYwNTIxNTg4IEwzLjI1LDMuNjg2MjkxNSBDMy4yNSwzLjMwNzI2MzE3IDMuNTU3MjYzMTcsMyAzLjkzNjI5MTUsMyBDNC4wNTgyMjgyNSwzIDQuMTc3OTYzMjksMy4wMzI0ODc3NSA0LjI4MzE3NzE3LDMuMDk0MTIwNjIgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzdFOERGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                                }
                            },
                            ":disabled": {
                                "borderColor": "rgba(84,94,113,0.4)",
                                "color": "rgba(242,245,250,0.4)",
                                "::before": {
                                    "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbl9saXN0X29wZW5OZXc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaXtumXtOi9tGxpZ2h05aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQwLjAwMDAwMCwgLTE0My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC005aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9saXN0X29wZW5OZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC01NDAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4yODMxNzcxNywzLjA5NDEyMDYyIEw4LjQ4MTc0MTc2LDUuNTUzNTgyODEgQzguODA4Nzg4Nyw1Ljc0NTE2MjQ4IDguOTE4NjA2NjMsNi4xNjU1OTI0MiA4LjcyNzAyNjk3LDYuNDkyNjM5MzYgQzguNjY3NjE4MzIsNi41OTQwNTYyNyA4LjU4MzE1ODY2LDYuNjc4NTE1OTMgOC40ODE3NDE3Niw2LjczNzkyNDU3IEw0LjI4MzE3NzE3LDkuMTk3Mzg2NzcgQzMuOTU2MTMwMjMsOS4zODg5NjY0MyAzLjUzNTcwMDI4LDkuMjc5MTQ4NSAzLjM0NDEyMDYyLDguOTUyMTAxNTUgQzMuMjgyNDg3NzUsOC44NDY4ODc2NyAzLjI1LDguNzI3MTUyNjMgMy4yNSw4LjYwNTIxNTg4IEwzLjI1LDMuNjg2MjkxNSBDMy4yNSwzLjMwNzI2MzE3IDMuNTU3MjYzMTcsMyAzLjkzNjI5MTUsMyBDNC4wNTgyMjgyNSwzIDQuMTc3OTYzMjksMy4wMzI0ODc3NSA0LjI4MzE3NzE3LDMuMDk0MTIwNjIgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzYwNjU2QyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                                }
                            },
                            "::before": {
                                "backgroundImage": "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='12px' height='12px' viewBox='0 0 12 12' version='1.1'%3E%3Ctitle%3Eicon_list_openNew%3C/title%3E%3Cg id='组件规则第二版' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='时间轴light备份' transform='translate(-140.000000, -143.000000)'%3E%3Cg id='编组-4' transform='translate(68.000000, 89.000000)'%3E%3Cg id='编组-4备份-3' transform='translate(16.000000, 48.000000)'%3E%3Cg id='编组-19' transform='translate(48.000000, 0.000000)'%3E%3Cg id='icon_list_openNew' transform='translate(14.000000, 12.000000) scale(1, -1) rotate(-540.000000) translate(-14.000000, -12.000000) translate(8.000000, 6.000000)'%3E%3Crect id='矩形' x='0' y='0' width='12' height='12'/%3E%3Cpath d='M4.28317717,3.09412062 L8.48174176,5.55358281 C8.8087887,5.74516248 8.91860663,6.16559242 8.72702697,6.49263936 C8.66761832,6.59405627 8.58315866,6.67851593 8.48174176,6.73792457 L4.28317717,9.19738677 C3.95613023,9.38896643 3.53570028,9.2791485 3.34412062,8.95210155 C3.28248775,8.84688767 3.25,8.72715263 3.25,8.60521588 L3.25,3.6862915 C3.25,3.30726317 3.55726317,3 3.9362915,3 C4.05822825,3 4.17796329,3.03248775 4.28317717,3.09412062 Z' id='形状结合' fill='%23A9B2BE'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                            }
                        }
                    },
                    "nextButton": {
                        "style": {
                            "backgroundColor": "#1D273F",
                            "color": "#A9B2BE",
                            "borderColor": "rgba(84,94,113,1)",
                            ":hover": {
                                "borderColor": "#7E8DFF",
                                "color": "#7E8DFF",
                                "::before": {
                                    "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbl9saXN0X29wZW5OZXc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaXtumXtOi9tGxpZ2h05aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQwLjAwMDAwMCwgLTE0My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC005aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9saXN0X29wZW5OZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC01NDAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4yODMxNzcxNywzLjA5NDEyMDYyIEw4LjQ4MTc0MTc2LDUuNTUzNTgyODEgQzguODA4Nzg4Nyw1Ljc0NTE2MjQ4IDguOTE4NjA2NjMsNi4xNjU1OTI0MiA4LjcyNzAyNjk3LDYuNDkyNjM5MzYgQzguNjY3NjE4MzIsNi41OTQwNTYyNyA4LjU4MzE1ODY2LDYuNjc4NTE1OTMgOC40ODE3NDE3Niw2LjczNzkyNDU3IEw0LjI4MzE3NzE3LDkuMTk3Mzg2NzcgQzMuOTU2MTMwMjMsOS4zODg5NjY0MyAzLjUzNTcwMDI4LDkuMjc5MTQ4NSAzLjM0NDEyMDYyLDguOTUyMTAxNTUgQzMuMjgyNDg3NzUsOC44NDY4ODc2NyAzLjI1LDguNzI3MTUyNjMgMy4yNSw4LjYwNTIxNTg4IEwzLjI1LDMuNjg2MjkxNSBDMy4yNSwzLjMwNzI2MzE3IDMuNTU3MjYzMTcsMyAzLjkzNjI5MTUsMyBDNC4wNTgyMjgyNSwzIDQuMTc3OTYzMjksMy4wMzI0ODc3NSA0LjI4MzE3NzE3LDMuMDk0MTIwNjIgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzdFOERGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                                }
                            },
                            ":disabled": {
                                "borderColor": "rgba(84,94,113,0.4)",
                                "color": "rgba(242,245,250,0.4)",
                                "::before": {
                                    "backgroundImage": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbl9saXN0X29wZW5OZXc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaXtumXtOi9tGxpZ2h05aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQwLjAwMDAwMCwgLTE0My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC4wMDAwMDAsIDg5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC005aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9saXN0X29wZW5OZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC01NDAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4yODMxNzcxNywzLjA5NDEyMDYyIEw4LjQ4MTc0MTc2LDUuNTUzNTgyODEgQzguODA4Nzg4Nyw1Ljc0NTE2MjQ4IDguOTE4NjA2NjMsNi4xNjU1OTI0MiA4LjcyNzAyNjk3LDYuNDkyNjM5MzYgQzguNjY3NjE4MzIsNi41OTQwNTYyNyA4LjU4MzE1ODY2LDYuNjc4NTE1OTMgOC40ODE3NDE3Niw2LjczNzkyNDU3IEw0LjI4MzE3NzE3LDkuMTk3Mzg2NzcgQzMuOTU2MTMwMjMsOS4zODg5NjY0MyAzLjUzNTcwMDI4LDkuMjc5MTQ4NSAzLjM0NDEyMDYyLDguOTUyMTAxNTUgQzMuMjgyNDg3NzUsOC44NDY4ODc2NyAzLjI1LDguNzI3MTUyNjMgMy4yNSw4LjYwNTIxNTg4IEwzLjI1LDMuNjg2MjkxNSBDMy4yNSwzLjMwNzI2MzE3IDMuNTU3MjYzMTcsMyAzLjkzNjI5MTUsMyBDNC4wNTgyMjgyNSwzIDQuMTc3OTYzMjksMy4wMzI0ODc3NSA0LjI4MzE3NzE3LDMuMDk0MTIwNjIgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzYwNjU2QyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
                                }
                            },
                            "::before": {
                                "backgroundImage": "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='12px' height='12px' viewBox='0 0 12 12' version='1.1'%3E%3Ctitle%3Eicon_list_openNew%3C/title%3E%3Cg id='组件规则第二版' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='时间轴light备份' transform='translate(-140.000000, -143.000000)'%3E%3Cg id='编组-4' transform='translate(68.000000, 89.000000)'%3E%3Cg id='编组-4备份-3' transform='translate(16.000000, 48.000000)'%3E%3Cg id='编组-19' transform='translate(48.000000, 0.000000)'%3E%3Cg id='icon_list_openNew' transform='translate(14.000000, 12.000000) scale(1, -1) rotate(-540.000000) translate(-14.000000, -12.000000) translate(8.000000, 6.000000)'%3E%3Crect id='矩形' x='0' y='0' width='12' height='12'/%3E%3Cpath d='M4.28317717,3.09412062 L8.48174176,5.55358281 C8.8087887,5.74516248 8.91860663,6.16559242 8.72702697,6.49263936 C8.66761832,6.59405627 8.58315866,6.67851593 8.48174176,6.73792457 L4.28317717,9.19738677 C3.95613023,9.38896643 3.53570028,9.2791485 3.34412062,8.95210155 C3.28248775,8.84688767 3.25,8.72715263 3.25,8.60521588 L3.25,3.6862915 C3.25,3.30726317 3.55726317,3 3.9362915,3 C4.05822825,3 4.17796329,3.03248775 4.28317717,3.09412062 Z' id='形状结合' fill='%23A9B2BE'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                            }
                        }
                    }
                }
            }
        },
        "backgroundColor": "transparent",
        "theme": "dark",
        "dvCardBackgroundColor": "#10182E",
        "dvSelect": {
            "--theme-background": "#181E25",
            "--theme-background-hover": "#313438",
            "--theme-background-select": "#272E50",
            "--theme-border": "#60656C",
            "--theme-option": "#FAFBFC",
            "--theme-label": "#FAFBFC",
            "--theme-label-select": "#6C6BFF",
            "--theme-placeHolder": "#C8CBD0",
            "--theme-option-background": "#313438",
            "--theme-dropdown-icon": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDY8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjAyLuaXtumXtOi9tOe7hOS7tuminOiJsuaYoOWwhOihqOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NC4wMDAwMDAsIC0xNTc2LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTY45aSH5Lu9LTEzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMi4wMDAwMDAsIDE1MjIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEyLjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJ0cmFuc3BhcmVudC1yZWN0YW5nbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgcm90YXRlKC00NTAuMDAwMDAwKSB0cmFuc2xhdGUoLTguMDAwMDAwLCAtOC4wMDAwMDApICIgcG9pbnRzPSIwIDkuNzk3MTc0MzllLTE2IDE2IDkuNzk3MTc0MzllLTE2IDE2IDE2IDAgMTYiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjI0NDA3NzY4LDUuMjUxMDUxMzMgQzMuNTQ0NDgwOTgsNC45NDIwNjUwOCA0LjAxNzE3MzUzLDQuOTE4Mjk2OSA0LjM0NDA4Mjg3LDUuMTc5NzQ2ODEgTDQuNDIyNTg4OTgsNS4yNTEwNTEzMyBMOCw4LjkzIEwxMS41Nzc0MTEsNS4yNTEwNTEzMyBDMTEuODc3ODE0Myw0Ljk0MjA2NTA4IDEyLjM1MDUwNjksNC45MTgyOTY5IDEyLjY3NzQxNjIsNS4xNzk3NDY4MSBMMTIuNzU1OTIyMyw1LjI1MTA1MTMzIEMxMy4wNTYzMjU2LDUuNTYwMDM3NTggMTMuMDc5NDMzNiw2LjA0NjIzNTYzIDEyLjgyNTI0NjIsNi4zODI0ODUyNCBMMTIuNzU1OTIyMyw2LjQ2MzIzNDM4IEw4LjU4OTI1NTY1LDEwLjc0ODk0ODcgQzguMjg4ODUyMzUsMTEuMDU3OTM0OSA3LjgxNjE1OTgsMTEuMDgxNzAzMSA3LjQ4OTI1MDQ2LDEwLjgyMDI1MzIgTDcuNDEwNzQ0MzUsMTAuNzQ4OTQ4NyBMMy4yNDQwNzc2OCw2LjQ2MzIzNDM4IEMyLjkxODY0MDc3LDYuMTI4NDk5MjggMi45MTg2NDA3Nyw1LjU4NTc4NjQ0IDMuMjQ0MDc3NjgsNS4yNTEwNTEzMyBaIiBpZD0i6Lev5b6ELTMiIGZpbGw9IiNGQUZCRkMiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-label-hover": "#6C6BFF"
        },
        "dvText": {
            "--theme-background": "transparent",
            "--theme-text-color": "#C4CAD5",
            "--theme-title-color": "#FFD993",
            "--theme-text-background-normal": "#131C30",
            "--theme-text-background-hover": "#1D273F",
            "--theme-text-background-select": "#2C375D"
        },
        "dvTimeLine": {
            "--theme-background": "transparent",
            "--theme-border": "#7E8DFF",
            "--theme-line-border": "#545E71",
            "--theme-label": "#828FA1",
            "--theme-label-background": "rgba(99,111,255,0.28)",
            "--theme-time": "#828FA1",
            "--theme-text": "#FFD993",
            "--theme-link": "#7E8DFF",
            "--theme-text-hover": "#1D273F",
            "--theme-text-select": "#2C375D",
            "--theme-button-color": "#7E8DFF"
        },
        "dvTable": {
            "--theme-border": "#2A354E",
            "--theme-border-select": "#7E8DFF",
            "--theme-header-background": "#1D273F",
            "--theme-header-text": "#C4CAD5",
            "--theme-normal-background": "#10182E",
            "--theme-normal-text": "#FFD993",
            "--theme-header-hover": "#2A354E",
            "--theme-normal-hover": "#1D273F",
            "--theme-header-select": "#2C375D",
            "--theme-icon-container": "linear-gradient(90deg, rgba(49,52,56,0.00) 0%, #1D273F 20%)",
            "--theme-icon-container-hover": "linear-gradient(90deg, rgba(72,76,81,0.00) 0%, #2A354E 20%)",
            "--theme-icon-container-selected": "linear-gradient(90deg, rgba(59,63,95,0.00) 0%, #2C375D 20%)",
            "--theme-expand-icon-background": "linear-gradient(90deg, rgba(16,24,46,0.00) 0%, #10182E 20%)",
            "--theme-sort-icon-container-hover": "#545E71",
            "--theme-tree-icon-hover": "#545E71",
            "--theme-icon-up": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwMi4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaLlpIfku70tMTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSI2Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuNDUyMDQzOTMsMC41Njk4NDU1MDIgTDIuNDUyOTg1NjQsNC4xMzg0NzI5NSBDMi4xNDY5NzUwNiw0LjUwMjU5OTg0IDIuNDYzMzM1OTIsNSAzLjAwMDk0MTcxLDUgTDguOTk5MDU4MjksNSBDOS41MzY2NjQwOCw1IDkuODUzMDI0OTQsNC41MDI1OTk4NCA5LjU0NzAxNDM2LDQuMTM4NDcyOTUgTDYuNTQ3OTU2MDcsMC41Njk4NDU1MDIgQzYuMjgyOTM3NzMsMC4yNTQ0OTU5NDQgNS43MTcwNjIyNywwLjI1NDQ5NTk0NCA1LjQ1MjA0MzkzLDAuNTY5ODQ1NTAyIFoiIGlkPSLot6/lvoQiIGZpbGw9IiNDOENCRDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-icon-up-enable": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwMi4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaLlpIfku70tMTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSI2Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuNDUyMDQzOTMsMC41Njk4NDU1MDIgTDIuNDUyOTg1NjQsNC4xMzg0NzI5NSBDMi4xNDY5NzUwNiw0LjUwMjU5OTg0IDIuNDYzMzM1OTIsNSAzLjAwMDk0MTcxLDUgTDguOTk5MDU4MjksNSBDOS41MzY2NjQwOCw1IDkuODUzMDI0OTQsNC41MDI1OTk4NCA5LjU0NzAxNDM2LDQuMTM4NDcyOTUgTDYuNTQ3OTU2MDcsMC41Njk4NDU1MDIgQzYuMjgyOTM3NzMsMC4yNTQ0OTU5NDQgNS43MTcwNjIyNywwLjI1NDQ5NTk0NCA1LjQ1MjA0MzkzLDAuNTY5ODQ1NTAyIFoiIGlkPSLot6/lvoQiIGZpbGw9IiM3RThERkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-icon-down": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwOC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA5LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC05LjAwMDAwMCkgdHJhbnNsYXRlKDAuMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9LTEyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS40NTIwNDM5MywwLjU2OTg0NTUwMiBMMi40NTI5ODU2NCw0LjEzODQ3Mjk1IEMyLjE0Njk3NTA2LDQuNTAyNTk5ODQgMi40NjMzMzU5Miw1IDMuMDAwOTQxNzEsNSBMOC45OTkwNTgyOSw1IEM5LjUzNjY2NDA4LDUgOS44NTMwMjQ5NCw0LjUwMjU5OTg0IDkuNTQ3MDE0MzYsNC4xMzg0NzI5NSBMNi41NDc5NTYwNywwLjU2OTg0NTUwMiBDNi4yODI5Mzc3MywwLjI1NDQ5NTk0NCA1LjcxNzA2MjI3LDAuMjU0NDk1OTQ0IDUuNDUyMDQzOTMsMC41Njk4NDU1MDIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0M4Q0JEMCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-icon-down-enable": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwOC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA5LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC05LjAwMDAwMCkgdHJhbnNsYXRlKDAuMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9LTEyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS40NTIwNDM5MywwLjU2OTg0NTUwMiBMMi40NTI5ODU2NCw0LjEzODQ3Mjk1IEMyLjE0Njk3NTA2LDQuNTAyNTk5ODQgMi40NjMzMzU5Miw1IDMuMDAwOTQxNzEsNSBMOC45OTkwNTgyOSw1IEM5LjUzNjY2NDA4LDUgOS44NTMwMjQ5NCw0LjUwMjU5OTg0IDkuNTQ3MDE0MzYsNC4xMzg0NzI5NSBMNi41NDc5NTYwNywwLjU2OTg0NTUwMiBDNi4yODI5Mzc3MywwLjI1NDQ5NTk0NCA1LjcxNzA2MjI3LDAuMjU0NDk1OTQ0IDUuNDUyMDQzOTMsMC41Njk4NDU1MDIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iIzdFOERGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-expand-icon-text": "#828FA1",
            "--theme-expand-icon-down": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMiA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCAzMzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIwMS7ooajmoLzlop7liqDljYfpmY3luo/lj4rmkJzntKLlip/og70tbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTkuMDAwMDAwLCAtMTIwOC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yOOWkh+S7vS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNC4wMDAwMDAsIDExNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA3LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMDAwMDAwLCA3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA5LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC05LjAwMDAwMCkgdHJhbnNsYXRlKDAuMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9LTEyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS40NTIwNDM5MywwLjU2OTg0NTUwMiBMMi40NTI5ODU2NCw0LjEzODQ3Mjk1IEMyLjE0Njk3NTA2LDQuNTAyNTk5ODQgMi40NjMzMzU5Miw1IDMuMDAwOTQxNzEsNSBMOC45OTkwNTgyOSw1IEM5LjUzNjY2NDA4LDUgOS44NTMwMjQ5NCw0LjUwMjU5OTg0IDkuNTQ3MDE0MzYsNC4xMzg0NzI5NSBMNi41NDc5NTYwNywwLjU2OTg0NTUwMiBDNi4yODI5Mzc3MywwLjI1NDQ5NTk0NCA1LjcxNzA2MjI3LDAuMjU0NDk1OTQ0IDUuNDUyMDQzOTMsMC41Njk4NDU1MDIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iIzgyOEZBMSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')"
        },
        "dvDropdown": {
            "--theme-text": "#FAFBFC",
            "--theme-text-hover": "#6C6BFF",
            "--theme-background": "#181E25",
            "--theme-background-hover": "#313438",
            "--theme-background-select": "#272E50",
            "--theme-border": "#60656C",
            "--theme-kline-text": "#C8CBD0",
            "--theme-kline-text-hover": "#FAFBFC",
            "--theme-dropdown": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiBmaWxsPSJub25lIj4KICAgICAgPHBhdGggZD0iTTguOTgwOTEgMy45NzExOUM4LjkwMDgzIDMuOTcxMTkgOC44MjU1OSA0LjAwOTU2IDguNzc4NTYgNC4wNzQzOUw1Ljk5OTc0IDcuOTA0NjdMMy4yMjA5MiA0LjA3NDM5QzMuMTczODkgNC4wMDk1NiAzLjA5ODY1IDMuOTcxMTkgMy4wMTg1NyAzLjk3MTE5SDIuMDA1MzZDMS45Mzc1NiAzLjk3MTE5IDEuODk4MTMgNC4wNDc4NCAxLjkzNzU3IDQuMTAyOTlMMy4yOTE3MSA1Ljk5Njg2TDUuNjUyODcgOS4yNTJDNS44MjQyOSA5LjQ4NzcxIDYuMTc1MTkgOS40ODc3MSA2LjM0NTI4IDkuMjUyTDguNzA2NDQgNS45OTY4NkwxMC4wNjA2IDQuMTAyOTlDMTAuMSA0LjA0Nzg0IDEwLjA2MDYgMy45NzExOSA5Ljk5Mjc5IDMuOTcxMTlIOC45ODA5MVoiIGZpbGw9IiNGQUZCRkMiIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgogICAgPC9zdmc+')",
            "--theme-default-dropdown": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiBmaWxsPSJub25lIj4KICAgICAgPHBhdGggZD0iTTMuODUzNTUgNS44NTM1NUMzLjUzODU3IDUuNTM4NTcgMy43NjE2NSA1IDQuMjA3MTEgNUg4Ljc5Mjg5QzkuMjM4MzUgNSA5LjQ2MTQzIDUuNTM4NTcgOS4xNDY0NSA1Ljg1MzU1TDcuMjA3MTEgNy43OTI4OUM2LjgxNjU4IDguMTgzNDIgNi4xODM0MiA4LjE4MzQyIDUuNzkyODkgNy43OTI4OUwzLjg1MzU1IDUuODUzNTVaIiBmaWxsPSIjRkFGQkZDIi8+CiAgICA8L3N2Zz4=')"
        },
        "dvPagination": {
            "--theme-button": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjA1Lum7keeZveeJiOWvueavlOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MjEuMDAwMDAwLCAtMjA1LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTI05aSH5Lu9LTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MTcuMDAwMDAwLCAyMDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCAzLjgwMDAwMCkiIGZpbGw9IiNGQUZCRkMiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IEMtMC4yNDg5NDQ0NDMsLTAuNzQxMDA1MDUxIDAuMTM0NjYzMTMsLTAuNzY1NjA4MDgxIDAuNDA4MjA4ODg4LC0wLjU2ODc4MzgzOCBMMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IEw0LjY5NDk3NDc1LDMuNzA1MDI1MjUgQzQuOTQxMDA1MDUsMy45NTEwNTU1NiA0Ljk2NTYwODA4LDQuMzM0NjYzMTMgNC43Njg3ODM4NCw0LjYwODIwODg5IEw0LjY5NDk3NDc1LDQuNjk0OTc0NzUgTDAuNDk0OTc0NzQ3LDguODk0OTc0NzUgQzAuMjIxNjA3NzQzLDkuMTY4MzQxNzUgLTAuMjIxNjA3NzQzLDkuMTY4MzQxNzUgLTAuNDk0OTc0NzQ3LDguODk0OTc0NzUgQy0wLjc0MTAwNTA1MSw4LjY0ODk0NDQ0IC0wLjc2NTYwODA4MSw4LjI2NTMzNjg3IC0wLjU2ODc4MzgzOCw3Ljk5MTc5MTExIEwtMC40OTQ5NzQ3NDcsNy45MDUwMjUyNSBMMy4yMTEsNC4yIEwtMC40OTQ5NzQ3NDcsMC40OTQ5NzQ3NDcgQy0wLjc0MTAwNTA1MSwwLjI0ODk0NDQ0MyAtMC43NjU2MDgwODEsLTAuMTM0NjYzMTMgLTAuNTY4NzgzODM4LC0wLjQwODIwODg4OCBMLTAuNDk0OTc0NzQ3LC0wLjQ5NDk3NDc0NyBaIiBpZD0i6Lev5b6EIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-more": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDg8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjA1Lum7keeZveeJiOWvueavlOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2NjEuMDAwMDAwLCAtMjMzLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0NjUuMDAwMDAwLCAyMjkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOTIuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIuMDAwMDAwLCAxMi4wMDAwMDApIHJvdGF0ZSgtMjcwLjAwMDAwMCkgdHJhbnNsYXRlKC0xMi4wMDAwMDAsIC0xMi4wMDAwMDApIHRyYW5zbGF0ZSg0LjAwMDAwMCwgNC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgcm90YXRlKC0yNzAuMDAwMDAwKSB0cmFuc2xhdGUoLTguMDAwMDAwLCAtOC4wMDAwMDApIHRyYW5zbGF0ZSgyLjQwMDAwMCwgNi44MDAwMDApIiBmaWxsPSIjRkFGQkZDIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9IuakreWchuW9oiIgY3g9IjEuMTIiIGN5PSIxLjIiIHJ4PSIxLjEyIiByeT0iMS4yIj48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0i5qSt5ZyG5b2iIiBjeD0iNS42IiBjeT0iMS4yIiByeD0iMS4xMiIgcnk9IjEuMiI+PC9lbGxpcHNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9IuakreWchuW9oiIgY3g9IjEwLjA4IiBjeT0iMS4yIiByeD0iMS4xMiIgcnk9IjEuMiI+PC9lbGxpcHNlPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-fast": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+57yW57uEIDc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjA1Lum7keeZveeJiOWvueavlOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MjEuMDAwMDAwLCAtMjMzLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTI05aSH5Lu9LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MTcuMDAwMDAwLCAyMjkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIvPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuODAwMDAwLCAzLjgwMDAwMCkiIGZpbGw9IiM3RThERkYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IEMtMC4yNDg5NDQ0NDMsLTAuNzQxMDA1MDUxIDAuMTM0NjYzMTMsLTAuNzY1NjA4MDgxIDAuNDA4MjA4ODg4LC0wLjU2ODc4MzgzOCBMMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IEw0LjY5NDk3NDc1LDMuNzA1MDI1MjUgQzQuOTQxMDA1MDUsMy45NTEwNTU1NiA0Ljk2NTYwODA4LDQuMzM0NjYzMTMgNC43Njg3ODM4NCw0LjYwODIwODg5IEw0LjY5NDk3NDc1LDQuNjk0OTc0NzUgTDAuNDk0OTc0NzQ3LDguODk0OTc0NzUgQzAuMjIxNjA3NzQzLDkuMTY4MzQxNzUgLTAuMjIxNjA3NzQzLDkuMTY4MzQxNzUgLTAuNDk0OTc0NzQ3LDguODk0OTc0NzUgQy0wLjc0MTAwNTA1MSw4LjY0ODk0NDQ0IC0wLjc2NTYwODA4MSw4LjI2NTMzNjg3IC0wLjU2ODc4MzgzOCw3Ljk5MTc5MTExIEwtMC40OTQ5NzQ3NDcsNy45MDUwMjUyNSBMMy4yMTEsNC4yIEwtMC40OTQ5NzQ3NDcsMC40OTQ5NzQ3NDcgQy0wLjc0MTAwNTA1MSwwLjI0ODk0NDQ0MyAtMC43NjU2MDgwODEsLTAuMTM0NjYzMTMgLTAuNTY4NzgzODM4LC0wLjQwODIwODg4OCBMLTAuNDk0OTc0NzQ3LC0wLjQ5NDk3NDc0NyBaIiBpZD0i6Lev5b6EIi8+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjcwNTAyNTI1LC0wLjQ5NDk3NDc0NyBDMy45NTEwNTU1NiwtMC43NDEwMDUwNTEgNC4zMzQ2NjMxMywtMC43NjU2MDgwODEgNC42MDgyMDg4OSwtMC41Njg3ODM4MzggTDQuNjk0OTc0NzUsLTAuNDk0OTc0NzQ3IEw4Ljg5NDk3NDc1LDMuNzA1MDI1MjUgQzkuMTQxMDA1MDUsMy45NTEwNTU1NiA5LjE2NTYwODA4LDQuMzM0NjYzMTMgOC45Njg3ODM4NCw0LjYwODIwODg5IEw4Ljg5NDk3NDc1LDQuNjk0OTc0NzUgTDQuNjk0OTc0NzUsOC44OTQ5NzQ3NSBDNC40MjE2MDc3NCw5LjE2ODM0MTc1IDMuOTc4MzkyMjYsOS4xNjgzNDE3NSAzLjcwNTAyNTI1LDguODk0OTc0NzUgQzMuNDU4OTk0OTUsOC42NDg5NDQ0NCAzLjQzNDM5MTkyLDguMjY1MzM2ODcgMy42MzEyMTYxNiw3Ljk5MTc5MTExIEwzLjcwNTAyNTI1LDcuOTA1MDI1MjUgTDcuNDExLDQuMiBMMy43MDUwMjUyNSwwLjQ5NDk3NDc0NyBDMy40NTg5OTQ5NSwwLjI0ODk0NDQ0MyAzLjQzNDM5MTkyLC0wLjEzNDY2MzEzIDMuNjMxMjE2MTYsLTAuNDA4MjA4ODg4IEwzLjcwNTAyNTI1LC0wLjQ5NDk3NDc0NyBaIiBpZD0i6Lev5b6EIi8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
            "--theme-button-disabled": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDc8L3RpdGxlPgogICAgPGcgaWQ9Iue7hOS7tuinhOWImeesrOS6jOeJiCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjA1Lum7keeZveeJiOWvueavlOWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MjEuMDAwMDAwLCAtMjA1LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTI05aSH5Lu9LTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MTcuMDAwMDAwLCAyMDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCAzLjgwMDAwMCkiIGZpbGw9InJnYmEoMjUwLDI1MSwyNTIsMC40KSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTS0wLjQ5NDk3NDc0NywtMC40OTQ5NzQ3NDcgQy0wLjI0ODk0NDQ0MywtMC43NDEwMDUwNTEgMC4xMzQ2NjMxMywtMC43NjU2MDgwODEgMC40MDgyMDg4ODgsLTAuNTY4NzgzODM4IEwwLjQ5NDk3NDc0NywtMC40OTQ5NzQ3NDcgTDQuNjk0OTc0NzUsMy43MDUwMjUyNSBDNC45NDEwMDUwNSwzLjk1MTA1NTU2IDQuOTY1NjA4MDgsNC4zMzQ2NjMxMyA0Ljc2ODc4Mzg0LDQuNjA4MjA4ODkgTDQuNjk0OTc0NzUsNC42OTQ5NzQ3NSBMMC40OTQ5NzQ3NDcsOC44OTQ5NzQ3NSBDMC4yMjE2MDc3NDMsOS4xNjgzNDE3NSAtMC4yMjE2MDc3NDMsOS4xNjgzNDE3NSAtMC40OTQ5NzQ3NDcsOC44OTQ5NzQ3NSBDLTAuNzQxMDA1MDUxLDguNjQ4OTQ0NDQgLTAuNzY1NjA4MDgxLDguMjY1MzM2ODcgLTAuNTY4NzgzODM4LDcuOTkxNzkxMTEgTC0wLjQ5NDk3NDc0Nyw3LjkwNTAyNTI1IEwzLjIxMSw0LjIgTC0wLjQ5NDk3NDc0NywwLjQ5NDk3NDc0NyBDLTAuNzQxMDA1MDUxLDAuMjQ4OTQ0NDQzIC0wLjc2NTYwODA4MSwtMC4xMzQ2NjMxMyAtMC41Njg3ODM4MzgsLTAuNDA4MjA4ODg4IEwtMC40OTQ5NzQ3NDcsLTAuNDk0OTc0NzQ3IFoiIGlkPSLot6/lvoQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')",
            "--theme-background-color-disabled": "rgba(24,30,37,0.4)",
            "--theme-background-color": "#181E25",
            "--theme-border-color": "#60656C",
            "--theme-background-color-selected": "#2C375D",
            "--theme-font-color-selected": "#7E8DFF",
            "--theme-border-color-selected": "#7E8DFF",
            "--theme-background-color-hover": "#313438",
            "--theme-font-color-hover": "#FFFFFF",
            "--theme-font-color": "#FFFFFF"
        },
        "dvButtonGroup": {
            "--theme-container-background-color": "#60656C",
            "--theme-color": "#C8CBD0",
            "--theme-color-hover": "#7E8DFF",
            "--theme-background-color-selected": "#24282E",
            "--theme-color-selected": "#7E8DFF",
            "--theme-background-color": "#181E25"
        },
        "dvScrollButtonGroup": {
            "--theme-background-color": "#313438",
            "--theme-color": "#C8CBD0",
            "--theme-background-color-hover": "#60656C",
            "--theme-color-hover": "#FAFBFC",
            "--theme-color-selected": "#7E8DFF",
            "--theme-background-color-selected": "#2D3461"
        },
    },
    "tableStyle": {
        "maxHeight": 520,
        "width": 570
    }
});

  return container;
}

/**
 * 创建时间轴组件示例
 */
function createTimeLineExample() {
  const container = document.createElement('div');
  container.id = 'timeline-example';
  container.innerHTML = '<h3>时间轴组件示例</h3>';
  
  const timelineContainer = document.createElement('div');
  container.appendChild(timelineContainer);

  // 时间轴示例数据
  const timelineData = [
    {
      label: ['产品发布', '重要'],
      time: '2024-01-15',
      title: 'VISALL v1.0 正式发布',
      url: 'https://github.com/visall/visall',
      importance: 5
    },
    {
      label: ['功能更新'],
      time: '2024-02-10',
      title: '新增多表格联动功能',
      importance: 4
    },
    {
      label: ['性能优化'],
      time: '2024-02-28',
      title: '表格渲染性能提升50%',
      importance: 3
    },
    {
      label: ['bug修复'],
      time: '2024-03-05',
      title: '修复分页组件显示问题',
      importance: 2
    },
    {
      label: ['文档更新'],
      time: '2024-03-10',
      title: '完善组件使用文档和示例',
      importance: 1
    }
  ];

  const timeline = new TimeLine(timelineContainer, {
    config: timelineData,
    maxHeight: 400,
    width: 500,
    themeConfig: {
      '--color-primary': themeToken.colorPrimary,
      '--color-text': themeToken.colorText,
      '--color-border': themeToken.colorBorder,
      '--font-size': `${themeToken.fontSize}px`,
      '--font-family': themeToken.fontFamily
    },
    customEvent: (data) => {
      console.log('时间轴事件:', data);
    }
  });

  return container;
}

/**
 * 初始化应用
 */
function initApp() {
  const app = document.getElementById('app');
  if (!app) {
    console.error('找不到应用容器');
    return;
  }

  // 添加标题
  const title = document.createElement('h1');
  title.textContent = 'VISALL 组件包集成示例';
  title.style.textAlign = 'center';
  title.style.color = themeToken.colorText;
  title.style.fontFamily = themeToken.fontFamily;
  app.appendChild(title);

  // 添加说明
  const description = document.createElement('p');
  description.innerHTML = `
    本示例展示了如何使用VISALL的新NPM包架构：<br>
    • <strong>@visall/table</strong>: 高性能表格组件（5种类型）<br>
    • <strong>@visall/text</strong>: 灵活文本组件<br>
    • <strong>@visall/timeline</strong>: 时间轴组件
  `;
  description.style.textAlign = 'center';
  description.style.color = themeToken.colorText;
  description.style.fontFamily = themeToken.fontFamily;
  description.style.margin = '20px 0';
  app.appendChild(description);

  // 创建组件容器
  const componentsContainer = document.createElement('div');
  componentsContainer.style.display = 'flex';
  componentsContainer.style.flexWrap = 'wrap';
  componentsContainer.style.gap = '20px';
  componentsContainer.style.justifyContent = 'center';
  componentsContainer.style.padding = '20px';

  // 添加组件示例
  componentsContainer.appendChild(createHorizontalTableExample());
  componentsContainer.appendChild(createVerticalTableExample());
  componentsContainer.appendChild(createMultiTableXExample());
  componentsContainer.appendChild(createMultiTableYExample());
  componentsContainer.appendChild(createTreeTableExample());
  componentsContainer.appendChild(createTextExample());
  componentsContainer.appendChild(createTimeLineExample());

  app.appendChild(componentsContainer);

  console.log('VISALL 组件包集成示例已初始化');
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp); 