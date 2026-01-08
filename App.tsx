
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Bell, 
  MessageSquare, 
  ChevronRight,
  Star,
  UserCheck,
  LogOut,
  Search,
  Moon,
  Sun,
  Zap,
  ShieldCheck
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import AttendanceTracker from './components/AttendanceTracker';
import AIChatbot from './components/AIChatbot';
import LoginPage from './components/LoginPage';
import TeacherDashboard from './components/TeacherDashboard';
import { MOCK_NOTIFICATIONS } from './constants';
import { UserRole } from './types';

type View = 'dashboard' | 'schedule' | 'attendance' | 'syllabus' | 'feedback';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userName, setUserName] = useState('');
  
  const now = new Date();
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  const currentDay = days[now.getDay()];
  const currentDate = `${now.getDate()} ${months[now.getMonth()]}`;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (role: UserRole, id: string) => {
    setUserName(id.toUpperCase());
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex font-sans selection:bg-indigo-500/30 selection:text-indigo-200 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-20 xl:w-72 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 flex-col sticky top-0 h-screen p-6 transition-all duration-300">
        <div className="flex items-center gap-3 mb-10 px-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h1 className="hidden xl:block text-xl font-black tracking-tighter text-slate-800 dark:text-white uppercase">
            EDUDASH <span className="text-indigo-500">{userRole === 'teacher' ? 'FAC' : 'v2'}</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-3">
          <NavItem icon={<LayoutDashboard />} label="DASHBOARD" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <NavItem icon={<Calendar />} label="SCHEDULE" active={currentView === 'schedule'} onClick={() => setCurrentView('schedule')} />
          {userRole === 'student' && (
            <>
              <NavItem icon={<UserCheck />} label="ATTENDANCE" active={currentView === 'attendance'} onClick={() => setCurrentView('attendance')} />
              <NavItem icon={<BookOpen />} label="SYLLABUS" active={currentView === 'syllabus'} onClick={() => setCurrentView('syllabus')} />
            </>
          )}
          <NavItem icon={<Star />} label="FEEDBACK" active={currentView === 'feedback'} onClick={() => setCurrentView('feedback')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="hidden xl:block text-[9px] font-black uppercase tracking-widest">{darkMode ? 'Light' : 'Dark'} Mode</span>
          </button>
          
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 overflow-hidden shrink-0">
              <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${userName}`} alt="User" />
            </div>
            <div className="hidden xl:block overflow-hidden">
              <p className="text-sm font-black text-slate-900 dark:text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">ID: {userName.split('-')[1] || '001'}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden xl:block text-[9px] font-black uppercase tracking-widest">Logout_Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 px-4 sm:px-10 py-6 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col">
              <h2 className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-1">NODE_STATUS: ONLINE</h2>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-black dark:text-white uppercase">AUTH_USER: {userName}</span>
                <span className="text-slate-400 dark:text-slate-700">|</span>
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">{currentDay}, {currentDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 w-64 backdrop-blur-md focus-within:border-indigo-500 transition-colors shadow-sm">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input type="text" placeholder="TERMINAL SEARCH..." className="bg-transparent border-none outline-none text-[9px] font-black tracking-widest w-full text-slate-800 dark:text-white placeholder:text-slate-500 uppercase" />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
              >
                <Bell className="w-5 h-5" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-top-2 duration-300 z-50">
                  <h4 className="font-black text-[9px] tracking-[0.2em] uppercase text-indigo-500 mb-4 px-2">PENDING_ALERTS</h4>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {MOCK_NOTIFICATIONS.map(n => (
                      <div key={n.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 group hover:border-indigo-500/30 transition-all">
                        <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase mb-1">{n.title}</p>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight uppercase font-bold">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="px-4 sm:px-10 pb-20 flex-1">
          {userRole === 'teacher' ? (
             currentView === 'dashboard' ? <TeacherDashboard /> : 
             currentView === 'schedule' ? <Schedule /> :
             <div className="py-20 text-center font-black tracking-[0.3em] uppercase opacity-20">Faculty_Interface_In_Dev...</div>
          ) : (
            <>
              {currentView === 'dashboard' && <Dashboard onNav={setCurrentView} />}
              {currentView === 'schedule' && <Schedule />}
              {currentView === 'attendance' && <AttendanceTracker onBack={() => setCurrentView('dashboard')} />}
              {currentView === 'syllabus' && <div className="py-20 text-center font-black tracking-[0.3em] uppercase opacity-20 animate-pulse">Syllabus_Module_Loading...</div>}
              {currentView === 'feedback' && <div className="py-20 text-center font-black tracking-[0.3em] uppercase opacity-20 animate-pulse">Feedback_Module_Offline...</div>}
            </>
          )}
        </div>

        {/* Mobile Nav */}
        <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-around rounded-2xl shadow-2xl">
          <MobileNavItem icon={<LayoutDashboard />} active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <MobileNavItem icon={<Calendar />} active={currentView === 'schedule'} onClick={() => setCurrentView('schedule')} />
          {userRole === 'student' && <MobileNavItem icon={<UserCheck />} active={currentView === 'attendance'} onClick={() => setCurrentView('attendance')} />}
          <MobileNavItem icon={<BookOpen />} active={currentView === 'syllabus'} onClick={() => setCurrentView('syllabus')} />
        </nav>

        {/* AI FAB (Only for students) */}
        {userRole === 'student' && (
          <button 
            onClick={() => setIsAiOpen(true)}
            className="fixed right-8 bottom-32 lg:bottom-10 z-50 w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden border-2 border-indigo-400/50"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <MessageSquare className="w-6 h-6" />
          </button>
        )}

        {isAiOpen && <AIChatbot onClose={() => setIsAiOpen(false)} />}
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30' 
        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
    }`}
  >
    <div className="flex items-center gap-4">
      <span className={`${active ? 'text-white' : 'text-slate-400 dark:text-slate-600 group-hover:text-indigo-500'} transition-colors`}>
        {React.cloneElement(icon as React.ReactElement, { size: 18 } as any)}
      </span>
      <span className="hidden xl:block text-[10px] font-black tracking-[0.2em]">{label}</span>
    </div>
    {active && <div className="hidden xl:block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
  </button>
);

const MobileNavItem: React.FC<Omit<any, 'label'>> = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl transition-all ${active ? 'text-indigo-600 bg-indigo-500/10' : 'text-slate-400'}`}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 22 } as any)}
  </button>
);

export default App;