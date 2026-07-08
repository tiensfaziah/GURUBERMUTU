import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  subscribeResources,
  addResource,
  deleteResource,
  incrementDownload,
} from "../services/marketplaceService";

import { useCurrentUser } from "../hooks/useCurrentUser";

const JENJANG_LIST = [
  "Semua",
  "SD",
  "SMP",
  "SMA",
  "SMK",
];

const FILE_TYPES = [
  "PDF",
  "PPT",
  "DOC",
  "Gambar",
  "Lainnya",
];

const emptyForm = {
  title: "",
  description: "",
  jenjang: "SD",
  mapel: "",
  fileType: "PDF",
  fileURL: "",
};

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

const getBadge = (downloads = 0) => {
  if (downloads >= 100)
    return {
      text: "🔥 Populer",
      color: "#F97316",
      bg: "#FFF7ED",
    };

  if (downloads >= 50)
    return {
      text: "⭐ Favorit",
      color: "#EAB308",
      bg: "#FEFCE8",
    };

  return {
    text: "🆕 Baru",
    color: "#2563EB",
    bg: "#EFF6FF",
  };
};

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeJenjang, setActiveJenjang] =
    useState("Semua");
  const [sortBy, setSortBy] =
    useState("Terbaru");
  const [showForm, setShowForm] =
    useState(false);
  const [form, setForm] =
    useState(emptyForm);
  const [submitting, setSubmitting] =
    useState(false);
  useEffect(() => {
    const unsub = subscribeResources((data) => {
      setResources(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  const filtered = useMemo(() => {
    let data = [...resources];
    data = data.filter((item) => {
      const keyword = search.toLowerCase();
      const cocokSearch =
        (item.title || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.description || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.mapel || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.createdByName || "")
          .toLowerCase()
          .includes(keyword);
      const cocokJenjang =
        activeJenjang === "Semua" ||
        item.jenjang === activeJenjang;
      return cocokSearch && cocokJenjang;
    });
    switch (sortBy) {
      case "Terbaru":
        data.sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
        );
        break;
      case "Terbanyak":
        data.sort(
          (a, b) =>
            (b.downloads || 0) -
            (a.downloads || 0)
        );
        break;
      case "A-Z":
        data.sort((a, b) =>
          (a.title || "").localeCompare(
            b.title || ""
          )
        );
        break;
      default:
        break;
    }
    return data;
  }, [
    resources,
    search,
    activeJenjang,
    sortBy,
  ]);

  const totalDownload = resources.reduce(
    (sum, item) =>
      sum + (item.downloads || 0),
    0
  );

  const totalContributor =
    new Set(
      resources.map(
        (r) => r.createdBy
      )
    ).size;

  /* HANDLE UPLOAD */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    if (form.title.trim().length < 5) {
      alert("Judul minimal 5 karakter.");
      return;
    }
    if (!form.fileURL.startsWith("http")) {
      alert("Link file tidak valid.");
      return;
    }
    setSubmitting(true);
    try {
      await addResource(form, user);
      alert("✅ Materi berhasil dibagikan.");
      setForm(emptyForm);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Upload gagal.");
    } finally {
      setSubmitting(false);
    }
  };

  /* HANDLE DELETE */

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    const ok = window.confirm(
      `Hapus "${item.title}" ?`
    );
    if (!ok) return;
    try {
      await deleteResource(item.id);
      alert("Materi berhasil dihapus.");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus.");
    }
  };

  /* HANDLE DOWNLOAD */

  const handleDownload = async (item) => {
    try {
      await incrementDownload(item.id);
    } catch (err) {
      console.log(err);
    }
    window.open(
      item.fileURL,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* HANDLE PREVIEW */

  const handlePreview = (item) => {
  if (!item.fileURL) return;
  window.open(
    item.fileURL,
    "_blank",
    "noopener,noreferrer"
  );
};

  /* RETURN */

  return (
    <div
      className="min-h-screen pb-16"
      style={{
        background: "#F5F3FF",
      }}
    >

      {/* HERO */}

      <div className="max-w-7xl mx-auto px-5 pt-6">
        <div
          className="relative overflow-hidden rounded-[30px] p-8 lg:p-10"
          style={{
            background:
              "linear-gradient(135deg,#2D1B69,#5B21B6)",
          }}
        >

          {/* BACK */}

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="absolute left-6 top-6 text-white hover:scale-110 transition"
          >
            ←
          </button>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div>
                <span className="text-yellow-300 font-semibold uppercase tracking-widest text-xs">
                  Marketplace GuruBermutu
                </span>
                <h1 className="text-4xl font-bold text-white mt-3">
                  Bagikan & Temukan
                  <br />
                  Materi Terbaik
                </h1>
                <p className="text-white/70 mt-4 max-w-xl">
                  Berbagi RPP,
                  Modul,
                  PPT,
                  Media Pembelajaran,
                  Template,
                  dan berbagai materi pendidikan.
                </p>
              </div>
              {user && (
                <button
                  onClick={() =>
                    setShowForm(
                      !showForm
                    )
                  }
                  className="bg-white text-purple-800 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
                >
                  + Bagikan Materi
                </button>
              )}
            </div>

            {/* STATISTIK */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">
                <p className="text-white/60 text-sm">
                  Total Materi
                </p>
                <h2 className="text-white text-3xl font-bold mt-2">
                  {resources.length}
                </h2>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">
                <p className="text-white/60 text-sm">
                  Guru Berbagi
                </p>
                <h2 className="text-white text-3xl font-bold mt-2">
                  {totalContributor}
                </h2>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">
                <p className="text-white/60 text-sm">
                  Total Download
                </p>
                <h2 className="text-white text-3xl font-bold mt-2">
                  {totalDownload}
                </h2>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">
                <p className="text-white/60 text-sm">
                  Jenis File
                </p>
                <h2 className="text-white text-3xl font-bold mt-2">
                  {FILE_TYPES.length}
                </h2>
              </div>
            </div>
          </div>
        </div>
        </div>

              {/* SEARCH + FILTER */}

      <div className="max-w-7xl mx-auto px-5 mt-8">
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-5">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* SEARCH */}
            <div className="relative lg:col-span-2">
              <span className="absolute left-4 top-3.5 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Cari judul, mapel, guru..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-purple-100 pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* SORT */}

            <select
              value={sortBy}
              onChange={(e)=>setSortBy(e.target.value)}
              className="rounded-2xl border border-purple-100 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="Terbaru">
                🆕 Terbaru
              </option>
              <option value="Terbanyak">
                🔥 Terpopuler
              </option>
              <option value="A-Z">
                🔤 A-Z
              </option>
            </select>
          </div>

          {/* FILTER */}

          <div className="flex flex-wrap gap-3 mt-6">
            {JENJANG_LIST.map((item)=>(
              <button
                key={item}
                onClick={()=>setActiveJenjang(item)}
                className={`px-5 py-2 rounded-full transition-all font-medium
                ${
                  activeJenjang===item
                  ?
                  "bg-purple-700 text-white"
                  :
                  "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* UPLOAD FORM */}

      {showForm && (
        <div className="max-w-7xl mx-auto px-5 mt-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6"
          >
            <h2 className="text-xl font-bold mb-6">
              Bagikan Materi Baru
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Judul Materi"
                value={form.title}
                onChange={(e)=>
                  setForm({
                    ...form,
                    title:e.target.value
                  })
                }
                className="border rounded-xl p-3"
              />
              <input
                type="text"
                placeholder="Mata Pelajaran"
                value={form.mapel}
                onChange={(e)=>
                  setForm({
                    ...form,
                    mapel:e.target.value
                  })
                }
                className="border rounded-xl p-3"
              />
              <select
                value={form.jenjang}
                onChange={(e)=>
                  setForm({
                    ...form,
                    jenjang:e.target.value
                  })
                }
                className="border rounded-xl p-3"
              >
                {JENJANG_LIST.filter(j=>j!=="Semua").map((j)=>(
                  <option key={j}>
                    {j}
                  </option>
                ))}
              </select>
              <select
                value={form.fileType}
                onChange={(e)=>
                  setForm({
                    ...form,
                    fileType:e.target.value
                  })
                }
                className="border rounded-xl p-3"
              >
                {FILE_TYPES.map((f)=>(
                  <option key={f}>
                    {f}
                  </option>
                ))}
              </select>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                value={form.fileURL}
                onChange={(e)=>
                  setForm({
                    ...form,
                    fileURL:e.target.value
                  })
                }
                className="md:col-span-2 border rounded-xl p-3"
              />
              <textarea
                rows={4}
                placeholder="Deskripsi Materi..."
                value={form.description}
                onChange={(e)=>
                  setForm({
                    ...form,
                    description:e.target.value
                  })
                }
                className="md:col-span-2 border rounded-xl p-3"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="bg-purple-700 text-white px-6 py-3 rounded-xl"
              >
                {submitting ? "Mengunggah..." : "Unggah Materi"}
              </button>
              <button
                type="button"
                onClick={()=>setShowForm(false)}
                className="border border-gray-300 px-6 py-3 rounded-xl"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================
            LIST HEADER
      ========================== */}

      <div className="max-w-7xl mx-auto px-5 mt-8">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold">

              Materi Pembelajaran

            </h2>

            <p className="text-gray-500">

              {filtered.length} materi ditemukan

            </p>

          </div>

        </div>
              {loading ? (

        <div className="bg-white rounded-3xl p-20 text-center shadow-sm">

          <div className="text-5xl mb-4">
            ⏳
          </div>

          <h3 className="font-bold text-xl">
            Memuat Materi...
          </h3>

        </div>

      ) : filtered.length === 0 ? (

        <div className="bg-white rounded-3xl p-20 text-center shadow-sm">

          <div className="text-6xl mb-5">
            📂
          </div>

          <h3 className="text-2xl font-bold">

            Belum ada materi

          </h3>

          <p className="text-gray-500 mt-3">

            Jadilah guru pertama yang membagikan materi.

          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filtered.map((item) => {

            const badge = getBadge(item.downloads);

            const canManage =
              user &&
              (
                item.createdBy === user.uid ||
                user.role === "admin"
              );

            return (

              <div

                key={item.id}

                className="bg-white rounded-3xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"

              >

                <div className="h-32 bg-gradient-to-r from-purple-700 to-indigo-600 flex items-center justify-center text-6xl">

                  {getFileIcon(item.fileType)}

                </div>

                <div className="p-5">

                  <div className="flex justify-between items-center mb-3">

                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: badge.bg,
                        color: badge.color,
                      }}
                    >
                      {badge.text}
                    </span>

                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">

                      {item.fileType}

                    </span>

                  </div>

                  <h3 className="font-bold text-lg leading-snug">

                    {item.title}

                  </h3>

                  <p className="text-sm text-purple-700 mt-2">

                    📚 {item.mapel}

                  </p>

                  <p className="text-sm text-gray-500 mt-3 line-clamp-3">

                    {item.description}

                  </p>

                  <div className="mt-5 flex justify-between text-sm text-gray-400">

                    <span>

                      👤 {item.createdByName || "Guru"}

                    </span>

                    <span>

                      ⬇ {item.downloads || 0}

                    </span>

                  </div>

                  <div className="flex gap-2 mt-6">

                    <button

                      onClick={() => handlePreview(item)}

                      className="flex-1 border border-purple-300 rounded-xl py-3 text-purple-700 font-semibold hover:bg-purple-50"

                    >

                      Preview

                    </button>

                    <button

                      onClick={() => handleDownload(item)}

                      className="flex-1 bg-purple-700 text-white rounded-xl py-3 font-semibold hover:bg-purple-800"

                    >

                      Download

                    </button>

                  </div>

                  {canManage && (

                    <button

                      onClick={(e) => handleDelete(item, e)}

                      className="w-full mt-3 bg-red-50 text-red-600 rounded-xl py-3 font-semibold hover:bg-red-100"

                    >

                      🗑 Hapus Materi

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