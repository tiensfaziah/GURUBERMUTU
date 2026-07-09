import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { getPersonaResult } from "../services/personaService";
import { PERSONA_LIST } from "../data/personaData";

const BRAND = "#7C3AED";

// Kartu ringkas untuk ditaruh di Dashboard.
// - Kalau user belum pernah isi kuesioner -> ajak isi.
// - Kalau sudah -> tampilkan persona utama + tombol lihat detail.
const PersonaCard = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const result = await getPersonaResult(user.uid);
        if (active) setPersona(result);
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-purple-100 p-5 animate-pulse h-32" />
    );
  }

  // Belum pernah isi kuesioner
  if (!persona) {
    return (
      <div
        className="rounded-2xl p-5 border border-purple-100 flex items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)" }}
      >
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: BRAND }}>
            Kenali Gaya Mengajarmu
          </p>
          <h3 className="font-bold text-gray-800 mb-1">Isi Kuesioner Persona Guru</h3>
          <p className="text-sm text-gray-500">
            Cari tahu tipe mengajarmu untuk dapat rekomendasi game yang lebih pas.
          </p>
        </div>
        <button
          onClick={() => navigate("/persona")}
          className="flex-shrink-0 px-4 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
          style={{ background: BRAND }}
        >
          Mulai
        </button>
      </div>
    );
  }

  // Sudah pernah isi -> tampilkan persona utama
  const dominant = PERSONA_LIST.find((p) => p.key === persona.dominantKey);

  return (
    <div
      className="rounded-2xl p-5 border flex items-center justify-between gap-4"
      style={{ borderColor: dominant?.color || BRAND, background: `${dominant?.color || BRAND}0D` }}
    >
      <div>
        <p className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: dominant?.color || BRAND }}>
          Persona Mengajarmu
        </p>
        <h3 className="font-bold text-gray-800 text-lg">
          {dominant?.icon} {dominant?.label}
        </h3>
        <p className="text-sm text-gray-500">{dominant?.desc}</p>
      </div>
      <button
        onClick={() => navigate("/persona")}
        className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold border hover:bg-white/60 transition"
        style={{ borderColor: dominant?.color || BRAND, color: dominant?.color || BRAND }}
      >
        Lihat Detail
      </button>
    </div>
  );
};

export default PersonaCard;