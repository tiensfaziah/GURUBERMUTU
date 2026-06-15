import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Eye, EyeOff } from "lucide-react";
import emailjs from "@emailjs/browser";
import NavigationButtons from "../components/NavigationButtons";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    try {
      // REGISTER FIREBASE
      await createUserWithEmailAndPassword(auth, email, password);

      // KIRIM EMAIL
      await emailjs.send(
        "service_srxojgr",
        "template_m1b4vrn",
        {
          user_email: email,
        },
        "XxKySkAy4sAVTwr1Y"
      );

      // SUCCESS
      alert(
        "Register berhasil! Silakan cek email untuk bergabung ke komunitas Guru Bermutu 🚀"
      );

      navigate("/login");

    } catch (error) {
      console.log(error);

      // ERROR HANDLE
      if (error.code === "auth/email-already-in-use") {
        alert("Email sudah terdaftar!");
      } else if (error.code === "auth/invalid-email") {
        alert("Format email tidak valid!");
      } else if (error.code === "auth/weak-password") {
        alert("Password minimal 6 karakter!");
      } else {
        alert("Terjadi kesalahan, coba lagi!");
      }
    }
  };

  return (
    <div className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-br from-[#f1bff8] via-[#e8dfea] to-[#a985cb] px-4 pt-20">
      <div className="max-w-7xl mx-auto pt-6">
  <NavigationButtons
    showBack={true}
    showForward={false}
  />
</div>
      <div className="flex justify-center items-center mt-6">

  <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-sm">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#5B21B6] mb-2">
          Gurubermutu
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Buat akun baru 🚀
        </p>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>

            <div className="relative mt-1">
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg"
              />

              <span className="absolute left-3 top-2.5 text-gray-400">
                📧
              </span>
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-12 border rounded-lg"
              />

              <span className="absolute left-3 top-2.5 text-gray-400">
                🔒
              </span>

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">
              Konfirmasi Password
            </label>

            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-12 border rounded-lg"
              />

              <span className="absolute left-3 top-2.5 text-gray-400">
                🔒
              </span>

              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#5B21B6] text-white py-2.5 rounded-lg hover:scale-105 transition"
          >
            Daftar
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-6">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#5B21B6] cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>

      </div>

    </div>
  </div>
  );
}

export default Register;