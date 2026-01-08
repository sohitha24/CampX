
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, Terminal } from 'lucide-react';
import { askCourseAssistant } from '../services/geminiService';
import { SYLLABUS } from '../constants';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface AIChatbotProps {
  onClose: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'SYSTEM READY. I AM YOUR ACADEMIC ASSISTANT V2. INQUIRY REQUIRED.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const context = JSON.stringify(SYLLABUS);
    const botResponse = await askCourseAssistant(userMsg, context);
    
    setMessages(prev => [...prev, { role: 'bot', text: (botResponse || 'ERROR: NO RESPONSE GENERATED').toUpperCase() }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 sm:inset-auto sm:right-8 sm:bottom-24 z-50 w-full sm:w-[420px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 rounded-none sm:rounded-2xl">
      <div className="bg-slate-900 dark:bg-black p-4 text-white flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-indigo-500" />
          <h3 className="text-[10px] font-black tracking-[0.3em]">AI_TERMINAL_V2</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 h-[450px] bg-slate-50 dark:bg-slate-950 techno-grid">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 border transition-all ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white border-indigo-400/50 rounded-lg rounded-tr-none shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 rounded-lg rounded-tl-none'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {m.role === 'bot' ? <Bot className="w-3 h-3 text-indigo-500" /> : <User className="w-3 h-3 text-indigo-300" />}
                <span className="text-[8px] font-black tracking-widest opacity-50">{m.role === 'user' ? 'AUTH_STUDENT' : 'SYS_ASSISTANT'}</span>
              </div>
              <p className="text-xs font-bold leading-relaxed tracking-tight break-words">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-lg rounded-tl-none flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              <span className="text-[10px] font-black tracking-widest text-slate-500">ANALYZING...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="INPUT COMMAND..."
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-[10px] font-black tracking-widest uppercase transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-indigo-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatbot;
