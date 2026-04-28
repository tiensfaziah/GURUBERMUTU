import React from "react";
import { useNavigate } from "react-router-dom";

const workshops = [
  {
    id: 1,
    title: "Canva untuk Guru Pemula",
    category: "Design",
    duration: "30 menit",
    xp: 100,
  },
  {
    id: 4,
    title: "Google Classroom",
    category: "Learning",
    duration: "40 menit",
    xp: 100,
  },
  {
    id: 2,
    title: "Quizizz Interaktif",
    category: "Assessment",
    duration: "45 menit",
    xp: 120,
  },
  {
    id: 3,
    title: "Mentimeter Interaktif",
    category: "Teaching",
    duration: "60 menit",
    xp: 150,
  },
];

const Workshop = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6FA] p-6">
      <h1 className="text-2xl font-bold mb-6">
        Workshop & Pelatihan 🎓
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {workshops.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/workshop/${item.id}`)}
            className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>

            <p className="text-sm text-gray-500 mt-1">
              {item.category} • {item.duration}
            </p>

            <p className="text-sm text-[#A64D8B] mt-2 font-semibold">
              +{item.xp} XP
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshop;