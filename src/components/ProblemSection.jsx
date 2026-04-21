import marica from "../assets/marica.gif";
import question from "../assets/tandatanya.png";
import bg from "../assets/background.png";
import ScrollAnimation from "../components/ScrollAnimation";

function ProblemSection() {
  return (
    <section className="relative">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-16 
        grid md:grid-cols-2 items-center gap-10"
      >

        {/* TEXT */}
        <div className="text-center md:text-left">

          <ScrollAnimation>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800 leading-snug">
              <span className="text-[#DC1416]">Guru-guru</span>{" "}
              Pernah Ngalamin Ini? 🤔
            </h2>
          </ScrollAnimation>

          <div className="space-y-4">

            <ScrollAnimation delay={0}>
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-md">
                <span className="text-[#DC1416] text-lg">✖</span>
                <p className="text-gray-700 text-sm md:text-base">
                  Ngerasa stuck saat ngajar?
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-md">
                <span className="text-[#DC1416] text-lg">✖</span>
                <p className="text-gray-700 text-sm md:text-base">
                  Materi itu-itu aja, tuntutan makin banyak?
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.4}>
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-md">
                <span className="text-[#DC1416] text-lg">✖</span>
                <p className="text-gray-700 text-sm md:text-base">
                  Udah belajar tapi belum ada hasil nyata?
                </p>
              </div>
            </ScrollAnimation>

          </div>

          <ScrollAnimation delay={0.6}>
            <p className="mt-6 text-sm md:text-lg text-gray-700">
              Tenang, ada{" "}
              <span className="text-[#DC1416] font-semibold">
                solusi untuk mengatasinya!
              </span>{" "}
              🚀
            </p>
          </ScrollAnimation>

        </div>

        {/* IMAGE */}
        <ScrollAnimation delay={0.3}>
          <div className="relative flex justify-center mt-10 md:mt-0">

            {/* STICKER */}
            <img
              src={question}
              alt="question"
              className="absolute top-0 right-10 w-20 md:w-32 rotate-12 opacity-90 animate-bounce"
            />

            {/* MARICA */}
            <img
              src={marica}
              alt="marica"
              className="w-48 md:w-80 drop-shadow-xl"
            />

          </div>
        </ScrollAnimation>

      </div>

      {/* CLOUD */}
      <div className="w-full h-10 bg-white rounded-t-[100px]"></div>

    </section>
  );
}

export default ProblemSection;