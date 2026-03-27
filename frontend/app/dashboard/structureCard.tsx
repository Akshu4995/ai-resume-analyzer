export default function StructureCard({ improvements = [] }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

      <h3 className="font-semibold mb-4">
        Structural Intelligence
      </h3>

      <div className="space-y-4 text-sm text-gray-600">

        <div>
          <p className="font-medium">Experience Section</p>
          <p>Strong impact with measurable metrics</p>
        </div>

        <div>
          <p className="font-medium">Skills Inventory</p>
          <p>Well balanced and categorized</p>
        </div>

      </div>

    </div>
  );
}