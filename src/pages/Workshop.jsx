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

  const [selectedLocation, setSelectedLocation] =
    useState("Yogyakarta");

  const filteredWorkshop = workshops.filter(
    (item) => item.location === selectedLocation
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      {/* HEADER */}
      <div className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari workshop..."
            className="border rounded-xl px-4 py-2 w-full max-w-md outline-none"
          />

          {/* LOCATION */}
          <select
            value={selectedLocation}
            onChange={(e) =>
              setSelectedLocation(e.target.value)
            }
            className="border rounded-xl px-4 py-2 outline-none"
          >
            <option>Yogyakarta</option>
            <option>Jakarta</option>
            <option>Bandung</option>
          </select>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-3xl font-bold mb-8">
          Workshop di {selectedLocation}
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {filteredWorkshop.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/workshop/${item.id}`)
              }
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4">

                <h3 className="font-bold text-lg mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  📍 {item.location}
                </p>

                <p className="text-sm text-gray-500">
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