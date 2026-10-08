import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, ArrowRight } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import RankedSynergyWidget from './RankedSynergyWidget';
import { MOCK_REQUESTS, CURRENT_USER } from '../data/mockData';

export default function DashboardHome() {
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse(null);
    
    // Simulate AI response
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResponse("I've analyzed your request. Based on current campus trends, I recommend focusing on AI-driven healthcare solutions for Prayatn 3.0. For the Bonafide Certificate, please visit the Admin Block, Window 4, between 10 AM and 2 PM.");
    }, 1500);
  };

  const handleChipClick = (text: string) => {
    setAiQuery(text);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Header with Dynamic Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-10"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${CURRENT_USER.name}`} 
                alt="Profile" 
                className="w-full h-full object-cover bg-white"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-400 border-2 border-indigo-700 rounded-full"></div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
              Welcome, {CURRENT_USER.name}!
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl font-medium">
              Real-time transparency for your campus requests. <br className="hidden md:block"/>
              Connect with top achievers and manage your academic journey.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/10">
                {CURRENT_USER.branch}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/10">
                {CURRENT_USER.year}
              </span>
              <span className="px-3 py-1 bg-amber-400/90 text-amber-900 rounded-full text-xs font-bold shadow-sm">
                Top 5% Student
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Administrative Transparency Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Campus Requests</h2>
            <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-1">
             <AdminDashboard requests={MOCK_REQUESTS} hideBanner={true} />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Synergy AI Quick-Access Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Subtle Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-bold text-slate-900">Synergy AI Assistant</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6">Your co-pilot for campus life and hackathons.</p>

              <form onSubmit={handleAiSubmit} className="relative mb-4">
                <input 
                  type="text" 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask about administrative bottlenecks or brainstorm hackathon ideas..."
                  className="w-full pl-4 pr-32 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none"
                />
                <button 
                  type="submit"
                  disabled={isAiLoading || !aiQuery.trim()}
                  className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAiLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Ask AI <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Brainstorm problem statements for Prayatn 3.0",
                  "How to get a Bonafide Certificate at Acropolis?",
                  "Suggest Python tech stacks for my team"
                ].map((chip, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 text-xs font-medium rounded-full transition-colors border border-transparent hover:border-indigo-100"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Mock Response Area */}
              {aiResponse && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="mt-4 p-4 bg-violet-50 border border-violet-100 rounded-xl text-sm text-slate-700 flex gap-3"
                 >
                   <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                     <Bot className="w-5 h-5 text-violet-600" />
                   </div>
                   <div>
                     <p className="font-medium text-violet-900 mb-1">Synergy AI</p>
                     <p>{aiResponse}</p>
                   </div>
                 </motion.div>
              )}
            </div>
          </div>

          {/* Condensed Synergy Hub (Ranked Students) */}
          <div className="h-[400px]">
             <RankedSynergyWidget />
          </div>

        </div>
      </div>
    </div>
  );
}
