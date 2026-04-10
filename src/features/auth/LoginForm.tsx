import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "./authSlice";
import { loginAPI, googleLoginAPI } from "./authService"; // Import fungsi baru
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleLogin } from "@react-oauth/google"; // Import library google

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Login Manual ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginAPI(form);
      dispatch(setAuth(data));
      navigate("/home");
    } catch (err) {
      alert("Login Gagal: Cek kembali email dan password");
    } finally {
      setLoading(false);
    }
  };

  // --- Login Google ---
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // credentialResponse.credential adalah ID Token dari Google
      const data = await googleLoginAPI(credentialResponse.credential);

      // Dispatch data yang sama (token & user) ke Redux
      dispatch(setAuth(data)); // Kasih tau semua bagian aplikasi kalau si User udah masuk
      navigate("/home");
    } catch (err) {
      console.error("Google Login Error:", err);
      alert("Google Login Gagal. Pastikan koneksi ke server aman.");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleLogin} className="space-y-3">
        <Input
          type="email"
          placeholder="Your Email"
          className="h-14 bg-zinc-900 border-none text-white rounded-2xl placeholder:text-zinc-600 outline-none"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          className="h-14 bg-zinc-900 border-none text-white rounded-2xl placeholder:text-zinc-600 outline-none"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-white text-black font-bold rounded-2xl mt-2 hover:bg-zinc-200 transition-all"
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      {/* Pembatas Visual */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-800"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-zinc-500 font-medium">Or</span>
        </div>
      </div>

      {/* Tombol Google Login */}
      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}  // Kalau user berhasil pilih akun google,  jalankan fungsi HandleGoogleSuccess
          onError={() => console.log("Login Failed")}
          theme="filled_blue"
          shape="circle"
          width="370px"
        />
      </div>
    </div>
  );
}
