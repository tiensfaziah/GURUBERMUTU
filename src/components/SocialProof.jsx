import React from "react";
import ScrollAnimation from "../components/ScrollAnimation";

const testimonials = [
  {
    text: "Berkat Gurubermutu.id, efektivitas mengajar saya naik pesat dan siswa jadi jauh lebih antusias!",
    name: "Budi, Guru Muda Penggerak",
  },
  {
    text: "Berkat Gamified Skill Tree, saya jadi lebih semangat upgrade diri karena progresnya terlihat nyata!",
    name: "Andi, Guru Muda & Content Creator Pendidikan",
  },
  {
    text: "Dulu saya sering bingung mencari alat bantu mengajar yang pas, tapi sejak ada Curated Tech Stack, persiapan kelas jadi jauh lebih efisien.",
    name: "Rina, Guru Matematika SMP",
  },
  {
    text: "Fitur Gamified Skill Tree bikin proses belajar jadi ketagihan; saya merasa sangat termotivasi untuk terus naik level.",
    name: "Fajar, Mahasiswa Calon Guru",
  },
  {
    text: "Resource Marketplace sangat membantu, saya bisa berbagi aset digital sekaligus belajar dari modul pedagogi kreatif.",
    name: "Siska, Guru SD & Edu-Creator",
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
    <section className="relative z-10 py-16 pb-20 px-6 bg-[#FCFCFD] text-center overflow-hidden">
      
      {/* FADE KE CTA */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      {/* STATS */}
      <ScrollAnimation>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-3xl font-bold text-[#700087]">1,200+</h3>
            <p className="text-gray-600">Guru Bergabung</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#700087]">350+</h3>
            <p className="text-gray-600">Materi Dibagikan</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#700087]">50+</h3>
            <p className="text-gray-600">Pelatihan Aktif</p>
          </div>
        </div>
      </ScrollAnimation>

      {/* TITLE */}
      <ScrollAnimation delay={0.2}>
        <h2 className="text-3xl font-bold mb-8 text-[#700087]">
          Cerita Guru yang
<span className="text-[#700087]"> Bertumbuh Bersama </span>
Gurubermutu
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
                  className="bg-white border border-[#E9D5FF] min-w-[280px] max-w-[280px] p-6 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
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
                  <div className="flex items-center gap-3 mt-auto pt-6">

                    <div
  className={`
    w-10
    h-10

    min-w-[40px]

    rounded-full

    flex
    items-center
    justify-center

    text-white
    font-bold

    ${color}
  `}
>
                      {getInitial(item.name)}
                    </div>

                    <h4 className="font-semibold text-[#700087] text-sm">
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