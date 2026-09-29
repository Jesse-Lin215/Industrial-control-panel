import React, { useState } from 'react';
import { Search, ScanLine, RefreshCw, FileBox, CheckSquare } from 'lucide-react';
import { Task } from '../types';

interface TaskCenterProps {
  tasks: Task[];
  activeTaskId: string;
  onSelectTask: (id: string) => void;
  onOpenBatchReport: () => void;
}

export default function TaskCenter({ tasks, activeTaskId, onSelectTask, onOpenBatchReport }: TaskCenterProps) {
  const [activeTab, setActiveTab] = useState('待生产');

  const tabs = [
    { id: '全部', count: 490 },
    { id: '待生产', count: 419 },
    { id: '生产中', count: 37 },
    { id: '已完成', count: 20 },
  ];

  const filteredTasks = tasks.filter(t => activeTab === '全部' || t.status === activeTab);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case '紧急': return 'bg-red-500';
      case '高': return 'bg-orange-500';
      case '中': return 'bg-yellow-500';
      case '低': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-[480px] flex-shrink-0 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="p-4 pb-0 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileBox className="w-5 h-5 text-slate-700" />
            <h2 className="text-sm font-bold text-slate-800">生产任务中心</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onOpenBatchReport}
              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 font-medium"
            >
              批量报工
            </button>
            <button className="px-2 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded hover:bg-slate-50 font-medium">
              扫一扫
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>紧急</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span>高</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span>中</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>低</div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="输入工单/任务编号/销售单号或扫一扫查询" 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-2 flex-nowrap overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.id}({tab.count})
            </button>
          ))}
          <div className="flex-1"></div>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50/50">
        {filteredTasks.map(task => (
          <div 
            key={task.id}
            onClick={() => onSelectTask(task.id)}
            className={`bg-white rounded-lg p-3 cursor-pointer border relative overflow-hidden transition-all ${
              activeTaskId === task.id ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-gray-200 shadow-sm hover:border-gray-300'
            }`}
          >
            {/* Left priority border */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityColor(task.priority)}`}></div>
            
            <div className="pl-2 pr-1 py-1">
              <div className="flex justify-between items-start mb-2 gap-2">
                <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                  <span className={`font-bold text-[17px] tracking-tight truncate ${
                    task.priority === '紧急' || task.priority === '高' ? 'text-[#ef4444]' : 
                    task.priority === '中' ? 'text-[#eab308]' : 
                    'text-[#3b82f6]'
                  }`}>{task.id}</span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-[#3b82f6] text-white tracking-wide shrink-0">{task.process}</span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-[#eef2ff] text-[#3b82f6] tracking-wide shrink-0">{task.status}</span>
                </div>
                <div className="text-sm text-gray-500 shrink-0 whitespace-nowrap mt-0.5">{task.dateRange}</div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="truncate flex-1 pr-4" title={task.description}>
                  {task.description}
                </div>
                <div className="flex items-center gap-2 w-32 shrink-0">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${task.completed}%` }}></div>
                  </div>
                  <span className="font-bold text-slate-700 w-10 text-right text-[15px]">{task.completed}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
