
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Target, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Info, 
  CheckCircle2, 
  Activity,
  Filter,
  Download,
  MoreVertical,
  Loader2
} from 'lucide-react';
import { db } from '../services/dbService';
import { AttendanceRecord } from '../types';

interface AttendanceTrackerProps {
  onBack: () => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ onBack }) => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(75);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 4, 1)); // May 2024
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.getAttendance();
      setAttendance(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const total = attendance.length;
    const currentPercentage = total > 0 ? (presentCount / total) * 100 : 0;
    
    const targetDecimal = target / 100;
    let classesNeeded = 0;
    
    if (currentPercentage < target) {
      classesNeeded = Math.ceil((targetDecimal * total - presentCount) / (1 - targetDecimal));
    }
    
    return { 
      presentCount, 
      total, 
      percentage: Math.round(currentPercentage), 
      needed: classesNeeded > 0 ? classesNeeded : 0 
    };
  }, [target, attendance]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const record = attendance.find(r => r.date === dateStr);
      days.push({ day: i, record, dateStr });
    }
    return days;
  }, [currentMonth, attendance]);

  const monthName = currentMonth.toLocaleString('default', { month: 'long' }).toUpperCase();
  const yearNum = currentMonth.getFullYear();

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Querying_DB_Matrix...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:text-indigo-500 transition-all text-slate-500 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">ATTENDANCE_ANALYTICS</h1>
            <p className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase mt-1">MODULE_02 // SYSTEM_LOGS</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-all">
            <Filter className="w-3 h-3" /> Filter_Logs
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all">
            <Download className="w-3 h-3" /> Export_CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-2xl">
                  <CalendarIcon className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tighter">{monthName} {yearNum}</h2>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Temporal_Matrix_View</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl text-slate-500 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700" />
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl text-slate-500 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-8">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <div key={d} className="text-center text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] pb-2 border-b border-slate-100 dark:border-slate-800">{d}</div>
              ))}
              {calendarDays.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => item && setSelectedDay(item.day)}
                  className={`relative group min-h-[100px] rounded-2xl border p-3 transition-all cursor-pointer flex flex-col justify-between
                    ${!item ? 'bg-transparent border-transparent' : 
                      item.record?.status === 'present' ? 'bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/40' :
                      item.record?.status === 'absent' ? 'bg-rose-500/5 border-rose-500/10 hover:border-rose-500/40' :
                      'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 hover:border-indigo-500/30'}
                    ${selectedDay === item?.day ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950' : ''}
                  `}
                >
                  {item && (
                    <>
                      <div className="flex justify-between items-start">
                        <span className={`text-xs font-black ${item.record ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>{item.day}</span>
                        {item.record && (
                          <div className={`w-1.5 h-1.5 rounded-full ${item.record.status === 'present' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                        )}
                      </div>
                      {item.record && (
                        <div className="space-y-1 mt-2">
                          <div className={`text-[8px] font-black tracking-widest uppercase ${item.record.status === 'present' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {item.record.status === 'present' ? 'Attended' : 'Missed'}
                          </div>
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.record.status === 'present' ? 'bg-emerald-500 w-full' : 'bg-rose-500 w-0'}`} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 dark:bg-black rounded-3xl p-10 text-white border border-slate-800 relative overflow-hidden group">
            <div className="relative z-10 text-center">
              <h4 className="text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase mb-8">AGGREGATE_VITAL</h4>
              <div className="relative inline-flex items-center justify-center mb-8">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle 
                    cx="80" cy="80" r="70" 
                    fill="transparent" 
                    stroke="#6366f1" 
                    strokeWidth="8" 
                    strokeDasharray={440} 
                    strokeDashoffset={440 - (440 * stats.percentage) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black tracking-tighter">{stats.percentage}%</span>
                  <span className="text-[8px] font-black text-slate-500 tracking-widest uppercase mt-1">Total_Index</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
