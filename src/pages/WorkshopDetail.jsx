import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//FIREBASE
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

//LEVEL & BADGE
import { getLevel } from "../utils/level";
import { getBadges } from "../utils/badge";

const workshops = [
  {
    id: 1,
    title: "Canva untuk Guru Pemula",
    desc: "Belajar membuat materi visual menarik menggunakan Canva, mulai dari poster kelas hingga media ajar interaktif.",
    duration: "30 menit",
    xp: 100,
    mode: "Offline",
    location: "Aula SMP Negeri 2, Yogyakarta",
    date: "20 Mei 2026 · 09.00 WIB",
    organizer: "Komunitas Guru Kreatif",
    organizerFollowers: "1.240 pengikut",
    registrationUrl: "https://www.eventbrite.com/e/canva-untuk-guru-pemula",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    ],
    friendsGoing: ["Bu Sari", "Pak Andi", "Bu Wulan"],
  },
  {
    id: 4,
    title: "Google Classroom",
    desc: "Belajar menggunakan Google Classroom untuk mengajar, dari membuat kelas hingga mengelola tugas siswa.",
    duration: "40 menit",
    xp: 100,
    mode: "Online",
    location: "Tautan Zoom dikirim via email",
    date: "22 Mei 2026 · 13.00 WIB",
    organizer: "GuruBermutu Academy",
    organizerFollowers: "3.580 pengikut",
    registrationUrl: "https://www.eventbrite.com/e/google-classroom-workshop",
    images: ["https://images.unsplash.com/photo-1509062522246-3755977927d7"],
    friendsGoing: [],
  },
  {
    id: 2,
    title: "Quizizz Interaktif",
    desc: "Membuat kuis interaktif untuk siswa, lengkap dengan analisis hasil belajar secara real-time.",
    duration: "45 menit",
    xp: 120,
    mode: "Offline",
    location: "Yogyakarta",
    date: "28 Mei 2026 · 10.00 WIB",
    organizer: "Komunitas Guru Kreatif",
    organizerFollowers: "1.240 pengikut",
    registrationUrl: "https://www.eventbrite.com/e/quizizz-interaktif",
    images: ["https://images.unsplash.com/photo-1509062522246-3755977927d7"],
    friendsGoing: ["Bu Sari"],
  },
  {
    id: 3,
    title: "Mentimeter Interaktif",
    desc: "Membuat presentasi interaktif dengan Mentimeter untuk meningkatkan partisipasi siswa di kelas.",
    duration: "60 menit",
    xp: 150,
    mode: "Online",
    location: "Tautan dikirim via email",
    date: "30 Mei 2026 · 15.00 WIB",
    organizer: "GuruBermutu Academy",
    organizerFollowers: "3.580 pengikut",
    registrationUrl: "https://www.eventbrite.com/e/mentimeter-interaktif",
    images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3"],
    friendsGoing: [],
  },
];

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const workshop = workshops.find((w) => w.id === parseInt(id));
  if (!workshop) return <p>Workshop tidak ditemukan</p>;

  const handleRegisterRedirect = () => {
    setHasRegistered(true);
    window.open(workshop.registrationUrl, "_blank", "noopener,noreferrer");
  };

  const handleComplete = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("User belum login!");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      const mapping = {
        1: "0-0",
        4: "0-1",
        2: "0-2",
        3: "1-1",
      };

      const key = mapping[workshop.id];
      if (!key) return;

      if (!docSnap.exists()) {
        const levelData = getLevel(workshop.xp);
        const badges = getBadges(workshop.xp, 1);

        await setDoc(userRef, {
          xp: workshop.xp,
          level: levelData.level,
          levelName: levelData.name,
          completedModules: 1,
          badges: badges,
          completedNodes: {
            [key]: true,
          },
          aktivitas: [`Selesai: ${workshop.title}`],
        });
      } else {
        const data = docSnap.data();

        const newXP = (data.xp || 0) + workshop.xp;
        const newCompleted = (data.completedModules || 0) + 1;

        const levelData = getLevel(newXP);
        const newBadges = getBadges(newXP, newCompleted);

        await updateDoc(userRef, {
          xp: newXP,
          level: levelData.level,
          levelName: levelData.name,
          completedModules: newCompleted,
          badges: newBadges,
          [`completedNodes.${key}`]: true,
          aktivitas: [
            ...(data.aktivitas || []),
            `Selesai: ${workshop.title}`,
          ],
        });
      }

      setCompleted(true);
      alert("🎉 XP + Badge berhasil ditambahkan!");
    } catch (error) {
      console.error("ERROR:", error);
      alert("Gagal update Firebase");
    }
  };

  return (
    <div className="min-h-screen pb-16" style={{ background: "#F5F3FF" }}>
      {/* HERO — senada dashboard & halaman workshop */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-4 md:pt-6">
        <div
          className="relative rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_20px_45px_-15px_rgba(45,27,105,0.45)]"
          style={{ background: "linear-gradient(155deg, #2D1B69 0%, #3D2380 65%, #4C2A99 100%)", minHeight: 240 }}
        >
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 240">
            {[0, 1, 2, 3, 4].map((row) =>
              [0, 1, 2, 3, 4, 5, 6].map((col) => (
                <circle key={`d-${row}-${col}`} cx={col * 40 + 20} cy={row * 40 + 10} r="1.5" fill="white" opacity="0.12" />
              ))
            )}
            <circle cx="700" cy="110" r="140" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1" />
            <circle cx="700" cy="110" r="100" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1" />
            <circle cx="720" cy="80" r="36" fill="#3D2380" opacity="0.8" />
            {[[110, 35], [220, 20], [330, 30], [470, 15], [560, 45], [120, 170], [330, 185], [470, 200]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.6" />
            ))}
          </svg>

          <button
  onClick={() => navigate("/workshop")}
  className="absolute top-4 left-4 md:top-6 md:left-6 z-20 p-2 text-white hover:text-gray-200 hover:-translate-x-1 transition-all duration-200"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>

          <button
            onClick={() => setIsSaved((s) => !s)}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              style={isSaved ? { fill: "#EC4899", color: "#EC4899" } : { fill: "none", color: "#5B21B6" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-8.318a4.5 4.5 0 010-6.364z" />
            </svg>
          </button>

          <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-10 pt-16 pb-8">
            <span
              className="inline-flex items-center gap-1.5 w-fit text-[10.5px] font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur"
              style={{ background: "rgba(255,255,255,0.14)", color: "#E9D5FF" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: workshop.mode === "Online" ? "#34D399" : "#FBBF24" }} />
              {workshop.mode === "Online" ? "Workshop Online" : "Workshop Tatap Muka"}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2.5 leading-snug tracking-tight">{workshop.title}</h1>
            <p className="text-white/70 text-xs md:text-sm flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {workshop.date}
              <span className="text-white/30">·</span>
              {workshop.duration}
            </p>
          </div>
        </div>

        {workshop.images.length > 1 && (
  <div className="flex gap-2.5 mt-3.5">
    {workshop.images.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`${workshop.title} ${i + 1}`}
        className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-xl border border-white opacity-85 hover:opacity-100 hover:scale-105 shadow-sm transition-all duration-200"
      />
    ))}
  </div>
)}

</div> 

      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* LEFT: content */}
        <div className="md:col-span-2 space-y-5 md:space-y-6">
          {/* organizer */}
          <div className="flex items-center justify-between bg-white border border-purple-100 rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(91,33,182,0.08)]">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: "linear-gradient(135deg, #EDE9FE, #DDD6FE)", color: "#5B21B6" }}
              >
                {workshop.organizer.charAt(0)}
              </div>
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#A78BFA" }}>
                  Penyelenggara
                </p>
                <p className="text-sm font-semibold text-gray-800 leading-tight">{workshop.organizer}</p>
                <p className="text-xs text-gray-400">{workshop.organizerFollowers}</p>
              </div>
            </div>
            <button
              onClick={() => setIsFollowing((f) => !f)}
              className="text-sm font-medium px-4 py-2 rounded-xl transition active:scale-95"
              style={isFollowing ? { background: "#EDE9FE", color: "#5B21B6" } : { background: "#5B21B6", color: "#fff" }}
            >
              {isFollowing ? "Mengikuti" : "Ikuti"}
            </button>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-wide mb-2.5" style={{ color: "#A78BFA" }}>
              Tentang workshop ini
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{workshop.desc}</p>
          </div>

          {/* access info */}
          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(91,33,182,0.08)]">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide mb-3" style={{ color: "#A78BFA" }}>
              Info akses
            </h2>
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "#EDE9FE" }}
              >
                <span className="text-sm">{workshop.mode === "Online" ? "🔗" : "📍"}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 leading-snug">{workshop.location}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {workshop.mode === "Online"
                    ? "Tautan meeting akan dikirim ke email menjelang acara oleh penyelenggara."
                    : "Tunjukkan e-tiket atau kode QR dari penyelenggara saat check-in di lokasi."}
                </p>
              </div>
            </div>
          </div>

          {/* social proof */}
          {workshop.friendsGoing.length > 0 && (
            <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(91,33,182,0.08)]">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide mb-3" style={{ color: "#A78BFA" }}>
                Rekan guru yang akan hadir
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {workshop.friendsGoing.map((f, i) => (
                    <div
                      key={i}
                      title={f}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold shadow-sm"
                      style={{ background: "#FDF2F8", color: "#EC4899" }}
                    >
                      {f.charAt(0)}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{workshop.friendsGoing.join(", ")} sudah mendaftar</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: sticky action card */}
        <div className="md:col-span-1">
          <div className="bg-white border border-purple-100 rounded-2xl p-5 md:sticky md:top-6 shadow-[0_8px_30px_-8px_rgba(91,33,182,0.15)] space-y-4">
            <div>
              <button
                onClick={handleRegisterRedirect}
                className="w-full py-3 rounded-xl font-medium text-white transition hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 shadow-md flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #6D28D9, #5B21B6)" }}
              >
                Daftar
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              <p className="text-[11px] text-gray-400 mt-1.5 text-center leading-relaxed">
                Pendaftaran dilakukan di situs penyelenggara, bukan di GuruBermutu.
              </p>
            </div>

            <div className="border-t border-purple-50 pt-4">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#A78BFA" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-xs text-gray-400">Reward menyelesaikan di GuruBermutu</p>
              </div>
              <p className="text-2xl font-bold mb-3.5" style={{ color: "#EC4899" }}>+{workshop.xp} XP</p>

              <button
                onClick={handleComplete}
                disabled={completed}
                title={!hasRegistered ? "Sebaiknya daftar dulu di penyelenggara sebelum menandai selesai" : ""}
                className="w-full py-3 rounded-xl font-medium transition active:scale-[0.98]"
                style={
                  completed
                    ? { background: "#EDE9FE", color: "#9CA3AF" }
                    : { background: "linear-gradient(135deg, #F472B6, #EC4899)", color: "#fff", boxShadow: "0 6px 18px -6px rgba(236,72,153,0.55)" }
                }
              >
                {completed ? "✅ Sudah Diselesaikan" : "Tandai Selesai"}
              </button>
              <p className="text-[11px] text-gray-400 mt-1.5 text-center leading-relaxed">
                Tandai setelah kamu benar-benar mengikuti seluruh sesi workshop.
              </p>
            </div>

            <button
              onClick={() =>
                navigator.share
                  ? navigator.share({ title: workshop.title, text: workshop.desc })
                  : alert("Tautan workshop disalin!")
              }
              className="w-full py-3 rounded-xl font-medium border transition hover:bg-purple-50 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ borderColor: "#EDE9FE", color: "#5B21B6" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342a3 3 0 100-2.684m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 8.658a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Bagikan Workshop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetail;