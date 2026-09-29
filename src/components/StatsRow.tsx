import React from 'react';
import { Clock, Calendar, CalendarDays, PauseCircle, StopCircle } from 'lucide-react';

export default function StatsRow() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {/* Total Time */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <div className="text-sm text-slate-500 mb-1">今日工作时长</div>
        <div className="text-2xl font-bold font-mono text-slate-800">00:15:31</div>
      </div>

      {/* Today's Report */}
      <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4 flex flex-col justify-center">
        <div className="text-sm font-medium text-blue-600 mb-2 flex items-center gap-2 justify-center">
          今日报工工时 <span className="text-lg font-bold">0</span><span className="text-xs font-normal">分钟</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div><span className="text-blue-600 font-bold text-sm">0</span> 分钟 已审批</div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div><span className="text-gray-800 font-bold text-sm">0</span> 分钟 审批中</div>
        </div>
      </div>

      {/* Weekly Report */}
      <div className="bg-orange-50/50 rounded-lg shadow-sm border border-orange-200 p-4 flex flex-col items-center justify-center">
        <div className="text-sm font-medium text-orange-600 mb-1 flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4" />
          本周报工工时
        </div>
        <div>
          <span className="text-xl font-bold text-gray-800">2</span>
          <span className="text-xs text-gray-500 ml-1">分钟</span>
        </div>
      </div>

      {/* Monthly Report */}
      <div className="bg-emerald-50/50 rounded-lg shadow-sm border border-emerald-200 p-4 flex flex-col items-center justify-center">
        <div className="text-sm font-medium text-emerald-600 mb-1 flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          本月报工工时
        </div>
        <div>
          <span className="text-xl font-bold text-gray-800">45</span>
          <span className="text-xs text-gray-500 ml-1">分钟</span>
        </div>
      </div>

      {/* Actions */}
      <button className="bg-white hover:bg-slate-50 transition-colors rounded-lg shadow-sm border border-slate-200 p-4 flex items-center justify-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 group-hover:scale-105 transition-all">
          <PauseCircle className="w-6 h-6" />
        </div>
        <div className="text-left">
          <div className="text-blue-600 font-semibold text-sm">暂停工作</div>
          <div className="text-xs text-gray-400 mt-0.5">点击后将暂停时长</div>
        </div>
      </button>

      <button className="bg-white hover:bg-slate-50 transition-colors rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-100 group-hover:scale-105 transition-all">
          <StopCircle className="w-6 h-6" />
        </div>
        <div className="text-left">
          <div className="text-red-600 font-semibold text-sm">结束工作</div>
          <div className="text-xs text-gray-400 mt-0.5">点击后将停止今日工作</div>
        </div>
      </button>

    </div>
  );
}
