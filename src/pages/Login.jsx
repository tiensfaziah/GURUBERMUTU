import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { Eye, EyeOff } from "lucide-react";
import NavigationButtons from "../components/NavigationButtons";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      alert("Email atau password salah!");
    }
  };
const handleForgotPassword = async () => {

  if (!email) {
    alert("Masukkan email terlebih dahulu.");
    return;
  }

  try {

    await sendPasswordResetEmail(auth, email);

    alert(
      "Link reset password telah dikirim ke email kamu. Silakan cek inbox atau folder spam."
    );

  } catch (error) {

    console.error(error);

    if (error.code === "auth/user-not-found") {
      alert("Email belum terdaftar.");
    } else if (error.code === "auth/invalid-email") {
      alert("Format email tidak valid.");
    } else {
      alert("Gagal mengirim email reset password.");
    }

  }

};
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[#f1bff8] via-[#e8dfea] to-[#a985cb] px-4 pt-6">

  <div className="max-w-7xl mx-auto w-full">
    <NavigationButtons
      showBack={true}
      showForward={false}
    />
  </div>
  <div className="flex-1 flex justify-center items-center -mt-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-sm">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#5B21B6] mb-2">
          Gurubermutu
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Welcome back 👋
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

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
              <div className="flex justify-end mt-2">

  <button
    type="button"
    onClick={handleForgotPassword}
    className="text-sm text-[#5B21B6] hover:underline"
  >
    Lupa Password?
  </button>

</div>
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

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#5B21B6] text-white py-2.5 rounded-lg hover:scale-105 transition"
          >
            Sign In
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-6">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#5B21B6] cursor-pointer hover:underline"
          >
            Daftar di sini
          </span>
        </p>

      </div>

    </div>
  </div>
  );
}

export default Login;