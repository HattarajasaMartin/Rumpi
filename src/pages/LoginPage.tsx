import { Link } from "react-router-dom";
import { MessagesSquare } from "lucide-react";
import LoginForm from "../features/auth/LoginForm";

const ThreadsLogo = () => (
  <MessagesSquare size={42} strokeWidth={2.2} className="text-white" />
);

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="w-full max-w-[370px] space-y-8">
        {/* Header Logo */}
        <div className="flex justify-center transition-transform hover:scale-105 cursor-pointer">
          <ThreadsLogo />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-white font-bold text-lg tracking-tight">
            Log in with your account
          </h1>
        </div>

        {/* Memanggil Komponen Form yang Terpisah */}
        <LoginForm />

        {/* Footer Links */}
        <div className="pt-4 flex flex-col items-center gap-6">
          <Link
            to="/register"
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            Don't have an account?{" "}
            <span className="text-white font-bold">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
