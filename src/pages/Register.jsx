import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 overflow-y-auto bg-gradient-to-br from-[#F8BFBF] via-[#F8FBFB] to-[#E0C3FC] px-4">

      {/* CARD */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mt-10 mb-10">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#DC1416] mb-2">
          Gurubermutu
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Buat akun baru 🚀
        </p>

        {/* FORM */}
        <form className="space-y-5">

          {/* NAMA */}
          <div>
            <label className="text-sm text-gray-600">Nama Lengkap</label>
            <div className="relative mt-1">
              <input
                type="text"
                placeholder="Masukkan nama"
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC1416]"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="relative mt-1">
              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC1416]"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="w-full px-4 py-2 pl-10 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC1416]"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-[#DC1416]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Konfirmasi Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Ulangi password"
                className="w-full px-4 py-2 pl-10 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC1416]"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-[#DC1416]"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-[#DC1416] text-white py-2.5 rounded-lg mt-2 shadow-md hover:scale-105 transition"
          >
            Daftar
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#DC1416] cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;