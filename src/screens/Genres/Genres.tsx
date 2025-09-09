// src/pages/genres/GenreSongs.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import songsData from "../../data/oldSongs.json";
import { Button } from "../../components/ui/button";

interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
  path: string;
  image?: string;
  duration?: string;
}

export const GenreSongs: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const allSongs: Song[] = Array.isArray(songsData) ? songsData : [];

  // فلترة الأغاني حسب الـ genre
  const filtered = allSongs.filter(
    (s) => s.genre?.toLowerCase() === slug?.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-6">
        {slug?.toUpperCase()} Songs
      </h1>

      {filtered.length > 0 ? (
        <ul className="space-y-3">
          {filtered.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[#111] hover:bg-[#1f1f1f] transition cursor-pointer"
              onClick={() => navigate(`/player/${song.id}`)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={song.image ?? "https://via.placeholder.com/50"}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-white/70">{song.artist}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                Play
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white/60">No songs available in this genre.</p>
      )}
    </div>
  );
};
