import { Link } from "react-router-dom";

const SampleTable = ({ samples }) => {
  return (
    <div className="overflow-x-auto border border-slate-300 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-200 text-left text-xs uppercase text-slate-700">
          <tr>
            <th className="border border-slate-300 px-3 py-2">ID</th>
            <th className="border border-slate-300 px-3 py-2">Sample Name</th>
            <th className="border border-slate-300 px-3 py-2">Description</th>
            <th className="border border-slate-300 px-3 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {samples.map((sample) => (
            <tr key={sample.sample_id} className="odd:bg-white even:bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">
                <Link
                  to={`/samples/${sample.sample_id}`}
                  className="font-semibold text-blue-700 underline"
                >
                  {sample.sample_id}
                </Link>
              </td>

              <td className="border border-slate-300 px-3 py-2">
                <Link
                  to={`/samples/${sample.sample_id}`}
                  className="font-medium text-blue-700 underline"
                >
                  {sample.food_name}
                </Link>
              </td>

              <td className="border border-slate-300 px-3 py-2">
                {sample.description}
              </td>

              <td className="border border-slate-300 px-3 py-2">
                <Link
                  to={`/samples/${sample.sample_id}`}
                  className="border border-slate-400 bg-white px-2 py-1 text-xs hover:bg-slate-100"
                >
                  Open Record
                </Link>
              </td>
            </tr>
          ))}

          {samples.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="border border-slate-300 px-3 py-5 text-center text-slate-500"
              >
                No samples found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SampleTable;