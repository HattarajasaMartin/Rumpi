import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // membuat koneksi realtime ke backend

export function useThreads() {
    const navigate = useNavigate();
    const [threads, setThreads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null); // State untuk file gambar
    const [isPosting, setIsPosting] = useState(false);

    const token = localStorage.getItem("token"); // ambil token dari local storage

    useEffect(() => {
        socket.on("newThread", (newThreadFromSocket) => { // mendengarkan event dari server (kalau ada data baru langsung tahu)
            setThreads((prevThreads) => { // funct masukkan post terbaru ke paling atas (state berubah)
                const exists = prevThreads.find(t => t.id === newThreadFromSocket.id); // cek dulu supaya tidak duplikat
                if (exists) return prevThreads;
                return [newThreadFromSocket, ...prevThreads]; // post baru berada di paling atas
            });
        });

        return () => {
            socket.off("newThread");
        };
    }, []);

    const fetchThreads = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/v1/thread?limit=25", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setThreads(response.data);
        } catch (err: any) {
            if (err.response?.status === 401) navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    const handlePost = async () => { // saat button post ditekan, fungsi jalan
        if (!content.trim() && !image) return; 

        try {
            setIsPosting(true);

            // WAJIB pakai FormData untuk kirim File
            const formData = new FormData(); // pakai form data (json biasa tidak bisa kirim file)
            formData.append("content", content);
            if (image) {
                formData.append("image", image);
            }

            // KIRIM DATA FORM KE BACKEND
            await axios.post(
                "http://localhost:5000/api/v1/thread", // endpoint CREATE post di backend
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // harus ada token dulu
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setContent("");
            setImage(null);
        } catch (err) {
            alert("Gagal mengirim postingan!");
        } finally {
            setIsPosting(false);
        }
    };

    const handleLike = async (threadId: number) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/thread/like",
                { threadId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { isLiked } = response.data;
            setThreads((prevThreads) =>
                prevThreads.map((t) => {
                    if (t.id === threadId) {
                        return {
                            ...t,
                            isLiked: isLiked,
                            likes: isLiked ? t.likes + 1 : t.likes - 1,
                        };
                    }
                    return t;
                })
            );
        } catch (err) {
            console.error("Gagal memproses like:", err);
        }
    };

    useEffect(() => {
        fetchThreads();
    }, []);

    return {
        threads,
        loading,
        content,
        setContent,
        image,
        setImage,
        isPosting,
        handlePost,
        handleLike
    };
}