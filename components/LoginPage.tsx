
import React, { useState } from 'react';
import { Zap, ShieldCheck, User, Lock, ArrowRight, Loader2, Info, Moon, Sun, AlertTriangle } from 'lucide-react';
import { db } from '../services/dbService';

interface LoginPageProps {
  onLogin: (role: 'student' | 'teacher', id: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await db.verifyUser(id, password);
      if (user) {
        if (user.role !== role) {
          setError(`Invalid role for this ID. Are you a ${role}?`);
        } else {
          onLogin(role as any, user.id);
        }
      } else {
        setError('Database error: Identity or Key mismatch.');
      }
    } catch (err) {
      setError('Connection timeout. Database node unreachable.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillSample = (roleType: 'student' | 'teacher') => {
    setRole(roleType);
    setId(roleType === 'student' ? 'ST-2025-001' : 'FAC-8291-ALPHA');
    setPassword('password');
    setError(null);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-500/10 blur-[140px] rounded-full animate-blob animation-delay-4000" />
        
        {/* Techno Grid Overlay */}
        <div className={`absolute inset-0 opacity-20 ${isDark ? 'techno-grid' : ''}`} style={{ backgroundImage: !isDark ? 'radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.1) 1px, transparent 0)' : undefined, backgroundSize: '32px 32px' }}></div>
      </div>

      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="fixed top-8 right-8 z-50 p-3 rounded-2xl glass border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-500 transition-all shadow-xl"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-1000">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-600/40 mb-8 animate-float">
            <Zap className="w-10 h-10 text-white fill-current" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            EDU<span className="text-indigo-600">DASH</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 tracking-[0.5em] uppercase mt-3">Auth_Protocol_Active_v2</p>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-50" />
          
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl mb-8">
            <button
              onClick={() => { setRole('student'); setError(null); }}
              className={`flex-1 py-3 text-[10px] font-black tracking-widest uppercase rounded-xl transition-all ${
                role === 'student' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-md scale-[1.02]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => { setRole('teacher'); setError(null); }}
              className={`flex-1 py-3 text-[10px] font-black tracking-widest uppercase rounded-xl transition-all ${
                role === 'teacher' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-md scale-[1.02]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-500 animate-in shake duration-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-tight">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase px-2">Identification_Roll_ID</label>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-500 transition-colors" />
                <input
                  required
                  type="text"
                  placeholder={role === 'student' ? "ST-XXXX-XXX" : "FAC-XXXX-XXX"}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-indigo-600 dark:text-white text-sm font-bold uppercase tracking-widest transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase px-2">Secret_Access_Key</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-500 transition-colors" />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-indigo-600 dark:text-white text-sm transition-all"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/30 active:scale-95 transition-all disabled:opacity-50 mt-4 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Establish_Link <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sample Logins Section */}
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-3 h-3 text-indigo-500" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Demo_Credentials_Manifest</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => fillSample('student')}
                className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-left hover:border-indigo-500 transition-all group"
              >
                <p className="text-[8px] font-black text-indigo-500 uppercase mb-1">Student_Node</p>
                <p className="text-[9px] font-bold text-slate-600 dark:text-slate-400 truncate">ST-2025-001</p>
              </button>
              <button 
                onClick={() => fillSample('teacher')}
                className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-left hover:border-indigo-500 transition-all"
              >
                <p className="text-[8px] font-black text-indigo-500 uppercase mb-1">Faculty_Node</p>
                <p className="text-[9px] font-bold text-slate-600 dark:text-slate-400 truncate">FAC-8291-ALPHA</p>
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 tracking-widest uppercase opacity-50">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            SECURED_ENDPOINTS_ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
