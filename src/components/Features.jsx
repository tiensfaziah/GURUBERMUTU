import React from "react";
import ScrollAnimation from "../components/ScrollAnimation";

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
    <section id="fitur" className="py-20 px-6 bg-gray-50 text-center">

      {/* TITLE (TETAP, CUMA DITAMBAH ANIMASI) */}
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Fitur Utama Platform
        </h2>
      </ScrollAnimation>

      {/* GRID (TETAP) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {features.map((item, index) => (
          <ScrollAnimation key={index} delay={index * 0.2}>
            <div
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{item.icon}</div>

              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          </ScrollAnimation>
        ))}

      </div>

    </section>
  );
};

export default Features;