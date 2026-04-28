import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const N = features.length;

const Features = () => {
  const [current, setCurrent] = useState(0);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % N);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="fitur" className="py-20 px-6 bg-gray-50 text-center">

      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Fitur Utama Platform
        </h2>
      </ScrollAnimation>

      {/* 3D SCENE */}
      <div
        className="relative mx-auto"
        style={{
          perspective: "1200px",
          maxWidth: "960px",
          height: "280px",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">

          {features.map((item, i) => {
            const offset = ((i - current) % N + N) % N;
            const pos = offset <= N / 2 ? offset : offset - N;

            return (
              <motion.div
                key={i}
                onClick={() => pos !== 0 && setCurrent(i)}
                className="absolute bg-white rounded-2xl shadow-md p-6 flex flex-col"
                style={{
                  width: "280px",
                  height: "240px",
                  cursor: pos !== 0 ? "pointer" : "default",
                }}

                animate={{
                  x:
                    pos === 0
                      ? 0
                      : pos === 1
                      ? 220
                      : pos === -1
                      ? -220
                      : pos > 0
                      ? 400
                      : -400,

                  scale:
                    pos === 0
                      ? 1
                      : pos === 1 || pos === -1
                      ? 0.75
                      : 0.5,

                  rotateY:
                    pos === 0
                      ? 0
                      : pos === 1
                      ? -40
                      : pos === -1
                      ? 40
                      : pos > 0
                      ? -60
                      : 60,

                  opacity:
                    pos === 0
                      ? 1
                      : pos === 1 || pos === -1
                      ? 0.5
                      : 0,

                  filter:
                    pos === 0
                      ? "blur(0px)"
                      : pos === 1 || pos === -1
                      ? "blur(2px)"
                      : "blur(4px)",
                }}

                transition={{
                  type: "spring",
                  stiffness: 180,   // 🔥 kekuatan dorongan
                  damping: 18,      // 🔥 bounce control
                  mass: 0.8,        // 🔥 feel berat ringan
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>

                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm flex-grow leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* DOT */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-gray-800 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Features;