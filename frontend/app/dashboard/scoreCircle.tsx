"use client";

import { motion } from "framer-motion";

export default function ScoreCircle({ score = 0 }) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  // 🔥 Dynamic color
  let color = "#ef4444"; // red

  if (score >= 75) color = "#22c55e"; // green
  else if (score >= 50) color = "#eab308"; // yellow

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center shadow-sm">

      <p className="text-xs text-gray-400 mb-4">
        OVERALL ATS SCORE
      </p>

      <div className="relative flex items-center justify-center">

        {/* SVG Ring */}
        <svg height={radius * 2} width={radius * 2}>

          {/* Background circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Animated Progress */}
          <motion.circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute text-center">
          <h2 className="text-4xl font-bold">
            {score}
          </h2>
          <p
            className="text-sm font-medium"
            style={{ color }}
          >
            {score >= 75
              ? "Excellent"
              : score >= 50
              ? "Good"
              : "Needs Work"}
          </p>
        </div>

      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Your resume performance based on AI analysis
      </p>

    </div>
  );
}