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
import Workshop from "./pages/Workshop";
import WorkshopDetail from "./pages/WorkshopDetail";
import ProtectedRoute from "./routes/ProtectedRoute";
import SkillTree from "./fitur/SkillTree";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/skill-tree" ||
    location.pathname.startsWith("/workshop"); 

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

        {/* SKILL TREE */}
        <Route
          path="/skill-tree"
          element={
            <ProtectedRoute>
              <SkillTree />
            </ProtectedRoute>
          }
        />

        {/* 🔥 WORKSHOP LIST */}
        <Route
          path="/workshop"
          element={
            <ProtectedRoute>
              <Workshop />
            </ProtectedRoute>
          }
        />

        {/* 🔥 WORKSHOP DETAIL */}
        <Route
          path="/workshop/:id"
          element={
            <ProtectedRoute>
              <WorkshopDetail />
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