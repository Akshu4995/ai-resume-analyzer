"use client";

import { useDropzone } from "react-dropzone";

export default function Dropzone({ onFile, file }: any) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop: (acceptedFiles) => {
      if (onFile) onFile(acceptedFiles[0]);
    },
  });

  

  return (
    <div
      {...getRootProps()}
      className={`bg-white border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer shadow-sm transition ${
        isDragActive
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4">

        <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl">
          📄
        </div>

        {/* 🔥 NEW: Show file name */}
        {file ? (
          <div className="text-center">
            <p className="text-green-600 font-medium">
              Selected File
            </p>
            <p className="text-sm text-gray-600 truncate max-w-[250px]">
              {file.name}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold">
              Drop your resume here
            </h2>

            <p className="text-gray-500 text-sm">
              PDF format preferred
            </p>
          </>
        )}

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
        >
          Browse Files
        </button>

      </div>
    </div>
  );
}