import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ImageIcon, GlobeIcon, Music2Icon, XIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSongs } from "../../hooks/useData";

const LS_KEY = "playlists";

export const CreatePlaylist: React.FC = () => {
  // Hooks (كلها هنا فوق)
  const { user } = useAuth();
  const { songs, loading } = useSongs();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [searchSongs, setSearchSongs] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  // allSongs مشتقة من songs — وضعها هنا كـ متغير أو useMemo (ليس بعد return)
  const allSongs = useMemo(() => {
    return [
      ...((songs?.weeklyTopSongs ?? []) as any[]),
      ...((songs?.newReleaseSongs ?? []) as any[]),
      ...((songs?.trendingSongs ?? []) as any[]),
    ];
  }, [songs]);

  // visibleSongs (useMemo) أيضاً هنا
  const visibleSongs = useMemo(() => {
    const q = searchSongs.trim().toLowerCase();
    if (!q) return allSongs;
    return allSongs.filter(
      (s: any) =>
        String(s.title).toLowerCase().includes(q) ||
        String(s.artist).toLowerCase().includes(q)
    );
  }, [allSongs, searchSongs]);

  // مدة الأغاني المحددة
  const totalSelectedDuration = useMemo(() => {
    const chosen = allSongs.filter((s: any) => selectedSongs.includes(s.id));
    let totalSec = 0;
    for (const s of chosen) {
      if (!s.duration) continue;
      const parts = String(s.duration).split(":").map(Number);
      if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
        totalSec += parts[0] * 60 + parts[1];
      }
    }
    const m = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${m}m ${sec}s`;
  }, [allSongs, selectedSongs]);

  // ------------------------------
  // الآن يمكن استخدام القيم لعمل returns مبكرة بأمان
  // ------------------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Loading songs...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-[3rem] flex items-center justify-center h-screen bg-black text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#111] p-8 rounded-2xl shadow-2xl max-w-md text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Sign in Required</h2>
          <p className="text-white/70 mb-6">You must be logged in to create a playlist.</p>
          <Button className="border bg-pink-600 hover:bg-pink-700 w-full" onClick={() => navigate("/login")}>
            Login
          </Button>
        </motion.div>
      </div>
    );
  }

  // الدوال التابعة للواجهة (يمكن تركها أسفل)
  const handleSongToggle = (id: number) => {
    setSelectedSongs((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
    if (selectAll) setSelectAll(false);
  };

  const toggleSelectAllVisible = () => {
    if (!visibleSongs.length) return;
    const visibleIds = visibleSongs.map((s: any) => s.id);
    if (selectAll) {
      setSelectedSongs((prev) => prev.filter((id) => !visibleIds.includes(id)));
      setSelectAll(false);
    } else {
      setSelectedSongs((prev) => Array.from(new Set([...prev, ...visibleIds])));
      setSelectAll(true);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) {
      setToast("الصورة كبيرة — الحد الأقصى 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCover(reader.result as string);
    reader.readAsDataURL(f);
  };

  const removeCover = () => setCover(null);

  const isDuplicateName = (n: string) => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]") as any[];
      return saved.some((p) => String(p.name).toLowerCase() === n.trim().toLowerCase());
    } catch {
      return false;
    }
  };

  const handleCreate = () => {
    if (!name.trim()) {
      setError("⚠️ اسم القائمة مطلوب.");
      return;
    }
    if (isDuplicateName(name)) {
      setError("⚠️ يوجد قائمة بنفس الاسم. اختر اسماً آخر.");
      return;
    }
    if (!selectedSongs.length) {
      setError("⚠️ اختر أغنية واحدة على الأقل.");
      return;
    }
    setError("");

    const chosenSongs = allSongs
      .filter((song: any) => selectedSongs.includes(song.id))
      .map((s: any) => ({
        id: s.id,
        title: s.title,
        artist: s.artist,
        path: s.path ?? "",
        image: s.image ?? null,
        duration: s.duration ?? null,
        releaseDate: s.releaseDate ?? null,
        playCount: s.playCount ?? 0,
      }));

    const newPlaylist = {
      id: Date.now(),
      name: name.trim(),
      description: desc.trim(),
      cover: cover ?? "https://via.placeholder.com/400x400?text=Playlist",
      songs: chosenSongs,
      isPublic,
      owner: user?.email ?? "Guest",
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      localStorage.setItem(LS_KEY, JSON.stringify([...saved, newPlaylist]));
      setToast("✅ Playlist created");
      setName("");
      setDesc("");
      setCover(null);
      setSelectedSongs([]);
      setSelectAll(false);
      setTimeout(() => {
        navigate("/playlists");
      }, 900);
    } catch (err) {
      console.error(err);
      setToast("حدث خطأ أثناء الحفظ");
    }
  };

  // واجهة المستخدم (مثل الكود اللي واضح لك)
  return (
    <motion.div
      className="bg-black relative z-10 mt-[3rem] min-h-screen text-white px-6 py-10 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight">Create New Playlist</h1>

      <div className="rounded-2xl bg-[#111] w-full max-w-lg p-6 shadow-2xl space-y-5">
        {/* Cover */}
        <div className="flex flex-col items-center">
          {cover ? (
            <div className="relative">
              <img src={cover} alt="cover" className="w-44 h-44 rounded-2xl object-cover shadow-lg border border-black" />
              <button aria-label="remove cover" onClick={removeCover} className="absolute -top-2 -right-2 bg-black/60 p-1 rounded-full" title="Remove cover">
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-44 h-44 flex items-center justify-center rounded-2xl bg-white/10 shadow-inner border border-white/5">
              <ImageIcon className="w-12 h-12 text-white/50" />
            </div>
          )}
          <label className="cursor-pointer mt-3 text-sm text-pink-400 hover:underline inline-flex items-center gap-2">
            Choose cover image
            <input type="file" accept="image/*" hidden onChange={handleFile} />
          </label>
          <p className="text-xs text-white/60 mt-1">Max 2MB</p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-white/60 mb-1">Playlist Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chill Beats 🎶"
            className="bg-[#1c1c1c] border-0 text-white rounded-xl focus:ring-2 focus:ring-pink-500"
            aria-label="Playlist name"
          />
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>

        {/* Description & Visibility */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-white/60 mb-1">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Add a short description..."
            className="w-full min-h-[80px] resize-y bg-[#1c1c1c] border-0 text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Playlist description"
          />
          <div className="flex items-center gap-3 mt-3">
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
              <input type="checkbox" checked={isPublic} onChange={() => setIsPublic((p) => !p)} />
              <span className="flex items-center gap-1">
                <GlobeIcon className="w-4 h-4" /> Public
              </span>
            </label>
            <span className="text-xs text-white/60 ml-auto">{selectedSongs.length} selected • {totalSelectedDuration}</span>
          </div>
        </div>

        {/* Song selection + controls */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Input value={searchSongs} onChange={(e) => setSearchSongs(e.target.value)} placeholder="Search songs..." className="bg-[#1c1c1c]" aria-label="Search songs" />
            <Button onClick={toggleSelectAllVisible} variant="outline">
              {selectAll ? "Unselect visible" : "Select visible"}
            </Button>
            <Button onClick={() => { setSelectedSongs([]); setSelectAll(false); }} variant="ghost">Clear</Button>
          </div>

          <div className="max-h-60 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 p-1 border border-white/5 rounded-lg">
            {visibleSongs.map((song: any) => {
              const selected = selectedSongs.includes(song.id);
              return (
                <div
                  key={song.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selected ? "bg-pink-600/20 border border-pink-600" : "bg-[#1c1c1c] hover:bg-[#222]"}`}
                  onClick={() => handleSongToggle(song.id)}
                  role="button"
                  aria-pressed={selected}
                >
                  <Music2Icon className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{song.title}</p>
                    <p className="text-xs text-white/60 truncate">{song.artist}</p>
                  </div>
                  <div className="ml-auto text-xs text-white/60">{song.duration ?? "0:00"}</div>
                </div>
              );
            })}
            {!visibleSongs.length && <div className="col-span-full text-center text-white/60 p-4">No songs found.</div>}
          </div>
        </div>

        {/* Create Button */}
        <Button
          className="w-full bg-pink-600 hover:bg-pink-700 rounded-xl py-3 text-lg font-semibold"
          onClick={handleCreate}
          disabled={!name.trim() || !selectedSongs.length}
          aria-disabled={!name.trim() || !selectedSongs.length}
        >
          Create Playlist
        </Button>
      </div>

      {/* Preview */}
      {selectedSongs.length > 0 && (
        <div className="mt-6 w-full max-w-lg bg-[#111] p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">{selectedSongs.length} songs selected</h3>
          <ul className="space-y-1 text-sm text-white/80 max-h-28 overflow-y-auto">
            {allSongs
              .filter((s: any) => selectedSongs.includes(s.id))
              .map((s: any) => (
                <li key={s.id} className="flex items-center gap-2">
                  <span>🎵</span>
                  <span className="truncate">{s.title}</span>
                  <span className="text-white/50 ml-auto text-xs">– {s.artist}</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="fixed bottom-6 left-6 bg-white/10 text-white p-3 rounded shadow-lg">{toast}</div>}
    </motion.div>
  );
};
