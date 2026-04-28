import React from "react";

function Footer() {
  return (
    <footer className="bg-[#F9FAFB] pt-16 pb-8 px-6 md:px-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">

        {/* LOGO & DESC */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-[#DC1416] mb-3">
            GuruBermutu
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Platform pembelajaran modern untuk guru Gen Z.
            Tingkatkan skill mengajar, eksplor teknologi, dan
            berkembang dengan cara yang lebih relevan.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4 text-xl">
            <span>📷</span>
            <span>▶️</span>
            <span>💼</span>
            <span>📘</span>
          </div>
        </div>

        {/* TENTANG */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Tentang</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Profil</li>
            <li>Kontak</li>
            <li>Kebijakan</li>
          </ul>
        </div>

        {/* TUTORIAL */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Tutorial</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Cara Belajar</li>
            <li>Sertifikat</li>
            <li>Panduan</li>
          </ul>
        </div>

        {/* PRODUK */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Fitur</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Skill Tree</li>
            <li>Workshop</li>
            <li>Marketplace</li>
          </ul>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
        © 2026 GuruBermutu. Semua hak dilindungi.
      </div>

    </footer>
  );
}

export default Footer;