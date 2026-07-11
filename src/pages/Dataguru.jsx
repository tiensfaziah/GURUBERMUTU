import { useState, useMemo } from "react";
import AdminLayout from "./AdminLayout";

// ── Dummy data — ganti dengan fetch dari backend/Firestore/Supabase kamu ──
const DUMMY_TEACHERS = [
  { id: 1, name: "Rini Wulandari", email: "rini.w@sekolah.id", school: "SDN 03 Yogyakarta", totalReviews: 8, joined: "12 Jan 2026", status: "active" },
  { id: 2, name: "Andi Pratama", email: "andi.p@sekolah.id", school: "SDIT Al-Azhar", totalReviews: 5, joined: "18 Jan 2026", status: "active" },
  { id: 3, name: "Sari Nuraini", email: "sari.n@sekolah.id", school: "SD Muhammadiyah Sleman", totalReviews: 12, joined: "02 Feb 2026", status: "active" },
  { id: 4, name: "Budi Santoso", email: "budi.s@sekolah.id", school: "SMP Negeri 3 Yogyakarta", totalReviews: 3, joined: "10 Feb 2026", status: "inactive" },
  { id: 5, name: "Dewi Lestari", email: "dewi.l@sekolah.id", school: "TK Aisyiyah Kotagede", totalReviews: 6, joined: "20 Feb 2026", status: "active" },
];

function StatusBadge({ status }) {
  const isActive = status === "active";
  return (
    <span
      className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
        isActive ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {isActive ? "● Aktif" : "○ Tidak Aktif"}
    </span>
  );
}

function TeacherActions({ teacher, onView, onToggleStatus }) {
  const isActive = teacher.status === "active";
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onView(teacher)}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#7C3AED] hover:border-[#C4B5FD] transition"
        title="Lihat detail"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
      <button
        onClick={() => onToggleStatus(teacher)}
        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition ${
          isActive
            ? "border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            : "border-gray-200 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
        }`}
        title={isActive ? "Nonaktifkan" : "Aktifkan"}
      >
        {isActive ? (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    </div>
  );
}

function TeacherAvatar({ name }) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
      {name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function DataGuru() {
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState(DUMMY_TEACHERS);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filtered = useMemo(
    () =>
      teachers.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.school.toLowerCase().includes(search.toLowerCase())
      ),
    [search, teachers]
  );

  const totalActive = teachers.filter((t) => t.status === "active").length;
  const totalReviews = teachers.reduce((sum, t) => sum + t.totalReviews, 0);

  const handleView = (teacher) => setSelectedTeacher(teacher);

  const handleToggleStatus = (teacher) => {
    // TODO: kalau data sudah dari Firestore, ganti bagian ini dengan
    // updateDoc(doc(db, "users", teacher.id), { status: newStatus })
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacher.id
          ? { ...t, status: t.status === "active" ? "inactive" : "active" }
          : t
      )
    );
  };

  return (
    <AdminLayout>

      <div className="mb-6">
        <h1 className="text-[1.6rem] font-bold text-gray-900 tracking-tight mb-0.5">
          Data Guru
        </h1>
        <p className="text-[13.5px] text-gray-400">
          Daftar guru terdaftar dan aktivitas penilaian game mereka
        </p>
      </div>

      {/* MINI STATS */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5 mb-5">
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#f0edfb]">
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium mb-0.5">Total Guru</p>
          <p className="text-base sm:text-xl font-bold text-gray-900">{teachers.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#f0edfb]">
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium mb-0.5">Guru Aktif</p>
          <p className="text-base sm:text-xl font-bold text-emerald-600">{totalActive}</p>
        </div>
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#f0edfb]">
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium mb-0.5">Total Penilaian</p>
          <p className="text-base sm:text-xl font-bold text-[#7C3AED]">{totalReviews}</p>
        </div>
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
          placeholder="Cari nama guru atau sekolah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-sm pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition"
        />
      </div>

      {/* MOBILE — CARD LIST (tanpa scroll horizontal) */}
      <div className="md:hidden space-y-3">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-[#f0edfb] p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <TeacherAvatar name={t.name} />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-[13px] truncate">{t.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{t.email}</p>
                </div>
              </div>
              <StatusBadge status={t.status} />
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs mb-3">
              <div>
                <p className="text-gray-400 text-[10px] mb-0.5">Sekolah</p>
                <p className="text-gray-700 truncate">{t.school}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] mb-0.5">Bergabung</p>
                <p className="text-gray-700">{t.joined}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-[10px] mb-1">Total Penilaian</p>
                <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-[#EEEDFE] text-[#5B21B6]">
                  {t.totalReviews} review
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-50">
              <TeacherActions teacher={t} onView={handleView} onToggleStatus={handleToggleStatus} />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#f0edfb] text-center py-12 text-gray-400 text-sm">
            Tidak ada guru yang cocok dengan pencarian.
          </div>
        )}
      </div>

      {/* DESKTOP — TABLE */}
      <div className="hidden md:block bg-white rounded-[20px] border border-[#f0edfb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FAFAFF]">
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Guru</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Sekolah</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Total Penilaian</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Bergabung</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Status</th>
                <th className="text-right font-semibold text-gray-500 text-xs px-5 py-3.5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-[#FAFAFF] transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <TeacherAvatar name={t.name} />
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-[13px] truncate">{t.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs max-w-[180px] truncate">{t.school}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-[#EEEDFE] text-[#5B21B6]">
                      {t.totalReviews} review
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{t.joined}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end">
                      <TeacherActions teacher={t} onView={handleView} onToggleStatus={handleToggleStatus} />
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                    Tidak ada guru yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL GURU */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4"
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6 relative"
          >
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {selectedTeacher.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-base truncate">{selectedTeacher.name}</p>
                <p className="text-xs text-gray-400 truncate">{selectedTeacher.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-400 text-xs">Sekolah</span>
                <span className="text-gray-800 font-medium text-right">{selectedTeacher.school}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-400 text-xs">Total Penilaian</span>
                <span className="text-[#5B21B6] font-bold">{selectedTeacher.totalReviews} review</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-400 text-xs">Bergabung</span>
                <span className="text-gray-800 font-medium">{selectedTeacher.joined}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-xs">Status</span>
                <StatusBadge status={selectedTeacher.status} />
              </div>
            </div>

            <button
              onClick={() => {
                handleToggleStatus(selectedTeacher);
                setSelectedTeacher(null);
              }}
              className={`w-full mt-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                selectedTeacher.status === "active"
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              }`}
            >
              {selectedTeacher.status === "active" ? "Nonaktifkan Guru" : "Aktifkan Guru"}
            </button>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}