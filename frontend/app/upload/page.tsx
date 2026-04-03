"use client";

import { useState, useEffect } from "react";
import Dropzone from "@/components/dropzone";
import ErrorModal from "@/components/errorModal";
import Loader from "@/components/loader";
import { motion, AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { analyzeResume, clearResumeData } from "@/redux/resumeSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { loading, error } = useSelector((state: RootState) => state.resume);
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Clear previous data on mount
  useEffect(() => {
    dispatch(clearResumeData());
    setUserPrompt("");
  }, [dispatch]);

  // Sync local modal with Redux error state
  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  // 🔥 Generate a secure local URL for the PDF preview
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Cleanup to prevent memory leaks when the file changes or component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleAnalyze = async () => {
    if (!file) {
      setShowErrorModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_prompt", userPrompt);

    const resultAction = await dispatch(analyzeResume(formData));

    if (analyzeResume.fulfilled.match(resultAction)) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6 pt-20 md:pt-10 md:p-10 max-w-7xl mx-auto w-full transition-all">

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Elevate Your Career Narrative
        </h1>
        <p className="text-gray-500 mt-2">
          Upload your resume to get AI insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TEXTAREA SECTION */}
        {/* <div className="lg:col-span-1">
           <label className="text-sm font-semibold text-gray-700 mb-2 block">
             Target Job / Requirements
           </label>
           <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Describe your target job, qualifications, or specific requirements for analysis..."
            className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm bg-white text-black h-40 lg:h-64"
          />
        </div> */}

        {/* UPLOAD & PREVIEW SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!file ? (
                // 📂 Show Dropzone if no file is selected
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Dropzone onFile={setFile} file={file} />
                </motion.div>
              ) : (
                // 📄 Show Preview if file exists
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4"
                >
                  {/* File Info & Remove Button */}
                  <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg shrink-0">
                        📄
                      </div>
                      <div className="truncate">
                        <p className="font-semibold text-slate-800 text-sm truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setFile(null)} 
                      className="text-sm px-3 py-1.5 text-red-600 hover:bg-red-50 font-medium rounded-md transition-colors shrink-0"
                    >
                      Remove
                    </button>
                  </div>

                  {/* PDF Viewer */}
                  {previewUrl && file.type === "application/pdf" ? (
                    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-slate-200 shadow-inner">
                      <iframe 
                        src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                        className="w-full h-full"
                        title="Resume Preview"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm">
                      Preview not available for this file type.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Analyze Button */}
          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={loading || !file}
              className="w-full md:w-auto bg-indigo-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-indigo-100 active:scale-[0.98]"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </div>

      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        message={error || "Please select a resume file first."}
        onClose={() => setShowErrorModal(false)}
      />

      {loading && <Loader />}
    </div>
  );
}