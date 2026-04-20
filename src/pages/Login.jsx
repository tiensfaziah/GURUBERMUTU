import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8BFBF] via-[#F8FBFB] to-[#E0C3FC] px-6">

      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md transition">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-[#DC1416] mb-2">
          Gurubermutu
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Welcome back 👋
        </p>

        {/* FORM */}
        <form className="space-y-5">

          {/* EMAIL */}
          <div className="relative">
            <label className="text-sm text-gray-600">Email</label>

            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full mt-1 px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC1416] transition"
            />

            {/* ICON */}
            <span className="absolute left-3 top-9 text-gray-400">
              📧
            </span>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-sm text-gray-600">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              className="w-full mt-1 px-4 py-2 pl-10 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC1416] transition"
            />

            {/* LOCK ICON */}
            <span className="absolute left-3 top-9 text-gray-400">
              🔒
            </span>

            {/* SHOW / HIDE */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-[#DC1416] text-white py-2 rounded-lg mt-4 shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Sign In
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Belum punya akun?{" "}
        <span
            onClick={() => navigate("/register")}
            className="text-[#DC1416] cursor-pointer hover:underline"
        >
            Daftar di sini
        </span>
        </p>

      </div>

    </div>
  );
}

export default Login;