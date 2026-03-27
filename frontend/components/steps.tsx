"use client";
export default function Steps() {
  const steps = [
    { id: "01", title: "Upload PDF", desc: "Securely upload your resume" },
    { id: "02", title: "Analyze", desc: "AI reviews your resume" },
    { id: "03", title: "Get Results", desc: "Receive insights" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {steps.map((step) => (
        <div
          key={step.id}
          className="bg-[#0b1220]/70 backdrop-blur-xl border border-[#334155] rounded-xl p-4 hover:border-blue-500/40 transition"
        >
          <h3 className="text-blue-400 font-bold text-lg">{step.id}</h3>
          <h4 className="mt-2 font-semibold text-white">{step.title}</h4>
          <p className="text-sm text-gray-400">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}