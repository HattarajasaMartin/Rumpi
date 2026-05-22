import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFollow } from "@/hooks/useFollow";

interface Props {
  type: "followers" | "following";
  onClose: () => void;
  userId?: number;
  currentUserId: number; // 🔥 tambahin ini
}

export default function FollowModal({
  type,
  onClose,
  userId,
  currentUserId,
}: Props) {
  const { data, fetchFollows, followUser, unfollowUser, loading } = useFollow();

  useEffect(() => {
    console.log("MODAL USER ID:", userId); // 🔥 cek ini
    fetchFollows(type, userId);
  }, [type, userId]);

  const isOwnProfile = currentUserId === userId;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-md p-6 rounded-2xl border border-zinc-800 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="capitalize font-bold text-lg">{type}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-zinc-400">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-zinc-500">No data</p>
        ) : (
          data.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center py-3 border-b border-zinc-800"
            >
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    u.avatar
                      ? `https://api-rumpi-production.up.railway.app/uploads/${u.avatar}`
                      : `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-zinc-500">@{u.username}</p>
                </div>
              </div>

              {/* Button */}
              {u.id !== currentUserId && // 🔥 jangan kasih tombol ke diri sendiri
                (u.is_following ? (
                  <Button
                    onClick={() => unfollowUser(u.id)}
                    variant="outline"
                    className="rounded-full"
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    onClick={() => followUser(u.id)}
                    className="rounded-full bg-white text-black"
                  >
                    {isOwnProfile && type === "followers"
                      ? "Follow Back"
                      : "Follow"}
                  </Button>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
