import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  subscribeResources,
  addResource,
  deleteResource,
  incrementDownload,
} from "../services/marketplaceService";
import { useCurrentUser } from "../hooks/useCurrentUser";

const JENJANG_LIST = ["Semua", "SD", "SMP", "SMA", "SMK"];
const FILE_TYPES = ["PDF", "PPT", "DOC", "Gambar", "Lainnya"];

const emptyForm = {
  title: "",
  description: "",
  jenjang: "SD",
  mapel: "",
  fileType: "PDF",
  fileURL: "",
};

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeJenjang, setActiveJenjang] = useState("Semua");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeResources((data) => {
      setResources(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = resources.filter((r) => {
    const matchJenjang = activeJenjang === "Semua" || r.jenjang === activeJenjang;
    const keyword = search.toLowerCase();
    const matchSearch =
      (r.title || "").toLowerCase().includes(keyword) ||
      (r.mapel || "").toLowerCase().includes(keyword);
    return matchJenjang && matchSearch;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    if (!form.title || !form.fileURL) {
      alert("Judul dan link file wajib diisi.");
      return;
    }
    setSubmitting(true);
    try {
      await addResource(form, user);
      setForm(emptyForm);
      setShowForm(false);
    } catch (err) {
    console.error("UPLOAD ERROR:", err);
    alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    const ok = window.confirm(`Hapus "${item.title}"? Tindakan ini tidak bisa dibatalkan.`);
    if (!ok) return;
    try {
      await deleteResource(item.id);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus.");
    }
  };

  const handleDownload = async (item) => {
    try {
      await incrementDownload(item.id);
    } catch (err) {
      console.error(err);
    }
    window.open(item.fileURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen pb-16" style={{ background: "#F5F3FF" }}>
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
        <div
          className="relative rounded-[24px] md:rounded-[28px] overflow-hidden p-6 md:p-10"
          style={{ background: "linear-gradient(135deg, #2D1B69 0%, #4C2A99 100%)", minHeight: 180 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute top-4 left-4 md:top-6 md:left-6 text-white hover:text-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative z-10 pt-8 md:pt-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#F59E0B" }}>
                🛒 Resource Marketplace
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Bagikan & Temukan Materi Ajar</h1>
              <p className="text-white/70 text-sm md:text-base max-w-xl">
                Unggah dan unduh RPP, template, media ajar, gratis untuk semua guru.
              </p>
            </div>

            {user && (
              <button
                onClick={() => setShowForm((s) => !s)}
                className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition"
                style={{ background: "#fff", color: "#5B21B6" }}
              >
                <span className="text-base leading-none">+</span> Bagikan Materi
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FORM UPLOAD */}
      {showForm && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 mt-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-purple-100 p-5 md:p-6 space-y-4"
          >
            <h3 className="font-bold text-gray-800">Bagikan Materi Baru</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Judul Materi</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Contoh: RPP Matematika Kelas 5"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Mata Pelajaran</label>
                <input
                  type="text"
                  value={form.mapel}
                  onChange={(e) => setForm({ ...form, mapel: e.target.value })}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Contoh: Matematika"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Jenjang</label>
                <select
                  value={form.jenjang}
                  onChange={(e) => setForm({ ...form, jenjang: e.target.value })}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                >
                  {JENJANG_LIST.filter((j) => j !== "Semua").map((j) => (
                    <option key={j}>{j}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Jenis File</label>
                <select
                  value={form.fileType}
                  onChange={(e) => setForm({ ...form, fileType: e.target.value })}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                >
                  {FILE_TYPES.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Link File (Google Drive / Canva / dsb)
                </label>
                <input
                  type="url"
                  value={form.fileURL}
                  onChange={(e) => setForm({ ...form, fileURL: e.target.value })}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Deskripsi Singkat</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Jelaskan isi materi secara singkat..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
                style={{ background: "#5B21B6" }}
              >
                {submitting ? "Mengunggah..." : "Unggah Materi"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-purple-100 text-gray-500 hover:bg-purple-50 transition"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FILTER */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" strokeLinecap="round" />
              <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Cari materi atau mapel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-purple-100 rounded-xl pl-10 pr-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {JENJANG_LIST.map((j) => (
              <button
                key={j}
                onClick={() => setActiveJenjang(j)}
                className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition"
                style={
                  activeJenjang === j
                    ? { background: "#5B21B6", color: "#fff" }
                    : { background: "#fff", color: "#6B7280", border: "1px solid #EDE9FE" }
                }
              >
                {j}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Materi Tersedia</h2>
          <span className="text-sm text-gray-400">{filtered.length} materi ditemukan</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Memuat materi...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Belum ada materi yang cocok. Jadilah yang pertama membagikan!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => {
              const canManage = user && (item.createdBy === user.uid || user.role === "admin");
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "#EDE9FE", color: "#5B21B6" }}
                    >
                      {item.jenjang}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                      {item.fileType}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 leading-snug mb-1">{item.title}</h3>
                  {item.mapel && <p className="text-xs text-gray-400 mb-2">📘 {item.mapel}</p>}
                  {item.description && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">{item.description}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4 mt-auto">
                    <span>oleh {item.createdByName || "Guru"}</span>
                    <span>⬇ {item.downloads || 0}x diunduh</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(item)}
                      className="flex-1 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 active:scale-[0.98] transition"
                      style={{ background: "#5B21B6" }}
                    >
                      Unduh Materi
                    </button>
                    {canManage && (
                      <button
                        onClick={(e) => handleDelete(item, e)}
                        className="px-3 py-2.5 rounded-xl text-sm font-medium border border-red-100 text-red-500 hover:bg-red-50 transition"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;