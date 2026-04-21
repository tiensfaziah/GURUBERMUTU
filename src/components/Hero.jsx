import marica from "../assets/Marica.png";
import bg from "../assets/background.png";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="scroll-mt-24 w-full bg-cover bg-center pt-24 md:pt-28 pb-20 md:pb-32"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid md:grid-cols-2 items-center gap-10">

        {/* TEXT */}
        <ScrollAnimation>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800 leading-tight">
              Dari Kelas ke Karya,
              <br /> Dari Karya ke Cuan 💸
            </h1>

            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg">
              Ubah cara kamu mengajar jadi lebih produktif. Belajar skill baru, ciptakan karya digital, dan hasilkan penghasilan tambahan dalam satu platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 justify-center md:justify-start">
              
              <button
                onClick={() => navigate("/login")}
                className="bg-[#DC1416] text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
              >
                Mulai Sekarang
              </button>

              <button className="border px-6 py-3 rounded-lg hover:scale-105 transition">
                Lihat Demo
              </button>

            </div>
          </div>
        </ScrollAnimation>

        {/* IMAGE */}
        <ScrollAnimation delay={0.3}>
          <div className="flex justify-center md:justify-end">
            <img
              src={marica}
              alt="Marica"
              className="w-52 md:w-80 drop-shadow-2xl animate-[float_3s_ease-in-out_infinite]"
            />
          </div>
        </ScrollAnimation>

      </div>
    </section>
  );
}

export default Hero;