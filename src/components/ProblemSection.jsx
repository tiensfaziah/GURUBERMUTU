import ScrollAnimation from "../components/ScrollAnimation";

function ProblemSection() {
  return (
    <section
      id="fitur"
      className="relative overflow-hidden bg-[#FCFCFD]"
    >

      {/* BACKGROUND CIRCLE */}
      <div
        className="
          absolute
          -top-32
          -right-32
          w-[350px]
          h-[350px]
          md:w-[700px]
          md:h-[700px]
          rounded-full
          bg-[#F3F0FF]
          opacity-80
        "
      ></div>

      {/* CONTENT */}
      <div
        className="
          relative
          max-w-7xl
          mx-auto
          px-6
          md:px-16
          py-20
          md:py-28
          grid
          md:grid-cols-2
          gap-14
          items-start
        "
      >

        {/* LEFT SIDE */}
        <div>

          {/* LABEL */}
          <ScrollAnimation>
            <div
              className="
                inline-flex
                items-center
                gap-2

                px-4
                py-2

                rounded-full

                bg-[#EEE8FF]
                text-[#6D28D9]

                text-xs
                md:text-sm

                font-semibold
                tracking-wide
                uppercase
              "
            >
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
              Realita di Lapangan
            </div>
          </ScrollAnimation>

          {/* LINE */}
          <div className="w-14 h-1 bg-[#7C3AED] rounded-full mt-6 mb-6"></div>

          {/* TITLE */}
          <ScrollAnimation delay={0.1}>
            <h2
              className="
                text-3xl
                md:text-5xl
                font-bold
                leading-tight
                text-gray-900
              "
            >
              Guru-guru
              <br />

              <span className="text-[#7C3AED]">
                Pernah Ngalamin
              </span>

              <br />
              Ini? 🤔
            </h2>
          </ScrollAnimation>

          {/* DESC */}
          <ScrollAnimation delay={0.2}>
            <p
              className="
                mt-6
                text-gray-600
                text-sm
                md:text-lg
                leading-relaxed
                max-w-xl
              "
            >
              Kamu bukan sendirian. Jutaan guru menghadapi
              masalah yang sama setiap harinya.
            </p>
          </ScrollAnimation>

          {/* PROBLEM LIST */}
          <div className="mt-10 space-y-5">

            {/* ITEM 1 */}
            <ScrollAnimation delay={0.3}>
              <div
                className="
                  flex
                  items-start
                  gap-4

                  bg-white
                  border
                  border-[#E9D5FF]

                  rounded-2xl

                  p-5

                  shadow-sm
                  hover:shadow-md

                  transition
                "
              >

                {/* ICON */}
                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-[#F3F0FF]

                    flex
                    items-center
                    justify-center

                    text-[#7C3AED]
                    font-bold
                    text-lg

                    flex-shrink-0
                  "
                >
                  ✖
                </div>

                {/* TEXT */}
                <div>
                  <h3
                    className="
                      text-lg
                      md:text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Ngerasa stuck saat ngajar?
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      md:text-base
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    Ide habis, siswa kurang antusias,
                    dan semangat mulai memudar.
                  </p>
                </div>

              </div>
            </ScrollAnimation>

            {/* ITEM 2 */}
            <ScrollAnimation delay={0.4}>
              <div
                className="
                  flex
                  items-start
                  gap-4

                  bg-white
                  border
                  border-[#E9D5FF]

                  rounded-2xl

                  p-5

                  shadow-sm
                  hover:shadow-md

                  transition
                "
              >

                {/* ICON */}
                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-[#F3F0FF]

                    flex
                    items-center
                    justify-center

                    text-[#7C3AED]
                    font-bold
                    text-lg

                    flex-shrink-0
                  "
                >
                  ✖
                </div>

                {/* TEXT */}
                <div>
                  <h3
                    className="
                      text-lg
                      md:text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Materi itu-itu aja, tuntutan makin banyak?
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      md:text-base
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    Kurikulum berubah cepat tapi waktu
                    belajar mandiri terbatas.
                  </p>
                </div>

              </div>
            </ScrollAnimation>

            {/* ITEM 3 */}
            <ScrollAnimation delay={0.5}>
              <div
                className="
                  flex
                  items-start
                  gap-4

                  bg-white
                  border
                  border-[#E9D5FF]

                  rounded-2xl

                  p-5

                  shadow-sm
                  hover:shadow-md

                  transition
                "
              >

                {/* ICON */}
                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-[#F3F0FF]

                    flex
                    items-center
                    justify-center

                    text-[#7C3AED]
                    font-bold
                    text-lg

                    flex-shrink-0
                  "
                >
                  ✖
                </div>

                {/* TEXT */}
                <div>
                  <h3
                    className="
                      text-lg
                      md:text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Udah belajar tapi belum ada hasil nyata?
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      md:text-base
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    Waktu dan energi terkuras,
                    namun perkembangan terasa stagnan.
                  </p>
                </div>

              </div>
            </ScrollAnimation>

          </div>

          {/* TEXT CTA */}
          <ScrollAnimation delay={0.6}>
            <div
              className="
                mt-12

                inline-flex
                items-center
                gap-3

                px-5
                py-3

                rounded-full

                bg-[#F3F0FF]

                text-[#7C3AED]
                font-semibold

                text-sm
                md:text-base
              "
            >
              <span className="text-lg">✨</span>
              Tenang, ada solusinya!
            </div>
          </ScrollAnimation>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-10 md:pt-28">

          {/* STAT 1 */}
          <ScrollAnimation delay={0.2}>
            <div>
              <p className="text-base md:text-lg text-gray-900">
                Guru merasa burnout setiap tahun
              </p>

              <h3
                className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  text-[#7C3AED]
                  mt-3
                "
              >
                74%
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  md:text-base
                  text-gray-600
                  leading-relaxed
                "
              >
                akibat beban kerja & kurangnya support
                pengembangan diri
              </p>
            </div>
          </ScrollAnimation>

          {/* STAT 2 */}
          <ScrollAnimation delay={0.3}>
            <div>
              <p className="text-base md:text-lg text-gray-900">
                Pelatihan yang benar-benar relevan
              </p>

              <h3
                className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  text-[#7C3AED]
                  mt-3
                "
              >
                1 dari 5
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  md:text-base
                  text-gray-600
                  leading-relaxed
                "
              >
                guru merasa pelatihan yang tersedia
                sesuai kebutuhan mereka
              </p>
            </div>
          </ScrollAnimation>

          {/* TESTIMONI */}
          <ScrollAnimation delay={0.4}>
            <div
              className="
                relative

                mt-4

                bg-[#F8F5FF]
                border
                border-[#D8B4FE]

                rounded-3xl

                p-6
                md:p-8

                shadow-sm

                overflow-hidden
              "
            >

              {/* BLUR DECORATION */}
              <div
                className="
                  absolute
                  -bottom-10
                  -right-10

                  w-40
                  h-40

                  bg-[#C084FC]/20

                  rounded-full
                  blur-3xl
                "
              ></div>

              {/* QUOTE ICON */}
              <div
                className="
                  absolute
                  top-4
                  right-6

                  text-7xl
                  md:text-8xl

                  text-[#E9D5FF]

                  font-serif
                  opacity-70

                  pointer-events-none
                  select-none
                "
              >
                ”
              </div>

              {/* CONTENT */}
              <div className="relative z-10">

                <p
                  className="
                    text-base
                    md:text-xl

                    italic
                    leading-relaxed
                    text-gray-900

                    pr-10
                  "
                >
                  "Saya sudah ikut banyak pelatihan,
                  tapi tetap ngerasa bingung harus
                  mulai dari mana untuk berkembang."
                </p>

                {/* PROFILE */}
                <div className="flex items-center gap-4 mt-8">

                  <div
                    className="
                      w-12
                      h-12

                      rounded-full

                      bg-[#E9D5FF]

                      flex
                      items-center
                      justify-center

                      font-bold
                      text-[#7C3AED]
                    "
                  >
                    SR
                  </div>

                  <div>
                    <h4
                      className="
                        font-bold
                        text-lg
                        text-gray-900
                      "
                    >
                      Sari Rahayu
                    </h4>

                    <p
                      className="
                        text-sm
                        md:text-base
                        text-gray-600
                        mt-1
                      "
                    >
                      Guru SD, Bandung
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </ScrollAnimation>

        </div>

      </div>
    </section>
  );
}

export default ProblemSection;