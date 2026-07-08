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
  className={`relative rounded-2xl p-4 border transition-all cursor-pointer ${
    isLocked
      ? "opacity-50 grayscale cursor-not-allowed"
      : "hover:-translate-y-1 hover:shadow-md"
  }`}
      
      style={{
        background: isCompleted ? node.bg : "#fff",
        borderColor: isCompleted ? node.color : "#E5E7EB",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
          style={{ background: isCompleted ? node.color : "#F3F4F6" }}
        >
          {isCompleted ? "✅" : isLocked ? "🔒" : "🎯"}
        </span>
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-full"
          style={{ background: "#FEF3C7", color: "#B45309" }}
        >
          +{node.xp} XP
        </span>
      </div>
      <p className="font-semibold text-sm text-gray-800 leading-snug">{node.title}</p>
      <p className="text-[11px] text-gray-400 mt-1">
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F5F3FF]">
        <p className="text-purple-700 font-semibold">Memuat Skill Tree...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{ background: "#F5F3FF" }}>
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
        <div
          className="relative rounded-[24px] md:rounded-[28px] overflow-hidden p-6 md:p-10"
          style={{ background: "linear-gradient(135deg, #2D1B69 0%, #4C2A99 100%)", minHeight: 200 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute top-4 left-4 md:top-6 md:left-6 text-white hover:text-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative z-10 pt-8 md:pt-0">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#F59E0B" }}>
              🌳 Gamified Skill Tree
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Peta Kompetensi Kamu</h1>
            <p className="text-white/70 text-sm md:text-base max-w-xl">
              Selesaikan workshop untuk membuka node kompetensi dan naik level.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <div className="rounded-2xl px-5 py-3 border border-white/20" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] text-white/60 uppercase font-semibold">Total XP</p>
                <p className="text-xl font-bold text-white">{xp}</p>
              </div>
              <div className="rounded-2xl px-5 py-3 border border-white/20" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] text-white/60 uppercase font-semibold">Level</p>
                <p className="text-xl font-bold text-white">{levelName}</p>
              </div>
              <div className="rounded-2xl px-5 py-3 border border-white/20" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] text-white/60 uppercase font-semibold">Progress</p>
                <p className="text-xl font-bold text-white">{progressPct}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROADMAP */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress bar */}
          <div className="bg-white p-5 rounded-2xl border border-purple-100">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-800">Progress Belajar</p>
              <span className="font-bold" style={{ color: "#7C3AED" }}>{completedCount}/{flatNodes.length} node</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "#F3E8FF" }}>
              <div
                className="h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%`, background: "#7C3AED" }}
              />
            </div>
          </div>

          {skillTreeData.map((lvl) => (
            <div key={lvl.level} className="bg-white p-5 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: lvl.color }}
                >
                  {lvl.level + 1}
                </span>
                <h3 className="font-bold text-gray-800">{lvl.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {lvl.nodes.map((node) => {
                  const idx = flatNodes.findIndex((n) => n.key === node.key);
                  return <NodeCard
    key={node.key}
    node={node}
    status={getStatus(idx)}
    onClick={() => navigate(`/game/${node.slug}`)}
/>;
                })}
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate("/workshop")}
            className="w-full py-3 rounded-xl text-white font-semibold hover:opacity-90 transition"
            style={{ background: "#5B21B6" }}
          >
            Ikuti Workshop untuk Lanjut →
          </button>
        </div>

        {/* SIDEBAR: BADGE + LEADERBOARD */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-purple-100">
            <h3 className="font-bold text-gray-800 mb-3">🎖 Badge Kamu</h3>
            {badges.length === 0 ? (
              <p className="text-sm text-gray-400">Belum ada badge. Selesaikan workshop pertama kamu!</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: "#EDE9FE", color: "#5B21B6" }}
                  >
                    🏅 {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-100">
            <h3 className="font-bold text-gray-800 mb-3">🏆 Leaderboard</h3>
            <div className="space-y-2">
              {leaderboard.length === 0 && (
                <p className="text-sm text-gray-400">Belum ada data.</p>
              )}
              {leaderboard.map((u, i) => {
                const isMe = u.id === currentUid;
                const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`;
                return (
                  <div
                    key={u.id}
                    className="flex items-center justify-between px-3 py-2 rounded-xl"
                    style={{ background: isMe ? "#EDE9FE" : "transparent" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 text-center text-sm font-bold" style={{ color: "#7C3AED" }}>
                        {medal}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {u.name || "Guru"} {isMe && "(Kamu)"}
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: "#EC4899" }}>
                      {u.xp || 0} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;