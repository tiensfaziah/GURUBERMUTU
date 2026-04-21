import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Register berhasil!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 overflow-y-auto bg-gradient-to-br from-[#F8BFBF] via-[#F8FBFB] to-[#E0C3FC] px-4">

      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mt-10 mb-10">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#DC1416] mb-2">
          Gurubermutu
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Buat akun baru 🚀
        </p>

        <form className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="relative mt-1">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg"
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-12 border rounded-lg"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* CONFIRM */}
          <div>
            <label className="text-sm text-gray-600">Konfirmasi Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-12 border rounded-lg"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-sm"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-[#DC1416] text-white py-2.5 rounded-lg"
          >
            Daftar
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          Sudah punya akun?{" "}
          <span onClick={() => navigate("/login")} className="text-[#DC1416] cursor-pointer">
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;