import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // 🔥 WAJIB biar ga reload

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login berhasil!");
      navigate("/dashboard"); // 🔥 pindah ke dashboard
    } catch (error) {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8BFBF] via-[#F8FBFB] to-[#E0C3FC] px-6">

      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-[#DC1416] mb-2">
          Gurubermutu
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Welcome back 👋
        </p>

        {/* 🔥 FORM FIX */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label>Email</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* 🔥 type submit */}
          <button
            type="submit"
            className="w-full bg-[#DC1416] text-white py-2 rounded-lg"
          >
            Sign In
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#DC1416] cursor-pointer"
          >
            Daftar di sini
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;