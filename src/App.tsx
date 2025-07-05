import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Internships from "./components/Internships";
import CoCurricular from "./components/CoCurricular";
import ExtraCurricular from "./components/ExtraCurricular";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/co-curricular" element={<CoCurricular />} />
        <Route path="/extra-curricular" element={<ExtraCurricular />} />
        {/* Optional: catch-all route for 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
