"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

export default function ErrorModal({
  isOpen,
  message,
  onClose,
}: {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-x-0 top-10 z-[100] flex justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-3 bg-white border border-red-100 px-5 py-4 rounded-2xl shadow-xl shadow-indigo-100/50 max-w-md w-full"
          >
            {/* Minimal Error Icon */}
            <div className="shrink-0 text-red-500">
              <AlertCircle size={20} />
            </div>

            {/* Error Message */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                {message}
              </p>
            </div>

            {/* Simple Close X */}
            <button
              onClick={onClose}
              className="shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}