"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function KeywordCard() {
  const resumeData = useSelector((state: RootState) => state.resume.data);
  
  const foundKeywords = resumeData?.found_keywords || [];
  const missingKeywords = resumeData?.missing_keywords || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Critical Keyword Match</h3>
      
      <div className="space-y-4">
        {/* Found Skills */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Found on Resume</p>
          <div className="flex flex-wrap gap-2">
            {foundKeywords.length > 0 ? (
              foundKeywords.map((keyword: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium border border-indigo-100">
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">No matching keywords found.</span>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Missing / Recommended</p>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.length > 0 ? (
              missingKeywords.map((keyword: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm font-medium border border-rose-100">
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">You hit all the key terms!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}