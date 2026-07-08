import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { getLevel } from "../utils/level";
import games from "../data/games";
import { subscribeWorkshops } from "../services/workshopService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [search, setSearch] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const isAdminActive = location.pathname.startsWith("/admin");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("id-ID", options));
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);
useEffect(() => {

    const unsub = subscribeWorkshops((data)=>{

        setWorkshops(data);

    });

    return ()=>unsub();

},[]);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        const userRef = doc(db, "users", u.uid);
        const unsubSnap = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) setUserData(docSnap.data());
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

  const xp = userData?.xp || 0;
  const levelData = getLevel(xp);
  

  

  const progress = Math.min(
100,
Math.max(
0,
Math.floor(
((xp-levelData.currentXP)/
(levelData.nextXP-levelData.currentXP))*100
)
)
);

  const latestBadge =
    userData?.badges && userData.badges.length > 0
      ? userData.badges[userData.badges.length - 1]
      : null;
  console.log("USER DATA:", userData);
console.log("AKTIVITAS:", userData?.aktivitas);
  const activities = [...(userData?.aktivitas || [])].sort((a,b)=>{
    return (b.createdAt || 0) - (a.createdAt || 0);
});
const displayActivities =
activities.length > 0
? [...activities].reverse()
: [{
    text: "Belum ada aktivitas."
}];
const searchItems = [

    ...games.map((game)=>({

        title: game.title,

        category:"Tech Stack",

        path:`/game/${game.slug}`

    })),

    ...workshops.map((workshop)=>({

        title: workshop.title,

        category:"Workshop",

        path:`/workshop/${workshop.id}`

    }))

];
const filteredItems =
search.trim()===""
?[]
:searchItems.filter((item)=>

item.title
.toLowerCase()
.includes(search.toLowerCase())

);
  return (
    <div className="min-h-screen" style={{ background: "#F5F3FF" }}>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden sticky top-0 z-50 flex justify-between items-center px-4 py-4 bg-white shadow-sm border-b border-purple-100">
        <span className="font-bold text-lg" style={{ color: "#5B21B6" }}>Gurubermutu</span>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-purple-700 text-2xl">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
{userData?.role === "admin" && (

<button
    onClick={()=>{
        navigate("/admin");
        setMenuOpen(false);
    }}
>
    Admin Panel
</button>

)}
      {/* MOBILE MENU */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white px-4 pb-5 pt-2 space-y-2 shadow-md border-b border-purple-100">
   {[
  { label: "🏠 Dashboard", path: "/dashboard" },
  { label: "🌳 Skill Tree", path: "/skill-tree" },
  { label: "🛠 Tech Stack", path: "/tech-stack" },
  { label: "🛒 Marketplace", path: null },
  { label: "🎓 Workshop", path: "/workshop" },
  { label: "👤 Edit Profil", path: null },
].map(({ label, path }) => {
  const isActive = path && location.pathname === path;

  return (
    <button
      key={label}
      onClick={() => {
        if (path) navigate(path);
        setMenuOpen(false);
      }}
      className={`
        block w-full text-left px-3 py-3 rounded-xl
        font-medium transition-all
        ${
          isActive
            ? "bg-[#EDE9FE] text-[#5B21B6]"
            : "text-gray-600 hover:bg-[#EDE9FE] hover:text-[#5B21B6]"
        }
      `}
    >
      {label}
    </button>
  );
})}
          <hr className="my-2 border-purple-100" />
          <button
            onClick={handleLogout}
            className="w-full text-white py-3 rounded-xl text-sm font-medium mt-2"
            style={{ background: "#5B21B6" }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-6">

        {/* DESKTOP SIDEBAR */}
        <div
          className="hidden md:flex w-64 flex-col border-r border-purple-50 p-6"
          style={{ background: "#fff", minHeight: "100vh" }}
        >
          {/* Logo area with decorative dot pattern */}
          <div className="relative mb-8">
            <svg className="absolute -top-2 -right-2 opacity-20" width="60" height="60" viewBox="0 0 60 60">
              {[0,1,2,3,4].map(row =>
                [0,1,2,3,4].map(col => (
                  <circle key={`${row}-${col}`} cx={col*12+6} cy={row*12+6} r="2" fill="#7C3AED" />
                ))
              )}
            </svg>
            <h1 className="text-xl font-bold relative z-10" style={{ color: "#5B21B6" }}>
              Gurubermutu
            </h1>
          </div>

          <nav className="space-y-1 flex-1">
            
            {userData?.role === "admin" && (

<button
  onClick={() => navigate("/admin")}
  className={`
    w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl
    text-sm font-medium transition-all
    ${
      isAdminActive
        ? "bg-[#EDE9FE] text-[#5B21B6]"
        : "text-gray-500 hover:bg-[#EDE9FE] hover:text-[#5B21B6]"
    }
  `}
>
  <span className="text-base">⚙️</span>
  Admin Panel
</button>

)}
            {[
  { icon: "🏠", label: "Dashboard", path: "/dashboard" },
  { icon: "🌳", label: "Skill Tree", path: "/skill-tree" },
  { icon: "🛠", label: "Tech Stack", path: "/tech-stack" },
  { icon: "🛒", label: "Marketplace", path: null },
  { icon: "🎓", label: "Workshop", path: "/workshop" },
].map(({ icon, label, path }) => {
  const isActive = path && location.pathname === path;

  return (
    <button
      key={label}
      onClick={() => path && navigate(path)}
      className={`
        w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl
        text-sm font-medium transition-all
        ${
          isActive
            ? "bg-[#EDE9FE] text-[#5B21B6]"
            : "text-gray-500 hover:bg-[#EDE9FE] hover:text-[#5B21B6]"
        }
      `}
    >
      <span className="text-base">{icon}</span>
      {label}
    </button>
  );
})}
          </nav>

          {/* Sidebar bottom decoration */}
          <div className="mt-6 rounded-2xl p-4 relative overflow-hidden" style={{ background: "#F5F3FF" }}>
            <svg className="absolute right-0 bottom-0 opacity-30" width="80" height="80" viewBox="0 0 80 80">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#7C3AED" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="35" fill="none" stroke="#7C3AED" strokeWidth="1" />
            </svg>
            <p className="text-xs font-semibold text-purple-700 mb-1">Tips Hari Ini</p>
            <p className="text-xs text-purple-500 leading-relaxed">Kerjakan 1 modul sehari untuk naik level lebih cepat! 🚀</p>
          </div>
        </div>

        {/* MAIN */}
        <div className="flex flex-1 justify-center gap-6 px-3 md:px-0 py-4 md:py-0">

          {/* CENTER */}
          <div className="w-full max-w-[900px] p-0 md:p-6 space-y-5 md:space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
    type="text"
    placeholder="Cari modul..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="bg-white pl-10 pr-4 py-3 rounded-xl text-sm w-full md:w-64 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200"
/>
{
filteredItems.length>0&&(

<div className="absolute left-0 top-14 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">

{filteredItems.map((item,index)=>(

<button

key={index}

onClick={()=>{
navigate(item.path);
setSearch("");
}}

className="w-full text-left px-4 py-3 hover:bg-purple-50 transition"

>

<p className="font-medium">

{item.title}

</p>

<span
  className={`inline-block mt-1 text-[11px] px-2 py-1 rounded-full ${
    item.category === "Tech Stack"
      ? "bg-purple-100 text-purple-700"
      : item.category === "Workshop"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700"
  }`}
>
  {item.category}
</span>
</button>

))}

</div>

)
}
              </div>
              <p className="text-xs text-gray-500 md:text-right">{currentDate}</p>
            </div>

            {/* HERO — diganti dengan desain berbasis ilustrasi SVG */}
            <div
              className="relative rounded-[28px] overflow-hidden"
              style={{ background: "#2D1B69", minHeight: 200 }}
            >
              {/* Pola bintang/dot dekoratif */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 220">
                {/* Grid dot pattern kiri */}
                {[0,1,2,3,4,5].map(row =>
                  [0,1,2,3,4,5].map(col => (
                    <circle key={`d-${row}-${col}`}
                      cx={col * 40 + 20} cy={row * 40 + 10}
                      r="1.5" fill="white" opacity="0.12"
                    />
                  ))
                )}
                {/* Lingkaran dekoratif besar kanan */}
                <circle cx="680" cy="110" r="150" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1" />
                <circle cx="680" cy="110" r="110" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1" />
                <circle cx="680" cy="110" r="70" fill="none" stroke="white" strokeWidth="0.8" opacity="0.12" />
                {/* Planet/bola dekoratif */}
                <circle cx="700" cy="80" r="40" fill="#3D2380" opacity="0.8" />
                <ellipse cx="700" cy="80" rx="55" ry="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.25" transform="rotate(-20 700 80)" />
                {/* Bintang kecil */}
                {[[120,40],[200,20],[350,30],[500,15],[580,50],[100,160],[300,170],[450,190],[620,175],[750,130]].map(([x,y],i) => (
                  <g key={i} transform={`translate(${x},${y})`}>
                    <circle r="1.5" fill="white" opacity="0.6" />
                  </g>
                ))}
                {/* Ilustrasi buku & pensil */}
                <g transform="translate(590, 120)" opacity="0.18">
                  <rect x="0" y="0" width="50" height="65" rx="4" fill="white" />
                  <rect x="5" y="8" width="35" height="3" rx="1.5" fill="#2D1B69" />
                  <rect x="5" y="16" width="30" height="3" rx="1.5" fill="#2D1B69" />
                  <rect x="5" y="24" width="25" height="3" rx="1.5" fill="#2D1B69" />
                  <rect x="5" y="32" width="32" height="3" rx="1.5" fill="#2D1B69" />
                </g>
                <g transform="translate(650, 130)" opacity="0.15">
                  <rect x="0" y="0" width="8" height="55" rx="3" fill="white" transform="rotate(-20 4 27)" />
                  <polygon points="0,-4 8,-4 4,4" fill="#F59E0B" transform="translate(0,0) rotate(-20 4 27)" />
                </g>
                {/* Mortarboard / toga */}
                <g transform="translate(500, 145)" opacity="0.2">
                  <ellipse cx="18" cy="10" rx="22" ry="6" fill="white" />
                  <rect x="8" y="0" width="20" height="12" rx="2" fill="white" />
                  <rect x="16" y="-5" width="4" height="8" rx="1" fill="white" />
                  <circle cx="18" cy="-5" r="3" fill="white" />
                  <line x1="30" y1="6" x2="36" y2="18" stroke="white" strokeWidth="2" />
                  <circle cx="36" cy="20" r="3" fill="white" />
                </g>
              </svg>

              {/* Konten hero */}
              <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-2 p-3 md:p-4">
                <div>
                  <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-2">Selamat datang kembali</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                    Halo, {userData?.name || user?.email?.split("@")[0]} 👋
                    </h2>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                    Yuk lanjut belajar dan naik level hari ini!
                  </p>
                  <button
  onClick={() => navigate("/workshop")}
  className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
  style={{ background: "#fff", color: "#5B21B6" }}
>
  Lanjut Belajar →
</button>
                </div>

                {/* XP cards */}
                <div className="grid grid-cols-2 gap-3 md:flex md:flex-col md:min-w-[160px]">
                  <div className="rounded-2xl p-4 text-center border border-white/20" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                    <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>XP Kamu</p>
                    <h3 className="text-2xl font-bold text-white">{xp}</h3>
                  </div>
                  <div className="rounded-2xl p-4 text-center border border-white/20" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                    <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>🔥 Level</p>
                    <h3 className="text-sm font-bold text-white">{levelData.name} ({xp} XP)</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Total XP */}
              <div className="bg-white p-2 rounded-xl border border-purple-100 relative overflow-hidden">
                <svg className="absolute right-2 top-2 opacity-10" width="40" height="40" viewBox="0 0 60 60">
                  <text x="5" y="50" fontSize="48" fill="#EC4899">★</text>
                </svg>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: "#FDF2F8" }}>
                  <span className="text-sm">⭐</span>
                </div>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Total XP</p>
                <h3 className="text-2xl font-bold mt-0.5" style={{ color: "#EC4899" }}>{xp}</h3>
              </div>

              {/* Level */}
              <div className="bg-white p-2 rounded-xl border border-purple-100 relative overflow-hidden">
                <svg className="absolute right-2 top-2 opacity-10" width="40" height="40" viewBox="0 0 60 60">
                  <text x="4" y="50" fontSize="44" fill="#7C3AED">🏅</text>
                </svg>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: "#EDE9FE" }}>
                  <span className="text-sm">🏅</span>
                </div>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Level</p>
                <h3 className="text-base font-bold mt-0.5" style={{ color: "#7C3AED" }}>{levelData.name} ({xp} XP)</h3>
              </div>

              {/* Badge */}
              <div className="bg-white p-2 rounded-xl border border-purple-100 relative overflow-hidden">
                <svg className="absolute right-2 top-2 opacity-10" width="40" height="40" viewBox="0 0 60 60">
                  <text x="4" y="50" fontSize="44" fill="#5B21B6">🎖</text>
                </svg>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: "#EDE9FE" }}>
                  <span className="text-sm">🎖</span>
                </div>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Badge</p>
                {latestBadge ? (
                  <h3 className="text-base font-bold mt-0.5" style={{ color: "#5B21B6" }}>{latestBadge}</h3>
                ) : (
                  <h3 className="text-base font-bold text-gray-300 mt-0.5">🔒 Badge pertama terbuka di 500 XPBelum ada badge</h3>
                )}
              </div>
            </div>

            {/* PROGRESS */}
            <div className="bg-white p-2 rounded-2xl border border-purple-100">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <p className="font-semibold text-sm md:text-base text-gray-800">Progress Belajar</p>
                  <p className="text-xs text-gray-400 mt-0.5">
   {levelData.name}
</p>
                </div>
                <span className="font-bold text-lg" style={{ color: "#7C3AED" }}>{progress}%</span>
              </div>

              <div className="w-full h-3 rounded-full mt-4 overflow-hidden" style={{ background: "#F3E8FF" }}>
                <div
                  className="h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background: "#7C3AED"
                  }}
                />
              </div>

              {/* Milestone markers */}
              <div className="flex justify-between mt-2">
                {[0, 25, 50, 75, 100].map(m => (
                  <span key={m} className="text-[10px] text-gray-300">{m}%</span>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-1">
  {xp - levelData.currentXP} / {levelData.nextXP - levelData.currentXP} XP
</p>
            </div>

            {/* MOBILE AKTIVITAS */}
            <div className="md:hidden bg-white p-5 rounded-2xl border border-purple-100">
              <h3 className="font-semibold mb-3">Aktivitas Terkini</h3>
              <div className="space-y-2 text-sm">
  {displayActivities.slice(0,3).map((item,index)=>(
  <div
    key={index}
    className="flex items-start gap-2 py-2 border-b border-purple-50 last:border-0"
  >
    <span
      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
      style={{ background:"#7C3AED"}}
    />

    <p>
   {typeof item === "string"
      ? item
      : item.text}
</p>

  </div>
))}
              </div>
            </div>

            {/* MOBILE PROFILE */}
            <div className="md:hidden bg-white p-5 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-purple-600">
  {userData?.photoURL ? (
    <img
      src={userData.photoURL}
      alt="Foto Profil"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-white text-lg font-bold">
      {(userData?.name || user?.email)?.charAt(0).toUpperCase()}
    </div>
  )}
</div>
                <div>
                  <h3 className="font-semibold">{userData?.name || user?.email?.split("@")[0]}</h3>
                  <p className="text-xs text-gray-400 break-all">{user?.email}</p>
                </div>
              </div>
              <div className="mt-5 space-y-2">
  <button
    onClick={() => navigate("/edit-profile")}
    className="w-full border border-purple-600 text-purple-600 py-2.5 rounded-xl text-sm hover:bg-purple-50 transition"
  >
    Edit Profil
  </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-white py-2.5 rounded-xl text-sm"
                  style={{ background: "#5B21B6" }}
                >
                  Logout
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL DESKTOP */}
          <div
            className="hidden md:flex w-[260px] shrink-0 flex-col border-l border-purple-50 px-5 py-5 self-start mt-6 rounded-2xl"
            style={{ background: "#fff", height: "calc(100vh - 48px)" }}
          >
            {/* Avatar */}
            <div className="text-center">
              <div className="relative mx-auto w-fit">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-purple-600">
  {userData?.photoURL ? (
    <img
      src={userData.photoURL}
      alt="Foto Profil"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
      {(userData?.name || user?.email)?.charAt(0).toUpperCase()}
    </div>
  )}
</div>
                {/* Online dot */}
                <span
                  className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
                  style={{ background: "#10B981" }}
                />
              </div>
              <h3 className="mt-3 font-semibold text-gray-800">{userData?.name || user?.email?.split("@")[0]}</h3>
              <p className="text-[11px] text-gray-400 mt-0.5 break-all">{user?.email}</p>
              <div
                className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "#EDE9FE", color: "#5B21B6" }}
              >
                {levelData.name}
              </div>
            </div>

            <hr className="my-4 border-purple-50" />

            {/* Aktivitas */}
            <div className="flex-1">
              <h3 className="font-semibold mb-3 text-sm text-gray-800">Aktivitas Terkini</h3>
              <div className="space-y-2 text-sm">
                {displayActivities.slice(0,3).map((item, index) => (
                  <div key={index} className="flex items-start gap-2 py-2 border-b border-purple-50 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#7C3AED" }} />
                    <p>
   {typeof item === "string"
      ? item
      : item.text}
</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-auto space-y-2 pt-5">
              <button
              onClick={() => navigate("/edit-profile")}
                className="w-full border py-2.5 rounded-xl text-sm font-medium transition hover:opacity-80"
                style={{ borderColor: "#7C3AED", color: "#7C3AED" }}
              >
                Edit Profil
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-white py-2.5 rounded-xl text-sm font-medium transition hover:opacity-90"
                style={{ background: "#5B21B6" }}
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