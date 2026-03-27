"use client";

import { motion } from "framer-motion";

export default function SkillsCard({ skills }: { skills: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0f172a]/70 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
    >
      <h2 className="text-lg text-gray-400 mb-4">
        Skills Detected
      </h2>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.1 }}
            className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/30 cursor-pointer"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}