import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const baseLevels = [
  {
    level: "Level 1",
    title: "Digital Literacy",
    xp: 400,
    desc: "Belajar dasar penggunaan tools digital untuk mengajar.",
    nodes: [
      { title: "Canva Dasar", key: "0-0" },
      { title: "Google Classroom", key: "0-1" },
      { title: "Quizizz", key: "0-2" },
    ],
  },
  {
    level: "Level 2",
    title: "Interactive Media",
    xp: 250,
    desc: "Membuat media pembelajaran interaktif dan menarik.",
    nodes: [
      { title: "Canva Interaktif", key: "1-0" },
      { title: "Mentimeter", key: "1-1" },
      { title: "Padlet", key: "1-2" },
    ],
  },
  {
    level: "Level 3",
    title: "Creative Teaching",
    xp: 100,
    desc: "Mengembangkan metode mengajar kreatif dan inovatif.",
    nodes: [
      { title: "Project Based Learning", key: "2-0" },
      { title: "Gamification Class", key: "2-1" },
    ],
  },
];

const SkillTree = () => {
  const [levels, setLevels] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const progress = data.completedNodes || {};

        const updatedLevels = baseLevels.map((lvl) => ({
          ...lvl,
          nodes: lvl.nodes.map((node) => ({
            ...node,
            done: progress[node.key] || false,
          })),
        }));

        setLevels(updatedLevels);
      }
    });

    return () => unsubscribe();
  }, []);

  const totalXP = levels.reduce((acc, level) => {
    const doneCount = level.nodes.filter((n) => n.done).length;
    return acc + doneCount * 100;
  }, 0);

  const getLevelName = (xp) => {
    if (xp >= 5000) return "Guru Inspiratif";
    if (xp >= 3000) return "Guru Produktif";
    if (xp >= 1500) return "Guru Kreatif";
    if (xp >= 500) return "Guru Berkembang";
    return "Guru Pemula";
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#F8FBFB] via-[#F8BFBF]/40 to-[#E0C3FC]/50">

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Gamified Skill Tree 🌱
        </h2>
        <p className="text-gray-600">
          Klik level untuk melihat detail progres kamu
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12 bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Total XP</p>
          <h3 className="text-2xl font-bold text-[#A64D8B]">
            {totalXP} XP
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Level Saat Ini</p>
          <h3 className="text-lg font-semibold text-gray-800">
            {getLevelName(totalXP)} 🚀
          </h3>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {levels.map((item, index) => {

          const totalNodes = item.nodes.length;
          const doneNodes = item.nodes.filter((n) => n.done).length;
          const progress = Math.floor((doneNodes / totalNodes) * 100);

          const isLocked =
            index > 0 &&
            levels[index - 1].nodes.some((n) => !n.done);

          return (
            <div
              key={index}
              onClick={() => !isLocked && setActiveIndex(index)}
              className={`cursor-pointer p-6 rounded-2xl shadow-md transition
                ${
                  activeIndex === index
                    ? "bg-white border-2 border-[#A64D8B] shadow-xl scale-[1.02]"
                    : "bg-white hover:shadow-lg"
                }
                ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {item.level} - {item.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    XP: {item.xp}
                  </p>
                </div>

                <div className="text-3xl">
                  {isLocked ? "🔒" : "🎖️"}
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-[#A64D8B] to-[#E0C3FC] h-3 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-right text-sm text-gray-500 mt-1">
                {progress}% selesai
              </p>

              {activeIndex === index && !isLocked && (
                <div className="mt-4 text-gray-600 text-sm space-y-2">
                  <p>{item.desc}</p>

                  <div className="mt-2 space-y-1">
                    {item.nodes.map((node, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span>{node.done ? "✅" : "⬜"}</span>
                        <p className={node.done ? "line-through text-gray-400" : ""}>
                          {node.title}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default SkillTree;