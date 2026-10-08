import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

// Interfaces
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface Contact {
  id: string;
  name: string;
  rank: number;
  branch: string;
  year: string;
  avatar: string;
  isOnline: boolean;
  topAchievement: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

// Mock Data
const CURRENT_USER_ID = 'u1'; // Varun

const MOCK_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Aman Sharma',
    rank: 2,
    branch: 'CSIT',
    year: '3rd Year',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aman',
    isOnline: true,
    topAchievement: 'Winner - Smart India Hackathon',
    lastMessage: "Let's discuss the tech stack.",
    lastMessageTime: '10:42 AM',
    unreadCount: 0
  },
  {
    id: 'c2',
    name: 'Priya Patel',
    rank: 5,
    branch: 'ECE',
    year: '4th Year',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    isOnline: false,
    topAchievement: 'Research Paper - IEEE',
    lastMessage: 'Sure, I can help with the IoT module.',
    lastMessageTime: 'Yesterday',
    unreadCount: 2
  },
  {
    id: 'c3',
    name: 'Rohan Gupta',
    rank: 12,
    branch: 'Mechanical',
    year: '2nd Year',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
    isOnline: true,
    topAchievement: 'Best Design - RoboWar',
    lastMessage: 'When is the next meet?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  }
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  'c1': [
    { id: 'm1', senderId: 'c1', text: "Hey Varun! Saw your profile. Your rank is impressive!", timestamp: '10:30 AM' },
    { id: 'm2', senderId: CURRENT_USER_ID, text: "Thanks Aman! I saw you do a lot of Python development.", timestamp: '10:32 AM' },
    { id: 'm3', senderId: 'c1', text: "Yeah! Are you planning to build a team for the next Prayatn 3.0 hackathon? I have a real-world problem statement regarding campus resource management we could work on.", timestamp: '10:35 AM' },
    { id: 'm4', senderId: CURRENT_USER_ID, text: "That sounds exactly like what I'm looking for. Let's discuss the tech stack.", timestamp: '10:42 AM' }
  ]
};

export default function ChatInterface() {
  const [activeContactId, setActiveContactId] = useState<string | null>('c1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false); // For mobile responsiveness

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = MOCK_CONTACTS.find(c => c.id === activeContactId);
  const currentMessages = activeContactId ? (messages[activeContactId] || []) : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, activeContactId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContactId) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: CURRENT_USER_ID,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), msg]
    }));
    setNewMessage('');
  };

  const handleContactClick = (contactId: string) => {
    setActiveContactId(contactId);
    setIsMobileChatOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex h-[calc(100vh-8rem)]">
      {/* Sidebar - Contacts List */}
      <div className={`${isMobileChatOpen ? 'hidden md:flex' : 'flex'} w-full md:w-80 bg-slate-50 border-r border-slate-200 flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="font-bold text-slate-800 text-lg mb-4">Flashed Connections</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search connections..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONTACTS.map(contact => (
            <button
              key={contact.id}
              onClick={() => handleContactClick(contact.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-slate-100 transition-colors border-b border-slate-100 last:border-0 text-left ${
                activeContactId === contact.id ? 'bg-indigo-50 hover:bg-indigo-50' : ''
              }`}
            >
              <div className="relative shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full bg-white border border-slate-200" />
                {contact.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-semibold truncate ${activeContactId === contact.id ? 'text-indigo-900' : 'text-slate-900'}`}>
                    {contact.name}
                  </h3>
                  <span className="text-[10px] text-slate-400">{contact.lastMessageTime}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mb-1">
                  {contact.branch} • {contact.year}
                </p>
                <div className="flex justify-between items-center">
                   <p className="text-xs text-slate-400 truncate max-w-[140px]">
                    {contact.lastMessage}
                   </p>
                   {contact.unreadCount > 0 && (
                     <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                       {contact.unreadCount}
                     </span>
                   )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Chat Window */}
      <div className={`${!isMobileChatOpen ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-[#efeae2] md:bg-white relative`}>
        {/* Chat Header */}
        {activeContact ? (
          <>
            <div className="h-16 px-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMobileChatOpen(false)}
                  className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full border border-slate-200" />
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{activeContact.name}</h3>
                  <p className="text-xs text-indigo-600 font-medium truncate max-w-[200px] md:max-w-md">
                    🏆 {activeContact.topAchievement}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              {currentMessages.map((msg, index) => {
                const isMe = msg.senderId === CURRENT_USER_ID;
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2 shadow-sm relative group ${
                      isMe 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 outline-none transition-all resize-none"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm shadow-indigo-200"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No chat selected</h3>
            <p className="text-sm max-w-xs mx-auto mt-2">Select a connection from the sidebar to start chatting or flash a new student in the Synergy Hub.</p>
          </div>
        )}
      </div>
    </div>
  );
}
