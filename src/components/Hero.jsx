import marica from "../assets/Marica.png";
import bg from "../assets/background.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="w-full bg-cover bg-center pt-20 md:pt-28 pb-20 md:pb-32"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-10 md:py-16 
        grid grid-cols-2 md:grid-cols-2 items-center gap-4 md:gap-10"
      >
        
        {/* TEXT */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-5xl font-bold mb-3 md:mb-6 text-gray-800 leading-tight">
            Dari Kelas ke Karya,
            <br /> Dari Karya ke Cuan 💸
          </h1>

          <p className="text-gray-600 mb-3 md:mb-6 text-xs sm:text-sm md:text-lg">
            Ubah cara kamu mengajar jadi lebih produktif. Belajar skill baru,
            ciptakan karya digital, dan hasilkan penghasilan tambahan.
          </p>

          <div className="flex gap-2 md:gap-4 mt-3 md:mt-6 flex-col sm:flex-row">
            
            <button
              onClick={() => navigate("/login")}
              className="bg-[#DC1416] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md hover:scale-105 transition text-xs md:text-base"
            >
              Mulai Sekarang
            </button>

            <button className="border border-gray-300 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md hover:scale-105 transition text-xs md:text-base">
              Lihat Demo
            </button>

          </div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={marica}
            alt="Marica"
            className="w-28 sm:w-40 md:w-80 drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;