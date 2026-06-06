import { useState, useMemo } from "react";
import games from "../data/games";
import curatedImage from "../assets/curated1.jpg";

const ITEMS_PER_PAGE = 5;

const TOPICS = ["Aljabar", "Aritmetika", "Geometri", "Statistika", "Pengukuran"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Expert"];
const RATINGS = [
  { label: "4 ke atas", min: 4 },
  { label: "3 ke atas", min: 3 },
  { label: "2 ke atas", min: 2 },
  { label: "1 ke atas", min: 1 },
];

export default function TechStack() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
    setCurrentPage(1);
  };

  const filteredGames = useMemo(() => {
    return [...games]
      .filter((game) => {
        const matchSearch = game.title.toLowerCase().includes(search.toLowerCase());
        const matchTopic =
          selectedTopics.length === 0 ||
          selectedTopics.some((t) =>
            game.category?.toLowerCase().includes(t.toLowerCase())
          );
        const matchDifficulty =
          !selectedDifficulty ||
          game.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();
        const matchRating =
          !selectedRating || game.expertScore >= selectedRating;
        return matchSearch && matchTopic && matchDifficulty && matchRating;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.expertScore - a.expertScore;
        if (sortBy === "name") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [search, sortBy, selectedTopics, selectedDifficulty, selectedRating]);

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / ITEMS_PER_PAGE));
  const paginated = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#F8F5FF] p-6 md:p-8">

      {/* HERO */}
      <div className="relative h-[280px] md:h-[320px] rounded-[32px] overflow-hidden mb-10">
        <img
          src={curatedImage}
          alt="Curated Tech Stack"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-3xl px-8 md:px-12 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold mb-6">
              🔬 EGQI VERIFIED
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Curated Tech Stack
            </h1>
            <p className="text-lg md:text-2xl text-white/90 leading-relaxed">
              Temukan game edukasi terbaik yang telah dikurasi menggunakan
              Educational Game Quality Instrument (EGQI) untuk membantu
              pembelajaran yang lebih interaktif dan efektif.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Cari game..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-white text-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-[240px_1fr] gap-8">

        {/* SIDEBAR */}
        <div className="bg-white rounded-3xl p-6 h-fit shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl mb-6">Filter</h3>

          {/* Topik */}
          <div className="mb-8">
            <p className="font-semibold text-gray-900 mb-4">Topik</p>
            <div className="space-y-2">
              <label
                className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl cursor-pointer transition ${
                  selectedTopics.length === 0
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => { setSelectedTopics([]); setCurrentPage(1); }}
              >
                <input
                  type="checkbox"
                  className="accent-purple-600"
                  checked={selectedTopics.length === 0}
                  readOnly
                />
                Semua Topik
              </label>
              {TOPICS.map((t) => (
                <label
                  key={t}
                  className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl cursor-pointer transition ${
                    selectedTopics.includes(t)
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => toggleTopic(t)}
                >
                  <input
                    type="checkbox"
                    className="accent-purple-600"
                    checked={selectedTopics.includes(t)}
                    readOnly
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          {/* Tingkat Kesulitan */}
          <div className="mb-8">
            <p className="font-semibold text-gray-900 mb-4">Tingkat Kesulitan</p>
            <div className="space-y-2">
              <label
                className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl cursor-pointer transition ${
                  !selectedDifficulty
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => { setSelectedDifficulty(null); setCurrentPage(1); }}
              >
                <input type="checkbox" className="accent-purple-600" checked={!selectedDifficulty} readOnly />
                Semua Tingkat
              </label>
              {DIFFICULTIES.map((d) => (
                <label
                  key={d}
                  className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl cursor-pointer transition ${
                    selectedDifficulty === d
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => { setSelectedDifficulty(d); setCurrentPage(1); }}
                >
                  <input type="checkbox" className="accent-purple-600" checked={selectedDifficulty === d} readOnly />
                  {d}
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="font-semibold text-gray-900 mb-4">Rating</p>
            <div className="space-y-2">
              <label
                className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl cursor-pointer transition ${
                  !selectedRating
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => { setSelectedRating(null); setCurrentPage(1); }}
              >
                <input type="radio" name="rating" className="accent-purple-600" checked={!selectedRating} readOnly />
                <span>Semua Rating</span>
              </label>
              {RATINGS.map((r) => (
                <label
                  key={r.min}
                  className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl cursor-pointer transition ${
                    selectedRating === r.min
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => { setSelectedRating(r.min); setCurrentPage(1); }}
                >
                  <input type="radio" name="rating" className="accent-purple-600" checked={selectedRating === r.min} readOnly />
                  <span>
                    {"⭐".repeat(r.min)} {r.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div>
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Daftar Game Edukasi</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Total {filteredGames.length} game yang telah dikurasi
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Urutkan</span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              >
                <option value="terbaru">Terbaru</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
            </div>
          </div>

          {/* Game list */}
          <div className="space-y-4">
            {paginated.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition group"
              >
                <div className="flex flex-col lg:flex-row">

                  {/* THUMBNAIL */}
                  <div className="lg:w-[220px] h-[180px] lg:h-auto bg-gradient-to-br from-[#6D28D9] to-[#EC4899] flex items-center justify-center relative flex-shrink-0">
                    <span className="absolute top-3 left-3 bg-[#4C1D95]/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {game.gradeLevel}
                    </span>
                    <span className="text-6xl drop-shadow-lg">🎮</span>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                          {game.category}
                        </span>
                        {game.topic && (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            {game.topic}
                          </span>
                        )}
                        {game.platform && (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            {game.platform}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#7C3AED] transition">
                        {game.title}
                      </h2>

                      {/* Scores */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                          ⭐ Expert {game.expertScore}
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                          👩‍🏫 Teacher {game.teacherScore}
                        </span>
                      </div>

                      {/* Description */}
                      {game.description && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                          {game.description}
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-4">
                      <a
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] transition"
                      >
                        ▶ Mainkan Game
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredGames.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Game tidak ditemukan</h3>
              <p className="text-gray-500">Coba gunakan kata kunci atau filter lain.</p>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm font-bold"
              >
                ‹
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-[#7C3AED] text-white shadow-md shadow-purple-200"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm font-bold"
              >
                ›
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}