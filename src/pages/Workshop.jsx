import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const workshops = [
  {
    id: 1,
    title: "Canva untuk Guru Pemula",
    location: "Yogyakarta",
    date: "20 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    id: 2,
    title: "Workshop AI untuk Guru",
    location: "Jakarta",
    date: "25 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    id: 3,
    title: "Pelatihan Quizizz Interaktif",
    location: "Yogyakarta",
    date: "28 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    id: 4,
    title: "Google Classroom Academy",
    location: "Bandung",
    date: "30 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
  },
];

const Workshop = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredWorkshop = workshops.filter((item) =>
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#7B2CBF] to-[#C77DFF] text-white py-16 px-6">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold mb-4">
            Workshop & Seminar Hub 🎓
          </h1>

          <p className="text-lg opacity-90 mb-6">
            Temukan workshop terbaik untuk meningkatkan skill mengajar kamu.
          </p>

          {/* SEARCH */}
          <div className="bg-white rounded-2xl p-3 flex items-center max-w-2xl shadow-lg">

            <input
              type="text"
              placeholder="Cari lokasi workshop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none px-3 text-gray-700"
            />

            <button className="bg-[#7B2CBF] text-white px-5 py-2 rounded-xl">
              Cari
            </button>

          </div>

        </div>

      </div>

      {/* LIST WORKSHOP */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Workshop Tersedia
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {filteredWorkshop.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/workshop/${item.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">

                <p className="text-sm text-[#7B2CBF] font-semibold mb-2">
                  📍 {item.location}
                </p>

                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  📅 {item.date}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Workshop;