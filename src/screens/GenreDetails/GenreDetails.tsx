// src/screens/Genres/GenreDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Music2Icon } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import songsData from "../../data/songs.json";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer"; // ✅ ربط بالمشغل الأساسي

interface Song {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
  genre?: string;
  duration?: string;
  releaseDate?: string;
}

interface Comment {
  user: string;
  text: string;
  likes?: number;
  likedBy?: string[];
}

export const GenreDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // 🗂 جمع كل الأغاني
  const allSongs: Song[] = [
    ...(songsData?.weeklyTopSongs ?? []),
    ...(songsData?.newReleaseSongs ?? []),
    ...(songsData?.trendingSongs ?? []),
  ];

  // 🎶 فلترة حسب النوع
  const genreSongs = allSongs.filter((song) =>
    song.genre?.toLowerCase().includes(slug?.toLowerCase() || "")
  );

  const [currentSong, setCurrentSong] = useState<Song | null>(
    genreSongs.length > 0 ? genreSongs[0] : null
  );

  // 📝 التعليقات
  useEffect(() => {
    if (currentSong) {
      const saved = JSON.parse(localStorage.getItem(`comments_${currentSong.id}`) || "[]");
      setComments(saved);
    }
  }, [currentSong]);

  const handleAddComment = () => {
    if (!user || newComment.trim() === "" || !currentSong) return;
    const comment: Comment = { user: user.name, text: newComment, likes: 0, likedBy: [] };
    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem(`comments_${currentSong.id}`, JSON.stringify(updated));
    setNewComment("");
  };

  return (
    <motion.div className="mt-[3rem] min-h-screen bg-black text-white relative px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Music2Icon className="w-8 h-8 text-pink-500" />
        <h1 className="text-3xl font-extrabold capitalize">
          {slug} <span className="text-pink-500">Songs</span>
        </h1>
      </div>

      {genreSongs.length === 0 ? (
        <p className="text-white/60">No songs found for this genre.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 🎶 Left: المشغل الأساسي */}
          <div className="lg:w-1/3 flex flex-col items-center gap-6">
            {currentSong && (
              <MusicPlayer
                currentSong={currentSong}
                songs={genreSongs}
                onChangeSong={setCurrentSong}
                isFavorite={isFavorite?.(currentSong.id)}
                toggleFavorite={() =>
                  isFavorite?.(currentSong.id)
                    ? removeFromFavorites(currentSong.id)
                    : addToFavorites(currentSong)
                }
              />
            )}
          </div>

          {/* 🎵 Right: Playlist + Comments */}
          <div className="lg:flex-1 space-y-6">
            {/* Playlist */}
            <div className="bg-[#111] rounded-xl p-4">
              <h2 className="text-xl font-bold mb-2">Playlist</h2>
              <ul className="space-y-2">
                {genreSongs.map((song) => (
                  <li
                    key={song.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      song.id === currentSong?.id
                        ? "bg-pink-700/30"
                        : "hover:bg-white/10"
                    }`}
                    onClick={() => setCurrentSong(song)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={song.image ?? "https://via.placeholder.com/50"}
                        alt={song.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="truncate">
                        <p className="font-semibold truncate">{song.title}</p>
                        <p className="text-sm text-white/70 truncate">{song.artist}</p>
                      </div>
                    </div>
                    <span className="text-xs">{song.duration ?? "0:00"}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comments */}
            <div className="bg-[#111] rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">Comments</h3>
              {comments.length > 0 ? (
                <ul className="space-y-3">
                  {comments.map((c, idx) => (
                    <li key={idx} className="bg-[#1b1b1b] p-3 rounded-md">
                      <p className="font-semibold">{c.user}</p>
                      <p className="text-sm mt-1">{c.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-white/60">No comments yet.</p>
              )}

              {user && (
                <div className="mt-4 flex gap-2">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 bg-[#222] p-2 rounded-md text-sm"
                    placeholder="Write a comment..."
                  />
                  <Button size="sm" onClick={handleAddComment}>
                    Comment
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
