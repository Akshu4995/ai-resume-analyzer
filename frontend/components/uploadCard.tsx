"use client";

export default function UploadCard({ onFileChange, onAnalyze, loading }: any) {
  return (
    <div className="bg-[#0f172a]/70 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.1)]">

      <h2 className="text-xl font-semibold mb-4">
        Upload Resume
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">

        <input
          type="file"
          className="text-sm text-gray-400"
          onChange={(e: any) => onFileChange(e.target.files[0])}
        />

        <button
          onClick={onAnalyze}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

      </div>
    </div>
  );
}