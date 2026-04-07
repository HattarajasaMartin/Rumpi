import { Heart, Image as ImageIcon } from "lucide-react";

interface ThreadCardProps {
  name: string;
  username: string;
  time: string;
  content: string;
  likes: number;
  replies: number;
}

export function ThreadCard({
  name,
  username,
  time,
  content,
  likes,
  replies,
}: ThreadCardProps) {
  return (
    <div className="border-b border-zinc-900 p-8 flex gap-5 hover:bg-zinc-950 transition-colors cursor-pointer group">
      <div className="w-14 h-14 rounded-full bg-zinc-800 shrink-0 overflow-hidden">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
          alt="user"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-lg hover:underline text-white">
            {name}
          </span>
          <span className="text-zinc-500 text-sm">
            @{username} • {time}
          </span>
        </div>
        <p className="text-zinc-300 text-lg leading-relaxed mb-4">{content}</p>
        <div className="flex gap-10 text-zinc-500">
          <button className="flex items-center gap-2 hover:text-red-500 transition-colors group/btn">
            <Heart
              size={20}
              className="group-active/btn:scale-125 transition-transform"
            />
            {likes}
          </button>
          <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
            <ImageIcon size={20} /> {replies} Replies
          </button>
        </div>
      </div>
    </div>
  );
}
