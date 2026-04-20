import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        
        {/* LANDING PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProblemSection />
              <Features />
              <CTA />
            </>
          }
        />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* REGISTER PAGE */}
        <Route path="/register" element={<Register />} />
      </Routes>

    </Router>
  );
}

export default App;