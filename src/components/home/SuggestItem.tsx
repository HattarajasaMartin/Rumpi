import { Button } from "@/components/ui/button";

interface SuggestItemProps {
  name: string;
  username: string;
}

export function SuggestItem({ name, username }: SuggestItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden shrink-0">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
            alt="user"
          />
        </div>
        <div className="text-sm truncate">
          <p className="font-bold text-zinc-200 text-base truncate group-hover:text-white transition-colors">
            {name}
          </p>
          <p className="text-zinc-500 truncate">@{username}</p>
        </div>
      </div>
      <Button
        variant="outline"
        className="rounded-full h-9 px-5 text-sm font-bold border-zinc-700 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        Follow
      </Button>
    </div>
  );
}
