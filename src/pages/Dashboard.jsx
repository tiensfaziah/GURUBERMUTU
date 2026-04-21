import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA]">

      {/* 🔥 MOBILE TOPBAR */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <h1 className="font-bold text-[#DC1416]">Gurubermutu</h1>

        <button onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* 🔥 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white p-4 space-y-3 shadow">
          <p onClick={() => navigate("/dashboard")} className="cursor-pointer">🏠 Dashboard</p>
          <p onClick={() => navigate("/skill-tree")} className="cursor-pointer">🌳 Skill Tree</p>
          <p className="cursor-pointer">🛠 Tech Stack</p>
          <p className="cursor-pointer">🛒 Marketplace</p>
          <p className="cursor-pointer">🎓 Workshop</p>
        </div>
      )}

      <div className="flex">

        {/* SIDEBAR DESKTOP */}
        <div className="hidden md:flex w-64 bg-white p-6 shadow-sm flex-col">
          <h1 className="text-xl font-bold text-[#DC1416] mb-8">
            Gurubermutu
          </h1>

          <div className="space-y-4 text-gray-600">
            <p onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-[#DC1416]">🏠 Dashboard</p>
            <p onClick={() => navigate("/skill-tree")} className="cursor-pointer hover:text-[#DC1416]">🌳 Skill Tree</p>
            <p className="cursor-pointer hover:text-[#DC1416]">🛠 Tech Stack</p>
            <p className="cursor-pointer hover:text-[#DC1416]">🛒 Marketplace</p>
            <p className="cursor-pointer hover:text-[#DC1416]">🎓 Workshop</p>
          </div>
        </div>

        {/* MAIN */}
        <div className="flex-1 p-4 md:p-6 space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm w-full md:w-60"
            />

            <p className="text-sm text-gray-500 text-right">
              {new Date().toLocaleDateString("id-ID")}
            </p>
          </div>

          {/* HERO */}
          <div className="bg-gradient-to-r from-[#DC1416] to-[#FF6B6B] text-white p-5 md:p-6 rounded-2xl shadow flex flex-col md:flex-row justify-between gap-4">

            <div>
              <h2 className="text-lg md:text-xl font-bold mb-2">
                Halo, {user?.email?.split("@")[0]} 👋
              </h2>

              <p className="text-sm mb-4">
                Siap upgrade skill kamu hari ini?
              </p>

              <button
                onClick={() => navigate("/skill-tree")}
                className="bg-white text-[#DC1416] px-4 py-2 rounded-xl"
              >
                Mulai Belajar
              </button>
            </div>

            <div className="text-4xl md:text-5xl text-center">🚀</div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-white p-4 rounded-2xl shadow text-center">
              <p className="text-gray-500 text-sm">XP</p>
              <h3 className="text-xl font-bold text-[#DC1416]">750</h3>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow text-center">
              <p className="text-gray-500 text-sm">Level</p>
              <h3 className="text-xl font-bold text-[#A64D8B]">2</h3>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow text-center">
              <p className="text-gray-500 text-sm">Badge</p>
              <h3 className="text-xl">🥈</h3>
            </div>

          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div onClick={() => navigate("/skill-tree")} className="bg-blue-500 text-white p-4 rounded-xl cursor-pointer">
              Skill Tree 🌳
            </div>

            <div className="bg-green-500 text-white p-4 rounded-xl">
              Tech Stack 🛠
            </div>

            <div className="bg-purple-500 text-white p-4 rounded-xl">
              Marketplace 🛒
            </div>

            <div className="bg-pink-500 text-white p-4 rounded-xl">
              Workshop 🎓
            </div>

          </div>

          {/* PROGRESS */}
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Progress</p>

            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div className="bg-[#DC1416] h-2 w-[60%] rounded"></div>
            </div>
          </div>

          {/* 🔥 PROFILE (PINDAH KE BAWAH DI MOBILE) */}
          <div className="bg-white p-5 rounded-xl shadow md:hidden text-center">
            <div className="w-14 h-14 mx-auto bg-[#DC1416] text-white rounded-full flex items-center justify-center">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <h3 className="mt-2 font-semibold">
              {user?.email?.split("@")[0]}
            </h3>

            <button
              onClick={handleLogout}
              className="mt-4 bg-[#DC1416] text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>

        </div>

        {/* RIGHT PANEL DESKTOP */}
        <div className="hidden lg:flex w-72 bg-white p-6 shadow-sm flex-col justify-between">
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#DC1416] text-white rounded-full flex items-center justify-center">
                {user?.email?.charAt(0).toUpperCase()}
              </div>

              <h3 className="mt-3 font-semibold">
                {user?.email?.split("@")[0]}
              </h3>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-[#DC1416] text-white py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;