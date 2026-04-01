"use client";

import { motion } from "framer-motion";

export default function StructureCard({ roadmap = [] }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

      <h3 className="font-semibold mb-2 text-gray-800">
        Career Roadmap
      </h3>
      
      <p className="text-sm text-gray-500 mb-6">
        Your personalized path to achieve your professional goal
      </p>

      {roadmap && roadmap.length > 0 ? (
        <div className="space-y-4">
          {roadmap.map((stage: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition"
            >
              {/* Stage Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-semibold text-sm">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {stage.stage}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    ⏱️ {stage.duration}
                  </p>
                </div>
              </div>

              {/* Objectives */}
              <div className="ml-11 space-y-2">
                {stage.objectives && stage.objectives.map((obj: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-indigo-600 font-bold mt-0.5">✓</span>
                    <span>{obj}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No roadmap available yet</p>
        </div>
      )}

    </div>
  );
}