import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  PlayIcon,
  TrashIcon,
  HeartIcon,
  Clock,
  ShuffleIcon,
  ArrowLeft,
  Share2,
  Minimize2,
  Pause,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

const LS_KEY = "playlists";
const LAST_PLAYED_KEY = "lastPlayed";

interface Song {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
  duration?: string;
  releaseDate?: string;
  playCount?: number;
}

export const PlaylistPage: React.FC = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "artist" | "date">("title");
  const [miniPlayer, setMiniPlayer] = useState<Song | null>(null);
  const [favorites, setFavorites] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // تحميل الأغاني
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

  // تحميل آخر أغنية مشغلة
  useEffect(() => {
    const last = localStorage.getItem(LAST_PLAYED_KEY);
    if (last) {
      const song = songs.find((s) => s.id === Number(last));
      if (song) setMiniPlayer(song);
    }
  }, [songs]);

  // حساب مدة إجمالية
  const totalDuration = useMemo(() => {
    const totalSeconds = songs.reduce((acc, s) => {
      if (!s.duration) return acc;
      const [min, sec] = s.duration.split(":").map(Number);
      return acc + min * 60 + sec;
    }, 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  }, [songs]);

  // فلترة + فرز
  const filteredSongs = useMemo(() => {
    let list = [...songs];
    if (search.trim()) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.artist.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "artist") {
      list.sort((a, b) => a.artist.localeCompare(b.artist));
    } else if (sortBy === "date") {
      list.sort(
        (a, b) => (a.releaseDate || "").localeCompare(b.releaseDate || "")
      );
    }
    return list;
  }, [songs, search, sortBy]);

  // حفظ الترتيب
  const saveOrder = (newSongs: Song[]) => {
    setSongs(newSongs);
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    const newPlaylists = saved.map((p: any) =>
      p.id === "default" ? { ...p, songs: newSongs } : p
    );
    localStorage.setItem(LS_KEY, JSON.stringify(newPlaylists));
  };

  // DnD
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(songs);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    saveOrder(reordered);
  };

  // حذف الكل
  const clearPlaylist = () => {
    saveOrder([]);
  };

  // حذف أغنية
  const removeSong = (id: number) => {
    saveOrder(songs.filter((s) => s.id !== id));
  };

  // تشغيل أغنية
  const playSong = (song: Song) => {
    localStorage.setItem(LAST_PLAYED_KEY, song.id.toString());
    setMiniPlayer(song);
    setIsPlaying(true);
    setProgress(0);

    const updated = songs.map((s) =>
      s.id === song.id ? { ...s, playCount: (s.playCount || 0) + 1 } : s
    );
    saveOrder(updated);

    navigate(`/player/${song.id}`);
  };

  // Shuffle play
  const shufflePlay = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    playSong(songs[randomIndex]);
  };

  // مشاركة
  const sharePlaylist = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("✅ Playlist link copied!");
  };

  // Progress simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!songs.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">🎶 Playlist is empty!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Playlist Header */}
      <div className="bg-gradient-to-b from-pink-700/70 to-black p-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src={songs[0]?.image ?? "https://via.placeholder.com/150"}
          alt="Playlist Cover"
          className="w-40 h-40 rounded-lg object-cover shadow-2xl"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold flex items-center gap-3">
            My Playlist
            <button
              onClick={() => setFavorites(!favorites)}
              className={`p-2 rounded-full ${
                favorites ? "text-pink-500" : "text-white/60"
              }`}
            >
              <HeartIcon className="w-6 h-6" />
            </button>
          </h1>
          <p className="text-white/70 mt-1">
            {songs.length} songs • {totalDuration}
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <Button
              onClick={() => playSong(songs[0])}
              className="bg-pink-600 hover:bg-pink-700 shadow-lg"
            >
              <PlayIcon className="w-5 h-5 mr-2" /> Play All
            </Button>
            <Button
              onClick={shufflePlay}
              className="bg-purple-600 hover:bg-purple-700 shadow-lg"
            >
              <ShuffleIcon className="w-5 h-5 mr-2" /> Shuffle
            </Button>
            <Button
              onClick={clearPlaylist}
              variant="outline"
              className="text-white border-white/40 hover:border-red-500"
            >
              <TrashIcon className="w-5 h-5 mr-2" /> Clear
            </Button>
            <Button
              onClick={sharePlaylist}
              variant="outline"
              className="text-white border-white/40 hover:border-green-500"
            >
              <Share2 className="w-5 h-5 mr-2" /> Share
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="text-white border-white/40 hover:border-pink-500"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </Button>
          </div>
        </div>
      </div>

      {/* Search + Sort */}
      <div className="p-6 max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search in playlist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 rounded-lg bg-[#1c1c1c] text-white outline-none"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 rounded-lg bg-[#1c1c1c] text-white outline-none"
        >
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      {/* Songs List */}
      <div className="p-6 max-w-4xl mx-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="playlist">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {filteredSongs.map((song, index) => (
                  <Draggable
                    key={song.id.toString()}
                    draggableId={song.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <motion.li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                          snapshot.isDragging
                            ? "bg-pink-600/30 scale-105 shadow-lg"
                            : "bg-[#111] hover:bg-white/10"
                        } transition`}
                        onClick={() => playSong(song)}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={song.image ?? "https://via.placeholder.com/50"}
                            alt={song.title}
                            className="w-14 h-14 rounded-lg object-cover shadow"
                          />
                          <div className="truncate">
                            <p className="font-semibold truncate">{song.title}</p>
                            <p className="text-sm text-white/60 truncate">
                              {song.artist}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-white/70">
                          {song.playCount ? (
                            <span className="hidden sm:flex items-center gap-1">
                              ▶ {song.playCount}
                            </span>
                          ) : null}
                          {song.releaseDate && (
                            <span className="hidden sm:flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {song.releaseDate}
                            </span>
                          )}
                          <span>{song.duration ?? "0:00"}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSong(song.id);
                            }}
                            className="text-red-400 hover:text-red-600"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </Button>
                        </div>
                      </motion.li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Mini Player */}
      {miniPlayer && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 right-4 bg-[#1c1c1c] text-white p-4 rounded-lg shadow-2xl flex flex-col gap-2 w-[320px]"
        >
          <div className="flex items-center gap-4">
            <img
              src={miniPlayer.image ?? "https://via.placeholder.com/50"}
              alt={miniPlayer.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="truncate flex-1">
              <p className="font-semibold truncate">{miniPlayer.title}</p>
              <p className="text-sm text-white/60 truncate">
                {miniPlayer.artist}
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-pink-500"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setMiniPlayer(null)}
              className="text-white hover:text-red-500"
            >
              <Minimize2 className="w-5 h-5" />
            </Button>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/20 rounded">
            <div
              className="h-1 bg-pink-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};
