import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { PlayIcon, ArrowLeft } from "lucide-react";

export const PlaylistDetails: React.FC = () => {
  const { id } = useParams(); // ناخذ ID من الرابط
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<any | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    const found = saved.find((p: any) => String(p.id) === String(id));
    setPlaylist(found || null);
  }, [id]);

  if (!playlist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">Playlist not found ❌</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="text-white"
          onClick={() => navigate("/playlists")}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>
        <h1 className="text-3xl font-bold">{playlist.name}</h1>
      </div>

      {/* Cover + Info */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={playlist.cover || "https://via.placeholder.com/200"}
          alt={playlist.name}
          className="w-40 h-40 rounded-xl object-cover"
        />
        <div>
          <p className="text-white/70">{playlist.description}</p>
          <p className="text-white/50 text-sm mt-2">
            {playlist.songs?.length || 0} songs
          </p>
        </div>
      </div>

      {/* Songs */}
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      {playlist.songs?.length ? (
        <ul className="space-y-3">
          {playlist.songs.map((song: any) => (
            <li
              key={song.id}
              className="flex items-center justify-between bg-[#111] p-3 rounded-lg hover:bg-[#222]"
            >
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-white/70">{song.artist}</p>
              </div>
              <Button
                size="icon"
                className="bg-[#ee0faf] hover:bg-[#ee0faf]/80"
                onClick={() => navigate(`/player/${song.id}`)}
              >
                <PlayIcon className="w-5 h-5" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white/50">No songs in this playlist yet.</p>
      )}
    </div>
  );
};
