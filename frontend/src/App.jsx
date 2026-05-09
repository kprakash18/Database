import { BrowserRouter, Routes, Route } from "react-router-dom";
import SamplesPage from "./pages/SamplesPage";
import SampleDetailPage from "./pages/SampleDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SamplesPage />} />
        <Route path="/samples/:sampleId" element={<SampleDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;