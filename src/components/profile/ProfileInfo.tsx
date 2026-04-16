import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFollow } from "@/hooks/useFollow";

interface Props {
  user: any;
  isOwnProfile: boolean;
  onEdit: () => void;
  onOpenFollowers: () => void;
  onOpenFollowing: () => void;
}

export default function ProfileInfo({
  user,
  isOwnProfile,
  onEdit,
  onOpenFollowers,
  onOpenFollowing,
}: Props) {
  const [activeTab, setActiveTab] = useState<"threads" | "media">("threads");
  const {
    followUser,
    unfollowUser,
    isFollowing,
    followLoading,
    checkIsFollowing,
  } = useFollow();

  useEffect(() => {
    if (!isOwnProfile && user?.id) {
      checkIsFollowing(user.id);
    }
  }, [user?.id, isOwnProfile]);

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{user?.full_name}</h2>
          <p className="text-zinc-500">@{user?.username}</p>
          <p className="mt-3 text-zinc-300">{user?.bio || "No bio yet."}</p>

          <div className="flex gap-5 mt-4 text-sm">
            <span
              onClick={onOpenFollowing}
              className="cursor-pointer hover:underline text-zinc-400"
            >
              <b className="text-white">{user?.following || 0}</b> Following
            </span>
            <span
              onClick={onOpenFollowers}
              className="cursor-pointer hover:underline text-zinc-400"
            >
              <b className="text-white">{user?.followers || 0}</b> Followers
            </span>
          </div>
        </div>

        <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-800">
          <img
            src={
              user?.photo_profile
                ? `http://localhost:5000/uploads/${user.photo_profile}`
                : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`
            }
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isOwnProfile ? (
        <Button
          onClick={onEdit}
          variant="outline"
          className="w-full rounded-full border-zinc-700 mb-6 hover:bg-zinc-800 transition"
        >
          Edit profile
        </Button>
      ) : (
        <Button
          onClick={() =>
            isFollowing ? unfollowUser(user?.id) : followUser(user?.id)
          }
          disabled={followLoading}
          variant={isFollowing ? "outline" : "default"}
          className={`w-full rounded-full mb-6 transition ${
            isFollowing
              ? "border-zinc-700 hover:bg-zinc-800 hover:text-red-400 hover:border-red-400"
              : "bg-white text-black hover:bg-zinc-200"
          }`}
        >
          {followLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}

      <div className="flex border-b border-zinc-900">
        <button
          onClick={() => setActiveTab("threads")}
          className={`flex-1 py-3 text-sm font-semibold transition ${
            activeTab === "threads"
              ? "text-white border-b-2 border-white"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          Threads
        </button>
        <button
          onClick={() => setActiveTab("media")}
          className={`flex-1 py-3 text-sm font-semibold transition ${
            activeTab === "media"
              ? "text-white border-b-2 border-white"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          Media
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "threads" ? (
          <div className="text-zinc-500 text-sm">Belum ada thread.</div>
        ) : (
          <div className="grid grid-cols-3 gap-[2px]">
            <div className="aspect-square bg-zinc-800" />
            <div className="aspect-square bg-zinc-800" />
            <div className="aspect-square bg-zinc-800" />
          </div>
        )}
      </div>
    </div>
  );
}
