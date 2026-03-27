"use client";

import { motion } from "framer-motion";

export default function ScoreCard({ score }: { score: number }) {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="bg-[#0f172a]/70 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.1)]"
    >
      <h2 className="text-lg text-gray-400 mb-4">
        Resume Score
      </h2>

      <div className="relative flex items-center justify-center">

        {/* Glow */}
        <div className="absolute w-40 h-40 bg-blue-500/20 blur-2xl rounded-full"></div>

        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#1e293b"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <motion.circle
            stroke="#3b82f6"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Score Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute text-3xl font-bold"
        >
          {score}
        </motion.div>
      </div>

      <p className="text-gray-400 text-sm mt-3">
        out of 100
      </p>
    </motion.div>
  );
}