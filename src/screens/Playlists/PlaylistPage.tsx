import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Repeat,
  Menu,
  Download,
  Upload,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

const LS_KEY = "playlists";
const LAST_PLAYED_KEY = "lastPlayed";
const UI_KEY = "playlist_ui_v1";

interface Song {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
  duration?: string;
  releaseDate?: string;
  playCount?: number;
  favorite?: boolean;
  selected?: boolean;
}

export const PlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // البيانات الرئيسية
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "artist" | "date">("title");
  const [miniPlayer, setMiniPlayer] = useState<Song | null>(null);
  const [favoritesView, setFavoritesView] = useState(false);

  // تشغيل + تقدم (كما عندك: محاكاة)
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);

  // ميزات احترافية مضافة
  const [repeatMode, setRepeatMode] = useState<"off" | "one" | "all">("off");
  const [shuffleMode, setShuffleMode] = useState(false);
  const [toast, setToast] = useState<{ text: string; action?: string; onAction?: () => void } | null>(null);
  const undoRef = useRef<{ song?: Song; timer?: number | null }>({ song: undefined, timer: null });

  // حفظ إعدادات واجهة (بحث وترتيب)
  useEffect(() => {
    try {
      const ui = JSON.parse(localStorage.getItem(UI_KEY) || "{}");
      if (ui) {
        if (ui.search) setSearch(ui.search);
        if (ui.sortBy) setSortBy(ui.sortBy);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(UI_KEY, JSON.stringify({ search, sortBy }));
  }, [search, sortBy]);

  // تحميل الأغاني من localStorage (النسخة الأصلية)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      const playlist = saved.find((p: any) => String(p.id) === String(id));
      if (playlist) setSongs(playlist.songs || []);
      else setSongs([]);
    } catch (err) {
      console.error("Error loading playlist", err);
      setSongs([]);
    }
  }, [id]);

  // استرجاع آخر مسموع (لكن لا تشغيل تلقائي)
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

  // فلترة + فرز + عرض المفضلات
  const filteredSongs = useMemo(() => {
    let list = [...songs];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
      );
    }
    if (favoritesView) {
      list = list.filter((s) => s.favorite);
    }
    if (sortBy === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "artist") list.sort((a, b) => a.artist.localeCompare(b.artist));
    if (sortBy === "date") list.sort((a, b) => (a.releaseDate || "").localeCompare(b.releaseDate || ""));
    return list;
  }, [songs, search, sortBy, favoritesView]);

  // حفظ الترتيب (مثل كودك الأصلي)
  const saveOrder = (newSongs: Song[]) => {
    setSongs(newSongs);
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]") as any[];
      const newPlaylists = saved.map((p: any) =>
        String(p.id) === String(id) ? { ...p, songs: newSongs } : p
      );
      localStorage.setItem(LS_KEY, JSON.stringify(newPlaylists));
    } catch (err) {
      console.error("Error saving playlist order", err);
    }
  };

  // DnD (مع حفظ)
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(songs);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    saveOrder(reordered);
  };

  // حذف الكل مع تأكيد
  const clearPlaylist = () => {
    const ok = window.confirm("هل تريد حذف كل الأغاني من هذه القائمة؟");
    if (!ok) return;
    saveOrder([]);
    showToast("Playlist cleared");
  };

  // حذف أغنية مع إمكانية التراجع (undo)
  const removeSong = (songId: number) => {
    const target = songs.find((s) => s.id === songId);
    if (!target) return;
    // اخفاء اذا كانت هي الميني بلاير
    if (miniPlayer?.id === songId) {
      setMiniPlayer(null);
      setIsPlaying(false);
      setProgress(0);
    }
    const newSongs = songs.filter((s) => s.id !== songId);
    saveOrder(newSongs);

    // إعداد التراجع
    undoRef.current.song = target;
    showToast("Song removed", "Undo", () => {
      if (undoRef.current.timer) {
        window.clearTimeout(undoRef.current.timer);
        undoRef.current.timer = null;
      }
      const restored = [undoRef.current.song!, ...newSongs];
      saveOrder(restored);
      undoRef.current.song = undefined;
      showToast("Undo successful");
    });
    // بعد 7 ثواني لا يمكن التراجع
    undoRef.current.timer = window.setTimeout(() => {
      undoRef.current.song = undefined;
      undoRef.current.timer = null;
    }, 7000);
  };

  // تشغيل أغنية — حافظت على منطقك الأصلي (تخزين lastPlayed, زيادة playCount, navigate)
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

  // Play all — يشغّل أول مسار أو يشغّل بشكل عشوائي إذا وضع شفل
  const playAll = () => {
    if (!songs.length) return;
    if (shuffleMode) {
      const idx = Math.floor(Math.random() * songs.length);
      playSong(songs[idx]);
    } else {
      playSong(songs[0]);
    }
  };

  // Shuffle play (احتفظت)
  const shufflePlay = () => {
    if (!songs.length) return;
    const randomIndex = Math.floor(Math.random() * songs.length);
    playSong(songs[randomIndex]);
  };

  // مشاركة — استخدمت navigator.share إن توفر
  const sharePlaylist = async () => {
    const url = window.location.href;
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({ title: "Playlist", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("✅ Playlist link copied!");
      }
    } catch {
      alert("Could not share the playlist.");
    }
  };

  // Progress simulation (مثل كودك الأصلي لكن مع تنظيف أفضل)
  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }
    // إذا مشغل بالفعل فلا تنشئ أكثر من interval
    if (progressIntervalRef.current) return;
    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (progressIntervalRef.current) {
            window.clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          setIsPlaying(false);
          // عند انتهاء الأغنية: إذا repeatMode one => يعيد نفس الأغنية; if all => التالي; if off => يوقف
          if (repeatMode === "one" && miniPlayer) {
            // إعادة تشغيل (نفس التأثير كما لو المستخدم ضغط عليها)
            setIsPlaying(true);
            return 0;
          } else if (repeatMode === "all" && miniPlayer) {
            // شغّل التالي محاكياً
            const idx = songs.findIndex((s) => s.id === miniPlayer.id);
            const nextIdx = (idx + 1) % songs.length;
            const next = songs[nextIdx];
            if (next) playSong(next);
            return 0;
          } else {
            // يوقف
            return 100;
          }
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, repeatMode, miniPlayer, songs]);

  // أدوات UI صغيرة: toast
  const showToast = (text: string, action?: string, onAction?: () => void) => {
    setToast({ text, action, onAction });
    window.setTimeout(() => setToast(null), 4000);
  };

  // Toggle favorite per song
  const toggleFavorite = (songId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = songs.map((s) =>
      s.id === songId ? { ...s, favorite: !s.favorite } : s
    );
    saveOrder(updated);
  };

  // Keyboard shortcuts: space => toggle play/pause (محاكاة)، Arrows => next/prev
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.code === "Space") {
        ev.preventDefault();
        setIsPlaying((p) => !p);
      } else if (ev.code === "ArrowRight") {
        // التالي
        if (!miniPlayer) return;
        const idx = songs.findIndex((s) => s.id === miniPlayer.id);
        const nextIdx = (idx + 1) % songs.length;
        playSong(songs[nextIdx]);
      } else if (ev.code === "ArrowLeft") {
        if (!miniPlayer) return;
        const idx = songs.findIndex((s) => s.id === miniPlayer.id);
        const prevIdx = (idx - 1 + songs.length) % songs.length;
        playSong(songs[prevIdx]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miniPlayer, songs]);

  // Export / Import playlist (JSON)
  const exportPlaylist = () => {
    const filename = `playlist-${id || "export"}.json`;
    const blob = new Blob([JSON.stringify({ id, songs }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Playlist exported");
  };

  const importPlaylist = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(String(e.target?.result));
        if (!Array.isArray(parsed.songs)) {
          alert("Invalid playlist file");
          return;
        }
        saveOrder(parsed.songs);
        showToast("Playlist imported");
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  // مساعدة لتمييز نص البحث داخل العناوين (highlight)
  const highlight = (text: string) => {
    if (!search.trim()) return <>{text}</>;
    const q = search;
    const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <mark key={i} className="bg-yellow-300 text-black rounded px-0.5">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // واجهة المستخدم عندما لا توجد أغاني
  if (!songs.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center max-w-lg">
          <p className="text-2xl mb-4">🎶 Playlist is empty!</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded">
              <Upload className="w-4 h-4" /> Import
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => importPlaylist(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-b from-pink-700/70 to-black p-8 flex flex-col md:flex-row items-center gap-6"
      >
        <img
          src={songs[0]?.image ?? "https://via.placeholder.com/150"}
          alt="Playlist Cover"
          className="w-40 h-40 rounded-lg object-cover shadow-2xl"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold flex items-center gap-3">
            My Playlist
            <button
              onClick={() => setFavoritesView((f) => !f)}
              className={`p-2 rounded-full ${
                favoritesView ? "text-pink-500" : "text-white/60"
              }`}
              aria-label="Toggle favorites view"
            >
              <HeartIcon className="w-6 h-6" />
            </button>
          </h1>
          <p className="text-white/70 mt-1">
            {songs.length} songs • {totalDuration}
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <Button onClick={playAll} className="bg-pink-600 hover:bg-pink-700 shadow-lg">
              <PlayIcon className="w-5 h-5 mr-2" /> Play All
            </Button>

            <Button onClick={() => { setShuffleMode((s) => !s); showToast(`Shuffle ${!shuffleMode ? "on" : "off"}`); }} className={`shadow-lg ${shuffleMode ? "bg-purple-600 hover:bg-purple-700" : "bg-[#222]"}`}>
              <ShuffleIcon className="w-5 h-5 mr-2" /> Shuffle
            </Button>

            <Button onClick={() => { setRepeatMode((r) => (r === "off" ? "all" : r === "all" ? "one" : "off")); showToast(`Repeat: ${repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off"}`); }} className="bg-[#222]">
              <Repeat className="w-5 h-5 mr-2" /> Repeat
            </Button>

            <Button onClick={clearPlaylist} variant="outline" className="text-white border-white/40 hover:border-red-500">
              <TrashIcon className="w-5 h-5 mr-2" /> Clear
            </Button>

            <Button onClick={exportPlaylist} variant="outline" className="text-white border-white/40 hover:border-green-500">
              <Download className="w-5 h-5 mr-2" /> Export
            </Button>

            <Button onClick={sharePlaylist} variant="outline" className="text-white border-white/40 hover:border-green-500">
              <Share2 className="w-5 h-5 mr-2" /> Share
            </Button>

            <Button variant="outline" onClick={() => navigate(-1)} className="text-white border-white/40 hover:border-pink-500">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </Button>

            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded">
              <Upload className="w-4 h-4" /> Import
              <input type="file" accept="application/json" className="hidden" onChange={(e) => importPlaylist(e.target.files?.[0] ?? null)} />
            </label>
          </div>
        </div>
      </motion.div>

      {/* Search + Sort */}
      <div className="p-6 max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search in playlist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 rounded-lg bg-[#1c1c1c] text-white outline-none"
          aria-label="Search in playlist"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-2 rounded-lg bg-[#1c1c1c] text-white outline-none" aria-label="Sort playlist">
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
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                <AnimatePresence>
                  {filteredSongs.map((song, index) => (
                    <Draggable key={song.id.toString()} draggableId={song.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <motion.li
                          ref={provided.innerRef}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ delay: index * 0.03 }}
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            snapshot.isDragging ? "bg-pink-600/30 scale-105 shadow-lg" : "bg-[#111] hover:bg-white/10"
                          } transition`}
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1 cursor-pointer" onClick={() => playSong(song)}>
                            <img src={song.image ?? "https://via.placeholder.com/50"} alt={song.title} className="w-14 h-14 rounded-lg object-cover shadow" />
                            <div className="truncate">
                              <p className="font-semibold truncate">{highlight(song.title)}</p>
                              <p className="text-sm text-white/60 truncate">{highlight(song.artist)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-white/70">
                            {song.playCount ? <span className="hidden sm:flex items-center gap-1">▶ {song.playCount}</span> : null}
                            {song.releaseDate && (
                              <span className="hidden sm:flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {song.releaseDate}
                              </span>
                            )}
                            <span>{song.duration ?? "0:00"}</span>

                            <button
                              {...provided.dragHandleProps}
                              aria-label="drag handle"
                              className="p-2 rounded hover:bg-white/5"
                              title="Drag to reorder"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Menu className="w-5 h-5" />
                            </button>

                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(song.id, e); }}
                              className={`p-2 rounded ${song.favorite ? "text-pink-400" : "text-white/60"} hover:text-pink-400`}
                              aria-label="Toggle favorite"
                            >
                              <HeartIcon className="w-5 h-5" />
                            </button>

                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={(e) => { e.stopPropagation(); removeSong(song.id); }}
                              className="text-red-400 hover:text-red-600"
                              aria-label="Delete song"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </Button>
                          </div>
                        </motion.li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </AnimatePresence>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Mini Player */}
      <AnimatePresence>
        {miniPlayer && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-4 right-4 bg-[#1c1c1c] text-white p-4 rounded-lg shadow-2xl flex flex-col gap-2 w-[380px]">
            <div className="flex items-center gap-4">
              <img src={miniPlayer.image ?? "https://via.placeholder.com/50"} alt={miniPlayer.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="truncate flex-1">
                <p className="font-semibold truncate">{miniPlayer.title}</p>
                <p className="text-sm text-white/60 truncate">{miniPlayer.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={() => {
                  // previous
                  const idx = songs.findIndex((s) => s.id === miniPlayer.id);
                  const prevIdx = (idx - 1 + songs.length) % songs.length;
                  playSong(songs[prevIdx]);
                }} className="text-white hover:text-pink-500">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 20L9 12L19 4V20Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 19V5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Button>

                <Button size="icon" variant="ghost" onClick={() => setIsPlaying((p) => !p)} className="text-white hover:text-pink-500">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                </Button>

                <Button size="icon" variant="ghost" onClick={() => {
                  // next
                  const idx = songs.findIndex((s) => s.id === miniPlayer.id);
                  const nextIdx = (idx + 1) % songs.length;
                  playSong(songs[nextIdx]);
                }} className="text-white hover:text-pink-500">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 4L15 12L5 20V4Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 5V19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Button>

                <Button size="icon" variant="ghost" onClick={() => setMiniPlayer(null)} className="text-white hover:text-red-500">
                  <Minimize2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="w-full">
              <div className="w-full h-1 bg-white/20 rounded">
                <div className="h-1 bg-pink-500 rounded" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-6 bg-white/10 text-white p-3 rounded shadow-lg flex items-center gap-3">
          <div>{toast.text}</div>
          {toast.action && toast.onAction && (
            <button className="underline ml-2" onClick={toast.onAction}>
              {toast.action}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
