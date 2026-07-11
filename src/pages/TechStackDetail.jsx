import { useParams } from "react-router-dom";
import games from "../data/games";

export default function TechStackDetail() {
  const { slug } = useParams();

  const game = games.find(
    (item) => item.slug === slug
  );

  if (!game) {
    return (
      <div className="p-6 sm:p-10 text-xl sm:text-3xl">
        Game tidak ditemukan
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5FF] p-4 sm:p-6 md:p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow">

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 break-words">
          {game.title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 sm:mb-4">
          {game.category}
        </p>

        <p className="text-sm sm:text-base md:text-lg mb-4">
          {game.gradeLevel}
        </p>

        <div className="bg-yellow-100 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base">
          ⭐ Expert Score {game.expertScore}
        </div>

      </div>

    </div>
  );
}