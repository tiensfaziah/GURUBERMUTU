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
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import Faq from "./components/Faq";
import TechStack from "./pages/TechStack";
import AdminDashboard from "./pages/AdminDashboard";
import AllTechStack from "./pages/AllTechStack";
import GameDetail from "./pages/GameDetail";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import KelolaGame from "./pages/KelolaGame";
import PenilaianAhli from "./pages/Penilaianahli";
import DataGuru from "./pages/Dataguru";
import WorkshopForm from "./pages/WorkshopForm";
import KelolaWorkshop from "./pages/KelolaWorkshop";
import EditProfile from "./pages/EditProfile";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import SkillTree from "./pages/SkillTree";
import Marketplace from "./pages/Marketplace";
import PersonaQuestionnaire from "./pages/PersonaQuestionnaire";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/skill-tree" ||
    location.pathname === "/tech-stack" ||
    location.pathname === "/tech-stack/all" ||
    location.pathname.startsWith("/game/") ||
    location.pathname === "/admin" ||
    location.pathname === "/admin/kelola-game" ||
    location.pathname === "/admin/penilaian-ahli" ||
    location.pathname === "/admin/data-guru" ||
    location.pathname === "/admin/kelola-workshop" ||
    location.pathname === "/edit-profile" ||
    location.pathname === "/marketplace" ||
    location.pathname === "/persona" ||
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
  path="/workshop/buat"
  element={
    <ProtectedRoute>
      <WorkshopForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/workshop/edit/:id"
  element={
    <ProtectedRoute>
      <WorkshopForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/kelola-workshop"
  element={
    <ProtectedAdminRoute>
      <KelolaWorkshop />
    </ProtectedAdminRoute>
  }
/>
<Route path="/skill-tree" element={<SkillTree />} />
<Route path="/marketplace" element={<Marketplace />} />
<Route path="/persona" element={<PersonaQuestionnaire />} />
        <Route
          path="/skill-tree"
          element={
            <ProtectedRoute>
              <SkillTree />
            </ProtectedRoute>
          }
        />
        <Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
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
  path="/admin-login"
  element={<AdminLogin />}
/>
<Route
  path="/admin"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
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
  path="/game/:slug"
  element={
    <ProtectedRoute>
      <GameDetail />
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
        <Route
  path="/admin/kelola-game"
  element={
    <ProtectedAdminRoute>
      <KelolaGame />
    </ProtectedAdminRoute>
  }
/>
        <Route
  path="/admin/penilaian-ahli"
  element={
    <ProtectedAdminRoute>
      <PenilaianAhli />
    </ProtectedAdminRoute>
  }
/>
        <Route
  path="/admin/data-guru"
  element={
    <ProtectedAdminRoute>
      <DataGuru />
    </ProtectedAdminRoute>
  }
/>
      </Routes>
  
    </>
  );
}

function App() {
  return (
    <div className="overflow-x-hidden">
      <Router>

        <ScrollToTop />

        <Layout />

      </Router>
    </div>
  );
}

export default App;