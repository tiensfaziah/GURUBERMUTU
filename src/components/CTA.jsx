import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative z-0 py-16 md:py-20 px-4 md:px-6 text-center overflow-hidden -mt-8 md:-mt-10 bg-gradient-to-b from-white via-[#F8BFBF] to-[#D9A7C7]">
      
      <div className="relative max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800">
          Siap Naik Level Jadi Guru Keren? 🚀
        </h2>

        <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-700">
          Belajar, berkarya, dan hasilkan cuan dalam satu platform.
          Mulai perjalananmu sekarang dan jadi versi terbaikmu!
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
          
          <button
            onClick={() => navigate("/login")}
            className="bg-[#A64D8B] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            🚀 Mulai Sekarang
          </button>

          <button className="bg-white text-[#A64D8B] px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
            🎬 Coba Demo
          </button>

        </div>
      </div>

    </section>
  );
};

export default CTA;