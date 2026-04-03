"use client";
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchJobMatches } from '../../redux/jobMatchSlice';
import JobMatchCard from '../../components/jobMatchCard';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // ✅ CORRECT for App Router

export default function MatchJobsPage() {
  const [jobDesc, setJobDesc] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { matches, loading } = useSelector((state: RootState) => state.jobMatch);
  const router = useRouter();

  // For now, we use the parsed text from your existing resume slice
  // This grabs the text we just saved in Step 3!
  const resumeText = useSelector((state: RootState) => state.resume.text);

  useEffect(() => {
    if (!resumeText) {
      router.push('/upload'); // replace() prevents them from hitting 'back' to return to the broken page
    }
  }, [resumeText, router]);

  if (!resumeText) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No Resume Found</h2>
        <p className="text-gray-400 mb-8">Please upload your resume first so our AI can match your skills.</p>
        <button
          onClick={() => router.push('/upload')}
          className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          Go to Upload
        </button>
      </div>
    );
  }

 const handleMatch = () => {
  if (!jobDesc) return;
  dispatch(fetchJobMatches({
    resumeText: resumeText,
    jobs: [{ title: "Target Role", description: jobDesc }] 
  }));
};

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Job Matcher</h1>

      <textarea
        className="w-full p-4 border rounded-xl h-40 mb-4 text-black"
        placeholder="Paste the Job Description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <button
        onClick={handleMatch}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Analyzing with AI..." : "Match Resume"}
      </button>

      <div className="mt-10 grid gap-6">
        {matches.map((job:any, index) => (
          <JobMatchCard key={index} job={job} index={index} />
        ))}
      </div>
    </div>
  );
}