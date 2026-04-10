import { Heart, MessageCircle, Share2, Repeat2 } from "lucide-react";

interface ThreadCardProps {
  avatar?: string;
  username: string;
  name?: string;
  content: string;
  image?: string;
  likes: number;
  replies: number;
  isLiked: boolean;
  onLike: () => void;
}

export const Threadcard = ({
  avatar,
  username,
  name,
  content,
  image,
  likes,
  replies,
  isLiked,
  onLike,
}: ThreadCardProps) => {
  return (
    <div className="border-b border-zinc-900 p-8 hover:bg-zinc-950/50 transition-colors">
      <div className="flex gap-4">
        {/* Avatar Section */}
        <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden shrink-0">
          <img
            src={
              avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
            }
            alt="avatar"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {" "}
          {/* min-w-0 mencegah teks merusak layout */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-white text-[15px]">
              {name || username}
            </span>
            <span className="text-zinc-500 text-sm">@{username}</span>
          </div>
          <p className="text-zinc-200 leading-relaxed text-[15px] mb-3">
            {content}
          </p>
          {/* Render Gambar Postingan - Versi Minimalis Modern */}
          {image && (
            <div className="mb-4 mt-2 max-w-[480px]">
              {" "}
              {/* Batasi lebar bingkai agar gambar tidak melebar ke kanan */}
              <img
                src={`http://localhost:5000/uploads/${image}`}
                alt="post content"
                // object-cover: Gambar memenuhi bingkai, terpotong sedikit (lebih rapi tanpa card)
                // max-h-[380px]: Batasi tinggi agar tidak memenuhi layar
                className="w-full max-h-[380px] rounded-2xl object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")} // Sembunyikan jika gagal
              />
            </div>
          )}
          {/* Action Buttons */}
          <div className="flex items-center justify-between text-zinc-500 max-w-md pt-1">
            <button
              onClick={onLike}
              className={`flex items-center gap-2.5 hover:text-red-500 transition-colors ${
                isLiked ? "text-red-500" : ""
              }`}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center gap-2.5 hover:text-blue-500">
              <MessageCircle size={18} />
              <span className="text-sm">{replies}</span>
            </button>
            <button className="hover:text-green-500 p-1.5 rounded-full hover:bg-green-500/10 transition-colors">
              <Repeat2 size={18} />
            </button>
            <button className="hover:text-blue-500 p-1.5 rounded-full hover:bg-blue-500/10 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
