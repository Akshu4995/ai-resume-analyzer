"use client";
export default function PreviewCard({ data }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

      <p className="text-xs text-indigo-500 font-semibold mb-2">
        ANALYSIS PREVIEW
      </p>

      <h2 className="text-5xl font-bold text-indigo-600">
        {data?.score || "--"}
      </h2>

      <p className="text-sm text-gray-500">
        Editorial Score
      </p>

      <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-700"
          style={{ width: `${data?.score || 0}%` }}
        />
      </div>

      {/* Dynamic Improvements */}
      <div className="mt-6 space-y-3">
        {data?.improvements?.slice(0, 2).map((imp: string, i: number) => (
          <div
            key={i}
            className="border-l-4 border-indigo-500 pl-3 text-sm text-gray-600"
          >
            {imp}
          </div>
        )) || (
          <p className="text-gray-400 text-sm">
            Upload resume to see insights
          </p>
        )}
      </div>

    </div>
  );
}