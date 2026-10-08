import React, { useState } from 'react';
import { LayoutGrid, Mail, Lock, Eye, EyeOff, ArrowRight, RefreshCw, Chrome, User, BookOpen, Layers, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthScreenProps {
  onAuthenticate: () => void;
}

export default function AuthScreen({ onAuthenticate }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1: Credentials, 2: Student Details
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State - Step 1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [appId, setAppId] = useState('');
  
  // Form State - Step 2 (Mock Data Initialized)
  const [fullName, setFullName] = useState('Varun Choudhary');
  const [branch, setBranch] = useState('CSIT');
  const [section, setSection] = useState('A');
  const [year, setYear] = useState('3rd Year');

  const [error, setError] = useState('');

  const generateAppId = () => {
    const randomId = 'APP-' + Math.random().toString(36).substring(2, 6).toUpperCase() + 'X';
    setAppId(randomId);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !appId) {
      setError('Please fill in all required fields.');
      return;
    }

    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic Validation
    if (isLogin) {
        if (!email || !password) {
            setError('Please enter your email and password.');
            setIsLoading(false);
            return;
        }
    } else {
        if (!fullName || !branch || !section || !year) {
            setError('Please complete your student profile.');
            setIsLoading(false);
            return;
        }
    }

    // Mock API Call delay
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticate();
    }, 1500);
  };

  const toggleMode = () => {
      setIsLogin(!isLogin);
      setStep(1);
      setError('');
      // Reset fields if needed, or keep them for better UX
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
       {/* Campus Background Pattern (Subtle) */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
            }} 
       />

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-3xl"></div>
      </div>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-10 relative border border-white/50"
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
              <LayoutGrid className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isLogin ? 'Welcome Back' : (step === 1 ? 'Create Account' : 'Student Profile')}
            </h1>
            <p className="text-slate-500 text-sm mt-1 text-center max-w-[260px]">
              {isLogin 
                ? 'Enter your credentials to access the portal.' 
                : (step === 1 ? 'Start your journey with Campus Synergy.' : 'Tell us a bit more about yourself.')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={isLogin || step === 2 ? handleSubmit : handleNextStep} className="space-y-4">
            
            <AnimatePresence mode="wait">
                {/* LOGIN OR SIGNUP STEP 1 */}
                {(isLogin || step === 1) && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        {/* Email Field */}
                        <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 ml-1">Gmail ID</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 text-sm"
                            placeholder="student@college.edu"
                            />
                        </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-semibold text-slate-700">Password</label>
                            {isLogin && (
                            <button type="button" className="text-[10px] font-medium text-indigo-600 hover:text-indigo-700">
                                Forgot Password?
                            </button>
                            )}
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 text-sm"
                            placeholder="••••••••"
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        </div>

                        {/* Application ID (Sign Up Step 1 Only) */}
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 ml-1">Application ID</label>
                                <div className="flex gap-2">
                                    <div className="relative group flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-slate-400 font-mono text-xs font-bold border border-slate-300 rounded bg-slate-100">#</div>
                                        <input
                                            type="text"
                                            value={appId}
                                            onChange={(e) => setAppId(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 text-sm font-mono tracking-wide"
                                            placeholder="APP-XXXX"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={generateAppId}
                                        className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm"
                                        title="Generate Random ID"
                                    >
                                        <RefreshCw className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* SIGNUP STEP 2 */}
                {(!isLogin && step === 2) && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        {/* Profile Picture Upload */}
                        <div className="flex justify-center mb-2">
                            <div className="relative group cursor-pointer">
                                <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-indigo-300 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                    <User className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-1.5 shadow-md">
                                    <RefreshCw className="w-3 h-3 text-white" />
                                </div>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-indigo-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    Upload Photo
                                </span>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Branch */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 ml-1">Branch</label>
                                <div className="relative group">
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                    <select
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                        className="w-full pl-9 pr-2 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 text-sm appearance-none"
                                    >
                                        <option value="CSIT">CSIT</option>
                                        <option value="CSE">CSE</option>
                                        <option value="Mechanical">Mechanical</option>
                                        <option value="Civil">Civil</option>
                                        <option value="ECE">ECE</option>
                                    </select>
                                </div>
                            </div>

                            {/* Section */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 ml-1">Section</label>
                                <div className="relative group">
                                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                    <select
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        className="w-full pl-9 pr-2 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 text-sm appearance-none"
                                    >
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Year */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 ml-1">Year</label>
                            <div className="relative group">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 text-sm appearance-none"
                                >
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-500 text-center font-medium bg-red-50 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Log In' : (step === 1 ? 'Next: Student Details' : 'Complete Profile & Enter')}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider & Social (Only on Login or Step 1) */}
          {(isLogin || step === 1) && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span>
                    </div>
                </div>

                <button className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 text-sm">
                    <Chrome className="w-4 h-4 text-slate-900" />
                    Sign in with Google
                </button>
            </motion.div>
          )}

          {/* Toggle Login/Signup */}
          <div className="text-center mt-6 text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={toggleMode}
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
