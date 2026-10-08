import React, { useState } from 'react';
import { User, BookOpen, Award, Upload, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Certificate {
  id: number;
  title: string;
  eventType: string;
  position: string;
}

export default function ProfileSettings() {
  // 1. Basic Information State
  const [name, setName] = useState("Varun");
  const [bio, setBio] = useState("Passionate about web dev and problem-solving");

  // 2. Academic Details State
  const [branch, setBranch] = useState("CSIT");
  const [year, setYear] = useState("3rd Year");

  // 3. Certificates State
  const [certificates, setCertificates] = useState<Certificate[]>([
    { id: 1, title: "Prayatn 3.0 Hackathon", eventType: "National Hackathon", position: "Winner" }
  ]);

  // New Certificate Input State
  const [newCertTitle, setNewCertTitle] = useState("");
  const [newCertType, setNewCertType] = useState("National Hackathon");
  const [newCertPosition, setNewCertPosition] = useState("Winner");

  // UI State
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddCertificate = () => {
    if (!newCertTitle) return;
    const newCert: Certificate = {
      id: Date.now(),
      title: newCertTitle,
      eventType: newCertType,
      position: newCertPosition
    };
    setCertificates([...certificates, newCert]);
    setNewCertTitle("");
    // Reset defaults if desired
  };

  const handleDeleteCertificate = (id: number) => {
    setCertificates(certificates.filter(c => c.id !== id));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Profile Settings</h2>
        <span className="text-sm text-slate-500">Manage your public profile</span>
      </div>

      {/* 1. Basic Information Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600" />
          Basic Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bio / Headline</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Academic Details Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Academic Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            >
              <option value="CSIT">CSIT</option>
              <option value="CS AIML">CS AIML</option>
              <option value="CSE">CSE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electronics">Electronics</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Achievements Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Certificates & Achievements
        </h3>
        
        {/* Add New Form */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
          <h4 className="text-sm font-medium text-slate-900 mb-3">Add New Certificate</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Certificate Title (e.g. HackMan v6 Winner)"
                value={newCertTitle}
                onChange={(e) => setNewCertTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <select
                value={newCertType}
                onChange={(e) => setNewCertType(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg outline-none"
              >
                <option value="National Hackathon">National Hackathon</option>
                <option value="College Event">College Event</option>
                <option value="Workshop">Workshop</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <select
                value={newCertPosition}
                onChange={(e) => setNewCertPosition(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg outline-none"
              >
                <option value="Winner">Winner</option>
                <option value="Runner-Up">Runner-Up</option>
                <option value="Participation">Participation</option>
                <option value="Special Mention">Special Mention</option>
              </select>
            </div>
            <div className="md:col-span-2">
               <label className="flex items-center justify-center w-full h-12 px-4 transition bg-white border-2 border-slate-200 border-dashed rounded-lg appearance-none cursor-pointer hover:border-indigo-300 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-500">
                    Upload Document (PDF, JPG)
                  </span>
                </span>
                <input type="file" name="file_upload" className="hidden" />
              </label>
            </div>
          </div>
          <button
            onClick={handleAddCertificate}
            disabled={!newCertTitle}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Certificate
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div key={cert.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-indigo-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{cert.title}</p>
                  <p className="text-xs text-slate-500">{cert.position} • {cert.eventType}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDeleteCertificate(cert.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {certificates.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-4">No certificates added yet.</p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-6 flex flex-col items-center gap-4">
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium"
            >
              <CheckCircle2 className="w-4 h-4" />
              Profile updated successfully!
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={handleSave}
          className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold shadow-lg hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
