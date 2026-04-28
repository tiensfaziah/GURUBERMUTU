import heroImg from "../assets/background2.png";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative scroll-mt-24 w-full pt-24 md:pt-28 pb-20 md:pb-32 overflow-hidden"
    >

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
  src={heroImg}
  alt="guru gen z mengajar digital"
  className="w-full h-full object-cover scale-110 translate-x-20"
/>
      </div>

      {/* GRADIENT FADE (BIAR TEKS KELIATAN) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-16">

        <ScrollAnimation>
          <div className="max-w-xl text-center md:text-left">

            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800 leading-tight">
              Mengajar Bukan Sekadar Rutinitas,
              <br /> Jadi Guru Gen Z yang Relevan di Era Digital
            </h1>

            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg">
              Tingkatkan cara mengajar dengan pendekatan modern, interaktif,
              dan berbasis teknologi dalam satu platform yang dirancang
              khusus untuk guru masa kini.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 justify-center md:justify-start">

              <button
                onClick={() => navigate("/login")}
                className="bg-[#DC1416] text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition"
              >
                Mulai Sekarang 🚀
              </button>

              <button className="border border-gray-300 bg-white/80 backdrop-blur px-6 py-3 rounded-xl hover:scale-105 transition">
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