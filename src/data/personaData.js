// personaData.js
// Data & logika skor untuk Kuesioner Identifikasi Persona Guru.
// Sumber: Kuesioner_persona_guru.docx dari kak Risky.
//
// Struktur: 35 pernyataan, 7 kategori x 5 pernyataan.
// Tiap kategori punya 1 pernyataan untuk setiap persona (kolom ke-1 s/d ke-5).
// Skala jawaban: 1 (Sangat Tidak Setuju) - 7 (Sangat Setuju), 4 = Netral.
// Skor per persona = jumlah 7 pernyataan miliknya (maks 49, min 7).

export const PERSONA_LIST = [
  {
    key: "mentor",
    label: "Mentor",
    color: "#7C3AED",
    icon: "🧭",
    desc: "Pendamping yang fokus pada bimbingan dan perkembangan holistik siswa.",
  },
  {
    key: "energizer",
    label: "Energizer",
    color: "#F59E0B",
    icon: "⚡",
    desc: "Menghidupkan suasana kelas lewat interaksi dan motivasi.",
  },
  {
    key: "pragmatist",
    label: "Pragmatist",
    color: "#10B981",
    icon: "🧩",
    desc: "Mengutamakan efisiensi, kesederhanaan, dan kepraktisan biaya/waktu.",
  },
  {
    key: "innovator",
    label: "Innovator",
    color: "#2563EB",
    icon: "💡",
    desc: "Terbuka pada teknologi, media digital, dan visual yang modern.",
  },
  {
    key: "conformist",
    label: "Conformist",
    color: "#DB2777",
    icon: "📋",
    desc: "Patuh pada kurikulum, prosedur, dan fasilitas resmi sekolah.",
  },
];

export const CATEGORIES = [
  { key: "instructional_role", label: "Peran Mengajar (Instructional Role)" },
  { key: "success_metrics", label: "Ukuran Keberhasilan (Success Metrics)" },
  { key: "learning_goals", label: "Target Pembelajaran (Learning Goals)" },
  { key: "content_integrity", label: "Kesesuaian Materi (Content Integrity)" },
  { key: "usage_pattern", label: "Kebiasaan Mengajar (Usage Pattern)" },
  { key: "media_selection", label: "Pemilihan Media Belajar (Media Selection)" },
  { key: "infrastructure_view", label: "Pandangan Fasilitas Sekolah (Infrastructure View)" },
];

// Urutan persona di tiap kategori SELALU: mentor, energizer, pragmatist, innovator, conformist
const PERSONA_ORDER = ["mentor", "energizer", "pragmatist", "innovator", "conformist"];

const RAW_STATEMENTS = [
  // Kategori 1: Peran Mengajar
  "Saya memposisikan diri di kelas sebagai pembimbing yang mendampingi siswa.",
  "Saya lebih banyak mengambil peran untuk menghidupkan interaksi komunikasi di kelas.",
  "Saya memilih bersikap pasif tanpa terlalu banyak mencampuri aktivitas siswa.",
  "Saya fokus menguji kemampuan berpikir serta penalaran logika siswa.",
  "Saya mengutamakan pemberian bimbingan harian secara rutin kepada siswa.",
  // Kategori 2: Ukuran Keberhasilan
  "Saya merasa sukses mengajar saat nilai akademik dan perkembangan emosi siswa seimbang.",
  "Saya mengukur keberhasilan mengajar dari perubahan perilaku sosial siswa ke arah positif.",
  "Saya menilai pengajaran sudah berhasil jika siswa menguasai materi nilai dasar.",
  "Saya menargetkan pencapaian nilai akademik yang tinggi sebagai bukti sukses mengajar.",
  "Saya melihat kesuksesan dari ketepatan siswa menyelesaikan tugas pengumpulan nilai formal.",
  // Kategori 3: Target Pembelajaran
  "Saya mengarahkan target belajar pada hasil praktik atau keterampilan fisik siswa.",
  "Saya merancang kegiatan belajar dengan target utama membangkitkan semangat siswa.",
  "Saya membatasi target belajar pada pemenuhan kebutuhan psikologis paling mendasar.",
  "Saya mengincar penguasaan teknologi digital visual yang menarik sebagai target kelas.",
  "Saya menjadikan penghematan biaya penggunaan aplikasi sebagai pertimbangan target utama.",
  // Kategori 4: Kesesuaian Materi
  "Saya selalu menyesuaikan materi ajar dengan keadaan lingkungan sekitar siswa.",
  "Saya membahas materi secara mendalam demi memicu keaktifan siswa bergerak.",
  "Saya menyusun urutan materi mengajar secara sangat sederhana.",
  "Saya menyiapkan materi berbobot yang disesuaikan khusus bagi karakter anak.",
  "Saya menyeragamkan semua materi pelajaran agar persis dengan aturan kurikulum lembaga.",
  // Kategori 5: Kebiasaan Mengajar
  "Saya memanfaatkan media atau alat peraga pada awal pelajaran demi menyentuh perasaan siswa.",
  "Saya menggunakan media belajar secara padat pada menit-menit awal kelas dimulai.",
  "Saya hanya sesekali saja memakai aplikasi pembelajaran digital saat mengajar di kelas.",
  "Saya mengajar lewat urutan yang sangat rapi mulai pembukaan hingga ujian berbasis komputer.",
  "Saya melaksanakan kegiatan belajar mengajar sesuai persiapan RPP yang matang.",
  // Kategori 6: Pemilihan Media Belajar
  "Saya menyeimbangkan penggunaan antara buku teks dengan media digital interaktif.",
  "Saya lebih senang mengajar memakai alat peraga fisik yang bisa disentuh siswa.",
  "Saya sangat bergantung pada buku paket atau modul cetak saat mengajar.",
  "Saya mengutamakan tayangan multimedia video hingga permainan (game) sebagai media utama.",
  "Saya mengandalkan media sosial atau buku wajib sekolah sebagai sumber referensi.",
  // Kategori 7: Pandangan Fasilitas Sekolah
  "Saya mencari informasi umum dari rekan sesama guru untuk menyiapkan kelengkapan kelas.",
  "Saya mencari ide fasilitas ruang kelas dari komunitas guru di jejaring internet.",
  "Saya memaksimalkan sarana kelas apa adanya tanpa mengharapkan bantuan pihak luar.",
  "Saya mengandalkan data internal sekolah serta website mandiri sebagai tumpuan fasilitas.",
  "Saya sangat bergantung pada penyediaan fasilitas resmi dari sekolah/Dinas Pendidikan.",
];

// Bangun daftar 35 pertanyaan lengkap dengan nomor soal, kategori, dan persona pemilik.
export const QUESTIONS = RAW_STATEMENTS.map((text, idx) => {
  const categoryIndex = Math.floor(idx / 5); // 0-6
  const personaIndex = idx % 5; // 0-4
  return {
    number: idx + 1,
    text,
    categoryKey: CATEGORIES[categoryIndex].key,
    personaKey: PERSONA_ORDER[personaIndex],
  };
});

export const SCALE_OPTIONS = [1, 2, 3, 4, 5, 6, 7];
export const SCALE_LABELS = {
  1: "Sangat Tidak Setuju",
  2: "Tidak Setuju",
  3: "Agak Tidak Setuju",
  4: "Netral",
  5: "Agak Setuju",
  6: "Setuju",
  7: "Sangat Setuju",
};

export const MAX_SCORE_PER_PERSONA = 49; // 7 soal x 7 poin
export const MIN_SCORE_PER_PERSONA = 7; // 7 soal x 1 poin

// answers: objek { [nomorSoal]: skorJawaban(1-7) }
// Return: { scores: {mentor: n, ...}, percentages: {...}, dominant, secondary, sortedResult: [...] }
export function computePersonaResult(answers) {
  const scores = {};
  PERSONA_LIST.forEach((p) => {
    scores[p.key] = 0;
  });

  QUESTIONS.forEach((q) => {
    const value = Number(answers[q.number]) || 0;
    scores[q.personaKey] += value;
  });

  const percentages = {};
  Object.keys(scores).forEach((key) => {
    percentages[key] = Math.round(
      ((scores[key] - MIN_SCORE_PER_PERSONA) /
        (MAX_SCORE_PER_PERSONA - MIN_SCORE_PER_PERSONA)) *
        100
    );
  });

  const sortedResult = PERSONA_LIST.map((p) => ({
    ...p,
    score: scores[p.key],
    percentage: percentages[p.key],
  })).sort((a, b) => b.score - a.score);

  return {
    scores,
    percentages,
    dominant: sortedResult[0],
    secondary: sortedResult[1],
    sortedResult,
  };
}

export function isQuestionnaireComplete(answers) {
  return QUESTIONS.every((q) => answers[q.number] !== undefined && answers[q.number] !== null);
}