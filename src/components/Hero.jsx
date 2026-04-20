import marica from "../assets/Marica.png";
import bg from "../assets/background.png";

function Hero() {
  return (
    <section
      id="home"
      className="w-full bg-cover bg-center pt-28"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-2 items-center gap-10">
        
        <div>
          <h1 className="text-5xl font-bold mb-6 text-gray-800 leading-tight">
            Dari Kelas ke Karya,
            <br /> Dari Karya ke Cuan 💸
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            Ubah cara kamu mengajar jadi lebih produktif. Belajar skill baru,
            ciptakan karya digital, dan hasilkan penghasilan tambahan.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-[#DC1416] text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition">
              Mulai Sekarang
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-lg shadow-md hover:scale-105 transition">
              Lihat Demo
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={marica}
            alt="Marica"
            className="w-80 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;