// src/screens/Genres/GenreDetails.tsx
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeXIcon,
  Volume1Icon,
  Volume2Icon,
  HeartIcon,
  RepeatIcon,
  ShuffleIcon,
  DownloadIcon,
  Music2Icon,
} from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import songsData from "../../data/songs.json";

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

interface Reply {
  user: string;
  text: string;
  likes?: number;
  likedBy?: string[];
}

interface Comment {
  user: string;
  text: string;
  likes?: number;
  likedBy?: string[];
  replies?: Reply[];
}

export const GenreDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(75);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef<boolean>(false);

  // جمع كل الأغاني
  const allSongs: Song[] = [
    ...(songsData?.weeklyTopSongs ?? []),
    ...(songsData?.newReleaseSongs ?? []),
    ...(songsData?.trendingSongs ?? []),
  ];

  // فلترة حسب النوع
  const genreSongs = allSongs.filter((song) =>
    song.genre?.toLowerCase().includes(slug?.toLowerCase() || "")
  );

  const [currentSong, setCurrentSong] = useState<Song | null>(
    genreSongs.length > 0 ? genreSongs[0] : null
  );
  const currentIndex = genreSongs.findIndex((s) => s.id === currentSong?.id);

  // ⏳ manage audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(isNaN(audio.duration) ? 0 : audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        playNext();
      }
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [isRepeat, currentSong]);

  // 🎶 load song when change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    const wasPlaying = wasPlayingRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.src = currentSong.path ?? "";
    audio.load();
    if (wasPlaying) audio.play().catch(() => {});
    const savedComments = JSON.parse(localStorage.getItem(`comments_${currentSong.id}`) || "[]");
    setComments(savedComments);
  }, [currentSong]);

  // 🔊 volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = (isMuted ? 0 : volume) / 100;
  }, [volume, isMuted]);

  useEffect(() => {
    wasPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {}
    } else {
      audio.pause();
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = value[0] ?? 0;
    audio.currentTime = t;
    setCurrentTime(t);
  };

  const handleVolumeChange = (value: number[]) => {
    const v = value[0] ?? 0;
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => setIsMuted((p) => !p);

  const playNext = () => {
    if (!genreSongs.length) return;
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * genreSongs.length)
      : (currentIndex + 1) % genreSongs.length;
    setCurrentSong(genreSongs[nextIndex]);
  };

  const playPrevious = () => {
    if (!genreSongs.length) return;
    const prevIndex = isShuffle
      ? Math.floor(Math.random() * genreSongs.length)
      : currentIndex === 0
      ? genreSongs.length - 1
      : currentIndex - 1;
    setCurrentSong(genreSongs[prevIndex]);
  };

  const toggleFavorite = () => {
    if (!currentSong) return;
    if (isFavorite?.(currentSong.id)) {
      removeFromFavorites(currentSong.id);
    } else {
      addToFavorites({
        ...currentSong,
        releaseDate: currentSong.releaseDate ?? "",
        image: currentSong.image ?? "",
      });
    }
  };

  const formatTime = (time?: number) => {
    if (!time || isNaN(time) || !isFinite(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeXIcon className="w-5 h-5" />;
    if (volume < 50) return <Volume1Icon className="w-5 h-5" />;
    return <Volume2Icon className="w-5 h-5" />;
  };

  const handleAddComment = () => {
    if (!user || newComment.trim() === "" || !currentSong) return;
    const comment: Comment = { user: user.name, text: newComment, likes: 0, likedBy: [], replies: [] };
    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem(`comments_${currentSong.id}`, JSON.stringify(updated));
    setNewComment("");
  };

  const cover = currentSong?.image ?? "https://via.placeholder.com/400x400";

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
          {/* 🎶 Left: Player */}
          <div className="lg:w-1/3 flex flex-col items-center gap-6">
            {currentSong && (
              <>
                <img src={cover} alt={currentSong.title} className="w-60 h-60 rounded-xl object-cover shadow-xl" />

                <div className="text-center">
                  <h2 className="font-bold text-xl">{currentSong.title}</h2>
                  <p className="text-white/70">{currentSong.artist}</p>
                </div>

                <div className="flex items-center justify-center gap-5 mt-4">
                  <Button onClick={playPrevious} variant="ghost" size="icon"><SkipBackIcon className="w-6 h-6" /></Button>
                  <Button onClick={togglePlay} size="icon" className="w-14 h-14 bg-pink-600 hover:bg-pink-700">
                    {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                  </Button>
                  <Button onClick={playNext} variant="ghost" size="icon"><SkipForwardIcon className="w-6 h-6" /></Button>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-3 mt-4 w-full px-4">
                  <span className="text-xs text-white/60">{formatTime(currentTime)}</span>
                  <Slider value={[Math.min(currentTime, duration)]} max={Math.max(duration, 1)} step={1} onValueChange={handleSeek} className="flex-1" />
                  <span className="text-xs text-white/60">{formatTime(duration)}</span>
                </div>

                {/* Volume + Fav */}
                <div className="flex items-center gap-3 mt-4 w-full px-4">
                  <Button onClick={toggleMute} variant="ghost" size="icon">{getVolumeIcon()}</Button>
                  <Slider value={[isMuted ? 0 : volume]} max={100} step={1} onValueChange={handleVolumeChange} className="flex-1" />
                  <Button onClick={toggleFavorite} variant="ghost" size="icon" className={isFavorite?.(currentSong.id) ? "text-pink-500" : "text-white"}><HeartIcon className="w-6 h-6" /></Button>
                </div>
              </>
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
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${song.id === currentSong?.id ? "bg-pink-700/30" : "hover:bg-white/10"}`}
                    onClick={() => setCurrentSong(song)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={song.image ?? "https://via.placeholder.com/50"} alt={song.title} className="w-12 h-12 rounded object-cover" />
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
                  <Button size="sm" onClick={handleAddComment}>Comment</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} preload="metadata" />
    </motion.div>
  );
};
