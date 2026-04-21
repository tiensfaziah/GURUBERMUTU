import marica from "../assets/Marica.png";
import bg from "../assets/background.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="w-full bg-cover bg-center pt-24 md:pt-28 pb-20 md:pb-32"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 
        grid md:grid-cols-2 items-center gap-10"
      >
        
        {/* TEXT */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800 leading-tight">
            Dari Kelas ke Karya,
            <br /> Dari Karya ke Cuan 💸
          </h1>

          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg">
            Ubah cara kamu mengajar jadi lebih produktif. Belajar skill baru,
            ciptakan karya digital, dan hasilkan penghasilan tambahan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 justify-center md:justify-start">
            
            <button
              onClick={() => navigate("/login")}
              className="bg-[#DC1416] text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
            >
              Mulai Sekarang
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-lg shadow-md hover:scale-105 transition">
              Lihat Demo
            </button>

          </div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src={marica}
            alt="Marica"
            className="w-52 md:w-80 drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;