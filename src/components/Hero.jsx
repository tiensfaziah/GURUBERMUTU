import heroImg from "../assets/gurugenz.jpg";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";
import { useEffect, useState } from "react";

function Hero() {
  const navigate = useNavigate();

  const words = ["Relevan", "Kreatif", "Interaktif", "Inovatif"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      id="home"
      className="
        relative
        scroll-mt-24
        w-full
        pt-20 md:pt-28
        pb-20 md:pb-32
        overflow-hidden
        min-h-[85vh] md:min-h-screen
        flex items-center
      "
    >

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImg}
          alt="guru gen z mengajar digital"
          className="
            w-full
            h-full
            object-cover
            object-center
            md:object-[70%_30%]
            scale-105
          "
        />
      </div>

      {/* OVERLAY MOBILE + DESKTOP */}
      <div
        className="
          absolute inset-0

          bg-black/45

          md:bg-gradient-to-r
          md:from-white
          md:via-white/80
          md:to-transparent
        "
      ></div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 w-full">

        <ScrollAnimation>
          <div className="max-w-xl text-center md:text-left">

            <h1
              className="
                text-4xl
                md:text-5xl
                font-bold
                mb-5 md:mb-6
                leading-tight

                text-white
                md:text-gray-800
              "
            >
              <span className="text-[#8B5CF6] md:text-[#5B21B6]">
                Mengajar
              </span>{" "}
              Bukan Sekadar Rutinitas,
              <br />
              Jadi Guru Gen Z yang{" "}
              <span className="text-[#F472B6] md:text-[#EC4899] transition-all duration-500">
                {words[index]}
              </span>{" "}
              di Era Digital
            </h1>

            <p
              className="
                text-white/90
                md:text-gray-600
                mb-6
                text-base
                md:text-lg
                leading-relaxed
              "
            >
              Tingkatkan cara mengajar dengan pendekatan modern,
              interaktif, dan berbasis teknologi dalam satu platform
              yang dirancang khusus untuk guru masa kini.
            </p>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3 md:gap-4
                mt-6
                justify-center
                md:justify-start
              "
            >

              <button
                onClick={() => navigate("/login")}
                className="
                  bg-[#5B21B6]
                  text-white
                  px-6
                  py-3.5
                  rounded-xl
                  shadow-lg
                  hover:scale-105
                  transition
                  font-medium
                "
              >
                Mulai Sekarang 🚀
              </button>

              <button
                className="
                  border
                  border-white/40
                  md:border-gray-300

                  bg-white/20
                  md:bg-white/80

                  backdrop-blur-md

                  text-white
                  md:text-gray-800

                  px-6
                  py-3.5
                  rounded-xl
                  hover:scale-105
                  transition
                  font-medium
                "
              >
                Lihat Demo
              </button>

            </div>

          </div>
        </ScrollAnimation>

      </div>

    </section>
  );
}

export default Hero;