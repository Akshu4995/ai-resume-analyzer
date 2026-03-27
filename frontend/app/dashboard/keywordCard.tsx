export default function KeywordCard({ skills = ["React.js", "Node.js", "AWS", "CI/CD"] }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

      <h3 className="font-semibold mb-4">Critical Keyword Match</h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill:any) => (
          <span
            key={skill}
             className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm rounded-full hover:scale-105 transition">
          
            {skill}
          </span>
        ))}
      </div>

    </div>
  );
}