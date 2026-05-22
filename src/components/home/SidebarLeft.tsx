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
    <aside className="w-[20%] sticky top-0 h-screen flex flex-col py-8 px-8 border-r border-zinc-900">
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
  );
};
