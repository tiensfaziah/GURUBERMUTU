import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <ScrollAnimation>
      <section className="py-20 text-center bg-gradient-to-b from-white via-[#F8BFBF] to-[#D9A7C7]">

        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
          Siap Naik Level Jadi Guru Keren? 🚀
        </h2>

        {/* DESC */}
        <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-700">
          Belajar, berkarya, dan hasilkan cuan dalam satu platform.
          Mulai perjalananmu sekarang dan jadi versi terbaikmu!
        </p>

        {/* BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="
              relative overflow-hidden
              bg-[#A64D8B] text-white px-8 py-3 rounded-full
              shadow-lg

              transition-all duration-300

              hover:scale-105
              hover:shadow-[0_0_25px_rgba(166,77,139,0.6)]
              hover:brightness-110

              active:scale-95
              active:shadow-md

              before:absolute before:inset-0
              before:bg-white/20 before:opacity-0
              before:transition before:duration-300
              hover:before:opacity-100
            "
          >
            🚀 Mulai Sekarang
          </button>
        </div>

      </section>
    </ScrollAnimation>
  );
};

export default CTA;