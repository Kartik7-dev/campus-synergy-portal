import React, { useState } from 'react';
import { LayoutGrid, Bell, Search, CheckSquare, Trophy, Settings, MessageCircle, Users } from 'lucide-react';
import DashboardHome from './components/DashboardHome';
import SynergyHub from './components/SynergyHub';
import ChatDrawer from './components/ChatDrawer';
import TaskManager from './components/TaskManager';
import AuthPage from './components/AuthPage';
import ProfileSettings from './components/ProfileSettings';
import ChatInterface from './components/ChatInterface';
import MyNetwork from './components/MyNetwork';
import { Student } from './data/mockData';

type View = 'dashboard' | 'tasks' | 'synergy' | 'settings' | 'chat' | 'network';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleFlash = (student: Student) => {
    setSelectedStudent(student);
    setChatOpen(true);
  };

  if (!isAuthenticated) {
    return <AuthPage onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
       {/* Background Image (Subtle) */}
       <div 
         className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
         style={{
           backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}
       />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Campus<span className="text-indigo-600">Synergy</span></span>
            </div>

            {/* Main Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentView === 'dashboard' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('network')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentView === 'network' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Users className="w-4 h-4" />
                My Network
              </button>
              <button 
                onClick={() => setCurrentView('tasks')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentView === 'tasks' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                My Planner
              </button>
              <button 
                onClick={() => setCurrentView('synergy')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentView === 'synergy' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Trophy className="w-4 h-4" />
                Synergy Hub
              </button>
              <button 
                onClick={() => setCurrentView('chat')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentView === 'chat' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Messages
              </button>
            </nav>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search students, events, or requests..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div 
              onClick={() => setCurrentView('settings')}
              className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-medium text-sm cursor-pointer hover:ring-2 hover:ring-indigo-500/20 transition-all"
            >
              V
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && <DashboardHome />}

        {currentView === 'network' && <MyNetwork />}

        {currentView === 'tasks' && <TaskManager />}
        
        {currentView === 'synergy' && (
          <div className="h-[calc(100vh-8rem)]">
            <SynergyHub onFlash={handleFlash} />
          </div>
        )}

        {currentView === 'chat' && <ChatInterface />}

        {currentView === 'settings' && <ProfileSettings />}
      </main>

      {/* Chat Overlay */}
      <ChatDrawer 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        student={selectedStudent} 
      />
    </div>
  );
}
