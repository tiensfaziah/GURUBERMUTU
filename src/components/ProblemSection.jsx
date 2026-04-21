import marica from "../assets/marica.gif";
import question from "../assets/tandatanya.png";
import bg from "../assets/background.png";

function ProblemSection() {
  return (
    <section className="relative">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-10 md:py-15 
        grid grid-cols-2 md:grid-cols-2 items-center gap-4 md:gap-10"
      >

        {/* LEFT */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-4xl font-bold mb-4 md:mb-8 text-gray-800 leading-snug">
            <span className="text-[#DC1416]">Guru-guru</span>{" "}
            Pernah Ngalamin Ini? 🤔
          </h2>

          <div className="space-y-2 md:space-y-4">

            <div className="flex items-center gap-2 md:gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 md:px-6 py-2 md:py-4 shadow-md">
              <span className="text-[#DC1416] text-sm md:text-xl">✖</span>
              <p className="text-gray-700 text-xs md:text-base">
                Ngerasa stuck saat ngajar?
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 md:px-6 py-2 md:py-4 shadow-md">
              <span className="text-[#DC1416] text-sm md:text-xl">✖</span>
              <p className="text-gray-700 text-xs md:text-base">
                Materi itu-itu aja, tuntutan makin banyak?
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 md:px-6 py-2 md:py-4 shadow-md">
              <span className="text-[#DC1416] text-sm md:text-xl">✖</span>
              <p className="text-gray-700 text-xs md:text-base">
                Udah belajar tapi belum ada hasil nyata?
              </p>
            </div>

          </div>

          <p className="mt-4 md:mt-8 text-sm md:text-lg text-gray-700">
            Tenang, ada{" "}
            <span className="text-[#DC1416] font-semibold">
              solusi untuk mengatasinya!
            </span>{" "}
            🚀
          </p>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">

          {/* STICKER */}
          <img
            src={question}
            alt="question"
            className="absolute top-[-5px] right-[10px] w-16 sm:w-24 md:w-40 rotate-12 opacity-90 animate-bounce"
          />

          {/* MARICA */}
          <img
            src={marica}
            alt="marica"
            className="w-32 sm:w-40 md:w-80 relative z-10 drop-shadow-xl"
          />

        </div>

      </div>

      {/* CLOUD */}
      <div className="w-full h-6 md:h-10 bg-white rounded-t-[100px] mt-6 md:mt-10"></div>

    </section>
  );
}

export default ProblemSection;