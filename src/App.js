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
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import Faq from "./components/Faq";
import TechStack from "./pages/TechStack";
import AllTechStack from "./pages/AllTechStack";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/skill-tree" ||
    location.pathname === "/tech-stack" ||
    location.pathname.startsWith("/workshop");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProblemSection />
              <Features />
              <SocialProof />
              <HowItWorks />
              <Faq />
              <CTA />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skill-tree"
          element={
            <ProtectedRoute>
              <SkillTree />
            </ProtectedRoute>
          }
        />
<Route
  path="/tech-stack"
  element={
    <ProtectedRoute>
      <TechStack />
    </ProtectedRoute>
  }
/>
<Route
  path="/tech-stack/all"
  element={
    <ProtectedRoute>
      <AllTechStack />
    </ProtectedRoute>
  }
/>
        <Route
          path="/workshop"
          element={
            <ProtectedRoute>
              <Workshop />
            </ProtectedRoute>
          }
        />

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
    <div className="overflow-x-hidden">
      <Router basename="/gurubermutu">
        <Layout />
      </Router>
    </div>
  );
}

export default App;