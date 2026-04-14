import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Threadcard } from "@/components/home/Threadcard";
import { SidebarLeft } from "@/components/home/SidebarLeft";
import { SidebarRight } from "@/components/home/SidebarRight";
import { useThreadDetail } from "../hooks/useThreadDetail";

export default function ThreadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Memanggil semua "otak" dari custom hook
  const {
    thread,
    replies,
    loading,
    replyContent,
    setReplyContent,
    isSubmitting,
    handleReply,
    user,
  } = useThreadDetail(id);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-zinc-500 flex items-center justify-center">
        Memuat postingan...
      </div>
    );

  if (!thread)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Postingan tidak ditemukan.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex">
      <SidebarLeft />

      <main className="flex-1 border-r border-zinc-900 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-8 p-4 sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-zinc-900">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-zinc-900 p-2 rounded-full transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Post</h2>
        </div>

        <Threadcard {...thread} />

        {/* Input Reply */}
        <div className="p-4 border-b border-zinc-900 flex gap-4">
          <img
            src={
              user?.photo_profile ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`
            }
            className="w-10 h-10 rounded-full shrink-0"
            alt="my-avatar"
          />
          <div className="flex-1">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Post your reply"
              className="w-full bg-transparent outline-none text-xl resize-none min-h-[50px]"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleReply}
                disabled={isSubmitting || !replyContent.trim()}
                className="bg-blue-500 hover:bg-blue-600 px-5 py-1.5 rounded-full font-bold disabled:opacity-50 transition"
              >
                {isSubmitting ? "Reply..." : "Reply"}
              </button>
            </div>
          </div>
        </div>

        {/* List Replies */}
        <div className="divide-y divide-zinc-900">
          {replies.length === 0 ? (
            <div className="p-10 text-center text-zinc-500">
              Belum ada komentar.
            </div>
          ) : (
            replies.map((reply) => (
              <div
                key={reply.id}
                className="p-4 flex gap-3 hover:bg-zinc-950/30 transition"
              >
                <img
                  src={
                    reply.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.username}`
                  }
                  className="w-10 h-10 rounded-full bg-zinc-800 object-cover shrink-0"
                  alt="avatar"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 text-[14px]">
                    <span className="font-bold text-white">
                      {reply.name || reply.username}
                    </span>
                    <span className="text-zinc-500">@{reply.username}</span>
                  </div>
                  <p className="text-zinc-200 mt-1 leading-normal">
                    {reply.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <SidebarRight />
    </div>
  );
}
