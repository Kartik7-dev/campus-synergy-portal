import React, { useState } from 'react';
import { Trophy, Zap, Medal } from 'lucide-react';
import { MOCK_STUDENTS } from '../data/mockData';

export default function RankedSynergyWidget() {
  const [activeTab, setActiveTab] = useState<'class' | 'branch' | 'year'>('branch');

  // Filter students based on active tab (Mock logic)
  const filteredStudents = MOCK_STUDENTS.slice(0, 3); // Just show top 3 for the widget

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      {/* Header & Tabs */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Synergy Hub Rankings
          </h3>
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            Live Updates
          </span>
        </div>
        
        {/* Segmented Control */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {(['class', 'branch', 'year'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab} Rank
            </button>
          ))}
        </div>
      </div>

      {/* Ranked List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredStudents.map((student, index) => (
          <div 
            key={student.id}
            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
          >
            {/* Rank Badge */}
            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
              index === 0 ? 'bg-amber-100 text-amber-700' :
              index === 1 ? 'bg-slate-200 text-slate-700' :
              index === 2 ? 'bg-orange-100 text-orange-800' :
              'bg-slate-100 text-slate-500'
            }`}>
              #{student.rank}
            </div>

            {/* Avatar */}
            <div className="relative">
              <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              {index === 0 && (
                <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-0.5 border border-white">
                  <Medal className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 text-sm truncate">{student.name}</h4>
              <p className="text-xs text-slate-500 truncate">{student.branch} • {student.year}</p>
              
              {/* Achievement Icons */}
              <div className="flex gap-1 mt-1">
                {student.certificates.map((cert) => (
                  <div key={cert.id} title={cert.title} className="bg-slate-100 p-0.5 rounded">
                    {cert.type === 'Winner' ? <Medal className="w-3 h-3 text-amber-500" /> :
                     cert.type === 'Runner Up' ? <Medal className="w-3 h-3 text-slate-400" /> :
                     <Medal className="w-3 h-3 text-orange-400" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Flash Button */}
            <button className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-200 transition-all active:scale-95 group-hover:scale-110">
              <Zap className="w-5 h-5 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
