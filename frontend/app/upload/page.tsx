"use client";

import { useState, useEffect } from "react";
import Dropzone from "@/components/dropzone";
import { analyzeResume } from "@/api";
import PreviewCard from "@/components/previewCard";
import ErrorModal from "@/components/errorModal";
import Loader from "@/components/loader";

import { useDispatch } from "react-redux";
import { setResumeData, clearResumeData } from "@/redux/resumeSlice";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [userPrompt, setUserPrompt] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  // Clear resume data and user prompt when component mounts
  useEffect(() => {
    dispatch(clearResumeData());
    setUserPrompt("");
  }, [dispatch]);

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a resume file first.");
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await analyzeResume(file, userPrompt);

      dispatch(setResumeData(res));  // 🔥 save in redux

      setLoading(false);

      router.push("/dashboard");     // 🔥 redirect
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      setShowErrorModal(true);
      console.error("Resume analysis error:", err);
    }
  };

  return (
    <div className="p-6 md:p-10">

      {/* Header */}
      <h1 className="text-3xl font-bold">
        Elevate Your Career Narrative
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Upload your resume to get AI insights
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Describe your target job, qualifications, or specific requirements for analysis..."
          className="w-full border border-gray-300 rounded-lg p-3 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          rows={4}
        />

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <Dropzone onFile={setFile} file={file} />

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

          {/* Steps (Dynamic) */}

          {/* <div className="grid grid-cols-3 gap-4">
            {["Upload", "Analyze", "Results"].map((step, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${data && i === 2
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-gray-200"
                  }`}
              >
                <p className="text-indigo-600 font-bold">0{i + 1}</p>
                <p className="text-sm font-medium">{step}</p>
              </div>
            ))}
          </div> */}

        </div>

        {/* RIGHT PREVIEW */}
        <div>
          {/* <PreviewCard data={data} /> */}
        </div>

      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        message={error || ""}
        onClose={() => setShowErrorModal(false)}
      />

      {/* Loader */}
      {loading && <Loader />}
    </div>
  );
}