import React, { useState, useEffect, useRef } from "react";
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
  const intervalRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  // autoplay
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % N);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section
      id="fitur"
      className="py-20 px-4 md:px-6 bg-gray-50 text-center overflow-hidden"
    >
      <ScrollAnimation>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Fitur Utama Platform
        </h2>
      </ScrollAnimation>

      <div
        className="relative mx-auto overflow-hidden"
        style={{
          perspective: "1200px",
          maxWidth: "960px",
          height: "260px",
        }}
      >
        {/* CARDS */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {features.map((item, i) => {
            const offset = ((i - current) % N + N) % N;
            const pos = offset <= N / 2 ? offset : offset - N;

            return (
              <motion.div
                key={i}
                className="absolute bg-white rounded-2xl p-5 flex flex-col"
                style={{
                  width: isMobile ? "220px" : "280px",
                  height: isMobile ? "200px" : "240px",
                }}
                animate={{
                  x:
                    pos === 0
                      ? 0
                      : pos === 1
                      ? isMobile
                        ? 120
                        : 220
                      : pos === -1
                      ? isMobile
                        ? -120
                        : -220
                      : pos > 1
                      ? 500
                      : -500,

                  scale:
                    pos === 0
                      ? 1
                      : 0.85,

                  opacity:
                    isMobile
                      ? pos === 0
                        ? 1
                        : 0
                      : pos === 0
                      ? 1
                      : pos === 1 || pos === -1
                      ? 0.5
                      : 0,

                  rotateY:
                    isMobile
                      ? 0
                      : pos === 0
                      ? 0
                      : pos === 1
                      ? -30
                      : pos === -1
                      ? 30
                      : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                }}
              >
                <div className="text-3xl md:text-4xl mb-3">{item.icon}</div>

                <h3 className="text-sm md:text-lg font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-xs md:text-sm">
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
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-[#DC1416]" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;