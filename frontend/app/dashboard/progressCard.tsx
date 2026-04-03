"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CheckCircle2 } from "lucide-react"; // Or whatever icon library you use

export default function ProgressCard() {
  const resumeData = useSelector((state: RootState) => state.resume.data);
  const roadmap = resumeData?.roadmap || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800">Career Roadmap</h3>
        <p className="text-sm text-gray-500">Your personalized path to achieve your professional goals</p>
      </div>

      <div className="space-y-4">
        {roadmap.length > 0 ? (
          roadmap.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-indigo-50/50 transition-colors">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  {item.step || index + 1}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{item.action}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No roadmap available yet.
          </div>
        )}
      </div>
    </div>
  );
}