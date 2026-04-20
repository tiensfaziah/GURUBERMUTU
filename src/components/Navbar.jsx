import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        
        {/* LOGO */}
        <Link to="/" className="font-bold text-xl text-[#DC1416]">
          Gurubermutu
        </Link>

        {/* MENU */}
        <div className="ml-auto flex items-center gap-8 text-gray-700">
          
          <Link to="/" className="hover:text-[#DC1416] transition">
            Home
          </Link>

          <Link to="/#fitur" className="hover:text-[#DC1416] transition">
            Fitur
          </Link>

          <Link to="/#marketplace" className="hover:text-[#DC1416] transition">
            Marketplace
          </Link>

          <Link to="/#pelatihan" className="hover:text-[#DC1416] transition">
            Pelatihan
          </Link>

          {/* SIGN IN */}
          <Link to="/login">
            <button className="bg-[#DC1416] text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition">
              Sign in
            </button>
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;