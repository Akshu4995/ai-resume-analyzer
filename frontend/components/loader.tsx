"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0f172a] border border-indigo-500/50 rounded-2xl p-8 shadow-2xl text-center"
      >
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full"
          />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-white mb-2">
          Analyzing Your Resume
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Our AI is reviewing your resume...
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-indigo-600 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
