import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
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
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = credential.user.uid;

    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      alert("Data pengguna tidak ditemukan.");
      return;
    }

    const data = snap.data();

    if (data.role === "admin") {
      navigate("/admin");
    } else {
      alert("Akun ini bukan administrator.");
    }

  } catch (error) {
    console.error(error);
    alert("Email atau password salah.");
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
  Admin Panel
</h1>

<p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
  Login sebagai administrator
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

      </div>

    </div>
  </div>
  );
}

export default Login;