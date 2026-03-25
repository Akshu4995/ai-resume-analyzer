export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#0f172a] p-5">
      <h1 className="text-white text-xl font-bold mb-10">
        AI Analyzer
      </h1>

      <ul className="space-y-4 text-gray-300">
        <li className="hover:text-white cursor-pointer">Dashboard</li>
        <li className="hover:text-white cursor-pointer">History</li>
        <li className="hover:text-white cursor-pointer">Settings</li>
      </ul>
    </div>
  );
}