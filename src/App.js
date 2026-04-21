import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import Features from "./components/Features";
import CTA from "./components/CTA";
import SocialProof from "./components/SocialProof";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import SkillTree from "./fitur/SkillTree"; // 🔥 ini udah kamu punya

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/skill-tree";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* LANDING */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProblemSection />
              <Features />
              <SocialProof />
              <CTA />
            </>
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔥 SKILL TREE PAGE */}
        <Route
          path="/skill-tree"
          element={
            <ProtectedRoute>
              <SkillTree />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;