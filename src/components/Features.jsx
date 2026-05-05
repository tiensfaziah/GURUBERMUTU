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
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!hovered) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % N);
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered]);

  const next = () => setCurrent((prev) => (prev + 1) % N);
  const prev = () => setCurrent((prev) => (prev - 1 + N) % N);

  return (
    <section id="fitur" className="py-20 px-4 md:px-6 bg-gray-50 text-center overflow-hidden">

      <ScrollAnimation>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Fitur Utama Platform
        </h2>
      </ScrollAnimation>

      <div
        className="relative mx-auto overflow-hidden"
        style={{
          perspective: "1200px",
          maxWidth: "100%",
          height: "260px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ARROW LEFT */}
        <button
          onClick={prev}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md w-9 h-9 rounded-full items-center justify-center"
        >
          ←
        </button>

        {/* ARROW RIGHT */}
        <button
          onClick={next}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md w-9 h-9 rounded-full items-center justify-center"
        >
          →
        </button>

        <div className="relative w-full h-full flex items-center justify-center">

          {features.map((item, i) => {
            const offset = ((i - current) % N + N) % N;
            const pos = offset <= N / 2 ? offset : offset - N;

            return (
              <motion.div
                key={i}
                onClick={() => pos !== 0 && setCurrent(i)}
                className="absolute bg-white rounded-2xl p-5 flex flex-col"
                style={{
                  width: window.innerWidth < 768 ? "220px" : "280px",
                  height: "220px",
                }}

                animate={{
                  x:
                    window.innerWidth < 768
                      ? pos === 0
                        ? 0
                        : pos === 1
                        ? 120
                        : pos === -1
                        ? -120
                        : 0
                      : pos === 0
                      ? 0
                      : pos === 1
                      ? 220
                      : pos === -1
                      ? -220
                      : 400,

                  scale:
                    pos === 0
                      ? 1
                      : 0.85,

                  opacity:
                    pos === 0
                      ? 1
                      : 0.4,

                  boxShadow:
                    pos === 0
                      ? "0px 15px 40px rgba(0,0,0,0.12)"
                      : "0px 5px 15px rgba(0,0,0,0.05)",
                }}

                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>

                <h3 className="text-base font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-xs leading-relaxed">
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
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[#DC1416]"
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Features;