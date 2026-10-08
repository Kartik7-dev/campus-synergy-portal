import React from 'react';
import { CheckCircle2, Clock, FileText, Send } from 'lucide-react';
import { AdminRequest, CURRENT_USER } from '../data/mockData';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  requests: AdminRequest[];
  hideBanner?: boolean;
}

const statusSteps = ['Submitted', 'Under Review', 'Approved', 'Ready for Pickup'];

const getStatusIndex = (status: string) => statusSteps.indexOf(status);

export default function AdminDashboard({ requests, hideBanner = false }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Transparency Banner */}
      {!hideBanner && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Hello {CURRENT_USER.name},</h2>
            <p className="text-blue-100 max-w-2xl">
              Here is the real-time status of your campus requests. We are committed to 100% transparency in your administrative processes.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12" />
        </motion.div>
      )}

      <div className={`grid gap-6 ${hideBanner ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        {/* Active Requests Timeline */}
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 ${hideBanner ? 'shadow-none border-0 p-4' : ''}`}>
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Request Timeline
          </h3>
          
          <div className="space-y-8">
            {requests.map((req) => (
              <div key={req.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-slate-900">{req.type}</h4>
                    <span className="text-xs text-slate-500">ID: {req.id} • {req.submittedDate}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    req.status === 'Ready for Pickup' ? 'bg-green-100 text-green-700' :
                    req.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {req.status}
                  </span>
                </div>

                {/* Stepper */}
                <div className="relative flex items-center justify-between w-full mt-2">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-100 -z-10" />
                  <div 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-500 -z-10 transition-all duration-500"
                    style={{ width: `${(getStatusIndex(req.status) / (statusSteps.length - 1)) * 100}%` }}
                  />
                  
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= getStatusIndex(req.status);
                    const isCurrent = idx === getStatusIndex(req.status);
                    
                    return (
                      <div key={step} className="flex flex-col items-center group">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white transition-colors duration-300 ${
                          isCompleted ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
                        }`}>
                          {isCompleted && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span className={`absolute top-6 text-[10px] font-medium w-20 text-center transition-colors ${
                          isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="h-4" /> {/* Spacer for labels */}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Submit Documents
          </h3>
          
          <div className="flex-1 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6 text-indigo-500" />
            </div>
            <h4 className="text-slate-900 font-medium mb-1">Upload Certificate</h4>
            <p className="text-sm text-slate-500 max-w-xs">
              Drag & drop your certificate here, or click to browse. Supported formats: PDF, JPG, PNG.
            </p>
            <button className="mt-6 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              Select File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
