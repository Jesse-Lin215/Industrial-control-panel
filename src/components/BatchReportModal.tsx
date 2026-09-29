import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle2, ChevronRight } from 'lucide-react';
import { Task } from '../types';

interface BatchReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
}

export default function BatchReportModal({ isOpen, onClose, tasks }: BatchReportModalProps) {
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setProgress(0);
      setSelectedTaskIds(new Set());
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTasks = tasks.filter(t => t.status === '待生产' && (t.id.includes(searchTerm) || t.process.includes(searchTerm)));

  const toggleTask = (id: string) => {
    const newSet = new Set(selectedTaskIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedTaskIds(newSet);
  };

  const toggleAll = () => {
    if (selectedTaskIds.size === filteredTasks.length) {
      setSelectedTaskIds(new Set());
    } else {
      setSelectedTaskIds(new Set(filteredTasks.map(t => t.id)));
    }
  };

  const handleQuickPercent = (pct: number) => {
    setProgress(pct);
  };

  const handleSubmit = () => {
    alert(`批量报工成功！选择了 ${selectedTaskIds.size} 个工单，追加进度为 ${progress}%。`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-[1024px] max-w-[95vw] h-[680px] flex flex-col border border-white/20 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">批量生产报工</h3>
            <span className="text-sm text-slate-400 font-normal ml-2">选择任务并统一追加生产进度</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl font-light leading-none">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left: Task Selection */}
          <div className="w-3/5 border-r border-slate-200 flex flex-col bg-white">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">待报工工单列表 ({filteredTasks.length})</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="selectAll"
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                    checked={selectedTaskIds.size > 0 && selectedTaskIds.size === filteredTasks.length}
                    onChange={toggleAll}
                  />
                  <label htmlFor="selectAll" className="text-xs text-slate-600 cursor-pointer">全选</label>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="全局搜索" 
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredTasks.map(task => {
                  const isSelected = selectedTaskIds.has(task.id);
                  const style = (() => {
                    switch (task.priority) {
                      case '紧急': return { border: 'border-y-[#ef4444]/30 border-r-[#ef4444]/30', borderLeft: 'border-l-[#ef4444]', bg: 'bg-[#fef2f2]', badge: 'bg-[#ef4444] text-white', status: 'text-[#ef4444] bg-[#fef2f2]' };
                      case '高': return { border: 'border-y-[#f97316]/30 border-r-[#f97316]/30', borderLeft: 'border-l-[#f97316]', bg: 'bg-[#fff7ed]', badge: 'bg-[#f97316] text-white', status: 'text-[#f97316] bg-[#fff7ed]' };
                      case '中': return { border: 'border-y-[#eab308]/30 border-r-[#eab308]/30', borderLeft: 'border-l-[#eab308]', bg: 'bg-[#fefce8]', badge: 'bg-[#eab308] text-white', status: 'text-[#eab308] bg-[#fefce8]' };
                      case '低': default: return { border: 'border-y-[#3b82f6]/30 border-r-[#3b82f6]/30', borderLeft: 'border-l-[#3b82f6]', bg: 'bg-[#eff6ff]', badge: 'bg-[#3b82f6] text-white', status: 'text-[#3b82f6] bg-[#eff6ff]' };
                    }
                  })();

                  return (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer border-y border-r border-l-4 transition-all ${style.borderLeft} ${
                        isSelected 
                          ? `${style.border.replace('/30', '')} ${style.bg} shadow-sm` 
                          : `${style.border} ${style.bg}`
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className={`w-5 h-5 rounded border-slate-300 pointer-events-none ${isSelected ? 'accent-blue-600' : ''}`}
                        checked={isSelected}
                        readOnly
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                            <span className="font-bold text-[17px] tracking-tight text-slate-800 truncate">{task.id}</span>
                            <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-[#3b82f6] text-white tracking-wide shrink-0">{task.process}</span>
                            <span className={`px-3 py-0.5 rounded-full text-xs font-medium tracking-wide shrink-0 ${style.status}`}>{task.status}</span>
                            <span className={`px-3 py-0.5 rounded-full text-xs font-medium tracking-wide shrink-0 ${style.badge}`}>{task.priority}</span>
                          </div>
                          <span className="text-sm text-slate-500 shrink-0 whitespace-nowrap mt-0.5">
                            {task.dateRange} 
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-slate-500 truncate flex-1 pr-4" title={task.description}>{task.description}</p>
                          <div className="flex items-center gap-2 w-32 shrink-0">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${task.completed}%` }}></div>
                            </div>
                            <span className="font-bold text-slate-700 w-10 text-right text-[15px]">{task.completed}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {filteredTasks.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-10">
                  没有可报工的任务
                </div>
              )}
            </div>
          </div>

          {/* Right: Report Action */}
          <div className="w-2/5 flex flex-col bg-slate-50 border-l border-slate-200">
            <div className="p-6 flex-1 flex flex-col overflow-y-auto">
              
              {step === 2 ? (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-slate-800">报工设置</h4>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium text-slate-700">进度追加 (%)</label>
                      <div className="flex items-center border border-slate-200 rounded overflow-hidden bg-white">
                        <button 
                          onClick={() => setProgress(p => Math.max(0, p - 5))}
                          className="px-3 py-1 hover:bg-slate-50 text-slate-600 font-bold"
                        >−</button>
                        <input 
                          type="number"
                          min="0" max="100" 
                          value={progress}
                          onChange={(e) => setProgress(Math.min(100, Math.max(0, Number(e.target.value))))}
                          className="w-12 text-center text-sm font-medium focus:outline-none"
                        />
                        <span className="text-sm text-slate-500 pr-2">%</span>
                        <button 
                          onClick={() => setProgress(p => Math.min(100, p + 5))}
                          className="px-3 py-1 hover:bg-slate-50 text-slate-600 font-bold border-l border-slate-200"
                        >+</button>
                      </div>
                    </div>

                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 mb-6"
                    />

                    <div className="grid grid-cols-6 gap-2">
                      {[25, 40, 50, 60, 70, 100].map(pct => (
                        <button
                          key={pct}
                          onClick={() => handleQuickPercent(pct)}
                          className={`py-1.5 rounded border text-xs transition-colors ${
                            progress === pct 
                              ? 'bg-blue-600 border-blue-600 text-white' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mb-8">
                    <h5 className="text-sm font-bold text-slate-800 mb-4">预览效果 <span className="font-normal text-slate-500">(已选择 {selectedTaskIds.size} 项)</span></h5>
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-500 bg-slate-50/50">
                            <th className="font-normal text-left py-2 px-4 w-1/3">工单 / 任务</th>
                            <th className="font-normal text-center py-2 px-4 w-1/3">当前进度</th>
                            <th className="font-normal text-right py-2 px-4 w-1/3">预计报工后</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {tasks.filter(t => selectedTaskIds.has(t.id)).slice(0, 3).map(task => {
                            const newProgress = Math.min(100, task.completed + progress);
                            return (
                              <tr key={task.id}>
                                <td className="py-3 px-4 text-slate-700">
                                  <div className="truncate max-w-[150px]" title={task.id}>{task.id}</div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <div className="w-8 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${task.completed}%` }}></div>
                                    </div>
                                    <span className="text-slate-600 text-xs w-8 text-right">{task.completed}%</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <span className="text-slate-300 mx-1">→</span>
                                    <div className="w-8 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                      <div className="h-full bg-[#16a34a] rounded-full" style={{ width: `${newProgress}%` }}></div>
                                    </div>
                                    <span className="text-[#16a34a] font-bold text-xs w-8 text-right underline underline-offset-2">{newProgress}%</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                          {selectedTaskIds.size > 3 && (
                            <tr>
                              <td colSpan={3} className="py-2 text-center text-xs text-slate-400">... 等 {selectedTaskIds.size} 项</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center text-[8px]">i</span>
                      统一追加进度: 当前进度 + {progress}% (上限 100%)
                    </p>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-auto">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold text-sm">
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-serif italic">i</div>
                      说明
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 marker:text-slate-400">
                      <li>将对所选任务统一追加相同的生产进度</li>
                      <li>提交后将生成报工记录，便于后续追溯</li>
                      <li>任务进度上限为 100%</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                  <CheckCircle2 className="w-16 h-16 mb-4 text-slate-200" />
                  <p className="text-lg font-medium text-slate-500">已选择 {selectedTaskIds.size} 个工单</p>
                  <p className="text-sm mt-2">点击下方“批量处理”按钮进行进度追加</p>
                </div>
              )}

            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-slate-200 flex gap-3 bg-white">
              {step === 1 ? (
                <>
                  <button 
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => setStep(2)}
                    disabled={selectedTaskIds.size === 0}
                    className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    批量处理
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    返回上一步
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    提交报工 ({selectedTaskIds.size})
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
