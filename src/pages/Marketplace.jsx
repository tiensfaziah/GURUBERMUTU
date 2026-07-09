import React, { useState, useEffect } from "react";
import {
  subscribeResources,
  addResource,
  deleteResource,
  incrementDownload,
} from "../services/marketplaceService";
import { uploadToCloudinary } from "../services/cloudinaryService";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

const JENJANG_LIST = ["Semua", "SD", "SMP", "SMA", "SMK"];
const FILE_TYPES = ["PDF", "PPT", "DOC", "Gambar", "Lainnya"];

const getFileIcon = (type) => {
  switch (type) {
    case "PDF":
      return "📕";
    case "PPT":
      return "📊";
    case "DOC":
      return "📄";
    case "Gambar":
      return "🖼️";
    default:
      return "📁";
  }
};

const getFileStyle = (type) => {
  switch (type) {
    case "PDF":
      return { bg: "#FCE7F3", accent: "#EC4899" };
    case "PPT":
      return { bg: "#FEF3C7", accent: "#B45309" };
    case "DOC":
      return { bg: "#EDE9FE", accent: "#5B21B6" };
    case "Gambar":
      return { bg: "#DBEAFE", accent: "#2563EB" };
    default:
      return { bg: "#F3F4F6", accent: "#6B7280" };
  }
};

const ACCEPT_MAP = {
  PDF: ".pdf,application/pdf",
  PPT: ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
  DOC: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  Gambar: ".jpg,.jpeg,.png,image/jpeg,image/png",
  Lainnya: "*/*",
};

const MAX_FILE_SIZE_MB = 15;

const emptyForm = {
  title: "",
  description: "",
  jenjang: "SD",
  mapel: "",
  fileType: "PDF",
  fileURL: "",
  storagePath: "",
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
  const [uploadMode, setUploadMode] = useState("file");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileError, setFileError] = useState("");

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

  const sortedResources = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "Terbaru":
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      case "Terbanyak":
        return (b.downloads || 0) - (a.downloads || 0);
      case "A-Z":
        return (a.title || "").localeCompare(b.title || "");
      default:
        return 0;
    }
  });
  const resetFormState = () => {
    setForm(emptyForm);
    setSelectedFile(null);
    setUploadProgress(0);
    setFileError("");
    setUploadMode("file");
    setShowForm(false);
  };
  const handleFileChange = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {

    setFileError(
      `Ukuran file maksimal ${MAX_FILE_SIZE_MB} MB`
    );

    return;
  }

  setFileError("");

  setSelectedFile(file);

};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    if (!form.title) {
      alert("Judul wajib diisi.");
      return;
    }
    if (uploadMode === "link" && !form.fileURL) {
      alert("Link file wajib diisi.");
      return;
    }
    if (uploadMode === "file" && !selectedFile) {
      alert("Pilih file yang mau diunggah dulu.");
      return;
    }

    setSubmitting(true);
    try {
      let payload = { ...form };

      if (uploadMode === "file") {
        setUploadProgress(0);
        const result = await uploadToCloudinary(
  selectedFile,
  (pct) => setUploadProgress(pct)
);

payload = {
  ...payload,
  fileURL: result.url,
  storagePath: result.publicId,
};
      } else {
        payload = { ...payload, storagePath: "" };
      }

      await addResource(payload, user);
      resetFormState();
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert(err.message || "Gagal mengunggah materi. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    const ok = window.confirm(`Hapus "${item.title}"? Tindakan ini tidak bisa dibatalkan.`);
    if (!ok) return;
    try {
      await deleteResource(item.id, item.storagePath);
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
        <div
          className="relative rounded-[24px] md:rounded-[28px] overflow-hidden"
          style={{ background: "#2D1B69", minHeight: 260 }}
        >
          {/* Dekorasi SVG */}
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
            {[[120, 40], [220, 25], [360, 35], [510, 20], [600, 60], [110, 190], [320, 200], [470, 220], [640, 200], [760, 150]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.6" />
            ))}
            {/* Stack dokumen */}
            <g transform="translate(600, 120)" opacity="0.18">
              <rect x="10" y="10" width="55" height="70" rx="4" fill="white" />
              <rect x="0" y="0" width="55" height="70" rx="4" fill="white" />
              <rect x="8" y="12" width="38" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="8" y="20" width="32" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="8" y="28" width="36" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="8" y="36" width="26" height="3" rx="1.5" fill="#2D1B69" />
            </g>
            {/* Panah unggah */}
            <g transform="translate(690, 170)" opacity="0.2">
              <circle cx="0" cy="0" r="22" fill="white" />
              <path d="M0 8 V-8 M-6 -2 L0 -8 L6 -2" stroke="#2D1B69" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>

          <button
            onClick={() => navigate("/dashboard")}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-20 text-white hover:text-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-10 py-12 md:py-16">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#F59E0B" }}
            >
              🛒 Resource Marketplace
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Bagikan & Temukan Materi Ajar
            </h1>
            <p className="text-white/75 text-sm md:text-lg max-w-2xl leading-relaxed">
              Unggah dan unduh RPP, template, media ajar, gratis untuk semua guru.
            </p>

            {/* Statistik Marketplace */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8 max-w-2xl">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-3 md:p-4 text-center border border-white/10">
                <h2 className="text-xl md:text-2xl font-bold text-white">{resources.length}</h2>
                <p className="text-white/70 text-xs md:text-sm">Materi</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-3 md:p-4 text-center border border-white/10">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {new Set(resources.map((r) => r.createdBy)).size}
                </h2>
                <p className="text-white/70 text-xs md:text-sm">Kontributor</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-3 md:p-4 text-center border border-white/10">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {resources.reduce((total, item) => total + (item.downloads || 0), 0)}
                </h2>
                <p className="text-white/70 text-xs md:text-sm">Download</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-3 md:p-4 text-center border border-white/10">
                <h2 className="text-xl md:text-2xl font-bold text-white">{FILE_TYPES.length}</h2>
                <p className="text-white/70 text-xs md:text-sm">Jenis File</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR (sticky, senada dengan Workshop) */}
      <div className="bg-white border-b border-purple-100 sticky top-0 z-10 mt-4 md:mt-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {JENJANG_LIST.map((j) => (
                <button
                  key={j}
                  onClick={() => setActiveJenjang(j)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition"
                  style={
                    activeJenjang === j
                      ? { background: "#5B21B6", color: "#fff" }
                      : { background: "#F5F3FF", color: "#6B7280" }
                  }
                >
                  {j}
                </button>
              ))}
            </div>

            {user && (
              <button
                onClick={() => setShowForm((s) => !s)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition"
                style={{ background: "#5B21B6" }}
              >
                <span className="text-base leading-none">+</span>
                <span className="hidden sm:inline">Bagikan Materi</span>
                <span className="sm:hidden">Bagikan</span>
              </button>
            )}
          </div>

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
                className="w-full border border-purple-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-purple-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              <option value="Terbaru">🆕 Terbaru</option>
              <option value="Terbanyak">🔥 Paling Banyak Diunduh</option>
              <option value="A-Z">🔤 A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* FORM UPLOAD */}
      {showForm && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6">
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
                  onChange={(e) => {
                    setForm({ ...form, fileType: e.target.value });
                    setSelectedFile(null);
                    setFileError("");
                  }}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                >
                  {FILE_TYPES.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Sumber Materi</label>
                <div className="inline-flex rounded-xl border border-purple-100 p-1 bg-purple-50/50 mb-3">
                  <button
                    type="button"
                    onClick={() => setUploadMode("file")}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium transition"
                    style={
                      uploadMode === "file"
                        ? { background: "#5B21B6", color: "#fff" }
                        : { color: "#6B7280" }
                    }
                  >
                    📤 Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode("link")}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium transition"
                    style={
                      uploadMode === "link"
                        ? { background: "#5B21B6", color: "#fff" }
                        : { color: "#6B7280" }
                    }
                  >
                    🔗 Link
                  </button>
                </div>

                {uploadMode === "file" ? (
                  <div>
                    <label
                      htmlFor="resource-file-input"
                      className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-purple-200 rounded-xl px-4 py-6 text-center cursor-pointer hover:bg-purple-50/50 transition"
                    >
                      <span className="text-2xl">{getFileIcon(form.fileType)}</span>
                      {selectedFile ? (
                        <span className="text-sm font-medium text-gray-700 break-all">{selectedFile.name}</span>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Klik untuk pilih file{" "}
                          <span className="text-gray-400">
                            ({form.fileType}, maks {MAX_FILE_SIZE_MB}MB)
                          </span>
                        </span>
                      )}
                    </label>
                    <input
                      id="resource-file-input"
                      type="file"
                      accept={ACCEPT_MAP[form.fileType]}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {fileError && <p className="text-xs text-red-500 mt-1.5">{fileError}</p>}

                    {submitting && uploadMode === "file" && (
                      <div className="mt-3">
                        <div className="h-2 rounded-full overflow-hidden bg-purple-100">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${uploadProgress}%`, background: "#5B21B6" }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{uploadProgress}% terunggah...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type="url"
                    value={form.fileURL}
                    onChange={(e) => setForm({ ...form, fileURL: e.target.value })}
                    className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="https://drive.google.com/..."
                  />
                )}
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
                {submitting
                  ? uploadMode === "file"
                    ? "Mengunggah..."
                    : "Menyimpan..."
                  : "Unggah Materi"}
              </button>
              <button
                type="button"
                onClick={resetFormState}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-purple-100 text-gray-500 hover:bg-purple-50 transition"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LIST */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Materi Tersedia</h2>
          <span className="text-xs md:text-sm text-gray-400">{sortedResources.length} materi ditemukan</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Memuat materi...</div>
        ) : sortedResources.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Belum ada materi yang cocok. Jadilah yang pertama membagikan!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {sortedResources.map((item) => {
              const canManage = user && (item.createdBy === user.uid || user.role === "admin");
              const fileStyle = getFileStyle(item.fileType);
              return (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Header ikon file */}
                  <div
                    className="relative h-28 md:h-32 flex items-center justify-center"
                    style={{ background: fileStyle.bg }}
                  >
                    <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                      {getFileIcon(item.fileType)}
                    </span>

                    <span
                      className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full text-white backdrop-blur"
                      style={{ background: "rgba(45,27,105,0.75)" }}
                    >
                      {item.jenjang}
                    </span>

                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm"
                      style={{ background: "#fff", color: fileStyle.accent }}
                    >
                      {item.fileType}
                    </span>

                    {canManage && (
                      <button
                        onClick={(e) => handleDelete(item, e)}
                        className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-red-500 bg-white/90 hover:bg-red-50 shadow-sm transition"
                        aria-label="Hapus materi"
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <div className="p-4 md:p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 leading-snug mb-1 line-clamp-2 min-h-[2.6em]">
                      {item.title}
                    </h3>
                    {item.mapel && <p className="text-xs text-gray-400 mb-2">📘 {item.mapel}</p>}
                    {item.description && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    )}

                    <div className="flex-1" />

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4 mt-2">
                      <span className="truncate">oleh {item.createdByName || "Guru"}</span>
                      <span className="shrink-0 ml-2">⬇ {item.downloads || 0}x</span>
                    </div>

                    <button
                      onClick={() => handleDownload(item)}
                      className="w-full text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 active:scale-[0.98] transition"
                      style={{ background: "#5B21B6" }}
                    >
                      Unduh Materi
                    </button>
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