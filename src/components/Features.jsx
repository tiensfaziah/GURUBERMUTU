import React from "react";

const features = [
  {
    title: "Gamified Skill Tree",
    desc: "Lihat perkembangan skill kamu dengan sistem level dan XP.",
    icon: "🎮",
  },
  {
    title: "Tech Stack",
    desc: "Temukan tools digital terbaik untuk meningkatkan kualitas mengajar.",
    icon: "🧠",
  },
  {
    title: "Marketplace",
    desc: "Jual dan beli materi ajar seperti PPT, modul, dan soal latihan.",
    icon: "🛒",
  },
  {
    title: "Workshop & Seminar",
    desc: "Ikuti pelatihan dan seminar untuk meningkatkan kompetensi.",
    icon: "📚",
  },
];

const Features = () => {
  return (
    <section id="fitur" className="py-16 md:py-20 px-4 md:px-6 bg-gray-50 text-center">

      <h2 className="text-2xl md:text-4xl font-bold mb-10 md:mb-12 text-gray-800">
        Fitur Utama Platform
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">

        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2"
          >
            <div className="text-3xl md:text-4xl mb-4">{item.icon}</div>

            <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-800">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {item.desc}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Features;