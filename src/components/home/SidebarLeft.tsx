import { Home, Search, Heart, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { NavItem } from "./NavItems";

export const SidebarLeft = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-[20%] sticky top-0 h-screen flex-col py-8 px-8 border-r border-zinc-900">
        <h1
          className="text-4xl font-bold text-teal-400 mb-10 tracking-tighter cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Rumpi
        </h1>
        <nav className="space-y-6 flex-1">
          <NavItem
            icon={<Home size={28} />}
            label="Home"
            active={location.pathname === "/home"}
            onClick={() => navigate("/home")}
          />
          <NavItem
            icon={<Search size={28} />}
            label="Search"
            active={location.pathname === "/search"}
            onClick={() => navigate("/search")}
          />
          <NavItem
            icon={<Heart size={28} />}
            label="Follows"
            active={location.pathname === "/follows"}
            onClick={() => navigate("/follows")}
          />
          <NavItem
            icon={<User size={28} />}
            label="Profile"
            active={location.pathname.startsWith("/profile")}
            onClick={() => navigate("/profile")}
          />
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-zinc-500 hover:text-red-500 transition-colors mt-auto pb-4 group"
        >
          <LogOut
            size={24}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-semibold text-lg">Logout</span>
        </button>
      </aside>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950 border-t border-zinc-900 flex justify-around items-center py-3 md:hidden">
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center gap-1 ${location.pathname === "/home" ? "text-teal-400" : "text-zinc-500"}`}
        >
          <Home size={24} />
        </button>
        <button
          onClick={() => navigate("/search")}
          className={`flex flex-col items-center gap-1 ${location.pathname === "/search" ? "text-teal-400" : "text-zinc-500"}`}
        >
          <Search size={24} />
        </button>
        <button
          onClick={() => navigate("/follows")}
          className={`flex flex-col items-center gap-1 ${location.pathname === "/follows" ? "text-teal-400" : "text-zinc-500"}`}
        >
          <Heart size={24} />
        </button>
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center gap-1 ${location.pathname.startsWith("/profile") ? "text-teal-400" : "text-zinc-500"}`}
        >
          <User size={24} />
        </button>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 text-zinc-500 hover:text-red-500"
        >
          <LogOut size={24} />
        </button>
      </nav>
    </>
  );
};