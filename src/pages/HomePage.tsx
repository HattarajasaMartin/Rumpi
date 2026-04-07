import { Image as ImageIcon, MapPin, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { ThreadCard } from "@/components/home/Threadcard";
import { SidebarLeft } from "@/components/home/SidebarLeft";
import { SidebarRight } from "@/components/home/SidebarRight";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-full flex">
        <SidebarLeft />

        <main className="flex-1 py-8 border-r border-zinc-900 min-w-0">
          <h2 className="text-2xl font-bold mb-8 px-8">Home</h2>

          {/* Post Input Section */}
          <div className="flex gap-4 px-8 mb-10">
            <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden shrink-0">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || "user"}`}
                alt="avatar"
              />
            </div>
            <div className="flex-1 space-y-4">
              <textarea
                placeholder="What is happening?!"
                className="w-full bg-transparent border-none text-xl outline-none placeholder:text-zinc-600 resize-none min-h-[60px]"
              />
              <div className="flex items-center justify-between border-t border-zinc-900 pt-4">
                <div className="flex gap-6 text-blue-500">
                  <ImageIcon size={22} className="cursor-pointer" />
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 px-8 rounded-full h-10 font-bold border-none transition-all active:scale-95">
                  Post
                </Button>
              </div>
            </div>
          </div>

          {/* Feeds */}
          <div className="space-y-0">
            <ThreadCard
              name="Indah Pra Karya"
              username="indahpra"
              time="4h"
              content="Kalian pernah ga sih bet on saving?"
              likes={36}
              replies={381}
            />
            <ThreadCard
              name="Mona"
              username="nmonarizqa"
              time="17h"
              content="Pernah nggak dapet dream job?"
              likes={293}
              replies={120}
            />
          </div>
        </main>

        <SidebarRight />
      </div>
    </div>
  );
}
