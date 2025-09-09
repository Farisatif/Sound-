import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { HeartIcon, PlayIcon } from "lucide-react";

const LS_KEY = "playlists";

interface Song {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
  duration?: string;
  releaseDate?: string;
}

export const PlaylistPage: React.FC = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      const playlist = saved.find((p: any) => p.id === "default");
      if (playlist) {
        setSongs(playlist.songs || []);
      }
    } catch (err) {
      console.error("Error loading playlist", err);
    }
  }, []);

  if (!songs.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">🎶 Playlist is empty!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">My Playlist</h1>

      <ul className="space-y-3">
        {songs.map((song) => (
          <li
            key={song.id}
            className="flex items-center justify-between bg-[#111] p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => navigate(`/player/${song.id}`)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={song.image ?? "https://via.placeholder.com/50"}
                alt={song.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="truncate">
                <p className="font-semibold truncate">{song.title}</p>
                <p className="text-sm text-white/70 truncate">
                  {song.artist}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs">{song.duration ?? "0:00"}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/player/${song.id}`);
                }}
                className="text-white hover:text-pink-500"
              >
                <PlayIcon className="w-5 h-5" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
