"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Import your awesome components!
import ScoreCircle from "./scoreCircle";
import StructureCard from "./structureCard";
import KeywordCard from "./keywordCard";
import ProgressCard from "./progressCard";
import { Info } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: resumeData, text: resumeText } = useSelector((state: RootState) => state.resume);

  // Route Guard: Kick them back to upload if no resume is found
  useEffect(() => {
    if (!resumeText || !resumeData) {
      router.replace("/upload");
    }
  }, [resumeText, resumeData, router]);

  if (!resumeText || !resumeData) return null;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analysis Dashboard</h1>

      {/* 1. Career Summary Alert */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
        <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
          <Info className="text-indigo-500 w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-indigo-900 mb-1">Career Transition Opportunity</h3>
          <p className="text-indigo-800 text-sm leading-relaxed">
            {resumeData.career_summary || "We are analyzing your career trajectory..."}
          </p>
        </div>
      </div>

      {/* 2. Top Grid: Score, Structure, Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-full">
           {/* Assuming ScoreCircle accepts a score prop, or pulls it from Redux itself */}
          <ScoreCircle score={resumeData.score || 0} />
        </div>
        
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* <StructureCard /> */}
          <KeywordCard />
        </div>
      </div>

      {/* 3. Middle: Career Roadmap */}
      <ProgressCard />

      {/* 4. Bottom: Detailed Improvements list */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-8">
        <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-4">Analysis Preview</h3>
        <div className="flex items-end gap-4 mb-6 border-b border-gray-100 pb-4">
          <span className="text-5xl font-bold text-indigo-600">{resumeData.score || 0}</span>
          <span className="text-gray-500 mb-1 font-medium">Editorial Score</span>
        </div>
        
        <ul className="space-y-4">
          {resumeData.improvements?.map((improvement: string, index: number) => (
            <li key={index} className="flex gap-3 text-sm text-gray-700">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
              <p>{improvement}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}