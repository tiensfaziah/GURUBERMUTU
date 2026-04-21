import React, { useEffect, useRef, useState } from "react";
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
  const sectionRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true); // 🔥 trigger sekali
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="fitur"
      ref={sectionRef}
      className={`py-20 px-6 bg-gray-50 text-center ${show ? "ice-show" : ""}`}
    >

      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Fitur Utama Platform
        </h2>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {features.map((item, index) => (
          <div
            key={index}
            className="
              ice-item
              bg-white p-6 rounded-2xl shadow-md
              hover:shadow-xl transition hover:-translate-y-2
              h-full flex flex-col
            "
          >
            <div className="text-4xl mb-4">{item.icon}</div>

            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm flex-grow">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Features;