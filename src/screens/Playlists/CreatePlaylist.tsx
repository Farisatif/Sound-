import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ImageIcon } from "lucide-react";

export const CreatePlaylist: React.FC = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Please enter a playlist name!");
      return;
    }

    const newPlaylist = {
      id: Date.now(),
      name,
      description: desc,
      cover: cover ?? "https://via.placeholder.com/400x400?text=Playlist",
      songs: [],
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

  return (
    <motion.div
      className="relative z-10 mt-[3rem] min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] text-white px-6 py-8 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-extrabold mb-8 tracking-tight">
        New Playlist
      </h1>

      <div className="bg-[#111] rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-20">
        {/* Cover */}
        <div className="flex flex-col items-center mb-6">
          {cover ? (
            <img
              src={cover}
              alt="cover"
              className="w-40 h-40 rounded-2xl object-cover shadow-lg"
            />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center rounded-2xl bg-white/10 shadow-inner">
              <ImageIcon className="w-12 h-12 text-white/50" />
            </div>
          )}
          <label className="cursor-pointer mt-3 text-sm text-pink-400 hover:underline">
            Choose cover image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFile}
            />
          </label>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-xs uppercase tracking-wide text-white/60 mb-1">
            Playlist Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Vibes 🎶"
            className="bg-[#1c1c1c] border-0 text-white rounded-xl focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wide text-white/60 mb-1">
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Add a short description..."
            className="w-full min-h-[110px] resize-y bg-[#1c1c1c] border-0 text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <Button
          className="w-full bg-pink-600 hover:bg-pink-700 rounded-xl py-3 text-lg font-semibold"
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>
    </motion.div>
  );
};
