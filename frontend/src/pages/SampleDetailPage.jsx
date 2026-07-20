import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSampleById } from "../api/sampleApi";
import { getCompositionSummary } from "../api/compositionApi";
import CompositionTab from "../components/compositionTab.jsx";

const SampleDetailPage = () => {
  const { sampleId } = useParams();

  const [sample, setSample] = useState(null);
  const [summary, setSummary] = useState(null);
  const [activeTab, setActiveTab] = useState("record");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const sampleRes = await getSampleById(sampleId);
        const summaryRes = await getCompositionSummary(sampleId);

        setSample(sampleRes.data || sampleRes);
        setSummary(summaryRes.data || summaryRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [sampleId]);

  if (loading) return <p className="p-6">Loading sample details...</p>;

  if (!sample) {
    return <p className="p-6">Sample not found.</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl border border-slate-300 bg-white">
        <div className="border-b border-slate-300 bg-slate-200 px-5 py-3">
          <Link to="/" className="text-sm text-blue-700 underline">
            ← Back to samples
          </Link>

          <h1 className="mt-2 text-xl font-semibold">
            Sample Record {sample.accession_code || `#${sample.sample_id}`}: {sample.food_name}
          </h1>

          <p className="text-sm text-slate-600">{sample.description}</p>
        </div>

        <div className="flex border-b border-slate-300 bg-slate-100 text-sm">
          {[
            ["record", "Record Details"],
            ["composition", "Composition by Level"],
            ["taxonomy", "Taxonomy Lineage"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`border-r border-slate-300 px-4 py-2 ${
                activeTab === key
                  ? "bg-white font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === "record" && (
            <RecordDetails sample={sample} summary={summary} />
          )}

          {activeTab === "composition" && (
            <div>
                <CompositionTab sampleId={sampleId} />
            </div>
          )}

          {activeTab === "taxonomy" && (
            <div>
              <div className="flex flex-col gap-3 border border-slate-300 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold">Taxonomy Lineage</h2>
                  <p className="text-sm text-slate-600">
                    Open an interactive D3 sunburst for Domain to Species exploration.
                  </p>
                </div>
                <Link
                  to={`/taxonomy?sampleId=${sampleId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-slate-800 bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Open Sunburst Explorer
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RecordDetails = ({ sample, summary }) => {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        <Row label="Accession ID" value={sample.accession_code || `#${sample.sample_id}`} />
        <Row label="Database ID" value={`#${sample.sample_id}`} />
        <Row label="Food Name" value={sample.food_name} />
        <Row label="Description" value={sample.description} />

        <Row
          label="Dominant Bacteria"
          value={
            summary?.dominant_within_each_level?.[0]?.taxon_name ||
            "Not available"
          }
        />

        <Row
          label="Dominant Abundance"
          value={
            summary?.dominant_within_each_level?.[0]?.relative_abundance
              ? `${summary.dominant_within_each_level[0].relative_abundance}%`
              : "Not available"
          }
        />
      </tbody>
    </table>
  );
};

const Row = ({ label, value }) => {
  return (
    <tr>
      <td className="w-60 border border-slate-300 bg-slate-100 px-3 py-2 font-semibold">
        {label}
      </td>
      <td className="border border-slate-300 px-3 py-2">{value}</td>
    </tr>
  );
};

export default SampleDetailPage;
