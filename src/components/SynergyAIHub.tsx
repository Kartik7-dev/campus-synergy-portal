import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Video, 
  Download, 
  Bot, 
  Sparkles, 
  Code, 
  ChevronRight, 
  Loader2, 
  Zap,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Message = {
  id: number;
  role: 'user' | 'ai';
  text: string;
  code?: string;
};

type AssetType = 'image' | 'ui-mockup' | 'video';

type QuickPrompt = {
  id: number;
  question: string;
  answer: string;
};

// --- Mock Data ---
const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'user',
    text: "Give me a Python snippet to parse CSV data for our Prayatn 3.0 project."
  },
  {
    id: 2,
    role: 'ai',
    text: "Here's a robust Python snippet using pandas to handle your CSV data parsing for the hackathon:",
    code: `import pandas as pd

def parse_hackathon_data(file_path):
    try:
        # Load dataset with error handling
        df = pd.read_csv(file_path)
        
        # Clean missing values
        df_clean = df.dropna()
        
        return df_clean
    except Exception as e:
        return f"Error: {e}"

# Usage
data = parse_hackathon_data('teams.csv')
print(data.head())`
  }
];

const QUICK_PROMPTS: QuickPrompt[] = [
  { id: 1, question: "How to apply for a Bonafide Certificate?", answer: "Go to Student Portal > e-Services > Request Documents. Select 'Bonafide Certificate' and attach your ID proof. Processing time: 2 working days." },
  { id: 2, question: "Who is the HOD of CSIT?", answer: "Dr. Anjali Desai is the current HOD of CSIT. You can find her in Block C, Room 304 during visiting hours (2 PM - 4 PM)." },
  { id: 3, question: "Library Timings during exams?", answer: "During exam weeks, the Central Library is open 24/7. Regular timings are 8 AM - 10 PM." },
];

export default function SynergyAIHub() {
  // --- State: Pillar 1 (Chat) ---
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- State: Pillar 2 (Asset Gen) ---
  const [assetPrompt, setAssetPrompt] = useState("");
  const [assetType, setAssetType] = useState<AssetType>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAsset, setGeneratedAsset] = useState<string | null>(null);

  // --- State: Pillar 3 (Nav-Bot) ---
  const [activePromptId, setActivePromptId] = useState<number | null>(null);

  // --- Handlers ---

  // Pillar 1: Chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Mock AI Response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: "That's a great question! For the hackathon, I'd recommend focusing on modularity. Here is a quick template:",
        code: `// Mock response for: ${inputMessage}\nfunction optimizeSolution() {\n  return "Efficiency +100%";\n}`
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Pillar 2: Asset Gen
  const handleGenerateAsset = () => {
    if (!assetPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedAsset(null);

    setTimeout(() => {
      setIsGenerating(false);
      // Random seed to get different images
      setGeneratedAsset(`https://picsum.photos/seed/${Math.random()}/400/250`);
    }, 2000);
  };

  // Pillar 3: Nav-Bot
  const togglePrompt = (id: number) => {
    setActivePromptId(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            <h2 className="text-3xl font-bold tracking-tight">Synergy AI Assistant</h2>
          </div>
          <p className="text-violet-100 text-lg max-w-2xl">
            Supercharge your hackathon projects and administrative queries with our next-gen campus intelligence.
          </p>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-amber-400 opacity-20 rounded-full blur-2xl"></div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pillar 1: Hackathon Ideation & Code Helper */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-800">Code & Ideation Helper</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  {msg.code && (
                    <div className="mt-3 bg-slate-900 rounded-lg p-3 overflow-x-auto border border-slate-700">
                      <pre className="text-xs font-mono text-emerald-400">
                        {msg.code}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask for code or ideas..."
                className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              <button 
                type="submit"
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Pillar 2: Project Asset Generator */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-fuchsia-600" />
            <h3 className="font-bold text-slate-800">Asset Generator</h3>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Asset Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['image', 'ui-mockup', 'video'] as AssetType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setAssetType(type)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${
                        assetType === type
                          ? 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {type === 'video' ? <Video className="w-4 h-4 mb-1" /> : <ImageIcon className="w-4 h-4 mb-1" />}
                      <span className="capitalize">{type.replace('-', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Prompt</label>
                <textarea
                  value={assetPrompt}
                  onChange={(e) => setAssetPrompt(e.target.value)}
                  placeholder="Describe your asset (e.g., 'Cyberpunk city for login screen')..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent resize-none h-24"
                />
              </div>

              <button
                onClick={handleGenerateAsset}
                disabled={isGenerating || !assetPrompt}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg shadow-fuchsia-200 flex items-center justify-center gap-2 transition-all ${
                  isGenerating || !assetPrompt
                    ? 'bg-slate-300 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Asset
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex-1 bg-slate-100 rounded-xl border border-slate-200 border-dashed flex items-center justify-center overflow-hidden relative group">
              {generatedAsset ? (
                <>
                  <img src={generatedAsset} alt="Generated" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Your generated asset will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pillar 3: Campus Nav-Bot */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800">Campus Nav-Bot</h3>
          </div>

          <div className="p-4 flex-1 overflow-y-auto bg-slate-50/50">
            <div className="mb-4">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Quick Answers</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      Tap any question below to get an instant answer from the campus database.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {QUICK_PROMPTS.map((prompt) => (
                  <div key={prompt.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button
                      onClick={() => togglePrompt(prompt.id)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-700">{prompt.question}</span>
                      <ChevronRight 
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          activePromptId === prompt.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence>
                      {activePromptId === prompt.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="bg-indigo-50 border-t border-indigo-100"
                        >
                          <div className="p-4 text-sm text-indigo-900 leading-relaxed">
                            {prompt.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-200">
              <p className="text-xs text-center text-slate-400">
                Can't find what you need? <button className="text-indigo-600 font-semibold hover:underline">Submit a query</button> to the admin office.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
