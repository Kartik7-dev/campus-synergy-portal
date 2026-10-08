import React, { useState } from 'react';
import { Trophy, Zap, MessageCircle, Filter, Award, ChevronRight, Users, BookOpen, Calendar } from 'lucide-react';
import { MOCK_STUDENTS, Student } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';

interface SynergyHubProps {
  onFlash: (student: Student) => void;
}

type FilterType = 'All' | 'Branch' | 'Year';

export default function SynergyHub({ onFlash }: SynergyHubProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Grouping logic
  const branches = Array.from(new Set(MOCK_STUDENTS.map(s => s.branch)));
  const years = Array.from(new Set(MOCK_STUDENTS.map(s => s.year)));

  const getFilteredStudents = () => {
    let students = [...MOCK_STUDENTS];
    
    if (activeFilter === 'Branch' && selectedCategory) {
      students = students.filter(s => s.branch === selectedCategory);
    } else if (activeFilter === 'Year' && selectedCategory) {
      students = students.filter(s => s.year === selectedCategory);
    }
    
    return students.sort((a, b) => a.rank - b.rank);
  };

  const filteredStudents = getFilteredStudents();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-7 h-7 text-amber-500" />
              Synergy Hub
            </h2>
            <p className="text-slate-500 mt-1">Connect with top achievers across campus.</p>
          </div>
          
          {/* Main Filter Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => { setActiveFilter('All'); setSelectedCategory(null); }}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                activeFilter === 'All' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              All Rankings
            </button>
            <button
              onClick={() => { setActiveFilter('Branch'); setSelectedCategory(branches[0]); }}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                activeFilter === 'Branch' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Branch-wise
            </button>
            <button
              onClick={() => { setActiveFilter('Year'); setSelectedCategory(years[0]); }}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                activeFilter === 'Year' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Year-wise
            </button>
          </div>
        </div>

        {/* Sub-filters (Categories) */}
        {activeFilter !== 'All' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-100"
          >
            {(activeFilter === 'Branch' ? branches : years).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Rank Badge */}
                <div className={`absolute -left-3 top-6 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm border-4 border-slate-50 z-10 ${
                  student.rank === 1 ? 'bg-amber-400 text-amber-900' :
                  student.rank === 2 ? 'bg-slate-300 text-slate-800' :
                  student.rank === 3 ? 'bg-orange-300 text-orange-900' :
                  'bg-white text-slate-600 border-slate-200'
                }`}>
                  #{student.rank}
                </div>

                <div className="pl-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{student.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                          <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                            <BookOpen className="w-3 h-3" /> {student.branch}
                          </span>
                          <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                            <Calendar className="w-3 h-3" /> {student.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Certificates Summary */}
                  <div className="space-y-2 mb-6 min-h-[80px]">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Achievements</p>
                    {student.certificates.slice(0, 2).map((cert) => (
                      <div key={cert.id} className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 group-hover:bg-white group-hover:border-indigo-50 transition-colors">
                        <Award className={`w-4 h-4 shrink-0 mt-0.5 ${
                          cert.type === 'Winner' ? 'text-amber-500' : 
                          cert.type === 'Runner Up' ? 'text-slate-400' : 'text-indigo-500'
                        }`} />
                        <span className="line-clamp-2 leading-relaxed">{cert.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => onFlash(student)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 active:scale-95 transition-all font-medium text-sm shadow-sm group-hover:shadow-indigo-200/50"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Flash to Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
