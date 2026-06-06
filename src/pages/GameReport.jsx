import { useParams} from "react-router-dom";
import games from "../data/games";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function GameReport() {
  const { slug } = useParams();

  const game = games.find(
    (g) => g.slug === slug
  );

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Game tidak ditemukan
      </div>
    );
  }

  const radarData = [
    { subject: "PQ", score: game.pq },
    { subject: "CQ", score: game.cq },
    { subject: "GQ", score: game.gq },
    { subject: "EQ", score: game.eq },
    { subject: "PrQ", score: game.prq },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5FF] py-8 px-4">

      <div className="max-w-5xl mx-auto">


        <div className="bg-white rounded-3xl p-8 mt-4 shadow-sm">

          <h1 className="text-3xl font-bold mb-2">
            Educational Game Quality Evaluation
          </h1>

          <p className="text-gray-500 mb-8">
            Laporan evaluasi kualitas game edukasi berdasarkan EGQI
          </p>

          <div className="h-[450px]">

            <ResponsiveContainer width="100%" height="100%">

              <RadarChart data={radarData}>

                <PolarGrid />

                <PolarAngleAxis
                  dataKey="subject"
                />

                <PolarRadiusAxis
                  domain={[0, 5]}
                />

                <Radar
                  dataKey="score"
                  stroke="#7C3AED"
                  fill="#7C3AED"
                  fillOpacity={0.5}
                />

              </RadarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="bg-white rounded-3xl p-8 mt-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-6">
            Evaluation Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-green-700 font-semibold mb-2">
                Strength
              </p>

              <p className="text-gray-700">
                {game.bestScore}
              </p>

              <p className="text-2xl font-bold text-green-700 mt-2">
                {game.bestScoreValue}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-5">
              <p className="text-yellow-700 font-semibold mb-2">
                Secondary Strength
              </p>

              <p className="text-gray-700">
                {game.secondBest}
              </p>

              <p className="text-2xl font-bold text-yellow-700 mt-2">
                {game.secondBestValue}
              </p>
            </div>

          </div>

        </div>

        {/* INSIGHT */}

        <div className="bg-white rounded-3xl p-8 mt-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-4">
            Insight & Recommendation
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Game <strong>{game.title}</strong> menunjukkan performa
            yang baik berdasarkan hasil evaluasi EGQI.
            Dimensi tertinggi berada pada{" "}
            <strong>{game.bestScore}</strong>,
            sehingga game ini sangat direkomendasikan untuk digunakan
            dalam proses pembelajaran sesuai dengan tujuan pedagogisnya.
          </p>

        </div>

      </div>

    </div>
  );
}