"use client";

import { motion } from "framer-motion";

export default function ImprovementsCard({ improvements }: { improvements: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0f172a]/70 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
    >
      <h2 className="text-lg text-gray-400 mb-4">
        Improvements
      </h2>

      <ul className="space-y-3">
        {improvements.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 5 }}
            className="text-sm text-gray-300 flex items-start gap-2"
          >
            <span className="text-blue-500 mt-1">•</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}