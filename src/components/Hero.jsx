import heroImg from "../assets/gurugenz.jpg";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";
import { useEffect, useState } from "react";

function Hero() {
  const navigate = useNavigate();

  const words = ["Relevan", "Kreatif", "Interaktif", "Inovatif"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // ganti kata tiap 2 detik

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      id="home"
      className="relative scroll-mt-24 w-full pt-20 md:pt-28 pb-16 md:pb-32 overflow-hidden"
    >

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImg}
          alt="guru gen z mengajar digital"
          className="w-full h-full object-cover object-[70%_30%]"
        />
      </div>

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-12 md:py-16">

        <ScrollAnimation>
          <div className="max-w-xl text-center md:text-left">

            <h1 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800 leading-tight">
              <span className="text-[#5B21B6]">Mengajar</span> Bukan Sekadar Rutinitas,
              <br />
              Jadi Guru Gen Z yang{" "}
              <span className="text-[#EC4899] transition-all duration-500">
                {words[index]}
              </span>{" "}
              di Era Digital
            </h1>

            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg">
              Tingkatkan cara mengajar dengan pendekatan modern, interaktif,
              dan berbasis teknologi dalam satu platform yang dirancang
              khusus untuk guru masa kini.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 justify-center md:justify-start">

              <button
                onClick={() => navigate("/login")}
                className="bg-[#5B21B6] text-white px-5 py-3 rounded-xl shadow-md hover:scale-105 transition"
              >
                Mulai Sekarang 🚀
              </button>

              <button className="border border-gray-300 bg-white/80 backdrop-blur px-5 py-3 rounded-xl hover:scale-105 transition">
                Lihat Demo
              </button>

            </div>

          </div>
        </ScrollAnimation>

      </div>

    </section>
  );
}

export default Hero;