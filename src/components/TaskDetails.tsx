import React, { useState } from 'react';
import { Search, RefreshCw, SearchCode } from 'lucide-react';
import { Task } from '../types';

interface TaskDetailsProps {
  task?: Task;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
  const [activeTab, setActiveTab] = useState('基本信息');

  const tabs = ['基本信息', '图纸信息', '电子作业指导书', '报工记录'];

  if (!task) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
        请在左侧选择生产任务
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden relative">
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200 px-6 pt-4 gap-8 justify-center">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors px-2 ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === '基本信息' && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h3 className="font-bold text-gray-800">基本信息</h3>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">销售订单:</span>
                <span className="text-gray-900 font-medium">XZZQ-26C-033 第1项</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">工单号:</span>
                <span className="text-gray-900 font-medium">{task.id}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-gray-500">工作站:</span>
                <span className="text-gray-900 font-medium">WS0035 | 交货</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">工序:</span>
                <span className="text-blue-600 font-medium">{task.process}</span>
              </div>

              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-gray-500">产品信息:</span>
                <span className="text-gray-900 font-medium">{task.product}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-gray-500">规格:</span>
                <span className="text-gray-900 font-medium">-</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">生产任务:</span>
                <span className="text-gray-900 font-medium">{task.product.split(' | ')[1] || '接驳台'} 【{task.quantity}】 台</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-gray-500">型号:</span>
                <span className="text-gray-900 font-medium">-</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">生产人员:</span>
                <span className="text-gray-900 font-medium">f</span>
              </div>

              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-gray-500">备注:</span>
                <span className="text-gray-900 font-medium">{task.description}-蒙祖鑫</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === '图纸信息' && (
          <div className="flex flex-col h-full">
            <div className="flex gap-4 mb-6">
              <input type="text" placeholder="请输入文件名搜索" className="flex-1 border border-slate-200 rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-500 max-w-md" />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded flex items-center gap-1.5 text-sm transition-colors"><Search className="w-4 h-4"/> 搜索</button>
              <button className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-5 py-2 rounded flex items-center gap-1.5 text-sm transition-colors"><RefreshCw className="w-4 h-4"/> 重置</button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h3 className="font-bold text-gray-800">图纸与附件信息</h3>
            </div>
            <p className="text-xs text-gray-400 mb-10">支持预览 PDF、图片格式，其他请在 PC/移动端查看附件</p>
            
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 pb-20">
               <div className="relative w-48 h-32 mb-6 flex items-center justify-center">
                 <SearchCode className="w-24 h-24 text-blue-200/50 absolute z-0" />
                 <div className="w-16 h-20 bg-blue-400 rounded relative z-10 shadow-lg shadow-blue-400/20 flex flex-col items-center pt-3 gap-1.5">
                   <div className="w-8 h-1 bg-white/50 rounded-full"></div>
                   <div className="w-10 h-1 bg-white/50 rounded-full"></div>
                   <div className="w-8 h-1 bg-white/50 rounded-full"></div>
                   <div className="w-10 h-1 bg-white/50 rounded-full"></div>
                   <div className="absolute -right-3 -bottom-3 w-10 h-10 bg-blue-300 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                     <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                   </div>
                 </div>
               </div>
               <p className="font-medium">暂无图纸信息</p>
            </div>
          </div>
        )}

        {activeTab === '电子作业指导书' && (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h3 className="font-bold text-gray-800">相关附件</h3>
            </div>
            <p className="text-xs text-gray-400 mb-10">支持预览 PDF、图片格式，其他请在 PC/移动端查看附件</p>
            
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 pb-20">
               <div className="relative w-48 h-32 mb-6 flex items-center justify-center">
                 <div className="w-16 h-20 bg-blue-400 rounded relative z-10 shadow-lg shadow-blue-400/20 flex flex-col items-center pt-3 gap-1.5">
                   <div className="w-8 h-1 bg-white/50 rounded-full"></div>
                   <div className="w-10 h-1 bg-white/50 rounded-full"></div>
                   <div className="w-8 h-1 bg-white/50 rounded-full"></div>
                   <div className="w-10 h-1 bg-white/50 rounded-full"></div>
                   <div className="absolute -right-3 -bottom-3 w-10 h-10 bg-blue-300 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                     <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                   </div>
                 </div>
               </div>
               <p className="font-medium">暂无电子作业指导书</p>
            </div>
          </div>
        )}

        {activeTab === '报工记录' && (
          <div className="flex flex-col h-full">
            <div className="flex gap-4 overflow-x-auto pb-4">
              
              <div className="border border-slate-200 rounded-lg p-4 w-[280px] shrink-0 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800 text-base">{task.id}</h4>
                  <span className="bg-[#dcfce7] text-[#166534] text-xs px-2 py-0.5 rounded-full font-bold tracking-wide">已完成</span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-xs mb-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400">工时</span>
                    <span className="text-slate-700">不足1分钟</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400">开始处理时间</span>
                    <span className="text-slate-700">2026-06-08 21:13:19</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400">报工人</span>
                    <span className="text-slate-800 font-bold">testAdmin</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400">报工时间</span>
                    <span className="text-slate-700">2026-06-08 21:13:22</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-xs">
                  <span className="text-slate-400">生产进度</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <span className="font-bold text-slate-700">89%</span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 w-[280px] shrink-0 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800 text-base">{task.id}</h4>
                  <span className="bg-[#dcfce7] text-[#166534] text-xs px-2 py-0.5 rounded-full font-bold tracking-wide">已完成</span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-xs mb-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400">工时</span>
                    <span className="text-slate-700">不足1分钟</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400">开始处理时间</span>
                    <span className="text-slate-700">2026-06-08 20:01:21</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400">报工人</span>
                    <span className="text-slate-800 font-bold">testAdmin</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400">报工时间</span>
                    <span className="text-slate-700">2026-06-08 20:01:26</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-xs">
                  <span className="text-slate-400">生产进度</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '11%' }}></div>
                    </div>
                    <span className="font-bold text-slate-700">11%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-slate-200 bg-white">
        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg shadow-md transition-colors">
          开始处理
        </button>
      </div>

    </div>
  );
}
