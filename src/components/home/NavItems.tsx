interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 cursor-pointer p-3 -ml-3 rounded-2xl transition-all duration-200 ${
        active
          ? "text-teal-400 bg-teal-900/20"
          : "text-zinc-500 hover:text-white hover:bg-zinc-900/30"
      }`}
    >
      <div
        className={`${active ? "scale-110" : ""} transition-transform`}
      >
        {icon}
      </div>
      <span className="text-xl font-semibold">{label}</span>
    </div>
  );
}