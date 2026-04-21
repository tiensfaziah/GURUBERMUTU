import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

        <h1
          onClick={() => navigate("/")}
          className="font-bold text-xl text-[#DC1416] cursor-pointer"
        >
          Gurubermutu.id
        </h1>

        <div className="ml-auto hidden md:flex items-center gap-8 text-gray-700">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/#fitur")}>Fitur</button>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#DC1416] text-white px-4 py-2 rounded-lg"
          >
            Sign in
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="ml-auto md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 shadow-md">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/#fitur")}>Fitur</button>

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