import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { savePersonaResult, getPersonaResult } from "../services/personaService";
import {
  QUESTIONS,
  CATEGORIES,
  SCALE_OPTIONS,
  SCALE_LABELS,
  PERSONA_LIST,
  computePersonaResult,
  isQuestionnaireComplete,
} from "../data/personaData";

const BRAND = "#7C3AED";

const PersonaQuestionnaire = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const [loadingExisting, setLoadingExisting] = useState(true);
  const [existingResult, setExistingResult] = useState(null);
  const [mode, setMode] = useState("loading"); // loading | quiz | result
  const [stepIndex, setStepIndex] = useState(0); // index kategori aktif (0-6)
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Cek apakah user sudah pernah mengisi kuesioner ini sebelumnya.
  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) {
        setLoadingExisting(false);
        setMode("quiz");
        return;
      }
      try {
        const result = await getPersonaResult(user.uid);
        if (!active) return;
        if (result) {
          setExistingResult(result);
          setMode("result");
        } else {
          setMode("quiz");
        }
      } catch (err) {
        console.error(err);
        setMode("quiz");
      } finally {
        if (active) setLoadingExisting(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const currentCategory = CATEGORIES[stepIndex];
  const currentQuestions = useMemo(
    () => QUESTIONS.filter((q) => q.categoryKey === currentCategory?.key),
    [currentCategory]
  );

  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round((answeredCount / QUESTIONS.length) * 100);

  const currentStepAnswered = currentQuestions.every(
    (q) => answers[q.number] !== undefined
  );

  const handleAnswer = (questionNumber, value) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: value }));
  };

  const handleNext = () => {
    if (stepIndex < CATEGORIES.length - 1) {
      setStepIndex((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!isQuestionnaireComplete(answers)) {
      setError("Masih ada pernyataan yang belum diisi.");
      return;
    }
    if (!user) {
      setError("Silakan login terlebih dahulu untuk menyimpan hasil.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const result = computePersonaResult(answers);
      const payload = {
        answers,
        scores: result.scores,
        percentages: result.percentages,
        dominantKey: result.dominant.key,
        secondaryKey: result.secondary.key,
      };
      await savePersonaResult(user.uid, payload);
      setExistingResult({ ...payload, completedAt: { seconds: Date.now() / 1000 } });
      setMode("result");
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal menyimpan hasil. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setStepIndex(0);
    setError("");
    setMode("quiz");
  };

  if (loadingExisting || mode === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F3FF" }}>
        <p className="text-gray-400">Memuat...</p>
      </div>
    );
  }

  // ==================== TAMPILAN HASIL ====================
  if (mode === "result" && existingResult) {
    const radarData = PERSONA_LIST.map((p) => ({
      persona: p.label,
      skor: existingResult.scores[p.key],
    }));

    const sortedForDisplay = PERSONA_LIST.map((p) => ({
      ...p,
      score: existingResult.scores[p.key],
      percentage: existingResult.percentages[p.key],
    })).sort((a, b) => b.score - a.score);

    const dominant = sortedForDisplay[0];
    const secondary = sortedForDisplay[1];

    return (
      <div className="min-h-screen pb-16" style={{ background: "#F5F3FF" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 text-gray-500 hover:text-gray-700 transition text-sm flex items-center gap-1"
          >
            ← Kembali ke Dashboard
          </button>

          <div className="bg-white rounded-2xl border border-purple-100 p-6 md:p-8 mb-6">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: BRAND }}
            >
              Hasil Kuesioner
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              Persona Mengajar Kamu
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Berdasarkan jawaban kuesioner identifikasi persona guru.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <RadarChart data={radarData} outerRadius="75%">
                    <PolarGrid stroke="#E9D5FF" />
                    <PolarAngleAxis
                      dataKey="persona"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 49]}
                      tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    />
                    <Radar
                      name="Skor"
                      dataKey="skor"
                      stroke={BRAND}
                      fill={BRAND}
                      fillOpacity={0.35}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                <div
                  className="rounded-2xl p-4 border-2"
                  style={{ borderColor: dominant.color, background: `${dominant.color}10` }}
                >
                  <p className="text-xs font-semibold text-gray-400 mb-1">PERSONA UTAMA</p>
                  <p className="text-xl font-bold" style={{ color: dominant.color }}>
                    {dominant.icon} {dominant.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{dominant.desc}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Skor: {dominant.score}/49 ({dominant.percentage}%)
                  </p>
                </div>

                <div
                  className="rounded-2xl p-4 border"
                  style={{ borderColor: secondary.color, background: `${secondary.color}08` }}
                >
                  <p className="text-xs font-semibold text-gray-400 mb-1">PERSONA SEKUNDER</p>
                  <p className="text-lg font-bold" style={{ color: secondary.color }}>
                    {secondary.icon} {secondary.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{secondary.desc}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Skor: {secondary.score}/49 ({secondary.percentage}%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-purple-100 p-6 md:p-8">
            <h2 className="font-bold text-gray-800 mb-4">Rincian Semua Persona</h2>
            <div className="space-y-3">
              {sortedForDisplay.map((p) => (
                <div key={p.key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      {p.icon} {p.label}
                    </span>
                    <span className="text-gray-400">{p.score}/49</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${p.percentage}%`, background: p.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-purple-200 text-purple-700 hover:bg-purple-50 transition"
            >
              Isi Ulang Kuesioner
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== TAMPILAN KUESIONER ====================
  return (
    <div className="min-h-screen pb-16" style={{ background: "#F5F3FF" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-gray-500 hover:text-gray-700 transition text-sm flex items-center gap-1"
        >
          ← Kembali ke Dashboard
        </button>

        <div className="bg-white rounded-2xl border border-purple-100 p-6 md:p-8">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: BRAND }}
          >
            Kuesioner Identifikasi Persona Guru
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
            {currentCategory.label}
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            Pilih angka yang paling menggambarkan praktik dan pandangan Anda
            dalam mengajar sehari-hari. (1 = Sangat Tidak Setuju, 7 = Sangat
            Setuju)
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>
                Kategori {stepIndex + 1} dari {CATEGORIES.length}
              </span>
              <span>{progressPct}% selesai</span>
            </div>
            <div className="h-2 rounded-full bg-purple-50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progressPct}%`, background: BRAND }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {currentQuestions.map((q) => (
              <div key={q.number} className="border-b border-purple-50 pb-5 last:border-0">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {q.number}. {q.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SCALE_OPTIONS.map((val) => {
                    const isSelected = answers[q.number] === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        title={SCALE_LABELS[val]}
                        onClick={() => handleAnswer(q.number, val)}
                        className="w-10 h-10 rounded-full text-sm font-semibold border-2 transition flex items-center justify-center"
                        style={
                          isSelected
                            ? { background: BRAND, borderColor: BRAND, color: "#fff" }
                            : { borderColor: "#E9D5FF", color: "#6B7280" }
                        }
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                  <span>Sangat Tidak Setuju</span>
                  <span>Sangat Setuju</span>
                </div>
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

          <div className="flex gap-3 mt-6">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-purple-100 text-gray-500 hover:bg-purple-50 transition"
              >
                Sebelumnya
              </button>
            )}

            {stepIndex < CATEGORIES.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!currentStepAnswered}
                className="flex-1 px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-40"
                style={{ background: BRAND }}
              >
                Lanjut
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving || !isQuestionnaireComplete(answers)}
                className="flex-1 px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-40"
                style={{ background: BRAND }}
              >
                {saving ? "Menyimpan..." : "Lihat Hasil"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaQuestionnaire;