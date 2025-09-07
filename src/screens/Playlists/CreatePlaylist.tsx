import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ImageIcon, LockIcon, GlobeIcon, Music2Icon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const CreatePlaylist: React.FC = () => {
  const { user } = useAuth(); 
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name.trim()) {
      alert("⚠️ Please enter a playlist name!");
      return;
    }

    const newPlaylist = {
      id: Date.now(),
      name,
      description: desc,
      cover: cover ?? "https://via.placeholder.com/400x400?text=Playlist",
      songs: [],
      isPublic,
      owner: user?.email || "Guest",
    };

    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    localStorage.setItem("playlists", JSON.stringify([...saved, newPlaylist]));
    navigate("/playlists");
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setCover(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!user) {
    return (
      <div className=" mt-[3rem] flex items-center justify-center h-screen bg-black text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-[3rem] mb-[3rem] bg-[#111] p-8 rounded-2xl shadow-2xl max-w-md text-center"
        >
          <h2 className=" text-2xl font-bold mb-4">Sign in Required</h2>
          <p className="text-white/70 mb-6">
            You must be logged in to create a playlist.
          </p>
          <Button
            className="border bg-pink-600 hover:bg-pink-700 w-full"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-black relative z-10 mt-[3rem] min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] text-white px-6 py-10 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* العنوان */}
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight">
        Create New Playlist
      </h1>

      {/* الفورم */}
      <div className="rounded-2xl bg-[#111] rounded-3xl w-full max-w-lg p-8 shadow-2xl space-y-6">
        {/* Cover */}
        <div className="flex flex-col items-center">
          {cover ? (
            <img
              src={cover}
              alt="cover"
              className="w-44 h-44 rounded-2xl object-cover shadow-lg border border-black"
            />
          ) : (
            <div className="w-44 h-44 flex items-center justify-center rounded-2xl bg-white/10 shadow-inner border border-white/5">
              <ImageIcon className="w-12 h-12 text-white/50" />
            </div>
          )}
          <label className="cursor-pointer mt-3 text-sm text-pink-400 hover:underline">
            Choose cover image
            <input type="file" accept="image/*" hidden onChange={handleFile} />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-white/60 mb-1">
            Playlist Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chill Beats 🎶"
            className="bg-[#1c1c1c] border-0 text-white rounded-xl focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-white/60 mb-1">
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Add a short description..."
            className="w-full min-h-[100px] resize-y bg-[#1c1c1c] border-0 text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Privacy */}
        <div className="flex items-center justify-between bg-[#1c1c1c] p-4 rounded-xl">
          <div className="flex items-center gap-3">
            {isPublic ? (
              <GlobeIcon className="w-5 h-5 text-green-400" />
            ) : (
              <LockIcon className="w-5 h-5 text-red-400" />
            )}
            <span className="text-white/80 text-sm">
              {isPublic ? "Public playlist" : "Private playlist"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white"
            onClick={() => setIsPublic(!isPublic)}
          >
            {isPublic ? "Make Private" : "Make Public"}
          </Button>
        </div>

        {/* Create Button */}
        <Button
          className="w-full bg-pink-600 hover:bg-pink-700 rounded-xl py-3 text-lg font-semibold"
          onClick={handleCreate}
        >
          Create Playlist
        </Button>
      </div>

      {/* ✅ نصوص إضافية تحت */}
      <div className="mt-12 text-center max-w-xl">
        <p className="text-lg text-white/70">
          <Music2Icon className="inline w-6 h-6 text-pink-500 mr-2" />
          Discover music, share vibes, build your own world 🎶
        </p>
        <p className="text-sm text-white/50 mt-2">
          Your playlists are your personal music universe. 
          Make them public to share or keep them private for yourself.
        </p>
      </div>

      {/* ✅ Footer */}
      <footer className="mt-16 py-6 border-t border-white/10 w-full text-center text-white/40 text-sm">
        © {new Date().getFullYear()} ZEREF
      </footer>
    </motion.div>
  );
};
