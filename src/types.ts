export interface Task {
  id: string;
  process: string;
  status: '待生产' | '生产中' | '已完成';
  dateRange: string;
  overdueDays?: number;
  description: string;
  product: string;
  quantity: number;
  completed: number;
  priority: '紧急' | '高' | '中' | '低';
}
