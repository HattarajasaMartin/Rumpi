import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "./authSlice";
import { loginAPI } from "./authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginAPI(form);
      dispatch(setAuth(data));
      console.log("Login Success:", data);
      navigate("/home");
    } catch (err) {
      alert("Login Gagal: Cek kembali email dan password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <Input
        type="email"
        placeholder="Your Email"
        className="h-14 bg-zinc-900 border-none text-white rounded-2xl placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-700 outline-none"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        className="h-14 bg-zinc-900 border-none text-white rounded-2xl placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-700 outline-none"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-white text-black font-bold rounded-2xl mt-4 active:scale-[0.98] transition-transform hover:bg-zinc-200"
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
