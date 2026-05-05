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

  // autoplay 3.5 detik + pause saat hover
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
    <section id="fitur" className="py-20 px-6 bg-gray-50 text-center">

      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Fitur Utama Platform
        </h2>
      </ScrollAnimation>

      {/* CAROUSEL */}
      <div
        className="relative mx-auto"
        style={{
          perspective: "1200px",
          maxWidth: "960px",
          height: "300px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ARROW LEFT */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
        >
          ←
        </button>

        {/* ARROW RIGHT */}
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
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
                className="absolute bg-white rounded-2xl p-6 flex flex-col"
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
                      ? 1.1   // 🔥 center lebih besar
                      : pos === 1 || pos === -1
                      ? 0.8
                      : 0.6,

                  rotateY:
                    pos === 0
                      ? 0
                      : pos === 1
                      ? -35
                      : pos === -1
                      ? 35
                      : pos > 0
                      ? -50
                      : 50,

                  opacity:
                    pos === 0
                      ? 1
                      : pos === 1 || pos === -1
                      ? 0.6
                      : 0,

                  filter:
                    pos === 0
                      ? "blur(0px)"
                      : pos === 1 || pos === -1
                      ? "blur(1px)"
                      : "blur(3px)",

                  boxShadow:
                    pos === 0
                      ? "0px 20px 50px rgba(0,0,0,0.15)" // 🔥 shadow center
                      : "0px 5px 15px rgba(0,0,0,0.05)",
                }}

                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  mass: 0.8,
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

      {/* DOT / PILL */}
      <div className="flex justify-center gap-3 mt-8">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-[#DC1416]"   // 🔥 pill merah
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Features;