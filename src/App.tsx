import React, { useState } from 'react';
import Header from './components/Header';
import StatsRow from './components/StatsRow';
import TaskCenter from './components/TaskCenter';
import TaskDetails from './components/TaskDetails';
import BatchReportModal from './components/BatchReportModal';
import { MOCK_TASKS } from './data';

export default function App() {
  const [activeTaskId, setActiveTaskId] = useState<string>(MOCK_TASKS[0].id);
  const [isBatchReportOpen, setIsBatchReportOpen] = useState(false);

  const activeTask = MOCK_TASKS.find(t => t.id === activeTaskId);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans text-slate-800 selection:bg-blue-200">
      <Header />
      
      <main className="p-4 flex-1 flex flex-col gap-4 overflow-hidden h-[calc(100vh-60px)]">
        <StatsRow />
        
        <div className="flex-1 flex gap-4 min-h-0">
          <TaskCenter 
            tasks={MOCK_TASKS} 
            activeTaskId={activeTaskId} 
            onSelectTask={setActiveTaskId} 
            onOpenBatchReport={() => setIsBatchReportOpen(true)}
          />
          <TaskDetails task={activeTask} />
        </div>
      </main>

      <BatchReportModal 
        isOpen={isBatchReportOpen} 
        onClose={() => setIsBatchReportOpen(false)} 
        tasks={MOCK_TASKS}
      />
    </div>
  );
}
