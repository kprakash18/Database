import { BrowserRouter, Routes, Route } from "react-router-dom";
import SamplesPage from "./pages/samplePages.jsx";
import SampleDetailPage from "./pages/SampleDetailPage.jsx";
import TaxonomyExplorerPage from "./pages/TaxonomyExplorerPage.jsx";
import ApiExplorerPage from "./pages/ApiExplorerPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SamplesPage />} />
        <Route path="/samples/:sampleId" element={<SampleDetailPage />} />
        <Route path="/taxonomy" element={<TaxonomyExplorerPage />} />
        <Route path="/explorer" element={<ApiExplorerPage />} />
        <Route path="/docs" element={<ApiExplorerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
