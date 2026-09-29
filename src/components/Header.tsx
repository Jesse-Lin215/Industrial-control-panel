import React from 'react';
import { Layers, Monitor, Clock, LogOut, Maximize } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-bold text-slate-700">智简工厂工控系统</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Monitor className="w-4 h-4 text-slate-400" />
          <span>工作站:</span>
          <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs">
            <option>仅支持预览,不能切换站点</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="font-mono font-semibold">2026/06/24 09:48:58</span>
        </div>

        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
          <div className="flex items-center gap-2 text-right">
            <div className="flex flex-col items-end">
              <p className="text-sm font-semibold text-slate-700">admin f</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">租户管理员</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
