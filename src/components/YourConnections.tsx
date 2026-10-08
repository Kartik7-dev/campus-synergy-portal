import React, { useState } from 'react';
import { MessageCircle, Trophy, Award, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data as provided in the request
const MOCK_CONNECTIONS = [
  {
    id: 1,
    name: "Aman Sharma",
    branch: "CSIT",
    year: "3rd Year",
    section: "A",
    rank: 1,
    topAchievement: "Winner - Prayatn 3.0",
    avatar: "aman"
  },
  {
    id: 2,
    name: "Priya Singh",
    branch: "Mechanical",
    year: "3rd Year",
    section: "B",
    rank: 4,
    topAchievement: "Runner-Up - AutoFest",
    avatar: "priya"
  },
  {
    id: 3,
    name: "Rahul Verma",
    branch: "CSIT",
    year: "2nd Year",
    section: "A",
    rank: 7,
    topAchievement: "Participant - WebDev Bootcamp",
    avatar: "rahul"
  },
  {
    id: 4,
    name: "Neha Gupta",
    branch: "CSIT",
    year: "3rd Year",
    section: "C",
    rank: 2,
    topAchievement: "Winner - Acropolis TechFest",
    avatar: "neha"
  }
];

// Current User Context (Varun)
const CURRENT_USER_CONTEXT = {
  branch: "CSIT",
  year: "3rd Year",
  section: "A"
};

type FilterType = 'all' | 'section' | 'branch' | 'year';

export default function YourConnections() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filtering Logic
  const filteredConnections = MOCK_CONNECTIONS.filter(student => {
    switch (activeFilter) {
      case 'section':
        // "My Section" implies same year AND same section (Classmates)
        return student.section === CURRENT_USER_CONTEXT.section && student.year === CURRENT_USER_CONTEXT.year;
      case 'branch':
        return student.branch === CURRENT_USER_CONTEXT.branch;
      case 'year':
        return student.year === CURRENT_USER_CONTEXT.year;
      case 'all':
      default:
        return true;
    }
  });

  const tabs: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Connections' },
    { id: 'section', label: 'My Section' },
    { id: 'branch', label: 'My Branch' },
    { id: 'year', label: 'My Year' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Your Connections Network
          </h2>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
            {MOCK_CONNECTIONS.length} Connected
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          Collaborate and build teams with your campus network.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Connections Grid */}
      <div className="p-6 bg-slate-50/50 min-h-[300px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredConnections.map((student) => (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.avatar}`}
                      alt={student.name}
                      className="w-14 h-14 rounded-full bg-slate-100 object-cover border-2 border-white shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-900 border-2 border-white">
                      #{student.rank}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-800 truncate">{student.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-medium rounded-md border border-indigo-100">
                            {student.branch}
                          </span>
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-medium rounded-md border border-purple-100">
                            {student.year}
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-medium rounded-md border border-emerald-100">
                            Sec {student.section}
                          </span>
                        </div>
                      </div>
                      
                      {/* DM Button */}
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Achievement */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span className="truncate font-medium">{student.topAchievement}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredConnections.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <Filter className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No connections found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
