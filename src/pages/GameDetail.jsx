import { useParams} from "react-router-dom";
import games from "../data/games";

export default function GameDetail() {
  const { slug } = useParams();

  const game = games.find(
    (g) => g.slug === slug
  );

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Game tidak ditemukan 😢
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5FF]">

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* HERO */}
        <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden mt-4 md:mt-6 shadow-sm">

          <div className="h-[180px] md:h-[320px] bg-gradient-to-br from-[#6D28D9] to-[#EC4899] flex items-center justify-center">
            <span className="text-6xl md:text-8xl">🎮</span>
          </div>

          <div className="p-4 md:p-8">

            <div className="flex flex-wrap gap-3 mb-4">

              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs md:text-sm">
                {game.category}
              </span>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                {game.gradeLevel}
              </span>

            </div>

            <h1 className="text-xl md:text-4xl font-bold mb-3 md:mb-4">
              {game.title}
            </h1>

            <p className="text-gray-600 text-sm md:text-lg mb-5 md:mb-6 leading-relaxed">
              {game.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">

              <div className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full text-xs md:text-sm font-semibold">
                ⭐ Expert {game.expertScore}
              </div>

              <div className="bg-purple-100 text-purple-700 px-5 py-3 rounded-full font-semibold">
                👩‍🏫 Teacher {game.teacherScore}
              </div>

            </div>

            <a
              href={game.url}
              target="_blank"
              rel="noreferrer"
              className="
inline-flex
items-center
px-5
md:px-8
py-2.5
md:py-4
rounded-xl
md:rounded-2xl
text-sm
md:text-base
"
            >
              ▶ Mainkan Game
            </a>

          </div>
        </div>

        {/* INFORMASI */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 mt-6 md:mt-8">

          <InfoCard
            title="Topik"
            value={game.topic}
          />

          <InfoCard
            title="Kurikulum"
            value={game.curriculum}
          />

          <InfoCard
            title="Kemampuan Kognitif"
            value={game.cognitiveSkill}
          />

          <InfoCard
            title="Genre"
            value={game.genre}
          />

          <InfoCard
            title="Durasi"
            value={game.duration}
          />

          <InfoCard
            title="Akses"
            value={game.access}
          />

        </div>

        {/* EGQI */}
        <div className="bg-white rounded-3xl p-8 mt-8 shadow-sm">

          <h2 className="text-2xl font-bold mb-6">
            Skor EGQI
          </h2>

          <div className="grid grid-cols-5 gap-2 md:gap-4">

            <ScoreCard title="PQ" score={game.pq} />
            <ScoreCard title="CQ" score={game.cq} />
            <ScoreCard title="GQ" score={game.gq} />
            <ScoreCard title="EQ" score={game.eq} />
            <ScoreCard title="PrQ" score={game.prq} />

          </div>

        </div>

        {/* KEUNGGULAN */}
        <div className="bg-white rounded-3xl p-8 mt-8 shadow-sm">

          <h2 className="text-2xl font-bold mb-4">
            Keunggulan Utama
          </h2>

          <p className="text-lg text-gray-700">
            🏆 {game.bestScore} ({game.bestScoreValue})
          </p>

          <p className="text-lg text-gray-700 mt-3">
            ⭐ {game.secondBest} ({game.secondBestValue})
          </p>

        </div>

        {/* PERSONA */}
        <div className="bg-white rounded-3xl p-8 mt-8 shadow-sm">

          <h2 className="text-2xl font-bold mb-4">
            Persona yang Cocok
          </h2>

          <div className="bg-indigo-50 p-6 rounded-2xl">

            <h3 className="text-xl font-bold text-indigo-700 mb-2">
              {game.persona}
            </h3>

            <p className="text-gray-600">
              {game.scenario}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-sm">
      <h3 className="text-[10px] md:text-base uppercase md:normal-case text-gray-400 font-bold mb-1 md:mb-2">
        {title}
      </h3>

      <p className="text-[11px] md:text-base text-gray-600 leading-relaxed">
        {value}
      </p>
    </div>
  );
}

function ScoreCard({ title, score }) {
  return (
    <div className="bg-purple-50 rounded-2xl p-5 text-center">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-[#7C3AED]">
        {score}
      </h3>

    </div>
  );
}