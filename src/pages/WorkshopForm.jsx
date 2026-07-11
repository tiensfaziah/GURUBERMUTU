import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addWorkshop, updateWorkshop, getWorkshopById } from "../services/workshopService";
import { useCurrentUser } from "../hooks/useCurrentUser";

const emptyForm = {
  title: "",
  category: "",
  speaker: "",
  dateRaw: "",
  time: "",
  mode: "Online",
  location: "",

  thumbnail: "",

  description: "",

  registerLink: "",

  xp: 100,

  skillTreeNode: "",
};

function formatDateID(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const WorkshopForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, loading: userLoading } = useCurrentUser();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const data = await getWorkshopById(id);
      if (!data) {
        setError("Workshop tidak ditemukan.");
        setLoading(false);
        return;
      }
      if (user && data.createdBy !== user.uid && user.role !== "admin") {
        setError("Kamu tidak punya izin untuk mengedit workshop ini.");
        setLoading(false);
        return;
      }
      setForm({
        title: data.title || "",
        category: data.category || "",
        speaker: data.speaker || "",
        dateRaw: data.dateRaw || "",
        time: data.time || "",
        mode: data.mode || "Online",
        location: data.location || "",
        thumbnail: data.thumbnail || "",
        description: data.description || "",
        registerLink: data.registerLink || "",
        xp:data.xp || 100,
        skillTreeNode:data.skillTreeNode || "",
      });
      setLoading(false);
    })();
  }, [id, isEdit, user]);

  const handleChange = (field) => (e) => {
  setForm((prev) => ({
    ...prev,
    [field]: e.target.value,
  }));
};
const handleThumbnail = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // Maksimal file asli 5 MB
  if (file.size > 5 * 1024 * 1024) {
    alert("Ukuran gambar maksimal 5 MB.");
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();

    img.onload = () => {
      // ukuran maksimum
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = height * (MAX_WIDTH / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = width * (MAX_HEIGHT / height);
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, width, height);

      // Kompres JPEG kualitas 70%
      const compressed = canvas.toDataURL(
        "image/jpeg",
        0.7
      );
      if (compressed.length > 900000) {
  alert(
    "Ukuran gambar masih terlalu besar. Gunakan gambar yang lebih kecil."
  );
  return;
}
      setForm((prev) => ({
        ...prev,
        thumbnail: compressed,
      }));
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
};

  const goBackTarget = isEdit
  ? (user?.role === "admin"
      ? "/admin/kelola-workshop"
      : "/workshop")
  : "/workshop";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
!form.title ||
!form.category ||
!form.dateRaw ||
!form.time ||
!form.location ||
!form.skillTreeNode
) {
      setError("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }
    if (!user) {
      setError("Kamu harus login untuk membuat workshop.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
  title: form.title,
  category: form.category,
  speaker: form.speaker,

  dateRaw: form.dateRaw,
  date: formatDateID(form.dateRaw),

  time: form.time,

  mode: form.mode,

  location: form.location,

  thumbnail: form.thumbnail,

  description: form.description,

  registerLink: form.registerLink,

  xp: Number(form.xp),

  skillTreeNode: form.skillTreeNode,
};

      if (isEdit) {
        await updateWorkshop(id, payload);
      } else {
        await addWorkshop(payload, user);
      }
      navigate(goBackTarget);
    }catch(err){

   console.error("ERROR WORKSHOP :",err);

   alert(err.message);

   setError(err.message);

}
  };

  if (loading || userLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Memuat...</div>;
  }

  if (error && isEdit && !form.title) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500" style={{ background: "#F5F3FF" }}>
        <p>{error}</p>
        <button
          onClick={() => navigate(goBackTarget)}
          className="px-4 py-2 rounded-xl text-white text-sm"
          style={{ background: "#5B21B6" }}
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-6 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>

        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
            {isEdit ? "Edit Workshop" : "Buat Workshop"}
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            {isEdit ? "Perbarui informasi workshop kamu." : "Isi detail workshop yang ingin kamu selenggarakan."}
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={handleChange("title")}
                placeholder="mis. Workshop Membuat Media Belajar Interaktif"
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.category}
                  onChange={handleChange("category")}
                  placeholder="mis. Teknologi Pendidikan"
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Narasumber</label>
                <input
                  type="text"
                  value={form.speaker}
                  onChange={handleChange("speaker")}
                  placeholder="Nama narasumber"
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={form.dateRaw}
                  onChange={handleChange("dateRaw")}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Jam <span className="text-red-500">*</span></label>
                <input
                  type="time"
                  value={form.time}
                  onChange={handleChange("time")}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mode <span className="text-red-500">*</span></label>
              <div className="flex gap-4">
                {["Online", "Offline"].map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                    <input
                      type="radio"
                      name="mode"
                      checked={form.mode === m}
                      onChange={() => setForm((p) => ({ ...p, mode: m }))}
                      className="accent-[#5B21B6]"
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {form.mode === "Online" ? "Link Meeting" : "Lokasi"} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.location}
                onChange={handleChange("location")}
                placeholder={form.mode === "Online" ? "Link Zoom / Google Meet" : "mis. Yogyakarta"}
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <div>
  <label className="block text-sm font-medium text-gray-700 mb-1.5">
    Thumbnail Workshop
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleThumbnail}
    className="w-full border border-purple-100 rounded-xl px-4 py-2.5"
  />
</div>
              {form.thumbnail && (
  <img
    src={form.thumbnail}
    alt="Preview"
    className="mt-3 w-full h-52 object-cover rounded-xl border"
  />
)}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
              <textarea
                value={form.description}
                onChange={handleChange("description")}
                rows={4}
                placeholder="Ceritakan tentang workshop ini..."
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Link Pendaftaran</label>
              <input
                type="text"
                value={form.registerLink}
                onChange={handleChange("registerLink")}
                placeholder="https://..."
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1.5">
    Reward XP
  </label>

  <input
    type="number"
    min="10"
    value={form.xp}
    onChange={handleChange("xp")}
    className="w-full border border-purple-100 rounded-xl px-4 py-2.5"
  />
</div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1.5">
    Kompetensi Skill Tree <span className="text-red-500">*</span>
  </label>

  <select
    value={form.skillTreeNode}
    onChange={handleChange("skillTreeNode")}
    className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
  >
    <option value="">Pilih Kompetensi</option>

    <option value="0-0">
      Level 1 • Beginner (Node 1)
    </option>

    <option value="0-1">
      Level 1 • Beginner (Node 2)
    </option>

    <option value="0-2">
      Level 1 • Beginner (Node 3)
    </option>

    <option value="1-1">
      Level 2 • Intermediate (Node 1)
    </option>
  </select>

  <p className="text-xs text-gray-400 mt-1">
    Pilih kompetensi pada Skill Tree yang akan dikembangkan melalui workshop ini.
  </p>
</div>            <button
              type="submit"
              disabled={saving}
              className="w-full text-white py-3 rounded-xl text-sm font-semibold transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ background: "#5B21B6" }}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkshopForm;