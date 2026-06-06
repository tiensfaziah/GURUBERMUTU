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

  // DATE REALTIME
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

  // FIREBASE REALTIME
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

  // DATA
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

  const latestBadge =
    userData?.badges && userData.badges.length > 0
      ? userData.badges[userData.badges.length - 1]
      : null;

  return (
    <div className="min-h-screen bg-[#F8F5FF]">

      {/* MOBILE NAVBAR */}
      <div className="md:hidden sticky top-0 z-50 flex justify-between items-center px-4 py-4 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EEE8FF]">

        <h1 className="font-bold text-[#5B21B6] text-lg">
          Gurubermutu
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#5B21B6] text-2xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          ease-in-out

          ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="bg-white px-4 pb-5 pt-2 space-y-2 shadow-md border-b border-[#EEE8FF]">

          <button
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
            className="block w-full text-left text-gray-700 font-medium py-3"
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => {
              navigate("/skill-tree");
              setMenuOpen(false);
            }}
            className="block w-full text-left text-gray-700 font-medium py-3"
          >
            🌳 Skill Tree
          </button>

          <button
  onClick={() => {
    navigate("/tech-stack");
    setMenuOpen(false);
  }}
  className="block w-full text-left text-gray-700 font-medium py-3"
>
  🛠 Tech Stack
</button>

          <button
            className="block w-full text-left text-gray-700 font-medium py-3"
          >
            🛒 Marketplace
          </button>

          <button
            onClick={() => {
              navigate("/workshop");
              setMenuOpen(false);
            }}
            className="block w-full text-left text-gray-700 font-medium py-3"
          >
            🎓 Workshop
          </button>

          <button
            className="block w-full text-left text-gray-700 font-medium py-3"
          >
            👤 Edit Profil
          </button>

          <hr className="my-2 border-[#EEE8FF]" />

          <button
            onClick={handleLogout}
            className="
              w-full
              bg-gradient-to-r
              from-[#5B21B6]
              to-[#7C3AED]
              text-white
              py-3
              rounded-xl
              text-sm
              font-medium
              mt-2
            "
          >
            Logout
          </button>

        </div>
      </div>

      <div className="flex gap-6">

        {/* DESKTOP SIDEBAR */}
        <div
          className="
            hidden
            md:flex

            w-64

            bg-white

            p-6

            shadow-sm

            flex-col

            border-r
            border-[#F1EAFE]
          "
        >

          <h1 className="text-xl font-bold text-[#5B21B6] mb-8">
            Gurubermutu
          </h1>

          <div className="space-y-4 text-gray-600">

            <p
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer hover:text-[#7C3AED] transition"
            >
              🏠 Dashboard
            </p>

            <p
              onClick={() => navigate("/skill-tree")}
              className="cursor-pointer hover:text-[#7C3AED] transition"
            >
              🌳 Skill Tree
            </p>

            <p
  onClick={() => navigate("/tech-stack")}
  className="cursor-pointer hover:text-[#7C3AED] transition"
>
  🛠 Tech Stack
</p>

            <p className="cursor-pointer hover:text-[#7C3AED] transition">
              🛒 Marketplace
            </p>

            <p
              onClick={() => navigate("/workshop")}
              className="cursor-pointer hover:text-[#7C3AED] transition"
            >
              🎓 Workshop
            </p>

          </div>

        </div>

        {/* MAIN */}
        <div className="flex flex-1 justify-center gap-6 px-3 md:px-0 py-4 md:py-0">

          {/* CENTER */}
          <div
            className="
              w-full
              max-w-[900px]

              p-0
              md:p-6

              space-y-5
              md:space-y-6
            "
          >

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

              <input
                type="text"
                placeholder="Cari modul..."
                className="
                  bg-white
                  px-4
                  py-3
                  rounded-xl
                  shadow-sm
                  text-sm
                  w-full
                  md:w-64
                  border
                  border-[#EEE8FF]
                  focus:outline-none
                "
              />

              <p className="text-xs text-gray-500 md:text-right">
                {currentDate}
              </p>

            </div>

            {/* HERO */}
            <div
              className="
                bg-gradient-to-r
                from-[#5B21B6]
                via-[#7C3AED]
                to-[#EC4899]

                text-white

                p-5
                md:p-6

                rounded-[28px]

                flex
                flex-col
                md:flex-row

                gap-5

                md:justify-between
                md:items-center

                shadow-lg
              "
            >

              <div>

                <h2 className="text-xl md:text-2xl font-bold leading-snug">
                  Halo, {user?.email?.split("@")[0]} 👋
                </h2>

                <p className="text-sm mt-2 text-white/90 leading-relaxed">
                  Yuk lanjut belajar dan naik level hari ini!
                </p>

                <button
                  className="
                    mt-4
                    bg-white
                    text-[#7C3AED]
                    px-5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    transition
                  "
                >
                  Lanjut Belajar →
                </button>

              </div>

              {/* XP */}
              <div className="grid grid-cols-2 gap-3 md:flex md:flex-col">

                <div
                  className="
                    bg-white/15
                    backdrop-blur-md
                    p-3
                    rounded-xl
                    text-center
                  "
                >
                  <p className="text-xs text-white/80">
                    XP Kamu
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold">
                    {xp}
                  </h3>
                </div>

                <div
                  className="
                    bg-white/15
                    backdrop-blur-md
                    p-3
                    rounded-xl
                    text-center
                  "
                >
                  <p className="text-xs text-white/80">
                    🔥 Level
                  </p>

                  <h3 className="text-sm md:text-lg font-bold">
                    {getLevelName(xp)}
                  </h3>
                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EEE8FF] border-t-4 border-t-[#EC4899]">
                <p className="text-gray-500 text-sm">
                  TOTAL XP
                </p>

                <h3 className="text-3xl font-bold text-[#EC4899] mt-1">
                  {xp}
                </h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EEE8FF] border-t-4 border-t-[#7C3AED]">
                <p className="text-gray-500 text-sm">
                  LEVEL
                </p>

                <h3 className="text-lg font-bold text-[#7C3AED] mt-1">
                  {getLevelName(xp)}
                </h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EEE8FF] border-t-4 border-t-[#5B21B6]">
                <p className="text-gray-500 text-sm">
                  BADGE
                </p>

                {latestBadge ? (
                  <h3 className="text-lg font-bold mt-2 text-[#5B21B6]">
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
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EEE8FF]">

              <div className="flex justify-between items-center">

                <p className="font-semibold text-sm md:text-base">
                  Progress — {getLevelName(xp)}
                </p>

                <span className="text-[#EC4899] font-bold text-sm">
                  {progress}%
                </span>

              </div>

              <div className="w-full bg-[#F3E8FF] h-2 rounded mt-3 overflow-hidden">

                <div
                  className="
                    bg-gradient-to-r
                    from-[#7C3AED]
                    to-[#EC4899]
                    h-2
                    rounded
                  "
                  style={{ width: `${progress}%` }}
                ></div>

              </div>

              <p className="text-xs text-gray-400 mt-2">
                {completed} dari 10 modul selesai
              </p>

            </div>

            {/* MOBILE AKTIVITAS */}
            <div className="md:hidden bg-white p-5 rounded-2xl shadow-sm border border-[#EEE8FF]">

              <h3 className="font-semibold mb-3">
                Aktivitas Terkini
              </h3>

              <div className="space-y-3 text-sm">

                {userData?.aktivitas
                  ?.slice(0, 3)
                  .map((item, index) => (
                    <p
                      key={index}
                      className="leading-relaxed text-gray-700"
                    >
                      {item}
                    </p>
                  ))}

              </div>

            </div>

            {/* MOBILE PROFILE */}
            <div className="md:hidden bg-white p-5 rounded-2xl shadow-sm border border-[#EEE8FF]">

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    bg-gradient-to-br
                    from-[#5B21B6]
                    to-[#EC4899]
                    text-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-lg
                    font-bold
                  "
                >
                  {user?.email?.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {user?.email?.split("@")[0]}
                  </h3>

                  <p className="text-xs text-gray-400 break-all">
                    {user?.email}
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-2">

                <button
                  className="
                    w-full
                    border
                    border-[#7C3AED]
                    text-[#7C3AED]
                    py-2.5
                    rounded-xl
                    text-sm
                  "
                >
                  Edit Profil
                </button>

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    bg-gradient-to-r
                    from-[#5B21B6]
                    to-[#7C3AED]
                    text-white
                    py-2.5
                    rounded-xl
                    text-sm
                  "
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL DESKTOP */}
          <div
            className="
              hidden
              md:flex

              w-[260px]
              shrink-0

              bg-white

              px-5
              py-5

              shadow-sm

              flex-col

              border-l
              border-[#F1EAFE]

              rounded-2xl

              self-start

              mt-6

              h-[calc(100vh-48px)]
            "
          >

            <div className="text-center">

              <div
                className="
                  w-14
                  h-14

                  mx-auto

                  bg-gradient-to-br
                  from-[#5B21B6]
                  to-[#EC4899]

                  text-white

                  rounded-full

                  flex
                  items-center
                  justify-center

                  text-lg
                  font-bold
                "
              >
                {user?.email?.charAt(0).toUpperCase()}
              </div>

              <h3 className="mt-3 font-semibold">
                {user?.email?.split("@")[0]}
              </h3>

              <p className="text-[11px] text-gray-400 mt-1 break-all">
                {user?.email}
              </p>

              <div className="mt-3 inline-block px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-xs font-semibold">
                {getLevelName(xp)}
              </div>

            </div>

            <hr className="my-4 border-[#F1EAFE]" />

            {/* AKTIVITAS */}
            <div>

              <h3 className="font-semibold mb-3 text-base">
                Aktivitas Terkini
              </h3>

              <div className="space-y-3 text-sm">

                {userData?.aktivitas
                  ?.slice(0, 3)
                  .map((item, index) => (
                    <p
                      key={index}
                      className="leading-relaxed text-gray-700"
                    >
                      {item}
                    </p>
                  ))}

              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-auto space-y-2 pt-5">

              <button
                className="
                  w-full
                  border
                  border-[#7C3AED]
                  text-[#7C3AED]
                  py-2.5
                  rounded-xl
                  text-sm
                  hover:bg-[#7C3AED]
                  hover:text-white
                  transition
                "
              >
                Edit Profil
              </button>

              <button
                onClick={handleLogout}
                className="
                  w-full
                  bg-gradient-to-r
                  from-[#5B21B6]
                  to-[#7C3AED]
                  text-white
                  py-2.5
                  rounded-xl
                  text-sm
                  hover:opacity-90
                  transition
                "
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