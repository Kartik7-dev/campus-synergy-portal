import React, { useState } from 'react';
import { Users, UserPlus, Trophy, Code, ChevronRight, MapPin, Briefcase, X, Check } from 'lucide-react';

// --- Mock Data ---
const CURRENT_USER_CONTEXT = {
  college: "Acropolis Institute of Research and Science",
  location: "Indore",
  branch: "CSIT"
};

const STATS = [
  { id: 1, label: "Connections", count: 142, icon: Users },
  { id: 2, label: "Following", count: 12, icon: UserPlus },
  { id: 3, label: "Groups & Teams", count: 3, icon: Briefcase },
  { id: 4, label: "Hackathon Events", count: 2, icon: Code },
];

const PENDING_REQUESTS = [
  {
    id: 101,
    name: "Rohan Sharma",
    headline: "B.Tech CSIT | 2nd Year",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
    mutual: 4
  },
  {
    id: 102,
    name: "Priya Patel",
    headline: "B.Tech ECE | 3rd Year",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    mutual: 1
  }
];

const DISCOVER_CATEGORIES = [
  {
    id: 'cat1',
    title: "Students in B.Tech CSIT",
    profiles: [
      {
        id: 1,
        name: "Aman Gupta",
        headline: "B.Tech CSIT | 3rd Year",
        location: "Indore",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
        badge: "Prayatn 3.0 Winner",
        badgeColor: "bg-yellow-300 text-yellow-900"
      },
      {
        id: 2,
        name: "Suresh Raina",
        headline: "B.Tech CSIT | 2nd Year",
        location: "Indore",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh",
        badge: null
      },
      {
        id: 3,
        name: "Kavita Singh",
        headline: "B.Tech CSIT | 4th Year",
        location: "Indore",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita",
        badge: "Class Representative",
        badgeColor: "bg-blue-100 text-blue-700"
      }
    ]
  },
  {
    id: 'cat2',
    title: "Hackathon Winners (Prayatn 3.0 & others)",
    profiles: [
      {
        id: 4,
        name: "Neha Trivedi",
        headline: "Mechanical | 4th Year",
        location: "Indore",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
        badge: "Top 10 Rank",
        badgeColor: "bg-yellow-300 text-yellow-900"
      },
      {
        id: 5,
        name: "Arjun Verma",
        headline: "B.Tech CSE | 3rd Year",
        location: "Indore",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        badge: "Hackathon Finalist",
        badgeColor: "bg-purple-100 text-purple-700"
      }
    ]
  },
  {
    id: 'cat3',
    title: "Peers at Acropolis Institute",
    profiles: [
      {
        id: 6,
        name: "Rahul Deshmukh",
        headline: "B.Tech Civil | 2nd Year",
        location: "Indore",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
        badge: null
      },
      {
        id: 7,
        name: "Simran Kaur",
        headline: "B.Tech CSIT | 1st Year",
        location: "Indore",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Simran",
        badge: "Debate Champion",
        badgeColor: "bg-orange-100 text-orange-800"
      },
      {
        id: 8,
        name: "Vikram Malhotra",
        headline: "B.Tech ECE | 3rd Year",
        location: "Indore",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
        badge: null
      }
    ]
  }
];

export default function MyNetwork() {
  const [pendingRequests, setPendingRequests] = useState(PENDING_REQUESTS);
  const [connectedIds, setConnectedIds] = useState<number[]>([]);

  const handleAccept = (id: number) => {
    setPendingRequests(prev => prev.filter(req => req.id !== id));
    // In a real app, this would trigger an API call
  };

  const handleIgnore = (id: number) => {
    setPendingRequests(prev => prev.filter(req => req.id !== id));
  };

  const handleFlash = (id: number) => {
    setConnectedIds(prev => [...prev, id]);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Manage My Network */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-slate-800">Manage my network</h2>
            </div>
            <div className="flex flex-col">
              {STATS.map((stat) => (
                <button 
                  key={stat.id}
                  className="flex items-center justify-between p-4 hover:bg-violet-50 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3 text-slate-600 group-hover:text-violet-700">
                    <stat.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-slate-500 text-sm font-medium group-hover:text-violet-700">
                    {stat.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 mt-2">
               <button className="w-full text-center text-sm font-semibold text-violet-700 hover:underline">
                 Show less
               </button>
            </div>
          </div>

          {/* Mini Footer for Sidebar */}
          <div className="mt-4 text-center lg:text-left px-2">
            <p className="text-xs text-slate-400">
              Campus Synergy Corporation © 2026
            </p>
          </div>
        </div>

        {/* Right Main Feed */}
        <div className="lg:col-span-3 relative rounded-xl overflow-hidden border border-gray-200 shadow-sm min-h-[80vh]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCccIzQ_zPDQA12APZkw0BkIsj2XL4gyFfbQ&s')" }}
          />
          {/* Heavy Overlay for Readability */}
          <div className="absolute inset-0 bg-white/90 z-0 backdrop-blur-[2px]" />

          {/* Content Container */}
          <div className="relative z-10 p-6 space-y-6">
            
            {/* Section A: Pending Flashes */}
            {pendingRequests.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-700">Pending Connection Requests</h3>
                  <button className="text-sm font-medium text-slate-500 hover:text-slate-700">Manage</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                      <img 
                        src={req.avatar} 
                        alt={req.name} 
                        className="w-16 h-16 rounded-full object-cover border border-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 truncate">{req.name}</h4>
                        <p className="text-xs text-slate-500 truncate">{req.headline}</p>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                          <Users className="w-3 h-3" /> {req.mutual} mutual connections
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleIgnore(req.id)}
                          className="text-xs font-medium text-slate-500 hover:text-slate-700 px-3 py-1"
                        >
                          Ignore
                        </button>
                        <button 
                          onClick={() => handleAccept(req.id)}
                          className="text-xs font-bold text-emerald-600 border border-emerald-600 rounded-full px-4 py-1 hover:bg-emerald-50 transition-colors"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section B: Discover Categories */}
            {DISCOVER_CATEGORIES.map((category) => (
              <div key={category.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-700">
                    People you may know from <span className="text-violet-700">{category.title.replace('People you may know from ', '')}</span>
                  </h3>
                  <button className="text-sm font-medium text-slate-500 hover:text-slate-700">See all</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.profiles.map((profile) => (
                    <div key={profile.id} className="relative flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
                      {/* Close Button (Mock) */}
                      <button className="absolute top-2 right-2 text-slate-300 hover:text-slate-500">
                        <X className="w-4 h-4" />
                      </button>

                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-100 mb-3">
                        <img 
                          src={profile.avatar} 
                          alt={profile.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name & Headline */}
                      <h4 className="font-bold text-slate-800 text-center text-sm mb-1 truncate w-full">
                        {profile.name}
                      </h4>
                      <p className="text-xs text-slate-500 text-center mb-1 truncate w-full">
                        {profile.headline}
                      </p>
                      
                      {/* Badge (Conditional) */}
                      <div className="h-6 mb-2 flex items-center justify-center w-full">
                        {profile.badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 truncate max-w-full ${profile.badgeColor || 'bg-gray-100 text-gray-600'}`}>
                            <Trophy className="w-3 h-3" />
                            {profile.badge}
                          </span>
                        )}
                      </div>

                      {/* Location/Mutuals */}
                      <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                        <MapPin className="w-3 h-3" /> {profile.location}
                      </p>

                      {/* Action Button */}
                      <button
                        onClick={() => handleFlash(profile.id)}
                        disabled={connectedIds.includes(profile.id)}
                        className={`w-full py-1.5 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-1 mt-auto ${
                          connectedIds.includes(profile.id)
                            ? 'bg-slate-100 text-slate-500 cursor-default'
                            : 'bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600'
                        }`}
                      >
                        {connectedIds.includes(profile.id) ? (
                          <>
                            <Check className="w-4 h-4" /> Pending
                          </>
                        ) : (
                          <>
                            Flash
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
