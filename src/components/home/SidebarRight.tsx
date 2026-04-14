import { Button } from "@/components/ui/button";
import { SuggestItem } from "./SuggestItem";
import { useAuth } from "@/hooks/useAuth";

export const SidebarRight = () => {
  const { user } = useAuth();

  return (
    <aside className="w-[25%] sticky top-0 h-screen py-8 px-8 space-y-6 overflow-y-auto">
      <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 shadow-2xl">
        <h3 className="font-bold mb-4 text-sm text-blue-500 uppercase tracking-widest">
          My Profile
        </h3>
        <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-[-48px]"></div>
        <div className="px-2 pb-2">
          <div className="w-20 h-20 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden relative z-10">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || "default"}`}
              alt="me"
            />
          </div>
          <div className="mt-3">
            <h4 className="font-bold text-xl leading-tight text-white italic">
              ✨ {user?.full_name || "Guest User"} ✨
            </h4>
            <p className="text-zinc-500">@{user?.username || "username"}</p>
            <p className="text-sm mt-3 text-zinc-300">
              {user?.bio || "No bio yet."}
            </p>
            <div className="flex gap-6 mt-4 text-sm font-semibold">
              <span>
                <b className="text-white">{ user?.following }</b> Following
              </span>
              <span>
                <b className="text-white">{ user?.followers }</b> Followers
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-5 border-zinc-700 rounded-full h-10 font-bold text-white hover:bg-zinc-800 transition-all"
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
        <h3 className="font-bold mb-5 text-zinc-100 text-sm uppercase">
          Suggested for you
        </h3>
        <div className="space-y-6">
          <SuggestItem name="Mohammed Jawahir" username="em.jawahir" />
          <SuggestItem name="Shakia Kimathi" username="shakiakim" />
        </div>
      </div>
    </aside>
  );
};
