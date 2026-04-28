import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  // 📅 DATE REALTIME
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      const formatted = now.toLocaleDateString("id-ID", options);
      setCurrentDate(formatted);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 FIREBASE REALTIME
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);

        const userRef = doc(db, "users", u.uid);

        const unsubSnap = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        });

        return () => unsubSnap();
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // 🔥 DATA
  const xp = userData?.xp || 0;
  const completed = userData?.completedModules || 0;

  const getLevelName = (xp) => {
    if (xp >= 5000) return "Guru Inspiratif";
    if (xp >= 3000) return "Guru Produktif";
    if (xp >= 1500) return "Guru Kreatif";
    if (xp >= 500) return "Guru Berkembang";
    return "Guru Pemula";
  };

  const progress = Math.floor((completed / 10) * 100);

  // 🔥 BADGE TERBARU
  const latestBadge =
    userData?.badges && userData.badges.length > 0
      ? userData.badges[userData.badges.length - 1]
      : null;

  return (
    <div className="min-h-screen bg-[#F4F6FA]">

      {/* MOBILE */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <h1 className="font-bold text-[#DC1416]">Gurubermutu</h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white p-4 space-y-3 shadow">
          <p onClick={() => navigate("/dashboard")}>🏠 Dashboard</p>
          <p onClick={() => navigate("/skill-tree")}>🌳 Skill Tree</p>
        </div>
      )}

      <div className="flex gap-6">

        {/* SIDEBAR */}
        <div className="hidden md:flex w-64 bg-white p-6 shadow-sm flex-col">
          <h1 className="text-xl font-bold text-[#DC1416] mb-8">
            Gurubermutu
          </h1>

          <div className="space-y-4 text-gray-600">
            <p onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-[#DC1416]">🏠 Dashboard</p>
            <p onClick={() => navigate("/skill-tree")} className="cursor-pointer hover:text-[#DC1416]">🌳 Skill Tree</p>
            <p onClick={() => navigate("/tech-stack")} className="cursor-pointer hover:text-[#DC1416]">🛠 Tech Stack</p>
            <p onClick={() => navigate("/marketplace")} className="cursor-pointer hover:text-[#DC1416]">🛒 Marketplace</p>
            <p onClick={() => navigate("/workshop")} className="cursor-pointer hover:text-[#DC1416]">🎓 Workshop</p>
          </div>
        </div>

        {/* MAIN */}
        <div className="flex flex-1 justify-center gap-6">

          <div className="w-full max-w-[900px] p-4 md:p-6 space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Cari modul, tools, resource..."
                className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm w-64"
              />
              <p className="text-sm text-gray-500">
                {currentDate}
              </p>
            </div>

            {/* HERO */}
            <div className="bg-gradient-to-r from-[#DC1416] to-[#B90E10] text-white p-6 rounded-3xl flex justify-between items-center">

              <div>
                <h2 className="text-xl font-bold">
                  Halo, {user?.email?.split("@")[0]} 👋
                </h2>

                <p className="text-sm mt-2">
                  Yuk lanjut belajar dan naik level hari ini!
                </p>

                <button className="mt-4 bg-white text-red-600 px-5 py-2 rounded-xl font-semibold">
                  Lanjut Belajar →
                </button>
              </div>

              <div className="hidden md:flex flex-col gap-3">
                <div className="bg-white/20 p-3 rounded-xl text-center">
                  <p className="text-xs">XP Kamu</p>
                  <h3 className="text-xl font-bold">{xp}</h3>
                </div>

                <div className="bg-white/20 p-3 rounded-xl text-center">
                  <p className="text-xs">🔥 Level</p>
                  <h3 className="text-lg font-bold">{getLevelName(xp)}</h3>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-4">

              <div className="bg-white p-5 rounded-2xl shadow border-t-4 border-red-500">
                <p className="text-gray-500 text-sm">TOTAL XP</p>
                <h3 className="text-3xl font-bold text-red-500">{xp}</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow border-t-4 border-purple-500">
                <p className="text-gray-500 text-sm">LEVEL</p>
                <h3 className="text-lg font-bold text-purple-600">
                  {getLevelName(xp)}
                </h3>
              </div>

              {/* 🔥 BADGE TERBARU */}
              <div className="bg-white p-5 rounded-2xl shadow border-t-4 border-yellow-500">
                <p className="text-gray-500 text-sm">BADGE</p>

                {latestBadge ? (
                  <h3 className="text-lg font-bold mt-2">
                    {latestBadge}
                  </h3>
                ) : (
                  <h3 className="text-lg font-bold text-gray-400">
                    Belum ada badge
                  </h3>
                )}
              </div>

            </div>

            {/* PROGRESS */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <div className="flex justify-between">
                <p className="font-semibold">
                  Progress — {getLevelName(xp)}
                </p>
                <span className="text-red-500 font-bold">{progress}%</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded mt-3">
                <div
                  className="bg-red-500 h-2 rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {completed} dari 10 modul selesai
              </p>
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="w-72 shrink-0 bg-white p-6 shadow-sm flex flex-col h-full">

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#DC1416] text-white rounded-full flex items-center justify-center">
                {user?.email?.charAt(0).toUpperCase()}
              </div>

              <h3 className="mt-3 font-semibold">
                {user?.email?.split("@")[0]}
              </h3>

              <p className="text-xs text-gray-400">
                {user?.email}
              </p>

              <div className="mt-3 inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold">
                {getLevelName(xp)}
              </div>
            </div>

            <hr className="my-5" />

            {/* AKTIVITAS */}
            <div>
              <h3 className="font-semibold mb-3">Aktivitas Terkini</h3>

              <div className="space-y-4 text-sm">
                {userData?.aktivitas?.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button className="w-full border border-[#DC1416] text-[#DC1416] py-2 rounded-xl hover:bg-[#DC1416] hover:text-white transition">
                Edit Profil
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-[#DC1416] text-white py-2 rounded-xl hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;