import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, Calendar, Tag, Folder, Plus, 
  MoreVertical, Trash2, Flag, ChevronRight, Layout, 
  CheckSquare, Clock, Filter, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Task, TaskFolder, MOCK_TASKS, MOCK_FOLDERS } from '../data/mockData';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [folders, setFolders] = useState<TaskFolder[]>(MOCK_FOLDERS);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // New Task Form State
  const [newTaskDetails, setNewTaskDetails] = useState<{
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    tags: string;
    folderId: string;
  }>({
    description: '',
    priority: 'Medium',
    dueDate: '',
    tags: '',
    folderId: 'f1' // Default to first user folder
  });

  const filteredTasks = tasks.filter(task => {
    if (selectedFolderId === 'all') return true;
    if (selectedFolderId === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return task.dueDate === today;
    }
    return task.folderId === selectedFolderId;
  });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    if (selectedTask?.id === id) setSelectedTask(null);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `t${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDetails.description,
      completed: false,
      folderId: selectedFolderId === 'all' || selectedFolderId === 'today' ? newTaskDetails.folderId : selectedFolderId,
      tags: newTaskDetails.tags.split(',').map(t => t.trim()).filter(Boolean),
      dueDate: newTaskDetails.dueDate || null,
      priority: newTaskDetails.priority,
      createdAt: new Date().toISOString()
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskDetails({
      description: '',
      priority: 'Medium',
      dueDate: '',
      tags: '',
      folderId: folders.find(f => f.type === 'user')?.id || 'f1'
    });
    setIsAddingTask(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Low': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex h-[calc(100vh-8rem)]">
      {/* Sidebar - Folders */}
      <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-600" />
            My Planner
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFolderId === folder.id 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {folder.id === 'all' ? <Layout className="w-4 h-4" /> :
                 folder.id === 'today' ? <Calendar className="w-4 h-4" /> :
                 <Folder className={`w-4 h-4 ${
                   folder.color === 'indigo' ? 'text-indigo-500' :
                   folder.color === 'amber' ? 'text-amber-500' :
                   folder.color === 'emerald' ? 'text-emerald-500' : 'text-slate-400'
                 }`} fill="currentColor" fillOpacity={0.2} />}
                {folder.name}
              </div>
              <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                {folder.id === 'all' ? tasks.length :
                 folder.id === 'today' ? tasks.filter(t => t.dueDate === new Date().toISOString().split('T')[0]).length :
                 tasks.filter(t => t.folderId === folder.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-slate-200">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            New Folder
          </button>
        </div>
      </div>

      {/* Main Task List */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
          <h3 className="font-bold text-lg text-slate-800">
            {folders.find(f => f.id === selectedFolderId)?.name}
          </h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsAddingTask(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence>
            {isAddingTask && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <form onSubmit={handleAddTask} className="bg-slate-50 border border-indigo-100 rounded-xl p-4 shadow-sm ring-1 ring-indigo-500/10">
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="What needs to be done?"
                      className="bg-transparent text-lg font-medium placeholder:text-slate-400 outline-none w-full"
                      autoFocus
                    />
                    <button type="button" onClick={() => setIsAddingTask(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                      <input
                        type="text"
                        value={newTaskDetails.description}
                        onChange={(e) => setNewTaskDetails({...newTaskDetails, description: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500"
                        placeholder="Add details..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={newTaskDetails.tags}
                        onChange={(e) => setNewTaskDetails({...newTaskDetails, tags: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500"
                        placeholder="Urgent, Home, etc."
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center justify-between pt-2 border-t border-slate-200/50">
                    <div className="flex gap-3">
                      <select 
                        value={newTaskDetails.priority}
                        onChange={(e) => setNewTaskDetails({...newTaskDetails, priority: e.target.value as any})}
                        className="text-xs font-medium bg-white border border-slate-200 rounded-md px-2 py-1 outline-none focus:border-indigo-500"
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                      </select>
                      
                      <input 
                        type="date"
                        value={newTaskDetails.dueDate}
                        onChange={(e) => setNewTaskDetails({...newTaskDetails, dueDate: e.target.value})}
                        className="text-xs font-medium bg-white border border-slate-200 rounded-md px-2 py-1 outline-none focus:border-indigo-500 text-slate-600"
                      />

                      {(selectedFolderId === 'all' || selectedFolderId === 'today') && (
                        <select
                          value={newTaskDetails.folderId}
                          onChange={(e) => setNewTaskDetails({...newTaskDetails, folderId: e.target.value})}
                          className="text-xs font-medium bg-white border border-slate-200 rounded-md px-2 py-1 outline-none focus:border-indigo-500"
                        >
                          {folders.filter(f => f.type === 'user').map(f => (
                            <option key={f.id} value={f.id}>{f.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <button 
                      type="submit"
                      disabled={!newTaskTitle.trim()}
                      className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Create Task
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {filteredTasks.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-slate-900 font-medium mb-1">No tasks found</h3>
                <p className="text-slate-500 text-sm">You're all caught up! Or maybe you haven't added any tasks yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTasks.map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedTask?.id === task.id 
                        ? 'bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-500/10' 
                        : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedTask(task)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTask(task.id);
                      }}
                      className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-slate-300 hover:border-indigo-500'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-medium truncate transition-all ${
                          task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                        }`}>
                          {task.title}
                        </h4>
                        <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      {task.description && (
                        <p className="text-sm text-slate-500 truncate mt-0.5">{task.description}</p>
                      )}

                      <div className="flex items-center gap-3 mt-2">
                        {task.dueDate && (
                          <div className={`flex items-center gap-1 text-xs ${
                            new Date(task.dueDate) < new Date() && !task.completed ? 'text-red-500 font-medium' : 'text-slate-400'
                          }`}>
                            <Clock className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                        )}
                        
                        {task.tags.length > 0 && (
                          <div className="flex items-center gap-2">
                            {task.tags.map(tag => (
                              <span key={tag} className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Task Details (Conditional) */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-slate-200 bg-slate-50 overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedTask.priority)}`}>
                  {selectedTask.priority} Priority
                </div>
                <button onClick={() => setSelectedTask(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">{selectedTask.title}</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Description</label>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedTask.description || "No description provided."}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Properties</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Folder className="w-4 h-4" /> Folder
                      </span>
                      <span className="font-medium text-slate-700">
                        {folders.find(f => f.id === selectedTask.folderId)?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Due Date
                      </span>
                      <span className="font-medium text-slate-700">
                        {selectedTask.dueDate || 'None'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 shadow-sm">
                        {tag}
                      </span>
                    ))}
                    <button className="px-2 py-1 bg-slate-100 border border-slate-200 border-dashed rounded-md text-xs font-medium text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
                      + Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-200 bg-white">
              <button 
                onClick={() => toggleTask(selectedTask.id)}
                className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedTask.completed 
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {selectedTask.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
