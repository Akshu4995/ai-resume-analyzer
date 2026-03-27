"use client";

import { motion } from "framer-motion";

export default function JobMatchCard({ jobs }: { jobs: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0f172a]/70 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
    >
      <h2 className="text-lg text-gray-400 mb-4">
        Job Matches
      </h2>

      <div className="space-y-4">
        {jobs.map((job, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{job.title}</span>
              <span className="text-sm text-gray-400">
                {job.match}%
              </span>
            </div>

            <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${job.match}%` }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}