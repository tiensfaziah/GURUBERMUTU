import React, { useState } from "react";

const levels = [
  {
    level: "Level 1",
    title: "Digital Literacy",
    progress: 80,
    xp: 400,
    badge: "🎖️",
    desc: "Belajar dasar penggunaan tools digital untuk mengajar.",
  },
  {
    level: "Level 2",
    title: "Interactive Media",
    progress: 50,
    xp: 250,
    badge: "🥈",
    desc: "Membuat media pembelajaran interaktif dan menarik.",
  },
  {
    level: "Level 3",
    title: "Creative Teaching",
    progress: 20,
    xp: 100,
    badge: "🔒",
    desc: "Mengembangkan metode mengajar kreatif dan inovatif.",
  },
];

const SkillTree = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#F8FBFB] via-[#F8BFBF]/40 to-[#E0C3FC]/50">

      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Gamified Skill Tree 🌱
        </h2>
        <p className="text-gray-600">
          Klik level untuk melihat detail progres kamu
        </p>
      </div>

      {/* XP SUMMARY */}
      <div className="max-w-4xl mx-auto mb-12 bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Total XP</p>
          <h3 className="text-2xl font-bold text-[#A64D8B]">750 XP</h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Level Saat Ini</p>
          <h3 className="text-lg font-semibold text-gray-800">
            Guru Berkembang 🚀
          </h3>
        </div>
      </div>

      {/* ROADMAP */}
      <div className="max-w-5xl mx-auto space-y-6">
        {levels.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer p-6 rounded-2xl shadow-md transition
              ${
                activeIndex === index
                  ? "bg-white border-2 border-[#A64D8B] shadow-xl scale-[1.02]"
                  : "bg-white hover:shadow-lg"
              }
            `}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-800">
                  {item.level} - {item.title}
                </h4>
                <p className="text-sm text-gray-500">
                  XP: {item.xp}
                </p>
              </div>

              <div className="text-3xl">{item.badge}</div>
            </div>

            {/* PROGRESS */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#A64D8B] to-[#E0C3FC] h-3 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>

            <p className="text-right text-sm text-gray-500 mt-1">
              {item.progress}% selesai
            </p>

            {/* DETAIL (MUNCUL SAAT DIKLIK) */}
            {activeIndex === index && (
              <div className="mt-4 text-gray-600 text-sm">
                {item.desc}
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default SkillTree;