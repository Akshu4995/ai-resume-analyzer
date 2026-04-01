"use client";

import { motion } from "framer-motion";

export default function ProfessionMatchCard({
  professionMatch,
  professionFeedback,
  suggestedChanges
}: {
  professionMatch: boolean;
  professionFeedback: string;
  suggestedChanges?: string[];
}) {
  // Only show card if profession doesn't match
  if (professionMatch) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-indigo-600 text-sm">ℹ️</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          Career Transition Opportunity
        </h2>
      </div>

      {/* Feedback */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {professionFeedback}
        </p>
      </div>

      {/* Suggested Changes */}
      {suggestedChanges && suggestedChanges.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Recommended Actions:
          </h3>
          <ul className="space-y-2">
            {suggestedChanges.map((change, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-gray-600 text-sm"
              >
                <span className="text-indigo-600 font-semibold mt-0.5">✓</span>
                <span>{change}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
