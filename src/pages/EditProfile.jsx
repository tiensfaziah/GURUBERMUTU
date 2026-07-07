import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

// FIREBASE
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    school: "",
    subject: "",
    level: "",
    city: "",
    bio: "",
  });

  // ==========================
  // LOAD DATA DARI FIREBASE
  // ==========================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setProfile((prev) => ({
            ...prev,
            ...docSnap.data(),
          }));
        } else {
          console.log("Data user belum ada.");
        }
      } catch (err) {
        console.error("Gagal mengambil data profil:", err);
      }
    };

    loadProfile();
  }, []);

  // ==========================
  // HANDLE INPUT
  // ==========================
  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================
  // SIMPAN KE FIREBASE
  // ==========================
  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Silakan login terlebih dahulu.");
        return;
      }

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name: profile.name,
        email: profile.email,
        school: profile.school,
        subject: profile.subject,
        level: profile.level,
        city: profile.city,
        bio: profile.bio,
      });

      alert("Profil berhasil diperbarui!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan profil.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF]">

      {/* Header */}
      <div className="bg-white border-b">

        <div className="max-w-5xl mx-auto h-16 flex items-center gap-3 px-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="font-bold text-xl">
            Edit Profil
          </h1>

        </div>

      </div>

      <div className="max-w-3xl mx-auto p-6">

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <div className="flex flex-col items-center mb-8">

            <div className="w-28 h-28 rounded-full bg-purple-200 flex items-center justify-center text-5xl">
              👩🏻‍🏫
            </div>

            <button className="mt-4 text-sm text-[#7C3AED] font-semibold">
              Ubah Foto
            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Nama"
              className="border rounded-xl p-3"
            />

            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-xl p-3"
            />

            <input
              name="school"
              value={profile.school}
              onChange={handleChange}
              placeholder="Sekolah"
              className="border rounded-xl p-3"
            />

            <input
              name="subject"
              value={profile.subject}
              onChange={handleChange}
              placeholder="Mata Pelajaran"
              className="border rounded-xl p-3"
            />

            <input
              name="level"
              value={profile.level}
              onChange={handleChange}
              placeholder="Jenjang"
              className="border rounded-xl p-3"
            />

            <input
              name="city"
              value={profile.city}
              onChange={handleChange}
              placeholder="Kota"
              className="border rounded-xl p-3"
            />

          </div>

          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={5}
            placeholder="Bio"
            className="w-full border rounded-xl p-3 mt-5"
          />

          <button
            onClick={handleSave}
            className="w-full mt-8 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl py-3 font-semibold"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}