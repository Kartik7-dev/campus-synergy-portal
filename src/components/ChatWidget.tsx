import React, { useState, useRef, useEffect } from 'react';
import { Send, MoreVertical, Search } from 'lucide-react';
import { DASHBOARD_CHAT_HISTORY } from '../data/mockData';

export default function ChatWidget() {
  const [messages, setMessages] = useState(DASHBOARD_CHAT_HISTORY);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      sender: "Varun",
      text: newMessage,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex h-[400px]">
      {/* Left Side: Contacts List */}
      <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50">
        <div className="p-3 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-7 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-400"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Active Contact */}
          <div className="flex items-center gap-2 p-3 bg-white border-l-4 border-indigo-500 cursor-pointer">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?u=aman" alt="Aman" className="w-10 h-10 rounded-full" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 truncate">Aman Sharma</h4>
              <p className="text-[10px] text-slate-500 truncate">Rank 1 • CSIT</p>
            </div>
          </div>
          {/* Other Contacts (Mock) */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 p-3 hover:bg-slate-100 cursor-pointer opacity-60">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="space-y-1 w-full">
                <div className="h-2 bg-slate-200 rounded w-2/3" />
                <div className="h-2 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Active Chat */}
      <div className="flex-1 flex flex-col bg-[#efeae2]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        {/* Header */}
        <div className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?u=aman" alt="Aman" className="w-8 h-8 rounded-full" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Aman Sharma</h4>
              <p className="text-[10px] text-green-600 font-medium">Online</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm text-sm relative ${
                msg.isMe 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[9px] block text-right mt-1 ${msg.isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-100 border-transparent rounded-full px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
            <button 
              type="submit"
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
