import { useEffect, useState } from "react";
import { getCompositionByRank } from "../api/compositionApi";

const ranks = [
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
];

const CompositionTab = ({ sampleId }) => {
  const [rank, setRank] = useState("genus");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComposition = async () => {
      try {
        setLoading(true);

        const res = await getCompositionByRank(sampleId, rank);

        setData(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComposition();
  }, [sampleId, rank]);

  if (loading) {
    return <p>Loading composition...</p>;
  }

  const maxValue = Math.max(
    ...data.map((item) => item.value || item.relative_abundance || 0),
    1
  );

  return (
    <div>
      <div className="mb-4 flex items-end gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Taxonomy Level
          </label>

          <select
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="border border-slate-300 px-3 py-2 text-sm"
          >
            {ranks.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-300">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-slate-200">
            <tr>
              <th className="border border-slate-300 px-3 py-2 text-left">
                Taxon
              </th>

              <th className="border border-slate-300 px-3 py-2 text-left">
                Relative Abundance
              </th>

              <th className="border border-slate-300 px-3 py-2 text-left">
                Visualization
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.label || item.taxon_name}
                className="odd:bg-white even:bg-slate-50"
              >
                <td className="border border-slate-300 px-3 py-2 italic">
                  {item.label || item.taxon_name}
                </td>

                <td className="border border-slate-300 px-3 py-2">
                  {item.value || item.relative_abundance || 0}%
                </td>

                <td className="border border-slate-300 px-3 py-2">
                  <div className="h-4 w-full border border-slate-300 bg-white">
                    <div
                      className="h-full bg-teal-600"
                      style={{
                        width: `${
                          ((item.value || item.relative_abundance || 0) /
                            maxValue) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="border border-slate-300 px-3 py-5 text-center text-slate-500"
                >
                  No composition data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompositionTab;
