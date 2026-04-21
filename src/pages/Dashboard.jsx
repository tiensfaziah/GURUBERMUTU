import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
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
    <div className="min-h-screen bg-[#F4F6FA] flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white p-6 shadow-sm hidden md:flex flex-col">

        <h1 className="text-xl font-bold text-[#DC1416] mb-8">
          Gurubermutu
        </h1>

        <div className="space-y-4 text-gray-600">

          <p onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-[#DC1416]">
            🏠 Dashboard
          </p>

          <p onClick={() => navigate("/skill-tree")} className="cursor-pointer hover:text-[#DC1416]">
            🌳 Skill Tree
          </p>

          <p className="cursor-pointer hover:text-[#DC1416]">
            🛠 Tech Stack
          </p>

          <p className="cursor-pointer hover:text-[#DC1416]">
            🛒 Marketplace
          </p>

          <p className="cursor-pointer hover:text-[#DC1416]">
            🎓 Workshop
          </p>

        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <input
            type="text"
            placeholder="Search..."
            className="bg-white px-4 py-2 rounded-xl shadow-sm w-60 text-sm"
          />

          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString("id-ID")}
          </p>
        </div>

        {/* HERO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center">

          <div>
            <h2 className="text-xl font-bold mb-2">
              Halo, {user?.email?.split("@")[0]} 👋
            </h2>

            <p className="text-gray-500 text-sm mb-4">
              Siap upgrade skill kamu hari ini?
            </p>

            <button
              onClick={() => navigate("/skill-tree")}
              className="bg-[#DC1416] text-white px-5 py-2 rounded-xl hover:scale-105 transition"
            >
              Mulai Belajar
            </button>
          </div>

          <div className="text-5xl hidden md:block">📚</div>
        </div>

        {/* FEATURE CARDS (INI YANG PENTING) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          <div
            onClick={() => navigate("/skill-tree")}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-5 rounded-2xl shadow cursor-pointer hover:scale-105 transition"
          >
            Skill Tree 🌳
            <p className="text-sm opacity-80 mt-1">
              Progres kompetensi
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white p-5 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
            Tech Stack 🛠
            <p className="text-sm opacity-80 mt-1">
              Tools untuk guru
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-5 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
            Marketplace 🛒
            <p className="text-sm opacity-80 mt-1">
              Jual & beli materi
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-400 to-red-400 text-white p-5 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
            Workshop 🎓
            <p className="text-sm opacity-80 mt-1">
              Pelatihan guru
            </p>
          </div>

        </div>

        {/* PROGRESS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">
            Level 2 - Interactive Media
          </p>

          <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
            <div className="bg-[#DC1416] h-3 rounded-full w-[60%]"></div>
          </div>

          <p className="text-sm mt-2">120 / 200 XP</p>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="w-72 bg-white p-6 shadow-sm hidden lg:flex flex-col justify-between">

        <div>
          {/* PROFILE */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-[#DC1416] text-white flex items-center justify-center rounded-full text-xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <h3 className="mt-3 font-semibold">
              {user?.email?.split("@")[0]}
            </h3>

            <p className="text-sm text-gray-500">Guru</p>
          </div>

          {/* REMINDER */}
          <div>
            <h4 className="font-semibold mb-3">Reminder 📌</h4>

            <div className="space-y-2 text-sm text-gray-600">
              <p>📚 Workshop AI - 25 Juni</p>
              <p>📝 Upload Materi</p>
              <p>🎯 Selesaikan Skill Tree</p>
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-[#DC1416] text-white py-2 rounded-xl hover:scale-105 transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Dashboard;