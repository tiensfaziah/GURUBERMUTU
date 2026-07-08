import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import games from "../data/games";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const TOPICS = [
  "Aljabar",
  "Aritmetika",
  "Rasio",
  "Perkalian",
  "Penjumlahan",
  "Nilai Tempat",
  "Counting",
  "Pola Bilangan",
  "Perbandingan",
];
const DIFFICULTIES = ["Beginner", "Intermediate", "Expert"];
const RATINGS = [
  { label: "4 ke atas", min: 4, stars: 4 },
  { label: "3 ke atas", min: 3, stars: 3 },
  { label: "2 ke atas", min: 2, stars: 2 },
  { label: "1 ke atas", min: 1, stars: 1 },
];

function StarRow({ filled, total = 4 }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < filled ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.35 2.437c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </span>
  );
}

function FilterChip({ label, active, onClick, extra }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2.5 text-sm px-3 py-2 rounded-xl text-left transition
        ${active
          ? "bg-[#EEEDFE] text-[#3C3489] font-medium"
          : "text-gray-500 hover:bg-gray-50"
        }
      `}
    >
      <span
        className={`
          w-4 h-4 flex-shrink-0 rounded flex items-center justify-center border transition
          ${active
            ? "bg-[#534AB7] border-[#534AB7]"
            : "border-gray-300 bg-white"
          }
        `}
      >
        {active && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
            <path d="M1.5 5l2.5 2.5 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {extra && <span>{extra}</span>}
      <span>{label}</span>
    </button>
  );
}

export default function TechStack() {
  const navigate = useNavigate();

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

  const getDifficulty = (score) => {
    if (score >= 4.5) return "Expert";
    if (score >= 4.0) return "Intermediate";
    return "Beginner";
  };

  const filteredGames = useMemo(() => {
  return [...games]
    .filter((game) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        game.title?.toLowerCase().includes(keyword) ||
        game.topic?.toLowerCase().includes(keyword) ||
        game.category?.toLowerCase().includes(keyword);

      const matchTopic =
      selectedTopics.length === 0 ||
      selectedTopics.some((t) =>
        game.topic?.toLowerCase().includes(t.toLowerCase())
  );

      const matchDifficulty =
      !selectedDifficulty ||
      getDifficulty(game.expertScore) ===
      selectedDifficulty;

      const matchRating =
        !selectedRating ||
        game.expertScore >= selectedRating;

      return (
        matchSearch &&
        matchTopic &&
        matchDifficulty &&
        matchRating
      );
    })

    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.expertScore - a.expertScore;
      }

      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "terbaru") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return 0;
    });
}, [
  search,
  sortBy,
  selectedTopics,
  selectedDifficulty,
  selectedRating,
]);

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
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
        <div
          className="relative rounded-[24px] md:rounded-[28px] overflow-hidden"
          style={{ background: "#2D1B69", minHeight: 260 }}
        >
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 260">
            {[0, 1, 2, 3, 4, 5].map((row) =>
              [0, 1, 2, 3, 4, 5].map((col) => (
                <circle key={`d-${row}-${col}`} cx={col * 40 + 20} cy={row * 40 + 10} r="1.5" fill="white" opacity="0.12" />
              ))
            )}
            <circle cx="690" cy="120" r="150" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1" />
            <circle cx="690" cy="120" r="110" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1" />
            <circle cx="690" cy="120" r="70" fill="none" stroke="white" strokeWidth="0.8" opacity="0.12" />
            <circle cx="710" cy="90" r="40" fill="#3D2380" opacity="0.8" />
            <ellipse cx="710" cy="90" rx="55" ry="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.25" transform="rotate(-20 710 90)" />
            {[[120, 40], [220, 25], [360, 35], [510, 20], [600, 60], [110, 190], [320, 200], [470, 220], [640, 200], [760, 150]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.6" />
            ))}
            <g transform="translate(600, 150)" opacity="0.18">
              <rect x="0" y="0" width="50" height="65" rx="4" fill="white" />
              <rect x="5" y="8" width="35" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="5" y="16" width="30" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="5" y="24" width="25" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="5" y="32" width="32" height="3" rx="1.5" fill="#2D1B69" />
            </g>
            <g transform="translate(660, 160)" opacity="0.15">
              <rect x="0" y="0" width="8" height="55" rx="3" fill="white" transform="rotate(-20 4 27)" />
              <polygon points="0,-4 8,-4 4,4" fill="#F59E0B" transform="rotate(-20 4 27)" />
            </g>
            <g transform="translate(510, 175)" opacity="0.2">
              <ellipse cx="18" cy="10" rx="22" ry="6" fill="white" />
              <rect x="8" y="0" width="20" height="12" rx="2" fill="white" />
              <rect x="16" y="-5" width="4" height="8" rx="1" fill="white" />
              <circle cx="18" cy="-5" r="3" fill="white" />
              <line x1="30" y1="6" x2="36" y2="18" stroke="white" strokeWidth="2" />
              <circle cx="36" cy="20" r="3" fill="white" />
            </g>
          </svg>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-20 text-white hover:text-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-10 py-12 md:py-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#F59E0B" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              </svg>
              🎮 EGQI VERIFIED
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">Curated Tech Stack</h1>
            <p className="text-white/75 text-sm md:text-lg max-w-2xl leading-relaxed">
              Temukan game edukasi yang telah dikurasi menggunakan Educational Game Quality Instrument (EGQI), sehingga guru dapat memilih media pembelajaran yang berkualitas, interaktif, dan sesuai kebutuhan kelas.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">

        {/* ── SIDEBAR ── */}
        <div className="bg-white rounded-2xl p-5 h-fit border border-gray-100 shadow-sm lg:mt-[50px]">

          <p className="text-base font-semibold text-gray-900 mb-4">Filter</p>

          {/* Topik */}
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Topik</p>
            <div className="space-y-0.5">
              <FilterChip
                label="Semua Topik"
                active={selectedTopics.length === 0}
                onClick={() => { setSelectedTopics([]); setCurrentPage(1); }}
              />
              {TOPICS.map((t) => (
                <FilterChip
                  key={t}
                  label={t}
                  active={selectedTopics.includes(t)}
                  onClick={() => toggleTopic(t)}
                />
              ))}
            </div>
          </div>

          {/* Tingkat Kesulitan */}
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Tingkat Kesulitan</p>
            <div className="space-y-0.5">
              <FilterChip
                label="Semua Tingkat"
                active={!selectedDifficulty}
                onClick={() => { setSelectedDifficulty(null); setCurrentPage(1); }}
              />
              {DIFFICULTIES.map((d) => (
                <FilterChip
                  key={d}
                  label={d}
                  active={selectedDifficulty === d}
                  onClick={() => { setSelectedDifficulty(d); setCurrentPage(1); }}
                />
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Rating</p>
            <div className="space-y-0.5">
              <FilterChip
                label="Semua Rating"
                active={!selectedRating}
                onClick={() => { setSelectedRating(null); setCurrentPage(1); }}
              />
              {RATINGS.map((r) => (
                <FilterChip
                  key={r.min}
                  label={r.label}
                  active={selectedRating === r.min}
                  onClick={() => { setSelectedRating(r.min); setCurrentPage(1); }}
                  extra={<StarRow filled={r.stars} />}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ── CONTENT ── */}
        <div>
{/* SEARCH */}
  <div className="mb-5">
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Cari game..."
        className="
          w-full
          bg-white
          border border-gray-200
          rounded-2xl
          pl-12
          pr-4
          py-3
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-[#7C3AED]
          focus:border-transparent
        "
      />
    </div>
  </div>
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-800">{filteredGames.length} game</span> yang telah dikurasi
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Urutkan</span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent cursor-pointer"
              >
                <option value="terbaru">Terbaru</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
            </div>
          </div>

          {/* Game list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {paginated.map((game, index) => (
              <div
                key={game.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C4B5FD] hover:shadow-md transition-all group flex flex-col h-full"
          >
                {/* THUMBNAIL */}
<div className="h-[110px] relative overflow-hidden">

  <span className="absolute top-3 left-3 z-10 bg-black/35 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
    {game.gradeLevel}
  </span>

  <img
    src={game.thumbnail}
    alt={game.title}
    className="w-full h-full object-cover"
  />

</div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="bg-[#EEEDFE] text-[#3C3489] px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {game.category}
                    </span>
                    {game.topic && (
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {game.topic}
                      </span>
                    )}
                    {game.platform && (
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {game.platform}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-[#534AB7] transition leading-snug">
                    {game.title}
                  </h2>

                  {/* Description */}
                  {game.description && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 min-h-[40px]">
                      {game.description}
                    </p>
                  )}

                  {/* Scores */}
                  <div className="flex flex-wrap gap-2 mt-3 mb-3">
                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                      ⭐ Expert {game.expertScore}
                    </span>
                    <span className="bg-[#EEEDFE] text-[#3C3489] px-3 py-1 rounded-full text-xs font-medium">
                      👩‍🏫 Teacher {game.teacherScore}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <Link
                      to={`/game/${game.slug}`}
                      className="w-full text-center px-4 py-2 border border-[#7C3AED] text-[#7C3AED] rounded-xl text-xs font-semibold hover:bg-[#EEEDFE] transition"
                    >
                      📄 Lihat Detail
                    </Link>
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-xs font-semibold hover:bg-[#6D28D9] transition"
                    >
                      ▶ Mainkan Game
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredGames.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Game tidak ditemukan</h3>
              <p className="text-gray-400 text-sm">Coba gunakan kata kunci atau filter lain.</p>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-6">

              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#7C3AED] text-white"
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
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

