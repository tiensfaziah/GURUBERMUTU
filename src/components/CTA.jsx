import React from "react";

const CTA = () => {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden">
      
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F8BFBF] via-[#E0C3FC] to-[#D9A7C7] opacity-90"></div>

      {/* BLUR EFFECT (biar aesthetic) */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      {/* CONTENT */}
      <div className="relative max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
          Siap Naik Level Jadi Guru Keren?🚀
        </h2>

        <p className="mb-8 text-lg text-gray-700">
          Belajar, berkarya, dan hasilkan cuan dalam satu platform.
          Mulai perjalananmu sekarang dan jadi versi terbaikmu!
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-[#A64D8B] text-white px-7 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300">
            🚀 Mulai Sekarang
          </button>

          <button className="bg-white text-[#A64D8B] px-7 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300">
            🎬 Coba Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;