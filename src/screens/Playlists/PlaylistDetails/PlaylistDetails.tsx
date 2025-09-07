import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export const PlaylistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    const pl = saved.find((p: any) => p.id === Number(id));
    setPlaylist(pl);
  }, [id]);

  const addSong = () => {
    if (!title.trim() || !artist.trim()) return;
    const newSong = {
      id: Date.now(),
      title,
      artist,
      duration: "3:30",
    };

    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    const updated = saved.map((p: any) =>
      p.id === Number(id)
        ? { ...p, songs: [...p.songs, newSong] }
        : p
    );

    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylist(updated.find((p: any) => p.id === Number(id)));
    setTitle("");
    setArtist("");
  };

  if (!playlist) return <p className="text-white">Playlist not found!</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{playlist.name}</h1>
      <p className="text-white/70 mb-6">{playlist.description}</p>

      <h2 className="text-xl font-semibold mb-3">Songs</h2>
      {playlist.songs.length === 0 ? (
        <p className="text-white/50">No songs yet. Add one!</p>
      ) : (
        <ul className="mb-6 space-y-2">
          {playlist.songs.map((song: any) => (
            <li key={song.id} className="p-2 bg-[#1c1c1c] rounded-lg">
              {song.title} — {song.artist}
            </li>
          ))}
        </ul>
      )}

      {/* Add song form */}
      <div className="space-y-3">
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
        <Button className="bg-pink-600 hover:bg-pink-700" onClick={addSong}>
          Add Song
        </Button>
      </div>
    </div>
  );
};
