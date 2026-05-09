import { useEffect, useState } from "react";
import { getSamples } from "../api/sampleApi";
import SampleTable from "../components/sampleTable.jsx";

const SamplesPage = () => {
  const [samples, setSamples] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredSamples = samples.filter((sample) => {
    const text = `${sample.sample_id} ${sample.food_name} ${sample.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const res = await getSamples();

        // supports both direct array and { data: [] }
        setSamples(Array.isArray(res) ? res : res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSamples();
  }, []);

  if (loading) return <p className="p-6">Loading samples...</p>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 border border-slate-300 bg-white px-5 py-4">
          <h1 className="text-xl font-semibold">
            Indian Food Microbiome Database
          </h1>
          <p className="text-sm text-slate-600">
            Browse food samples and open records for taxonomy and composition.
          </p>
        </header>

        <section className="mb-4 border border-slate-300 bg-white">
          <div className="border-b border-slate-300 bg-slate-200 px-4 py-2 text-sm font-semibold">
            Search Samples
          </div>

          <div className="p-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by sample id, food name, or description"
              className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-600"
            />
          </div>
        </section>

        <SampleTable samples={filteredSamples} />
      </div>
    </div>
  );
};

export default SamplesPage;