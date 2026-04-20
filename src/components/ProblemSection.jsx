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

      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-15 grid md:grid-cols-2 items-center gap-10">

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 leading-snug">
            <span className="text-[#DC1416]">Guru-guru</span>{" "}
            Pernah Ngalamin Ini? 🤔
          </h2>

          <div className="space-y-4">

            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-md">
              <span className="text-[#DC1416] text-xl">✖</span>
              <p className="text-gray-700">
                Ngerasa stuck saat ngajar?
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-md">
              <span className="text-[#DC1416] text-xl">✖</span>
              <p className="text-gray-700">
                Materi itu-itu aja, tuntutan makin banyak?
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-md">
              <span className="text-[#DC1416] text-xl">✖</span>
              <p className="text-gray-700">
                Udah belajar tapi belum ada hasil nyata?
              </p>
            </div>

          </div>

          <p className="mt-8 text-lg text-gray-700">
            Tenang, ada{" "}
            <span className="text-[#DC1416] font-semibold">
              solusi untuk mengatasinya!
            </span>{" "}
            🚀
          </p>
        </div>


        <div className="relative flex justify-center">

          <img
            src={question}
            alt="question"
            className="absolute top-[-10px] right-[90px] w-40 rotate-12 opacity-90 animate-bounce"
          />

          <img
            src={marica}
            alt="marica"
            className="w-80 relative z-10 drop-shadow-xl"
          />

        </div>

      </div>

      <div className="w-full h-10 bg-white rounded-t-[100px] mt-10"></div>

    </section>
  );
}

export default ProblemSection;