import { Task } from './types';

export const MOCK_TASKS: Task[] = [
  {
    id: 'MO202606050001',
    process: '交货',
    status: '待生产',
    dateRange: '06.05-06.10',
    overdueDays: 14,
    description: '半成品自制 | XZZQ-26C-033 第1项 | 2 | 0.65米接驳台(链条)',
    product: 'XZZQ-26C-033 | 0.65米接驳台(链条)',
    quantity: 2,
    completed: 0,
    priority: '高'
  },
  {
    id: 'MO202606170004',
    process: '交货',
    status: '待生产',
    dateRange: '06.17-06.19',
    overdueDays: 4,
    description: '散件 | XZZQ-26C-028 第14,38项 | 6 | 转角机',
    product: 'XZZQ-26C-028 | 转角机',
    quantity: 6,
    completed: 0,
    priority: '中'
  },
  {
    id: 'MO202606170005',
    process: '亚克力加工',
    status: '待生产',
    dateRange: '06.17-06.19',
    overdueDays: 4,
    description: '散件 | XZZQ-26C-028 第14,38项 | 6 | 转角机',
    product: 'XZZQ-26C-028 | 转角机',
    quantity: 6,
    completed: 0,
    priority: '低'
  },
  {
    id: 'MO202606170006',
    process: '外包表面处理',
    status: '待生产',
    dateRange: '06.17-06.19',
    overdueDays: 4,
    description: '散件 | XZZQ-26C-028 第14,38项 | 6 | 转角机',
    product: 'XZZQ-26C-028 | 转角机',
    quantity: 6,
    completed: 0,
    priority: '紧急'
  },
  {
    id: 'MO202606170007',
    process: '功牙',
    status: '待生产',
    dateRange: '06.17-06.19',
    overdueDays: 4,
    description: '散件 | XZZQ-26C-028 第14,38项 | 6 | 转角机',
    product: 'XZZQ-26C-028 | 转角机',
    quantity: 6,
    completed: 0,
    priority: '中'
  },
  {
    id: 'MO202606170008',
    process: '铣床',
    status: '待生产',
    dateRange: '06.17-06.19',
    overdueDays: 4,
    description: '散件 | XZZQ-26C-028 第14,38项 | 6 | 转角机',
    product: 'XZZQ-26C-028 | 转角机',
    quantity: 6,
    completed: 0,
    priority: '低'
  }
];
