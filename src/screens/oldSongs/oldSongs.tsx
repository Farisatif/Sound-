// src/pages/player/OldMusicPlayer.tsx
import React, { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import oldSongsData from "../../data/oldSongs.json";

interface Song {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
  duration?: string;
  releaseDate?: string;
}

export const OldMusicPlayer: React.FC = () => {
  const { songId } = useParams();
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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef<boolean>(false);

  const allSongs: Song[] = (oldSongsData ?? []).map((song: any) => ({
    id: song.id,
    title: song.title,
    artist: song.artist,
    path: song.url, // map 'url' to 'path'
    image: song.image ?? "",
    duration: song.duration ?? "",
    releaseDate: song.year ?? "",
  }));

  const parsedId = songId ? parseInt(songId, 10) : undefined;
  const currentSong =
    (parsedId ? allSongs.find((s) => s.id === parsedId) : undefined) ??
    allSongs[0];
  const currentIndex = allSongs.findIndex((s) => s.id === currentSong?.id);

  // 🕐 تحديث الوقت
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () =>
      setDuration(isNaN(audio.duration) ? 0 : audio.duration);
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

  // 🎶 تحميل الأغنية عند التغيير
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    const wasPlaying = wasPlayingRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.src = currentSong.path ?? "";
    audio.load();
    if (wasPlaying) audio.play().catch(() => {});
  }, [currentSong]);

  // 🔊 الصوت
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
    if (!allSongs.length) return;
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * allSongs.length)
      : (currentIndex + 1) % allSongs.length;
    const nextId = allSongs[nextIndex]?.id;
    if (nextId !== undefined) navigate(`/old-player/${nextId}`);
  };

  const playPrevious = () => {
    if (!allSongs.length) return;
    const prevIndex = isShuffle
      ? Math.floor(Math.random() * allSongs.length)
      : currentIndex === 0
      ? allSongs.length - 1
      : currentIndex - 1;
    const prevId = allSongs[prevIndex]?.id;
    if (prevId !== undefined) navigate(`/old-player/${prevId}`);
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

  const cover =
    currentSong?.image ?? "https://via.placeholder.com/400x400?text=Old+Song";

  return (
    <motion.div className="mt-[3rem] min-h-screen bg-black text-white relative">
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* يسار: الصورة والتحكم */}
        <div className="lg:w-1/3 flex flex-col items-center gap-6">
          {currentSong && (
            <>
              <img
                src={cover}
                alt={currentSong.title}
                className="w-64 h-64 rounded-xl object-cover shadow-xl"
              />

              <div className="flex items-center justify-center gap-5 mt-4">
                <Button onClick={playPrevious} variant="ghost" size="icon">
                  <SkipBackIcon className="w-6 h-6" />
                </Button>
                <Button
                  onClick={togglePlay}
                  size="icon"
                  className="w-14 h-14 bg-pink-600 hover:bg-pink-700"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </Button>
                <Button onClick={playNext} variant="ghost" size="icon">
                  <SkipForwardIcon className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex items-center gap-3 mt-4 w-full px-4">
                <Button onClick={toggleMute} variant="ghost" size="icon">
                  {getVolumeIcon()}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
                <Button
                  onClick={toggleFavorite}
                  variant="ghost"
                  size="icon"
                  className={
                    isFavorite?.(currentSong.id) ? "text-pink-500" : "text-white"
                  }
                >
                  <HeartIcon className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-2">
                <Button
                  onClick={() => setIsShuffle(!isShuffle)}
                  variant="ghost"
                  size="icon"
                >
                  <ShuffleIcon
                    className={isShuffle ? "text-pink-500 w-5 h-5" : "w-5 h-5"}
                  />
                </Button>
                <Button
                  onClick={() => setIsRepeat(!isRepeat)}
                  variant="ghost"
                  size="icon"
                >
                  <RepeatIcon
                    className={isRepeat ? "text-pink-500 w-5 h-5" : "w-5 h-5"}
                  />
                </Button>
              </div>

              {/* الشريط */}
              <div className="flex items-center gap-3 mt-4 w-full px-4">
                <span className="text-xs text-white/60">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[Math.min(currentTime, duration)]}
                  max={Math.max(duration, 1)}
                  step={1}
                  onValueChange={handleSeek}
                  className="flex-1"
                />
                <span className="text-xs text-white/60">
                  {formatTime(duration)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* يمين: قائمة الأغاني */}
        <div className="mt-2 w-full overflow-y-auto">
          <div className="bg-[#111] rounded-xl p-4">
            <h2 className="text-xl font-bold mb-2">Old Songs</h2>
            <ul className="space-y-2">
              {allSongs.map((song) => (
                <li
                  key={song.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    song.id === currentSong?.id
                      ? "bg-pink-700/30"
                      : "hover:bg-white/10"
                  }`}
                  onClick={() => navigate(`/old-player/${song.id}`)}
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
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        isFavorite?.(song.id)
                          ? removeFromFavorites(song.id)
                          : addToFavorites(song);
                      }}
                      className={
                        isFavorite?.(song.id) ? "text-pink-500" : "text-white"
                      }
                    >
                      <HeartIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" />
    </motion.div>
  );
};

export default OldMusicPlayer;
