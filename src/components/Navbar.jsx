import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        
        {/* LOGO */}
        <h1 className="font-bold text-xl text-[#DC1416]">
          Gurubermutu.id
        </h1>

        {/* DESKTOP MENU */}
        <div className="ml-auto hidden md:flex items-center gap-8 text-gray-700">
          <a href="#home">Home</a>
          <a href="#fitur">Fitur</a>
          <a href="#marketplace">Marketplace</a>
          <a href="#pelatihan">Pelatihan</a>

          <button
            onClick={() => window.location.href = "/login"}
            className="bg-[#DC1416] text-white px-4 py-2 rounded-lg shadow-md"
          >
            Sign in
          </button>
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="ml-auto md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 shadow-md">
          <a href="#home" className="block">Home</a>
          <a href="#fitur" className="block">Fitur</a>
          <a href="#marketplace" className="block">Marketplace</a>
          <a href="#pelatihan" className="block">Pelatihan</a>

          <button
            onClick={() => window.location.href = "/login"}
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