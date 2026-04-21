import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔥 SCROLL HOME
  const scrollToHome = () => {
    const element = document.getElementById("home");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("home");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // 🔥 SCROLL FITUR
  const scrollToFitur = () => {
    const element = document.getElementById("fitur");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("fitur");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

        <h1
          onClick={scrollToHome} // 🔥 logo juga scroll
          className="font-bold text-xl text-[#DC1416] cursor-pointer"
        >
          Gurubermutu.id
        </h1>

        {/* DESKTOP */}
        <div className="ml-auto hidden md:flex items-center gap-8 text-gray-700">

          {/* 🔥 FIX HOME */}
          <button onClick={scrollToHome}>Home</button>

          <button onClick={scrollToFitur}>Fitur</button>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#DC1416] text-white px-4 py-2 rounded-lg"
          >
            Sign in
          </button>
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="ml-auto md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 shadow-md">

          {/* 🔥 FIX MOBILE */}
          <button onClick={scrollToHome}>Home</button>

          <button onClick={scrollToFitur}>Fitur</button>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#DC1416] text-white px-4 py-2 rounded-lg"
          >
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;