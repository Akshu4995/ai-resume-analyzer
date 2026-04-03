"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { generateCoverLetter, clearCoverLetter } from "@/redux/jobMatchSlice";

interface Job {
  title: string;
  match_score: number;
  detailed_analysis: string;
  recommendation: string;
  matching_skills: string[];
  missing_skills: string[];
}

interface JobMatchCardProps {
  job: Job;
  index: number;
}

export default function JobMatchCard({ job, index }: JobMatchCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  // Get state from Redux
  const resumeText = useSelector((state: RootState) => state.resume.text);
  const { generatingLetter, coverLetterText } = useSelector((state: RootState) => state.jobMatch);
  
  // Local state to know *which* card's modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateLetter = async () => {
    setIsModalOpen(true);
    // Only fetch if we don't already have one generating
    if (!generatingLetter) {
        dispatch(generateCoverLetter({
            resumeText: resumeText,
            jobTitle: job.title,
            jobDescription: job.detailed_analysis // Using analysis as context for the letter
        }));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearCoverLetter());
  };

  const handleCopyText = () => {
    if (coverLetterText) {
      navigator.clipboard.writeText(coverLetterText);
      alert("Cover letter copied to clipboard!"); // You can replace this with a nice toast notification later
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-[#0f172a]/70 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-indigo-500/50 transition-colors"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {job.title}
            </h3>
          </div>
          <span className={`text-sm font-bold px-4 py-1.5 rounded-full border ${
            job.match_score >= 75 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
            job.match_score >= 50 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
            'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {job.match_score}% Match
          </span>
        </div>

        {/* Progress Bar Animation */}
        <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${job.match_score}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.2 }}
            className={`h-full rounded-full ${
              job.match_score >= 75 ? 'bg-gradient-to-r from-green-600 to-emerald-400' : 
              job.match_score >= 50 ? 'bg-gradient-to-r from-amber-600 to-yellow-400' : 
              'bg-gradient-to-r from-red-600 to-rose-400'
            }`}
          />
        </div>

        {/* Detailed Analysis Section */}
        <div className="mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <p className="text-sm text-gray-300 leading-relaxed">
            {job.detailed_analysis}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-start gap-2">
            <span className="text-indigo-400 font-bold text-sm">💡 Tip:</span>
            <p className="text-sm text-indigo-200 italic">
              {job.recommendation}
            </p>
          </div>
        </div>

        {/* Skills Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Matching Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {job.matching_skills?.map((skill, i) => (
                <span key={i} className="text-[12px] px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Missing Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {job.missing_skills?.map((skill, i) => (
                <span key={i} className="text-[12px] px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 🔥 NEW: Action Button */}
        <div className="pt-4 border-t border-slate-700/50 flex justify-end">
             <button 
                onClick={handleGenerateLetter}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
             >
                ✨ Auto-Write Cover Letter
             </button>
        </div>
      </motion.div>

      {/* 🔥 NEW: Cover Letter Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  ✨ AI Cover Letter <span className="text-sm font-normal text-slate-400">for {job.title}</span>
                </h2>
                <button onClick={handleCloseModal} className="text-slate-400 hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-grow bg-slate-900">
                {generatingLetter ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-indigo-400 animate-pulse font-medium text-center">
                        Our executive AI is drafting a personalized,<br/> industry-standard letter for you...
                    </p>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                     <textarea 
                        readOnly
                        value={coverLetterText || ""}
                        className="w-full h-96 bg-slate-800/50 text-slate-200 p-6 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans text-sm resize-none"
                     />
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              {!generatingLetter && coverLetterText && (
                  <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-4">
                     <button 
                        onClick={handleCloseModal}
                        className="px-6 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                     >
                         Close
                     </button>
                     <button 
                        onClick={handleCopyText}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                     >
                        📋 Copy to Clipboard
                     </button>
                  </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}