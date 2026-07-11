import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { updatePassword } from "firebase/auth";

// FIREBASE
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditProfile() {
  const navigate = useNavigate();

const [profile, setProfile] = useState({
  name: "",
  email: "",
  bio: "",
  photoURL: "",
});
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState("");

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
          const data = docSnap.data();
          setProfile((prev) => ({
            ...prev,
            ...docSnap.data(),
          }));
          setPreview(data.photoURL || "");
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
const handlePhoto = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setPreview(reader.result);

    setProfile((prev) => ({
      ...prev,
      photoURL: reader.result,
    }));
  };

  reader.readAsDataURL(file);
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
    bio: profile.bio,
    photoURL: profile.photoURL,
});
if (password !== "") {

    if (password !== confirmPassword) {
        alert("Konfirmasi password tidak sama.");
        return;
    }

    await updatePassword(user, password);
}
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
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <h1 className="font-bold text-xl">
            Edit Profil
          </h1>

        </div>

      </div>

      <div className="max-w-3xl mx-auto p-6">

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <div className="flex flex-col items-center mb-8">

            <div className="w-28 h-28 rounded-full overflow-hidden bg-purple-200">
  {preview ? (
    <img
      src={preview}
      alt="Foto Profil"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-5xl">
      👩🏻‍🏫
    </div>
  )}
</div>
<input
  type="file"
  accept="image/*"
  id="photo"
  className="hidden"
  onChange={handlePhoto}
/>

            <label
  htmlFor="photo"
  className="mt-4 cursor-pointer text-sm text-[#7C3AED] font-semibold"
>
  Ubah Foto
</label>

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
  value={profile.email}
  readOnly
  className="border rounded-xl p-3 bg-gray-100 text-gray-500 cursor-not-allowed"
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
          <div className="mt-6 space-y-4">

  <h2 className="font-semibold text-lg">
    Keamanan Akun
  </h2>

  <input
    type="password"
    placeholder="Password Baru"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border rounded-xl p-3"
  />

  <input
    type="password"
    placeholder="Konfirmasi Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full border rounded-xl p-3"
  />

</div>
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