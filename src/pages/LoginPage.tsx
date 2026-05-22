import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../features/auth/LoginForm";

const bubbles = [
  { text: "Hei, udah denger berita terbaru? 👀", side: "left" },
  { text: "Belum nih, cerita dong! 🤩", side: "right" },
  { text: "Yaudah gabung dulu di Rumpi! 😄", side: "left" },
  { text: "Seru banget di sini! 🔥", side: "right" },
  { text: "Ayo ikutan ngobrol! 💬", side: "left" },
  { text: "Rumpi bareng yuk! 🎉", side: "right" },
  { text: "Banyak info menarik nih! 😍", side: "left" },
  { text: "Wah serius? Cerita dong! 🗣️", side: "right" },
  { text: "Udah pada tau belum? 🤭", side: "left" },
  { text: "Apaan tuh? Spill dong! 👇", side: "right" },
  { text: "Makasih infonya bestie! 🥰", side: "left" },
  { text: "Sama-sama, follow aku ya! 😆", side: "right" },
  { text: "Eh ada yang baru nih gaes! 📢", side: "left" },
  { text: "Beneran? Serius nih? 😱", side: "right" },
  { text: "Iya dong, di Rumpi semua ada! 🌟", side: "left" },
  { text: "Langsung daftar aja yuk! 🚀", side: "right" },
];

const chatMessages = [
  { text: "Spill dong! 👀", from: "left" },
  { text: "Ih seru banget 😆", from: "right" },
  { text: "Udah tau belum? 🤭", from: "left" },
  { text: "Beneran?! 😱", from: "right" },
  { text: "Iya dong bestie!", from: "left" },
  { text: "Makasih infonya 🥰", from: "right" },
];

interface Bubble {
  uid: number;
  text: string;
  side: string;
  top: number;
}

interface ChatMsg {
  uid: number;
  text: string;
  from: string;
}

function ChatAnimation() {
  const [visibleMessages, setVisibleMessages] = useState<ChatMsg[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = chatMessages[currentIndex % chatMessages.length];
      const newMsg: ChatMsg = {
        uid: Date.now() + Math.random(),
        text: msg.text,
        from: msg.from,
      };

      setVisibleMessages((prev) => [...prev, newMsg].slice(-3));
      setCurrentIndex((i) => i + 1);
    }, 1200);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="flex items-center gap-3">
      {/* Avatar kiri */}
      <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-base shrink-0">
        🧑
      </div>

      {/* Bubble chat mini */}
      <div className="flex flex-col gap-1 w-36 min-h-[72px] justify-end overflow-hidden">
        {visibleMessages.map((msg) => (
          <div
            key={msg.uid}
            className={`text-[10px] px-2 py-1 rounded-xl leading-tight max-w-[90%] animate-fade-in-up
              ${msg.from === "left"
                ? "self-start bg-zinc-700 text-zinc-200 rounded-tl-none"
                : "self-end bg-teal-700/60 text-teal-100 rounded-tr-none"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Avatar kanan */}
      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-base shrink-0">
        👩
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [activeBubbles, setActiveBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    let index = 0;

    const addBubble = () => {
      const bubble = bubbles[index % bubbles.length];
      const newBubble: Bubble = {
        uid: Date.now() + Math.random(),
        text: bubble.text,
        side: bubble.side,
        top: Math.floor(Math.random() * 75) + 5,
      };

      setActiveBubbles((prev) => [...prev, newBubble]);

      setTimeout(() => {
        setActiveBubbles((prev) =>
          prev.filter((b) => b.uid !== newBubble.uid)
        );
      }, 3000);

      index++;
    };

    addBubble();
    const interval = setInterval(addBubble, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">

      {/* Animasi bubble chat background */}
      {activeBubbles.map((bubble) => (
        <div
          key={bubble.uid}
          style={{ top: `${bubble.top}%` }}
          className={`absolute max-w-[200px] px-4 py-2 rounded-2xl text-sm text-zinc-200 shadow-lg pointer-events-none
            ${bubble.side === "left"
              ? "left-6 rounded-tl-none bg-zinc-800 animate-slide-in-left"
              : "right-6 rounded-tr-none bg-teal-600/40 animate-slide-in-right"
            }`}
        >
          {bubble.text}
        </div>
      ))}

      {/* Form Login */}
      <div className="w-full max-w-[370px] space-y-8 z-10">

        {/* Logo + Chat Animation */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl font-black text-teal-400 tracking-tighter">
            Rumpi
          </h1>
          <ChatAnimation />
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-white font-bold text-lg tracking-tight">
            Masuk ke akun kamu
          </h2>
          <p className="text-zinc-500 text-sm">Senang ketemu lagi! 👋</p>
        </div>

        <LoginForm />

        <div className="pt-2 flex flex-col items-center gap-4">
          <Link
            to="/register"
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            Belum punya akun?{" "}
            <span className="text-teal-400 font-bold">Daftar sekarang</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
