// src/pages/player/MusicPlayer.tsx
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import {
  PlayIcon,
  PlusIcon,
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
  GlobeIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import songsData from "../../data/songs.json";

/* -------------------------------------------------------
 * Types
 * -----------------------------------------------------*/
interface Song {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
  duration?: string;        // e.g. "3:21"
  releaseDate?: string;     // e.g. "2021-05-01"
  album?: string;
  lyrics?: string;
  language?: string;
  rank?: string;
  genre?: string;
  plays?: number;
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

/* -------------------------------------------------------
 * Constants / LocalStorage Keys
 * -----------------------------------------------------*/
const LS_DEFAULT_PLAYLIST_KEY = "playlists";
const DEFAULT_PLAYLIST_ID = "default";

/* -------------------------------------------------------
 * Utilities
 * -----------------------------------------------------*/
const parseDurationToSeconds = (d?: string): number => {
  if (!d) return 0;
  const [m, s] = d.split(":").map((n) => parseInt(n, 10));
  if (Number.isNaN(m) || Number.isNaN(s)) return 0;
  return m * 60 + s;
};

// safe image (لا تغيّر URL لو موجودة؛ استخدم placeholder فقط عند عدم توفرها)
const safeImage = (url?: string, size = 400) =>
  url && url.trim().length > 0
    ? url
    : `https://via.placeholder.com/${size}x${size}?text=No+Image`;

// تنسيق وقت (ثواني) إلى "m:ss"
const formatTime = (time?: number) => {
  if (!time || isNaN(time) || !isFinite(time)) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

// استخراج كل الأغاني من ملف الداتا، مع حماية من undefined
const flattenSongs = (): Song[] => [
  ...((songsData as any)?.weeklyTopSongs ?? []),
  ...((songsData as any)?.newReleaseSongs ?? []),
  ...((songsData as any)?.trendingSongs ?? []),
];

/* -------------------------------------------------------
 * Component
 * -----------------------------------------------------*/
type AgeFilter = "all" | "new" | "old";

export const MusicPlayer: React.FC = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();

  // ====== Core audio/player state ======
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(75);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // ====== Comments state ======
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // ====== Filters Header (مثل سامسونج بلاي) ======
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [ageFilter, setAgeFilter] = useState<AgeFilter>("all");
  const [cutOffDate, setCutOffDate] = useState<string>("2015-01-01");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef<boolean>(false);

  // ====== Data ======
  const allSongs: Song[] = useMemo(() => flattenSongs(), []);
  const parsedId = songId ? parseInt(songId, 10) : undefined;

  const currentSong: Song | undefined = useMemo(
    () =>
      (parsedId ? allSongs.find((s) => s.id === parsedId) : undefined) ??
      allSongs[0],
    [parsedId, allSongs]
  );

  const currentIndex = useMemo(
    () => allSongs.findIndex((s) => s.id === currentSong?.id),
    [allSongs, currentSong]
  );

  // ====== Related songs (نفس الفنان أو نفس الألبوم) ======
  const relatedSongs = useMemo(
    () =>
      allSongs.filter(
        (s) =>
          s.id !== currentSong?.id &&
          (s.artist === currentSong?.artist ||
            (!!s.album && s.album === currentSong?.album))
      ),
    [allSongs, currentSong]
  );

  // ====== Languages derived from data (مع “All”) ======
  const languages = useMemo(() => {
    const set = new Set<string>();
    allSongs.forEach((s) => s.language && set.add(s.language));
    return ["All", ...Array.from(set)];
  }, [allSongs]);

  // ====== Helper: تصنيف الأغنية قديم/جديد حسب cutOffDate ======
  const getAgeBucket = useCallback(
    (song: Song): AgeFilter | "unknown" => {
      if (!song.releaseDate) return "unknown";
      const d = new Date(song.releaseDate);
      const c = new Date(cutOffDate);
      if (isNaN(d.getTime()) || isNaN(c.getTime())) return "unknown";
      return d < c ? "old" : "new";
    },
    [cutOffDate]
  );

  // ====== Filtered songs by language & age ======
  const filteredSongs = useMemo(() => {
    return allSongs.filter((song) => {
      const matchLang = selectedLanguage === "All" || song.language === selectedLanguage;

      if (ageFilter === "all") {
        return matchLang;
      }

      const bucket = getAgeBucket(song);
      if (bucket === "unknown") {
        // لا نعرض المجهولة عندما يختار المستخدم "Old" أو "New"
        return false;
      }

      return matchLang && bucket === ageFilter;
    });
  }, [allSongs, selectedLanguage, ageFilter, getAgeBucket]);

  /* -------------------------------------------------------
   * Audio events binding
   * -----------------------------------------------------*/
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRepeat, currentSong?.id]);

  /* -------------------------------------------------------
   * Load song when currentSong changes + load comments
   * -----------------------------------------------------*/
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const wasPlaying = wasPlayingRef.current;
    audio.pause();
    audio.currentTime = 0;

    // مهم: لا نعدّل مسار الصورة/الصوت لو موجود في الداتا
    audio.src = currentSong.path ?? "";
    audio.load();

    if (wasPlaying) audio.play().catch(() => {});

    // Load comments from LS
    const savedComments = JSON.parse(
      localStorage.getItem(`comments_${currentSong.id}`) || "[]"
    );
    setComments(savedComments);
  }, [currentSong]);

  /* -------------------------------------------------------
   * Volume / mute
   * -----------------------------------------------------*/
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = (isMuted ? 0 : volume) / 100;
  }, [volume, isMuted]);

  useEffect(() => {
    wasPlayingRef.current = isPlaying;
  }, [isPlaying]);

  /* -------------------------------------------------------
   * Player controls
   * -----------------------------------------------------*/
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

  const playNext = useCallback(() => {
    if (!allSongs.length) return;
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * allSongs.length)
      : (currentIndex + 1) % allSongs.length;
    const nextId = allSongs[nextIndex]?.id;
    if (nextId !== undefined) navigate(`/player/${nextId}`);
  }, [allSongs, currentIndex, isShuffle, navigate]);

  const playPrevious = useCallback(() => {
    if (!allSongs.length) return;
    const prevIndex = isShuffle
      ? Math.floor(Math.random() * allSongs.length)
      : currentIndex === 0
      ? allSongs.length - 1
      : currentIndex - 1;
    const prevId = allSongs[prevIndex]?.id;
    if (prevId !== undefined) navigate(`/player/${prevId}`);
  }, [allSongs, currentIndex, isShuffle, navigate]);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeXIcon className="w-5 h-5" />;
    if (volume < 50) return <Volume1Icon className="w-5 h-5" />;
    return <Volume2Icon className="w-5 h-5" />;
  };

  /* -------------------------------------------------------
   * Favorites
   * -----------------------------------------------------*/
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

  /* -------------------------------------------------------
   * Default playlist (add/remove toggle)
   * -----------------------------------------------------*/
  const getDefaultPlaylist = (): any => {
    const saved = JSON.parse(localStorage.getItem(LS_DEFAULT_PLAYLIST_KEY) || "[]");
    let playlist = saved.find((p: any) => p.id === DEFAULT_PLAYLIST_ID);
    if (!playlist) {
      playlist = { id: DEFAULT_PLAYLIST_ID, name: "My Playlist", songs: [] };
      saved.push(playlist);
      localStorage.setItem(LS_DEFAULT_PLAYLIST_KEY, JSON.stringify(saved));
    }
    return { saved, playlist };
  };

  const isInDefaultPlaylist = (songId: number): boolean => {
    const { playlist } = getDefaultPlaylist();
    return !!playlist.songs.find((s: Song) => s.id === songId);
  };

  const toggleSongInDefaultPlaylist = (song: Song) => {
    if (!song) return;
    try {
      const { saved, playlist } = getDefaultPlaylist();

      if (isInDefaultPlaylist(song.id)) {
        // remove
        playlist.songs = playlist.songs.filter((s: Song) => s.id !== song.id);
        localStorage.setItem(LS_DEFAULT_PLAYLIST_KEY, JSON.stringify(saved));
        alert(`➖ Removed from My Playlist: ${song.title}`);
      } else {
        // add
        playlist.songs.push(song);
        localStorage.setItem(LS_DEFAULT_PLAYLIST_KEY, JSON.stringify(saved));
        alert(`➕ Added to My Playlist: ${song.title}`);
      }
    } catch (err) {
      console.error("Error toggling default playlist", err);
    }
  };

  /* -------------------------------------------------------
   * Download (requires user)
   * -----------------------------------------------------*/
  const handleDownload = () => {
    if (!user || !currentSong?.path) return;
    const a = document.createElement("a");
    a.href = currentSong.path;
    a.download = `${currentSong.title}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  /* -------------------------------------------------------
   * Comments: like/unlike on comments and replies
   * -----------------------------------------------------*/
  const persistComments = (updated: Comment[]) => {
    if (!currentSong) return;
    localStorage.setItem(`comments_${currentSong.id}`, JSON.stringify(updated));
  };

  const toggleLikeComment = (idx: number) => {
    if (!user || !currentSong) return;
    const updated = [...comments];
    const c = updated[idx];
    if (!c.likedBy) c.likedBy = [];

    if (c.likedBy.includes(user.name)) {
      c.likedBy = c.likedBy.filter((u) => u !== user.name);
    } else {
      c.likedBy.push(user.name);
    }
    c.likes = c.likedBy.length;
    setComments(updated);
    persistComments(updated);
  };

  const toggleLikeReply = (cIdx: number, rIdx: number) => {
    if (!user || !currentSong) return;
    const updated = [...comments];
    const r = updated[cIdx].replies?.[rIdx];
    if (!r) return;
    if (!r.likedBy) r.likedBy = [];

    if (r.likedBy.includes(user.name)) {
      r.likedBy = r.likedBy.filter((u) => u !== user.name);
    } else {
      r.likedBy.push(user.name);
    }
    r.likes = r.likedBy.length;
    setComments(updated);
    persistComments(updated);
  };

  /* -------------------------------------------------------
   * Render helpers
   * -----------------------------------------------------*/
  const cover = safeImage(currentSong?.image, 400);

  // Reset filters
  const resetFilters = () => {
    setSelectedLanguage("All");
    setAgeFilter("all");
    setCutOffDate("2015-01-01");
  };

  /* -------------------------------------------------------
   * UI
   * -----------------------------------------------------*/
  return (
    <motion.div
      className="min-h-screen bg-black text-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ===== Header Filters (Samsung-like) ===== */}
      <div className="sticky top-[3rem] z-30 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 py-3">
            {/* Title + count */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">Music</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {filteredSongs.length}/{allSongs.length}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-6 w-px bg-white/10 mx-1" />

            {/* Language */}
            <div className="flex items-center gap-2">
              <GlobeIcon className="w-4 h-4 text-white/60" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-[#0f0f0f] text-white/90 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
                title="Filter by language"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-6 w-px bg-white/10 mx-1" />

            {/* Age segmented control */}
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-xl overflow-hidden border border-white/10">
                <button
                  onClick={() => setAgeFilter("all")}
                  className={`px-3 py-1.5 text-xs transition ${
                    ageFilter === "all" ? "bg-pink-600 text-white" : "bg-black hover:bg-white/10 text-white/80"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAgeFilter("new")}
                  className={`px-3 py-1.5 text-xs transition ${
                    ageFilter === "new" ? "bg-pink-600 text-white" : "bg-black hover:bg-white/10 text-white/80"
                  }`}
                  title={`>= ${cutOffDate}`}
                >
                  New
                </button>
                <button
                  onClick={() => setAgeFilter("old")}
                  className={`px-3 py-1.5 text-xs transition ${
                    ageFilter === "old" ? "bg-pink-600 text-white" : "bg-black hover:bg-white/10 text-white/80"
                  }`}
                  title={`< ${cutOffDate}`}
                >
                  Old
                </button>
              </div>

              {/* Cutoff date picker */}
              <input
                type="date"
                value={cutOffDate}
                onChange={(e) => setCutOffDate(e.target.value)}
                className="bg-[#0f0f0f] text-white/90 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
                title="Cutoff date (Old < date, New ≥ date)"
              />

              {/* Reset */}
              <Button
                variant="ghost"
                size="icon"
                onClick={resetFilters}
                title="Reset filters"
                className="text-white/70 hover:text-white"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left: Cover + Controls + Lyrics + Comments */}
        <div className="lg:w-1/3 flex flex-col items-center gap-6">
          {currentSong && (
            <>
              {/* Cover */}
              <img
                src={cover}
                alt={currentSong.title}
                className="w-64 h-64 rounded-xl object-cover shadow-xl border border-white/10"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = safeImage(undefined);
                }}
              />

              {/* Primary Controls */}
              <div className="flex items-center justify-center gap-5 mt-1">
                <Button onClick={playPrevious} variant="ghost" size="icon" title="Previous">
                  <SkipBackIcon className="w-6 h-6" />
                </Button>

                <Button
                  onClick={togglePlay}
                  size="icon"
                  className="w-14 h-14 bg-pink-600 hover:bg-pink-700"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                </Button>

                <Button onClick={playNext} variant="ghost" size="icon" title="Next">
                  <SkipForwardIcon className="w-6 h-6" />
                </Button>
              </div>

              {/* Volume + Favorite + Toggle default playlist */}
              <div className="flex items-center gap-3 w-full px-4">
                <Button onClick={toggleMute} variant="ghost" size="icon" title={isMuted ? "Unmute" : "Mute"}>
                  {getVolumeIcon()}
                </Button>

                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />

                {/* Favorites toggle */}
                <Button
                  onClick={toggleFavorite}
                  variant="ghost"
                  size="icon"
                  className={isFavorite?.(currentSong.id) ? "text-pink-500" : "text-white"}
                  title={isFavorite?.(currentSong.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <HeartIcon
                    className="w-6 h-6"
                    {...(isFavorite?.(currentSong.id) ? { fill: "currentColor" } : {})}
                  />
                </Button>

                {/* Add/Remove to default playlist */}
                <Button
                  onClick={() => toggleSongInDefaultPlaylist(currentSong)}
                  variant="ghost"
                  size="icon"
                  title={
                    isInDefaultPlaylist(currentSong.id)
                      ? "Remove from My Playlist"
                      : "Add to My Playlist"
                  }
                  className={isInDefaultPlaylist(currentSong.id) ? "text-green-400" : "text-white"}
                >
                  {isInDefaultPlaylist(currentSong.id) ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    <PlusIcon className="w-6 h-6" />
                  )}
                </Button>
              </div>

              {/* Shuffle & Repeat */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={() => setIsShuffle((p) => !p)}
                  variant="ghost"
                  size="icon"
                  title={isShuffle ? "Shuffle On" : "Shuffle Off"}
                >
                  <ShuffleIcon className={isShuffle ? "text-pink-500 w-5 h-5" : "w-5 h-5"} />
                </Button>
                <Button
                  onClick={() => setIsRepeat((p) => !p)}
                  variant="ghost"
                  size="icon"
                  title={isRepeat ? "Repeat On" : "Repeat Off"}
                >
                  <RepeatIcon className={isRepeat ? "text-pink-500 w-5 h-5" : "w-5 h-5"} />
                </Button>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3 w-full px-4">
                <span className="text-xs text-white/60">{formatTime(currentTime)}</span>
                <Slider
                  value={[Math.min(currentTime, duration)]}
                  max={Math.max(duration, 1)}
                  step={1}
                  onValueChange={handleSeek}
                  className="flex-1"
                />
                <span className="text-xs text-white/60">{formatTime(duration)}</span>
              </div>

              {/* Download (requires user) */}
              {user ? (
                <Button
                  onClick={handleDownload}
                  className="text-center mt-1 bg-pink-600/20 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
                  title="Download .mp3"
                >
                  <DownloadIcon className="w-4 h-4" />
                </Button>
              ) : (
                <p className="text-sm text-white/60 mt-1">Login to download!</p>
              )}

              {/* Lyrics */}
              <div className="mt-2 bg-[#111] p-4 rounded-xl w-full border border-white/10">
                <h3 className="text-lg font-bold mb-2">Lyrics</h3>
                <p className="text-sm text-white/70 whitespace-pre-line">
                  {currentSong?.lyrics ?? "No lyrics available."}
                </p>
              </div>

              {/* Comments */}
              <div className="mt-2 bg-[#111] p-4 rounded-xl w-full border border-white/10">
                <h3 className="text-lg font-bold mb-3">Comments</h3>

                {user ? (
                  <div className="flex gap-2 mb-4">
                    <input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 p-2 rounded bg-black text-white outline-none"
                    />
                    <Button
                      onClick={() => {
                        if (!currentSong || !newComment.trim()) return;
                        const updated: Comment[] = [
                          ...comments,
                          {
                            user: user.name,
                            text: newComment,
                            likes: 0,
                            likedBy: [],
                            replies: [],
                          },
                        ];
                        setComments(updated);
                        persistComments(updated);
                        setNewComment("");
                      }}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      Post
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-white/50 mb-2">Login to comment</p>
                )}

                <ul className="space-y-3">
                  {comments.map((c, idx) => {
                    const likedByUser = !!(user && c.likedBy?.includes(user.name));
                    return (
                      <li key={idx} className="bg-black/40 p-3 rounded-lg border border-white/5">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold">{c.user}</p>
                            <p className="text-sm text-white/80 break-words">{c.text}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleLikeComment(idx)}
                              className={likedByUser ? "text-pink-500" : "text-white/70"}
                              title={likedByUser ? "Unlike" : "Like"}
                            >
                              <HeartIcon
                                className="w-4 h-4"
                                {...(likedByUser ? { fill: "currentColor" } : {})}
                              />
                            </Button>
                            {(c.likes ?? 0) > 0 && (
                              <span className="text-xs text-white/60">{c.likes}</span>
                            )}
                            {user && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-white/70"
                                onClick={() => setReplyingTo(replyingTo === idx ? null : idx)}
                                title="Reply"
                              >
                                Reply
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Replies */}
                        {c.replies && c.replies.length > 0 && (
                          <ul className="pl-4 mt-2 space-y-2 border-l border-white/10">
                            {c.replies.map((r, ridx) => {
                              const likedByUserReply = !!(user && r.likedBy?.includes(user.name));
                              return (
                                <li
                                  key={ridx}
                                  className="text-sm text-white/80 flex items-start justify-between gap-2"
                                >
                                  <div className="min-w-0">
                                    <span className="font-semibold">{r.user}: </span>
                                    <span className="break-words">{r.text}</span>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => toggleLikeReply(idx, ridx)}
                                      className={likedByUserReply ? "text-pink-500" : "text-white/70"}
                                      title={likedByUserReply ? "Unlike reply" : "Like reply"}
                                    >
                                      <HeartIcon
                                        className="w-3 h-3"
                                        {...(likedByUserReply ? { fill: "currentColor" } : {})}
                                      />
                                    </Button>
                                    {(r.likes ?? 0) > 0 && (
                                      <span className="text-[10px] text-white/60">{r.likes}</span>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {/* Write reply */}
                        {replyingTo === idx && (
                          <div className="flex gap-2 mt-2">
                            <input
                              value={replyText[idx] ?? ""}
                              onChange={(e) =>
                                setReplyText((prev) => ({
                                  ...prev,
                                  [idx]: e.target.value,
                                }))
                              }
                              placeholder="Write a reply..."
                              className="flex-1 p-2 rounded bg-black text-white outline-none text-sm"
                            />
                            <Button
                              size="sm"
                              onClick={() => {
                                if (!user || !currentSong) return;
                                if (!replyText[idx]?.trim()) return;
                                const updated = [...comments];
                                if (!updated[idx].replies) updated[idx].replies = [];
                                updated[idx].replies!.push({
                                  user: user.name,
                                  text: replyText[idx],
                                  likes: 0,
                                  likedBy: [],
                                });
                                setComments(updated);
                                persistComments(updated);
                                setReplyText((p) => ({ ...p, [idx]: "" }));
                                setReplyingTo(null);
                              }}
                              className="bg-pink-600 hover:bg-pink-700"
                            >
                              Reply
                            </Button>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Right: Related + All Songs + قائمة مفلترة */}
        <div className="mt-2 w-full overflow-y-auto space-y-6">
          {/* Related Songs */}
          {relatedSongs.length > 0 && (
            <div className="bg-[#111] rounded-xl p-4 border border-white/10">
              <h2 className="text-xl font-bold mb-2">Related Songs</h2>
              <ul className="space-y-2">
                {relatedSongs.map((song) => (
                  <li
                    key={song.id}
                    className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-white/10"
                    onClick={() => navigate(`/player/${song.id}`)}
                    title={`${song.title} • ${song.artist}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={safeImage(song.image, 50)}
                        alt={song.title}
                        className="w-12 h-12 rounded object-cover border border-white/10"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = safeImage(undefined, 50);
                        }}
                      />
                      <div className="truncate">
                        <p className="font-semibold truncate">{song.title}</p>
                        <p className="text-sm text-white/70 truncate">{song.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">
                        {song.duration ?? formatTime(parseDurationToSeconds(song.duration))}
                      </span>

                      {/* Toggle add/remove default playlist */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSongInDefaultPlaylist(song);
                        }}
                        className={isInDefaultPlaylist(song.id) ? "text-green-400" : "text-white"}
                        title={
                          isInDefaultPlaylist(song.id)
                            ? "Remove from My Playlist"
                            : "Add to My Playlist"
                        }
                      >
                        {isInDefaultPlaylist(song.id) ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <PlusIcon className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* All Songs (بعد الفلاتر) */}
          <div className="bg-[#111] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-2">All Songs</h2>
              <div className="text-xs text-white/60">
                {ageFilter === "all"
                  ? "All"
                  : ageFilter === "new"
                  ? `New (≥ ${cutOffDate})`
                  : `Old (< ${cutOffDate})`}
                {selectedLanguage !== "All" ? ` • ${selectedLanguage}` : ""}
              </div>
            </div>

            {filteredSongs.length === 0 ? (
              <p className="text-sm text-white/50">No songs match your filters.</p>
            ) : (
              <ul className="space-y-2">
                {filteredSongs.map((song) => {
                  const isCurrent = song.id === currentSong?.id;
                  const inDefault = isInDefaultPlaylist(song.id);
                  return (
                    <li
                      key={song.id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        isCurrent ? "bg-pink-700/30" : "hover:bg-white/10"
                      }`}
                      onClick={() => navigate(`/player/${song.id}`)}
                      title={`${song.title} • ${song.artist}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={safeImage(song.image, 50)}
                          alt={song.title}
                          className="w-12 h-12 rounded object-cover border border-white/10"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = safeImage(undefined, 50);
                          }}
                        />
                        <div className="truncate">
                          <p className="font-semibold truncate">{song.title}</p>
                          <p className="text-sm text-white/70 truncate">
                            {song.artist}
                            {song.releaseDate ? ` • ${song.releaseDate}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{song.duration ?? "0:00"}</span>

                        {/* Toggle default playlist (+ / remove) */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSongInDefaultPlaylist(song);
                          }}
                          className={inDefault ? "text-green-400" : "text-white"}
                          title={inDefault ? "Remove from My Playlist" : "Add to My Playlist"}
                        >
                          {inDefault ? <CheckIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                        </Button>

                        {/* Favorites toggle */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            isFavorite?.(song.id)
                              ? removeFromFavorites(song.id)
                              : addToFavorites(song);
                          }}
                          className={isFavorite?.(song.id) ? "text-pink-500" : "text-white"}
                          title={isFavorite?.(song.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <HeartIcon
                            className="w-5 h-5"
                            {...(isFavorite?.(song.id) ? { fill: "currentColor" } : {})}
                          />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Quick preview section (اختياري): أول 8 من الفلاتر الحالية */}
          <div className="bg-[#0f0f0f] rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtered preview</h2>
              <div className="text-xs text-white/50">
                {selectedLanguage === "All" ? "All languages" : selectedLanguage} •{" "}
                {ageFilter === "all" ? "All ages" : ageFilter === "new" ? "New" : "Old"}
              </div>
            </div>
            <ul className="mt-3 space-y-2">
              {filteredSongs.slice(0, 8).map((song) => (
                <li
                  key={`f-${song.id}`}
                  className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-white/10"
                  onClick={() => navigate(`/player/${song.id}`)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={safeImage(song.image, 50)}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover border border-white/10"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = safeImage(undefined, 50);
                      }}
                    />
                    <div className="truncate">
                      <p className="text-sm font-medium truncate">{song.title}</p>
                      <p className="text-xs text-white/60 truncate">
                        {song.artist}
                        {song.language ? ` • ${song.language}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-white/50">{song.duration ?? "—"}</span>
                </li>
              ))}
              {filteredSongs.length === 0 && (
                <li className="text-sm text-white/50">No songs for current filters.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" />
    </motion.div>
  );
};
