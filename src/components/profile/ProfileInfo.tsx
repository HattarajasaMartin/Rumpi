import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFollow } from "@/hooks/useFollow";
import { useUserThreads } from "@/hooks/useUserThreads";

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"threads" | "media">("threads");
  const {
    followUser,
    unfollowUser,
    isFollowing,
    followLoading,
    checkIsFollowing,
  } = useFollow();
  const { threads, loading: threadsLoading } = useUserThreads(user?.id);

  useEffect(() => {
    if (!isOwnProfile && user?.id) {
      checkIsFollowing(user.id);
    }
  }, [user?.id, isOwnProfile]);

  // Filter threads yang punya gambar untuk tab Media
  const mediaThreads = threads.filter((t) => t.image);

  return (
    <div>
      {/* ================= HEADER ================= */}
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

      {/* ================= EDIT / FOLLOW BUTTON ================= */}
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

      {/* ================= TABS ================= */}
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

      {/* ================= CONTENT ================= */}
      <div className="mt-2">
        {/* TAB THREADS */}
        {activeTab === "threads" && (
          <>
            {threadsLoading ? (
              <div className="py-6 text-zinc-500 italic text-sm text-center">
                Memuat postingan...
              </div>
            ) : threads.length === 0 ? (
              <div className="py-6 text-zinc-500 text-sm text-center">
                Belum ada thread.
              </div>
            ) : (
              threads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => navigate(`/thread/${thread.id}`)}
                  className="border-b border-zinc-900 px-2 py-4 hover:bg-zinc-950/50 cursor-pointer transition"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                      <img
                        src={
                          thread.avatar
                            ? `http://localhost:5000/uploads/${thread.avatar}`
                            : `https://api.dicebear.com/7.x/avataaars/svg?seed=${thread.username}`
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">
                          {thread.name || thread.username}
                        </span>
                        <span className="text-zinc-500 text-xs">
                          @{thread.username}
                        </span>
                      </div>
                      <p className="text-zinc-200 text-sm leading-relaxed mb-2">
                        {thread.content}
                      </p>

                      {thread.image && (
                        <div className="mb-3 max-w-sm">
                          <img
                            src={`http://localhost:5000/uploads/${thread.image}`}
                            alt="post"
                            className="w-full max-h-60 rounded-xl object-cover"
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-5 text-zinc-500 text-xs mt-1">
                        <span className="flex items-center gap-1.5">
                          <Heart
                            size={14}
                            fill={thread.isLiked ? "currentColor" : "none"}
                            className={thread.isLiked ? "text-red-500" : ""}
                          />
                          <span
                            className={thread.isLiked ? "text-red-500" : ""}
                          >
                            {thread.likes}
                          </span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageCircle size={14} />
                          {thread.replies}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* TAB MEDIA */}
        {activeTab === "media" && (
          <>
            {threadsLoading ? (
              <div className="py-6 text-zinc-500 italic text-sm text-center">
                Memuat media...
              </div>
            ) : mediaThreads.length === 0 ? (
              <div className="py-6 text-zinc-500 text-sm text-center">
                Belum ada media.
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-[2px] mt-2">
                {mediaThreads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => navigate(`/thread/${thread.id}`)}
                    className="aspect-square overflow-hidden cursor-pointer hover:opacity-80 transition"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${thread.image}`}
                      alt="media"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
