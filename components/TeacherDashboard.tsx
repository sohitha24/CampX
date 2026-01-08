
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Plus, 
  CheckCircle, 
  TrendingUp, 
  Send, 
  Clock, 
  MapPin,
  ClipboardCheck,
  Zap,
  Loader2,
  Check
} from 'lucide-react';
import { db } from '../services/dbService';
import { AttendanceRecord } from '../types';

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'events'>('attendance');
  const [attendanceList, setAttendanceList] = useState<Record<string, 'present' | 'absent'>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendanceList(prev => ({ ...prev, [studentId]: status }));
    setSaveStatus('idle');
  };

  const saveToDb = async () => {
    setIsSaving(true);
    const today = new Date().toISOString().split('T')[0];
    // FIX: Explicitly type the records array and cast status to ensure compatibility with AttendanceRecord interface
    const records: AttendanceRecord[] = Object.entries(attendanceList).map(([_, status]) => ({
      date: today,
      status: status as 'present' | 'absent'
    }));

    await db.saveAttendance(records);
    setIsSaving(false);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase mb-1">ADMIN_ROOT</h3>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">FACULTY OVERVIEW</h2>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 text-[9px] font-black tracking-widest uppercase rounded-lg transition-all ${
              activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'
            }`}
          >
            Manage_Attendance
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 text-[9px] font-black tracking-widest uppercase rounded-lg transition-all ${
              activeTab === 'events' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'
            }`}
          >
            Broadcast_Events
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'attendance' ? (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 animate-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase">CLASS_LIST: DATA_STRUCTURES</h3>
                </div>
                <span className="text-[10px] font-black text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded bg-emerald-500/5">SEC_B / LAB_4</span>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => {
                  const sId = `STUDENT_ID_00${i}`;
                  return (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl group hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-black text-slate-500">#{i}</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white uppercase">{sId}</p>
                          <p className="text-[9px] font-bold text-slate-400 tracking-tighter uppercase">Last Login: 2H AGO</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAttendanceChange(sId, 'present')}
                          className={`px-4 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${
                            attendanceList[sId] === 'present' 
                              ? 'bg-emerald-500 text-white border-emerald-500' 
                              : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white'
                          }`}
                        >
                          Present
                        </button>
                        <button 
                          onClick={() => handleAttendanceChange(sId, 'absent')}
                          className={`px-4 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${
                            attendanceList[sId] === 'absent' 
                              ? 'bg-rose-500 text-white border-rose-500' 
                              : 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button 
                onClick={saveToDb}
                disabled={isSaving || Object.keys(attendanceList).length === 0}
                className={`w-full mt-8 py-4 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase shadow-xl transition-all flex items-center justify-center gap-3 ${
                  saveStatus === 'success' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50'
                }`}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : saveStatus === 'success' ? (
                  <>Registry_Saved <Check className="w-4 h-4" /></>
                ) : (
                  'Commit_Period_Registry_To_SQL'
                )}
              </button>
            </section>
          ) : (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 animate-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3 mb-8">
                <Plus className="w-5 h-5 text-indigo-500" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase">CREATE_EVENT_TRANSMISSION</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 tracking-widest px-1 uppercase">EVENT_TITLE</label>
                  <input type="text" placeholder="GUEST_LECTURE: CYBER_SECURITY" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-indigo-500 text-xs font-bold uppercase tracking-widest dark:text-white" />
                </div>
                <button className="flex items-center justify-center gap-3 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-indigo-500 transition-all">
                  Broadcast_To_Student_Nodes <Send className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 dark:bg-black p-8 rounded-3xl border border-slate-800 relative overflow-hidden group">
            <div className="relative z-10">
              <TrendingUp className="w-6 h-6 text-indigo-400 mb-6" />
              <h4 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-1">AVERAGE_RETENTION</h4>
              <p className="text-5xl font-black text-white tracking-tighter">88.4%</p>
              <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[88%] h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;