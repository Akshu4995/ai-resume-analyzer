"use client";

import Link from "next/link";
import { ArrowRight, FileText, Target, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 🌟 NAVBAR */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Editorial AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/upload" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <Link href="/upload" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2 rounded-full transition-all shadow-sm hover:shadow">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* 🚀 HERO SECTION */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-4">
            <SparkleIcon />
            <span>Powered by Llama 3.3 AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Stop Guessing. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Start Landing Interviews.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Editorial AI analyzes your resume against industry-standard ATS systems, matches you with perfect roles, and auto-generates tailored cover letters in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/upload">
              <button className="h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5">
                Optimize My Resume <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <p className="text-sm text-slate-500 sm:hidden">No credit card required</p>
          </div>
        </motion.div>

        {/* 🛠️ FEATURES GRID */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left"
        >
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Deep ATS Scoring</h3>
            <p className="text-slate-600 leading-relaxed">
              Find out exactly why your resume is getting rejected. Get instant, actionable feedback on keywords, formatting, and impact.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Job Matcher</h3>
            <p className="text-slate-600 leading-relaxed">
              Paste a job description and our AI will tell you exactly what skills you are missing to become the perfect candidate.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Auto Cover Letters</h3>
            <p className="text-slate-600 leading-relaxed">
              Never write a cover letter from scratch again. Generate highly personalized, executive-level letters in one click.
            </p>
          </div>
        </motion.div>
      </main>

    </div>
  );
}

// A tiny custom SVG icon for the "Powered by AI" badge
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}