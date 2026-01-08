
import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  UserCircle, 
  GraduationCap, 
  BookMarked, 
  ClipboardList,
  CalendarDays,
  Percent,
  TrendingUp,
  MapPin,
  Clock,
  Activity
} from 'lucide-react';
import { MOCK_SCHEDULE, MOCK_ATTENDANCE } from '../constants';

interface DashboardProps {
  onNav: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNav }) => {
  const today = 'Monday';
  const scheduleToday = MOCK_SCHEDULE[today] || [];
  
  const attendancePercentage = Math.round(
    (MOCK_ATTENDANCE.filter(a => a.status === 'present').length / MOCK_ATTENDANCE.length) * 100
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left System Column */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Active Schedule Module */}
          <section className="animate-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="flex items-end justify-between mb-6 px-1">
              <div>
                <h3 className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase mb-1">CORE_OPERATIONS</h3>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">DAILY TIMELINE</h2>
              </div>
              <button 
                onClick={() => onNav('schedule')}
                className="group flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 hover:text-indigo-500 transition-colors uppercase"
              >
                Expand_View
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scheduleToday.slice(0, 2).map((item, idx) => (
                <div key={item.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5">
                    <GraduationCap className="w-20 h-20" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-[10px] font-black px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 tracking-widest">
                      UNIT {idx + 1}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 text-lg">{item.subject}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {item.time}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      ZONE {item.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Modules */}
          <section className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <h3 className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase mb-6 px-1">FEEDBACK_PROTOCOLS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 text-white border border-slate-800 flex flex-col justify-between h-48 group hover:border-indigo-500/50 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex justify-between items-start">
                  <MessageCircle className="w-6 h-6 text-indigo-400" />
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 border border-indigo-400/30 px-2 py-0.5 rounded">PENDING</span>
                </div>
                <div className="relative z-10">
                  <h4 className="text-sm font-black tracking-widest uppercase mb-1">FACULTY EVALUATION</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-4">Transmission required by EOM</p>
                  <button className="text-[10px] font-black bg-indigo-600 text-white px-4 py-2 rounded uppercase tracking-widest hover:bg-indigo-500 transition-colors">Initiate</button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-48 hover:border-indigo-500/30 transition-all group">
                <div className="flex justify-between items-start">
                  <UserCircle className="w-6 h-6 text-slate-400 dark:text-slate-600" />
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded uppercase">OPEN</span>
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-widest uppercase mb-1 text-slate-800 dark:text-white">CAMPUS PULSE</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-4">Community improvement channel</p>
                  <button className="text-[10px] font-black border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 px-4 py-2 rounded uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Access</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right System Column */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* Essentials Module */}
          <section className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <h3 className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase mb-6 px-1">VITALS</h3>
            <div 
              onClick={() => onNav('attendance')}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase">ATTENDANCE</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Real-time sync</p>
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{attendancePercentage}%</div>
              </div>
              
              <div className="space-y-4">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000" 
                    style={{ width: `${attendancePercentage}%` }} 
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-black tracking-widest">
                  <span className="text-slate-400">THRESHOLD 75%</span>
                  <span className="text-emerald-500 uppercase">NOMINAL</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links Module */}
          <section className="animate-in slide-in-from-bottom-4 duration-500 delay-400">
            <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-[0.2em] uppercase mb-6">REGISTRY_LINKS</h3>
              <div className="space-y-2">
                <QuickLink icon={<ClipboardList className="w-4 h-4" />} label="SYLLABUS_V4" onClick={() => onNav('syllabus')} />
                <QuickLink icon={<CalendarDays className="w-4 h-4" />} label="ACADEMIC_CAL" onClick={() => onNav('schedule')} />
                <QuickLink icon={<Percent className="w-4 h-4" />} label="EXAM_ALLOCATIONS" onClick={() => {}} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const QuickLink: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:border-indigo-500/50 transition-all text-left group"
  >
    <div className="flex items-center gap-3">
      <span className="text-slate-400 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">{icon}</span>
      <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 tracking-widest uppercase group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
    </div>
    <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 transition-colors" />
  </button>
);

export default Dashboard;
