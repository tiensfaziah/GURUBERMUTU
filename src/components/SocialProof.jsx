import React from "react";
import ScrollAnimation from "../components/ScrollAnimation";

const testimonials = [
  {
    text: "Platform ini bantu banget buat upgrade skill ngajar aku!",
    name: "Rina, Guru SMP",
  },
  {
    text: "Sekarang aku bisa jual materi sendiri dan dapet penghasilan tambahan.",
    name: "Andi, Guru SMA",
  },
  {
    text: "Gamification-nya bikin belajar jadi lebih seru dan ga boring.",
    name: "Sari, Guru SD",
  },
  {
    text: "Belajar jadi lebih terarah karena ada sistem level.",
    name: "Dewi, Guru TK",
  },
  {
    text: "Materinya lengkap dan mudah dipahami.",
    name: "Budi, Guru SMK",
  },
];

// 🔥 fungsi ambil inisial
const getInitial = (name) => name.charAt(0);

// 🔥 warna avatar random (biar hidup)
const colors = [
  "bg-red-400",
  "bg-pink-400",
  "bg-purple-400",
  "bg-indigo-400",
  "bg-blue-400",
  "bg-green-400",
];

const SocialProof = () => {
  return (
    <section className="relative z-10 py-16 pb-20 px-6 bg-white text-center overflow-hidden">
      
      {/* FADE KE CTA */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      {/* STATS */}
      <ScrollAnimation>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-3xl font-bold text-[#DC1416]">1,200+</h3>
            <p className="text-gray-600">Guru Bergabung</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#DC1416]">350+</h3>
            <p className="text-gray-600">Materi Dibagikan</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#DC1416]">50+</h3>
            <p className="text-gray-600">Pelatihan Aktif</p>
          </div>
        </div>
      </ScrollAnimation>

      {/* TITLE */}
      <ScrollAnimation delay={0.2}>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Apa Kata Mereka? 💬
        </h2>
      </ScrollAnimation>

      {/* SCROLL */}
      <ScrollAnimation delay={0.3}>
        <div className="overflow-hidden">
          <div className="flex gap-6 w-max animate-[scroll_20s_linear_infinite] pb-4">

            {[...testimonials, ...testimonials].map((item, index) => {
              const color = colors[index % colors.length];

              return (
                <div
                  key={index}
                  className="bg-gray-50 min-w-[280px] max-w-[280px] p-6 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* ⭐ STARS */}
                  <div className="flex justify-center mb-3 text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>

                  {/* TEXT */}
                  <p className="text-gray-600 mb-5 italic">
                    “{item.text}”
                  </p>

                  {/* AVATAR + NAME */}
                  <div className="flex items-center justify-center gap-3 mt-4">

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${color}`}>
                      {getInitial(item.name)}
                    </div>

                    <h4 className="font-semibold text-[#DC1416] text-sm">
                      {item.name}
                    </h4>

                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </ScrollAnimation>

    </section>
  );
};

export default SocialProof;