import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSampleById } from "../api/sampleApi";
import { getCompositionSummary } from "../api/compositionApi";
import CompositionTab from "../components/compositionTab.jsx";

const NAV_TABS = [
  { key: "record", label: "Record Details" },
  { key: "composition", label: "Composition" },
  { key: "taxonomy", label: "Taxonomy" },
];

const SampleDetailPage = () => {
  const { sampleId } = useParams();
  const [sample, setSample] = useState(null);
  const [summary, setSummary] = useState(null);
  const [activeTab, setActiveTab] = useState("record");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [sampleRes, summaryRes] = await Promise.all([
          getSampleById(sampleId),
          getCompositionSummary(sampleId),
        ]);
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

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--sans)", color: "var(--ink-muted)", fontSize: "14px",
        backgroundColor: "var(--ground)",
      }}>
        <div style={{ animation: "shimmer 1.4s infinite" }}>Loading study metadata…</div>
      </div>
    );
  }

  if (!sample) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--sans)", color: "var(--ink-muted)", fontSize: "14px",
        backgroundColor: "var(--ground)",
      }}>
        Record not found.
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--ground)", fontFamily: "var(--sans)" }}>

      {/* Sticky top nav */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0 2rem",
        height: "52px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)" }}>
            Indian Food Microbiome Database
          </span>
          <span style={{
            fontSize: "11px", fontWeight: 500, color: "var(--ink-muted)",
            fontFamily: "var(--mono)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "1px 6px",
          }}>v1.0</span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link to="/" style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink-muted)", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "var(--ink)"}
            onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
          >Database</Link>
          <Link to="/explorer" style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink-muted)", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "var(--ink)"}
            onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
          >API Explorer</Link>
          <a href="/api/docs" target="_blank" rel="noreferrer" style={{
            fontSize: "13px", fontWeight: 500, color: "var(--accent)", textDecoration: "none",
            transition: "color 120ms ease",
          }}
            onMouseEnter={e => e.target.style.color = "var(--accent-hover)"}
            onMouseLeave={e => e.target.style.color = "var(--accent)"}
          >
            API Docs ↗
          </a>
        </nav>
      </header>

      {/* ── Compact page header band ── */}
      <div style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border-faint)",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "var(--space-6) 2rem 0",
        }}>
          {/* Breadcrumb back-link */}
          <div style={{ marginBottom: "var(--space-3)" }}>
            <Link to="/" style={{
              fontSize: "var(--text-caption)", fontWeight: 500,
              color: "var(--ink-muted)",
              textDecoration: "none", transition: "color 100ms",
            }}
              onMouseEnter={e => e.target.style.color = "var(--ink)"}
              onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
            >
              ← Back to sample list
            </Link>
          </div>

          {/* Compressed accession badge + title header row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-5)" }}>
            <span style={{
              fontFamily: "var(--mono)", fontSize: "var(--text-micro)", fontWeight: 600,
              color: "var(--ink)",
              backgroundColor: "var(--page-bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "2px 8px",
              letterSpacing: "0.01em",
              lineHeight: 1.5,
            }}>
              {sample.accession_code || `#${sample.sample_id}`}
            </span>
            <h1 style={{
              fontSize: "var(--text-title)", fontWeight: 700, letterSpacing: "-0.02em",
              lineHeight: 1.2, color: "var(--ink)", margin: 0,
            }}>
              {sample.food_name}
            </h1>
          </div>

          {/* Tab bar header strip */}
          <div style={{ display: "flex", gap: "0" }}>
            {NAV_TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: "10px var(--space-5)",
                  fontSize: "var(--text-caption)", fontWeight: activeTab === key ? 600 : 500,
                  color: activeTab === key ? "var(--ink)" : "var(--ink-muted)",
                  background: "none", border: "none",
                  borderBottom: activeTab === key ? "2px solid var(--ink)" : "2px solid transparent",
                  cursor: "pointer", marginBottom: "-1px",
                  transition: "color 100ms ease, border-color 100ms ease",
                  fontFamily: "var(--sans)",
                }}
                onMouseEnter={e => { if (activeTab !== key) e.currentTarget.style.color = "var(--ink)"; }}
                onMouseLeave={e => { if (activeTab !== key) e.currentTarget.style.color = "var(--ink-muted)"; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content area ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-8) 2rem var(--space-16)" }}>
        {activeTab === "record" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
            
            {/* Left Hand Column: Registry & Environment */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Profile Card */}
              <div style={{
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{
                  fontSize: "var(--text-subheading)", fontWeight: 700,
                  color: "var(--ink)", margin: "0 0 16px 0",
                  borderBottom: "1px solid var(--border-faint)",
                  paddingBottom: "12px",
                }}>
                  Registry Profile
                </h3>
                <RecordDetails sample={sample} summary={summary} />
              </div>

              {/* Physicochemical Parameters Card */}
              <div style={{
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{
                  fontSize: "var(--text-subheading)", fontWeight: 700,
                  color: "var(--ink)", margin: "0 0 16px 0",
                  borderBottom: "1px solid var(--border-faint)",
                  paddingBottom: "12px",
                }}>
                  Environmental & Physicochemical Parameters
                </h3>
                <EnvironmentalDetails sample={sample} />
              </div>
            </div>

            {/* Right Hand Column: Methodologies & Publications */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Sequencing Platform Card */}
              <div style={{
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{
                  fontSize: "var(--text-subheading)", fontWeight: 700,
                  color: "var(--ink)", margin: "0 0 16px 0",
                  borderBottom: "1px solid var(--border-faint)",
                  paddingBottom: "12px",
                }}>
                  Sequencing Methodology
                </h3>
                <SequencingDetails sample={sample} />
              </div>

              {/* Paper Reference Card */}
              <div style={{
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{
                  fontSize: "var(--text-subheading)", fontWeight: 700,
                  color: "var(--ink)", margin: "0 0 16px 0",
                  borderBottom: "1px solid var(--border-faint)",
                  paddingBottom: "12px",
                }}>
                  Source Literature Reference
                </h3>
                <PublicationDetails sample={sample} />
              </div>
            </div>

          </div>
        )}

        {activeTab === "composition" && (
          <CompositionTab sampleId={sampleId} />
        )}

        {activeTab === "taxonomy" && (
          <div style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            padding: "24px",
            boxShadow: "var(--shadow-card)",
            maxWidth: "540px",
          }}>
            <h2 style={{ fontSize: "var(--text-subheading)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)", margin: 0 }}>
              Taxonomy Hierarchy Lineage
            </h2>
            <p style={{ fontSize: "14px", color: "var(--ink-muted)", margin: "8px 0 20px", lineHeight: 1.5 }}>
              Explore nested bacterial groupings (domain down to genus species) via the D3 Sunburst explorer.
            </p>
            <Link
              to={`/taxonomy?sampleId=${sampleId}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "8px 16px",
                fontSize: "13px", fontWeight: 600,
                color: "var(--surface)",
                backgroundColor: "var(--ink)",
                borderRadius: "var(--radius)",
                textDecoration: "none",
                transition: "background-color 120ms ease",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#374151"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--ink)"}
            >
              Open Sunburst Explorer →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Section Subrenderers ── */

const RecordDetails = ({ sample, summary }) => {
  const fields = [
    { label: "Sample Accession", value: sample.accession_code || `#${sample.sample_id}`, mono: true },
    { label: "Internal ID", value: `#${sample.sample_id}`, mono: true },
    { label: "Food Source Origin", value: sample.food_name },
    { label: "Description / Notes", value: sample.description || "No notes provided." },
    {
      label: "Dominant Taxon",
      value: summary?.dominant_within_each_level?.[0]?.taxon_name || "—",
      italic: true,
    },
    {
      label: "Dominant Abundance",
      value: summary?.dominant_within_each_level?.[0]?.relative_abundance
        ? `${summary.dominant_within_each_level[0].relative_abundance}%`
        : "—",
      mono: true,
    },
  ];

  return <DataList fields={fields} />;
};

const EnvironmentalDetails = ({ sample }) => {
  const meta = sample.metadata?.[0] || {};
  const formattedDate = meta.collection_date
    ? new Date(meta.collection_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const fields = [
    { label: "Geographic Location", value: meta.location || "Unknown Location" },
    { label: "Collection Date", value: formattedDate },
    { label: "Sample pH Level", value: meta.ph !== null && meta.ph !== undefined ? `pH ${meta.ph}` : "—", mono: true },
    { label: "Incubated Temp", value: meta.temperature !== null && meta.temperature !== undefined ? `${meta.temperature}°C` : "—", mono: true },
  ];

  return <DataList fields={fields} />;
};

const SequencingDetails = ({ sample }) => {
  const methodRel = sample.sample_methods?.[0]?.sequencing_methods || {};
  const seqRel = sample.sample_sequences?.[0] || {};

  const fields = [
    { label: "Sequencing Target", value: methodRel.target_region || "Shotgun Metagenomics" },
    { label: "Sequencing Method", value: methodRel.method_name || "16S rRNA Metagenomics" },
    { label: "Instrument Platform", value: methodRel.platform || "Illumina MiSeq" },
    { label: "NCBI Sequence Accession", value: seqRel.accession_id || "—", mono: true },
    { label: "External SRA Run Link", value: seqRel.external_link ? <a href={seqRel.external_link} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>Open SRA Record ↗</a> : "—" },
  ];

  return <DataList fields={fields} />;
};

const PublicationDetails = ({ sample }) => {
  const paperRel = sample.sample_papers?.[0]?.source_papers || {};

  if (!paperRel.title) {
    return <span style={{ fontSize: "13px", color: "var(--ink-faint)" }}>No reference publication linked to this study.</span>;
  }

  const issueDateLabel = paperRel.date ? "Date of Issue" : "Issue Year";
  const issueDateValue = paperRel.date
    ? new Date(paperRel.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : paperRel.year || "—";

  const fields = [
    { label: "Article Title", value: paperRel.title },
    { label: "Lead Authors", value: paperRel.authors || "—" },
    { label: "Scientific Journal", value: paperRel.journal || "—" },
    { label: issueDateLabel, value: issueDateValue },
    { label: "Source Link", value: paperRel.link ? <a href={paperRel.link} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>View Article Publisher ↗</a> : "—" },
  ];

  return <DataList fields={fields} />;
};

/* ── Generic Data List Grid ── */
const DataList = ({ fields }) => (
  <dl style={{ margin: 0 }}>
    {fields.map(({ label, value, mono, italic }, i) => (
      <div
        key={label}
        style={{
          display: "grid", gridTemplateColumns: "180px 1fr",
          alignItems: "baseline",
          borderBottom: i < fields.length - 1 ? "1px solid var(--border-faint)" : "none",
          padding: "var(--space-3) 0",
          gap: "var(--space-4)",
        }}
      >
        <dt style={{
          fontSize: "var(--text-label)", fontWeight: 600,
          letterSpacing: "0.04em", textTransform: "uppercase",
          color: "var(--ink-muted)",
        }}>
          {label}
        </dt>
        <dd style={{
          margin: 0,
          fontSize: "14px", fontWeight: 500,
          color: "var(--text-primary)",
          fontFamily: mono ? "var(--mono)" : "var(--sans)",
          fontStyle: italic ? "italic" : "normal",
          lineHeight: 1.5,
        }}>
          {value}
        </dd>
      </div>
    ))}
  </dl>
);

export default SampleDetailPage;
