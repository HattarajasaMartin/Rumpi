import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RegisterForm from "../features/auth/RegisterForm";

const bubbles = [
  { text: "Yuk bikin akun dulu! 🚀", side: "left" },
  { text: "Gampang banget daftarnya! 😄", side: "right" },
  { text: "Gratis loh, gaskeun! 🎉", side: "left" },
  { text: "Langsung join yuk! 🔥", side: "right" },
  { text: "Banyak temen baru nih! 👋", side: "left" },
  { text: "Ayo gabung Rumpi! 💬", side: "right" },
  { text: "Daftar sekarang bestie! 🥰", side: "left" },
  { text: "Seru banget di sini! 😍", side: "right" },
  { text: "Jangan sampai ketinggalan! 👀", side: "left" },
  { text: "Udah ribuan yang join! 🌟", side: "right" },
];

const chatMessages = [
  { text: "Halo newcomer! 👋", from: "left" },
  { text: "Hai! Baru daftar nih 😊", from: "right" },
  { text: "Selamat datang! 🎉", from: "left" },
  { text: "Makasih bestie! 🥰", from: "right" },
  { text: "Langsung explore yuk!", from: "left" },
  { text: "Siap! Let's go 🚀", from: "right" },
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
      <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-base shrink-0">
        🧑
      </div>

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

      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-base shrink-0">
        👩
      </div>
    </div>
  );
}

export default function RegisterPage() {
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

      {/* Form Register */}
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
            Buat akun baru
          </h2>
          <p className="text-zinc-500 text-sm">Gabung dan mulai ngobrol! 🎉</p>
        </div>

        <RegisterForm />

        <div className="pt-2 flex flex-col items-center gap-4">
          <Link
            to="/login"
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            Udah punya akun?{" "}
            <span className="text-teal-400 font-bold">Masuk sekarang</span>
          </Link>
        </div>
      </div>
    </div>
  );
}