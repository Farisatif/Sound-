// PlaylistDetails.tsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { PlayIcon, Music2Icon, UserIcon, PlusIcon } from "lucide-react";

export const PlaylistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // تحميل القائمة
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    const pl = saved.find((p: any) => p.id === Number(id));
    setPlaylist(pl);
  }, [id]);

  // إضافة أغنية
  const addSong = () => {
    if (!title.trim() || !artist.trim() || !file) return;

    const fileURL = URL.createObjectURL(file);

    const newSong = {
      id: Date.now(),
      title,
      artist,
      duration: "3:30",
      url: fileURL,
    };

    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    const updated = saved.map((p: any) =>
      p.id === Number(id) ? { ...p, songs: [...p.songs, newSong] } : p
    );

    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylist(updated.find((p: any) => p.id === Number(id)));

    // reset
    setTitle("");
    setArtist("");
    setFile(null);
  };

  // تشغيل أغنية
  const playSong = (url: string) => {
    setCurrentSong(url);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  if (!playlist) return <p className="text-white">Playlist not found!</p>;

  return (
    <motion.div
      className="mt-[4rem] min-h-screen bg-black text-white px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2">{playlist.name}</h1>
        <p className="text-white/70">{playlist.description}</p>
      </div>

      {/* Songs */}
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      {playlist.songs.length === 0 ? (
        <p className="text-white/50 mb-6">No songs yet. Add one!</p>
      ) : (
        <div className="grid gap-4 mb-10">
          {playlist.songs.map((song: any) => (
            <Card
              key={song.id}
              className="bg-[#1c1c1c] border-0 hover:bg-[#292929] transition cursor-pointer"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <Music2Icon className="text-pink-500 w-6 h-6" />
                <div className="flex-1">
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-white/60 text-sm flex items-center gap-1">
                    <UserIcon className="w-4 h-4" /> {song.artist}
                  </p>
                </div>
                <Button
                  size="icon"
                  className="bg-pink-600 hover:bg-pink-700"
                  onClick={() => playSong(song.url)}
                >
                  <PlayIcon className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Song Form */}
      <div className="bg-[#111] p-6 rounded-2xl shadow-xl space-y-4">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <PlusIcon className="w-5 h-4 text-pink-500" /> Add Song
        </h3>
        <Input
          placeholder="Song title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-white text-sm"
        />
        <Button
          className="w-full bg-pink-600 hover:bg-pink-700"
          onClick={addSong}
        >
          Add Song
        </Button>
      </div>

      {/* مشغل الصوت */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#111] p-4 flex items-center justify-between shadow-lg z-50">
          <p className="text-white text-sm">Now Playing...</p>
          <audio ref={audioRef} controls className="w-[70%]" />
        </div>
      )}
    </motion.div>
  );
};
