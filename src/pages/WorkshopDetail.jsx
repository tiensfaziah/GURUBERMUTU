import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// 🔥 FIREBASE
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// 🔥 LEVEL & BADGE
import { getLevel } from "../utils/level";
import { getBadges } from "../utils/badge";

const workshops = [
  {
    id: 1,
    title: "Canva untuk Guru Pemula",
    desc: "Belajar membuat materi visual menarik menggunakan Canva.",
    duration: "30 menit",
    xp: 100,
  },
  {
    id: 4,
    title: "Google Classroom",
    desc: "Belajar menggunakan Google Classroom untuk mengajar.",
    duration: "40 menit",
    xp: 100,
  },
  {
    id: 2,
    title: "Quizizz Interaktif",
    desc: "Membuat kuis interaktif untuk siswa.",
    duration: "45 menit",
    xp: 120,
  },
  {
    id: 3,
    title: "Mentimeter Interaktif",
    desc: "Membuat presentasi interaktif dengan Mentimeter.",
    duration: "60 menit",
    xp: 150,
  },
];

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const workshop = workshops.find((w) => w.id === parseInt(id));
  if (!workshop) return <p>Workshop tidak ditemukan</p>;

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
          badges: badges, // 🔥 TAMBAHAN
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

        const newBadges = getBadges(newXP, newCompleted); // 🔥 TAMBAHAN

        console.log("XP:", newXP);
        console.log("Completed:", newCompleted);
        console.log("Badges:", newBadges);

        await updateDoc(userRef, {
          xp: newXP,
          level: levelData.level,
          levelName: levelData.name,
          completedModules: newCompleted,
          badges: newBadges, // 🔥 INI YANG BIKIN KE FIRESTORE
          [`completedNodes.${key}`]: true,
          aktivitas: [
            ...(data.aktivitas || []),
            `Selesai: ${workshop.title}`,
          ],
        });
      }

      alert("🎉 XP + Badge berhasil ditambahkan!");
    } catch (error) {
      console.error("ERROR:", error);
      alert("Gagal update Firebase");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-500"
      >
        ← Kembali
      </button>

      <div className="bg-white p-6 rounded-2xl shadow max-w-2xl mx-auto">

        <h2 className="text-xl font-bold mb-2">
          {workshop.title}
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          Durasi: {workshop.duration}
        </p>

        <p className="text-gray-700 mb-6">
          {workshop.desc}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-[#A64D8B] font-semibold">
            Reward: +{workshop.xp} XP
          </span>

          <button
            onClick={handleComplete}
            className="bg-[#DC1416] text-white px-4 py-2 rounded-xl"
          >
            Tandai Selesai ✅
          </button>
        </div>

      </div>

    </div>
  );
};

export default WorkshopDetail;