import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import games from "../data/games";

const dailyTips = [
  "Konsisten 15 menit tiap hari lebih efektif daripada belajar maraton sekali seminggu.",
  "Coba praktikkan satu materi baru langsung ke kelasmu besok — belajar sambil praktik lebih nempel.",
  "Selesaikan node yang paling kamu hindari duluan, biar makin ringan ke depannya.",
  "Ajak rekan guru lain buat saling cek progress — belajar bareng lebih semangat.",
  "Catat satu insight baru setiap selesai node, biar gampang direview lagi nanti.",
  "Istirahat sejenak tiap 2 node biar materi lebih nempel di ingatan.",
  "Rayakan progress kecil — tiap node selesai artinya kamu makin dekat ke level berikutnya.",
];

const skillTreeData = [
  {
    level: 0,
    title: "Level 1 • Beginner",
    color: "#7C3AED",
    bg: "#EDE9FE",
    nodes: games.slice(0, 4).map((game) => ({
      key: `game-${game.id}`,
      title: game.title,
      slug: game.slug,
      xp: 100,
    })),
  },

  {
    level: 1,
    title: "Level 2 • Intermediate",
    color: "#EC4899",
    bg: "#FCE7F3",
    nodes: games.slice(4, 8).map((game) => ({
      key: `game-${game.id}`,
      title: game.title,
      slug: game.slug,
      xp: 150,
    })),
  },

  {
    level: 2,
    title: "Level 3 • Advanced",
    color: "#F59E0B",
    bg: "#FEF3C7",
    nodes: games.slice(8, 12).map((game) => ({
      key: `game-${game.id}`,
      title: game.title,
      slug: game.slug,
      xp: 200,
    })),
  },
];
const flatNodes = skillTreeData.flatMap((lvl) =>
  lvl.nodes.map((n) => ({ ...n, level: lvl.level, color: lvl.color, bg: lvl.bg }))
);

function NodeCard({ node, status, onClick }) {
  // status: "completed" | "unlocked" | "locked"
  const isCompleted = status === "completed";
  const isLocked = status === "locked";

  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={`relative rounded-xl md:rounded-2xl p-3 md:p-4 border transition-all cursor-pointer ${
        isLocked
          ? "opacity-50 grayscale cursor-not-allowed"
          : "active:scale-[0.98] hover:-translate-y-1 hover:shadow-md"
      }`}
      style={{
        background: isCompleted ? node.bg : "#fff",
        borderColor: isCompleted ? node.color : "#E5E7EB",
      }}
    >
      <div className="flex items-center justify-between mb-2 gap-2">
        <span
          className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-base md:text-lg shrink-0"
          style={{ background: isCompleted ? node.color : "#F3F4F6" }}
        >
          {isCompleted ? "✅" : isLocked ? "🔒" : "🎯"}
        </span>
        <span
          className="text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
          style={{ background: "#FEF3C7", color: "#B45309" }}
        >
          +{node.xp} XP
        </span>
      </div>
      <p className="font-semibold text-xs md:text-sm text-gray-800 leading-snug line-clamp-2">
        {node.title}
      </p>
      <p className="text-[10px] md:text-[11px] text-gray-400 mt-1">
        {isCompleted ? "Selesai" : isLocked ? "Terkunci" : "Bisa dikerjakan"}
      </p>
    </div>
  );
}

const SkillTree = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUid, setCurrentUid] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) {
        setLoading(false);
        return;
      }
      setCurrentUid(u.uid);
      const userRef = doc(db, "users", u.uid);
      const unsubUser = onSnapshot(userRef, (snap) => {
        setUserData(snap.exists() ? snap.data() : {});
        setLoading(false);
      });
      return () => unsubUser();
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(10));
    const unsub = onSnapshot(q, (snap) => {
      setLeaderboard(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const completedNodes = userData?.completedNodes || {};
  const xp = userData?.xp || 0;
  const levelName = userData?.levelName || "Guru Pemula";
  const badges = userData?.badges || [];

  const completedCount = flatNodes.filter((n) => completedNodes[n.key]).length;
  const progressPct = Math.round((completedCount / flatNodes.length) * 100);

  // node pertama yang belum selesai = unlocked, sisanya di belakang locked
  let unlockedIndex = flatNodes.findIndex((n) => !completedNodes[n.key]);
  if (unlockedIndex === -1) unlockedIndex = flatNodes.length;

  const getStatus = (idx) => {
    if (completedNodes[flatNodes[idx].key]) return "completed";
    if (idx === unlockedIndex) return "unlocked";
    return "locked";
  };

  const nextNode = flatNodes[unlockedIndex] || null;
  const remainingNodes = flatNodes.length - completedCount;
  const todayTip = dailyTips[new Date().getDate() % dailyTips.length];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F5F3FF] px-4">
        <p className="text-purple-700 font-semibold text-sm md:text-base text-center">
          Memuat Skill Tree...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 md:pb-16" style={{ background: "#F5F3FF" }}>
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pt-3 md:pt-8">
        <div
          className="relative rounded-2xl md:rounded-[28px] overflow-hidden p-4 sm:p-6 md:p-10"
          style={{ background: "linear-gradient(135deg, #2D1B69 0%, #4C2A99 100%)" }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute top-3 left-3 md:top-6 md:left-6 text-white hover:text-gray-200 transition p-1.5 -m-1.5 z-20"
            aria-label="Kembali"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative z-10 pt-9 md:pt-0">
            <span
              className="inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-2 md:mb-3"
              style={{ color: "#F59E0B" }}
            >
              🌳 Gamified Skill Tree
            </span>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1.5 md:mb-2">
              Peta Kompetensi Kamu
            </h1>
            <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-xl">
              Selesaikan workshop untuk membuka node kompetensi dan naik level.
            </p>

            <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-3 mt-4 md:mt-6">
              <div className="rounded-xl md:rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3 border border-white/20" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-[9px] sm:text-[10px] text-white/60 uppercase font-semibold">Total XP</p>
                <p className="text-base sm:text-xl font-bold text-white">{xp}</p>
              </div>
              <div className="rounded-xl md:rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3 border border-white/20" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-[9px] sm:text-[10px] text-white/60 uppercase font-semibold">Level</p>
                <p className="text-base sm:text-xl font-bold text-white truncate">{levelName}</p>
              </div>
              <div className="rounded-xl md:rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3 border border-white/20" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-[9px] sm:text-[10px] text-white/60 uppercase font-semibold">Progress</p>
                <p className="text-base sm:text-xl font-bold text-white">{progressPct}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 mt-5 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:items-start">
        {/* ROADMAP */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Progress bar */}
          <div className="bg-white p-4 md:p-5 rounded-2xl border border-purple-100">
            <div className="flex justify-between items-center mb-2 gap-2">
              <p className="font-semibold text-gray-800 text-sm md:text-base">Progress Belajar</p>
              <span className="font-bold text-sm md:text-base shrink-0" style={{ color: "#7C3AED" }}>
                {completedCount}/{flatNodes.length} node
              </span>
            </div>
            <div className="w-full h-2.5 md:h-3 rounded-full overflow-hidden" style={{ background: "#F3E8FF" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%`, background: "#7C3AED" }}
              />
            </div>
          </div>

          {skillTreeData.map((lvl) => (
            <div key={lvl.level} className="bg-white p-4 md:p-5 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[11px] md:text-xs font-bold text-white shrink-0"
                  style={{ background: lvl.color }}
                >
                  {lvl.level + 1}
                </span>
                <h3 className="font-bold text-gray-800 text-sm md:text-base">{lvl.title}</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
                {lvl.nodes.map((node) => {
                  const idx = flatNodes.findIndex((n) => n.key === node.key);
                  return (
                    <NodeCard
                      key={node.key}
                      node={node}
                      status={getStatus(idx)}
                      onClick={() => navigate(`/game/${node.slug}`)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate("/workshop")}
            className="w-full py-6 rounded-xl text-white font-semibold text-sm md:text-base hover:opacity-90 active:opacity-80 transition"
            style={{ background: "#5B21B6" }}
          >
            Ikuti Workshop untuk Lanjut →
          </button>
        </div>

        {/* SIDEBAR: BADGE + LEADERBOARD */}
        <div className="space-y-4 md:space-y-6 lg:sticky lg:top-6">
          <div className="bg-white p-4 md:p-5 rounded-2xl border border-purple-100">
            <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base">🎖 Badge Kamu</h3>
            {badges.length === 0 ? (
              <p className="text-xs md:text-sm text-gray-400">Belum ada badge. Selesaikan workshop pertama kamu!</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="text-[11px] md:text-xs font-semibold px-2.5 py-1.5 md:px-3 rounded-full"
                    style={{ background: "#EDE9FE", color: "#5B21B6" }}
                  >
                    🏅 {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-4 md:p-5 rounded-2xl border border-purple-100">
            <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base">🏆 Leaderboard</h3>
            <div className="space-y-1.5 md:space-y-2">
              {leaderboard.length === 0 && (
                <p className="text-xs md:text-sm text-gray-400">Belum ada data.</p>
              )}
              {leaderboard.map((u, i) => {
                const isMe = u.id === currentUid;
                const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`;
                return (
                  <div
                    key={u.id}
                    className="flex items-center justify-between px-2.5 py-2 md:px-3 rounded-xl gap-2"
                    style={{ background: isMe ? "#EDE9FE" : "transparent" }}
                  >
                    <div className="flex items-center gap-2 md:gap-2.5 min-w-0">
                      <span className="w-5 md:w-6 text-center text-xs md:text-sm font-bold shrink-0" style={{ color: "#7C3AED" }}>
                        {medal}
                      </span>
                      <span className="text-xs md:text-sm font-medium text-gray-700 truncate">
                        {u.name || "Guru"} {isMe && "(Kamu)"}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm font-bold shrink-0" style={{ color: "#EC4899" }}>
                      {u.xp || 0} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TARGET SELANJUTNYA */}
          {nextNode ? (
            <div
              className="rounded-2xl p-4 md:p-5 border"
              style={{ background: "linear-gradient(135deg, #2D1B69 0%, #4C2A99 100%)", borderColor: "#4C2A99" }}
            >
              <h3 className="font-bold text-white mb-3 text-sm md:text-base flex items-center gap-1.5">
                🎯 Target Selanjutnya
              </h3>
              <p className="text-white/90 font-semibold text-sm md:text-base leading-snug">{nextNode.title}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[11px] md:text-xs text-white/60">
                  {remainingNodes} node lagi menuju selesai
                </span>
                <span
                  className="text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: "rgba(245,158,11,0.2)", color: "#FBBF24" }}
                >
                  +{nextNode.xp} XP
                </span>
              </div>
              <button
                onClick={() => navigate(`/game/${nextNode.slug}`)}
                className="w-full mt-4 py-2.5 rounded-xl text-white font-semibold text-xs md:text-sm hover:opacity-90 active:opacity-80 transition"
                style={{ background: "#7C3AED" }}
              >
                Kerjakan Sekarang →
              </button>
            </div>
          ) : (
            <div className="rounded-2xl p-4 md:p-5 border border-purple-100 bg-white text-center">
              <p className="text-2xl mb-1">🎉</p>
              <p className="font-semibold text-gray-800 text-sm">Semua node selesai!</p>
              <p className="text-xs text-gray-400 mt-1">Kamu sudah menyelesaikan seluruh Skill Tree.</p>
            </div>
          )}

          {/* TIPS HARIAN */}
          <div className="bg-white p-4 md:p-5 rounded-2xl border border-purple-100">
            <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">💡 Tips Hari Ini</h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{todayTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;