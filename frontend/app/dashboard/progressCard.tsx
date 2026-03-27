"use client";

import { motion } from "framer-motion";

export default function ProgressCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

      <h3 className="font-semibold mb-4">Formatting Score</h3>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Readability</p>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "94%" }}
            transition={{ duration: 1 }}
            className="h-full bg-indigo-500 rounded-full"
          />
        </div>
      </div>

    </div>
  );
}