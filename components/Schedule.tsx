
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ArrowRight } from 'lucide-react';
import { MOCK_SCHEDULE } from '../constants';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>(DAYS[new Date().getDay() - 1] || 'Monday');
  const schedule = MOCK_SCHEDULE[selectedDay] || [];

  return (
    <div className="animate-in fade-in slide-in-from-right duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h3 className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase mb-1">CHRONO_REGISTRY</h3>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">ACADEMIC TIMETABLE</h2>
        </div>
        
        <div className="flex overflow-x-auto p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl scrollbar-hide shadow-sm">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${
                selectedDay === day 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.length > 0 ? schedule.map((item, idx) => (
          <div key={item.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl hover:border-indigo-500 transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600/20 group-hover:bg-indigo-600 transition-all" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SESS_{idx + 1}</span>
            </div>

            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 leading-tight min-h-[3rem]">{item.subject}</h4>
            
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{item.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">ZONE_{item.room}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{item.faculty}</span>
              </div>
            </div>

            <button className="mt-8 w-full py-3 border-2 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600 rounded-2xl text-[9px] font-black tracking-widest uppercase hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 group/btn">
              Awaiting_Start <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        )) : (
          <div className="col-span-full py-20 bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
            <p className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">NO_ACTIVE_SESSIONS_FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
