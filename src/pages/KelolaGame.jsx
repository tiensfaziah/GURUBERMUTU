import { useState, useMemo } from "react";
import AdminLayout from "./AdminLayout";
import games from "../data/games";

export default function KelolaGame() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  const filtered = useMemo(
    () => games.filter((g) => g.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const openAddModal = () => {
    setEditingGame(null);
    setShowModal(true);
  };

  const openEditModal = (game) => {
    setEditingGame(game);
    setShowModal(true);
  };

  return (
    <AdminLayout>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[1.6rem] font-bold text-gray-900 tracking-tight mb-0.5">
            Kelola Game
          </h1>
          <p className="text-[13.5px] text-gray-400">
            Tambah, ubah, atau hapus data game edukasi
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] transition flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Game
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-5">
        <svg
  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Cari nama game..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[15px] border border-[#f0edfb] overflow-hidden">
        <div className="overflow-x-auto min-w-full">
          <table className="min-w-[1000px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FAFAFF]">
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Game</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Topik</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5 min-w-[120px]">Grade</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Genre</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Skor Expert</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Link</th>
                <th className="text-right font-semibold text-gray-500 text-xs px-5 py-3.5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((game) => (
                <tr key={game.id} className="border-b border-gray-50 hover:bg-[#FAFAFF] transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
  <img
    src={game.thumbnail}
    alt={game.title}
    className="w-full h-full object-cover"
  />
</div>
                      <span className="font-semibold text-gray-900 text-[13px]">{game.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs max-w-[180px] truncate">{game.topic}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-[#EEEDFE] text-[#5B21B6]">
                      {game.gradeLevel}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs">{game.genre}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                      ⭐ {game.expertScore}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7C3AED] text-xs font-semibold hover:underline"
                    >
                      Buka ↗
                    </a>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(game)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#7C3AED] hover:border-[#C4B5FD] transition"
                        title="Edit"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                        title="Hapus"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                    Tidak ada game yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT — sederhana, sesuaikan field dengan struktur games.js */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                {editingGame ? "Edit Game" : "Tambah Game Baru"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Game</label>
                <input
                  type="text"
                  defaultValue={editingGame?.title}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  placeholder="Mis: Detective X"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Deskripsi Singkat</label>
                <textarea
                  defaultValue={editingGame?.description}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] resize-none"
                  placeholder="Penjelasan 1-2 kalimat tema dan misi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Topik Materi</label>
                  <input
                    type="text"
                    defaultValue={editingGame?.topic}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Grade Level</label>
                  <input
                    type="text"
                    defaultValue={editingGame?.gradeLevel}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Genre</label>
                  <input
                    type="text"
                    defaultValue={editingGame?.genre}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Durasi</label>
                  <input
                    type="text"
                    defaultValue={editingGame?.duration}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    placeholder="Mis: 5-10 Menit"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Link Akses (URL)</label>
                <input
                  type="url"
                  defaultValue={editingGame?.url}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  onClick={(e) => { e.preventDefault(); setShowModal(false); }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] transition"
                >
                  {editingGame ? "Simpan Perubahan" : "Tambah Game"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}