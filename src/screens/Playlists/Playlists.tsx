import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  PlayIcon,
  PlusIcon,
  Trash2Icon,
  DownloadCloudIcon,
  CopyIcon,
  Edit2Icon,
  UploadCloudIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LS_KEY = "playlists";

type PlaylistShape = { id: string | number; name?: string; songs?: any[]; cover?: string; owner?: string; createdAt?: string; [k: string]: any };

const safeParse = (raw: string | null) => {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const loadPlaylistsFromLS = (): PlaylistShape[] => {
  const raw = localStorage.getItem(LS_KEY);
  const parsed = safeParse(raw);
  return Array.isArray(parsed) ? parsed : [];
};

export const Playlists: React.FC = () => {
  const [userPlaylists, setUserPlaylists] = useState<PlaylistShape[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadPlaylists = useCallback(() => {
    try {
      setUserPlaylists(loadPlaylistsFromLS());
    } catch (err) {
      console.error("Failed to load playlists:", err);
      setUserPlaylists([]);
    }
  }, []);

  useEffect(() => {
    loadPlaylists();
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) loadPlaylists();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [loadPlaylists]);

  const handleDelete = useCallback((id: string | number) => {
    try {
      const updated = (userPlaylists || []).filter((p) => String(p.id) !== String(id));
      localStorage.setItem(LS_KEY, JSON.stringify(updated));
      setUserPlaylists(updated);
      setConfirmDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  }, [userPlaylists]);

  const exportPlaylist = useCallback((pl: PlaylistShape) => {
    const filename = `playlist-${pl.id || "export"}.json`;
    const blob = new Blob([JSON.stringify(pl, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }, []);

  const duplicatePlaylist = useCallback((pl: PlaylistShape) => {
    const copy = { ...pl, id: Date.now(), name: `${pl.name ?? "Playlist"} (copy)` };
    const updated = [...userPlaylists, copy];
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setUserPlaylists(updated);
  }, [userPlaylists]);

  const renamePlaylist = useCallback((pl: PlaylistShape) => {
    const name = prompt("Rename playlist", pl.name ?? "");
    if (!name) return;
    const updated = userPlaylists.map((p) => (String(p.id) === String(pl.id) ? { ...p, name } : p));
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setUserPlaylists(updated);
  }, [userPlaylists]);

  const handleImportFile = useCallback((file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(String(e.target?.result));
        if (!parsed || (!Array.isArray(parsed.songs) && !Array.isArray(parsed))) {
          alert("Invalid playlist file.");
          return;
        }
        let updated: PlaylistShape[] = Array.from(userPlaylists || []);
        if (Array.isArray(parsed)) {
          updated = parsed;
        } else {
          const existingIndex = updated.findIndex((p) => String(p.id) === String(parsed.id));
          if (existingIndex >= 0) updated[existingIndex] = parsed;
          else updated.push(parsed);
        }
        localStorage.setItem(LS_KEY, JSON.stringify(updated));
        setUserPlaylists(updated);
        alert("Import successful.");
      } catch (err) {
        console.error(err);
        alert("Failed to import playlist.");
      }
    };
    reader.readAsText(file);
  }, [userPlaylists]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-black text-white p-8">
      <div className="mt-[6%] max-w-6xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-white">Your </span>
            <span className="text-[#ee0faf]">Playlists</span>
          </h1>
          <p className="text-white/60 text-lg">Organize your music, create vibes, and play anytime 🎶</p>
        </motion.div>

        <div className="mb-8 flex items-center justify-center gap-4">
          <Button onClick={() => navigate("/playlists/create")} className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 px-6 py-3 rounded-xl flex items-center gap-2 text-lg font-semibold shadow-lg">
            <PlusIcon className="w-5 h-5" /> New Playlist
          </Button>

          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border rounded text-sm">
            <UploadCloudIcon className="w-4 h-4" /> Import
            <input type="file" accept="application/json" hidden onChange={(e) => handleImportFile(e.target.files?.[0] ?? null)} />
          </label>

          <Button
            onClick={() => {
              const blob = new Blob([JSON.stringify(userPlaylists, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `playlists-${Date.now()}.json`;
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 500);
            }}
            variant="outline"
          >
            <DownloadCloudIcon className="w-4 h-4 mr-2" /> Export all
          </Button>
        </div>

        <h2 className="text-2xl font-bold mb-6">Your Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPlaylists.length === 0 ? (
            <p className="text-white/50 col-span-full">No playlists yet. Create one!</p>
          ) : (
            userPlaylists.map((playlist) => (
              <motion.div key={String(playlist.id)} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }} className="group relative">
                <Card
                  className="bg-[#1e1e1e] border-none rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition-all duration-500 cursor-pointer"
                  onClick={() => navigate(`/playlists/${playlist.id}`)}
                  aria-label={`Open playlist ${playlist.name}`}
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <img src={playlist.cover || playlist.songs?.[0]?.image || "https://via.placeholder.com/300"} alt={playlist.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-lg font-bold">{playlist.name}</h3>
                      <p className="text-sm text-white/60">
                        {playlist.songs?.length || 0} song{(playlist.songs?.length || 0) > 1 ? "s" : ""}
                      </p>
                      {playlist.owner && <p className="text-xs text-white/40">by {playlist.owner}</p>}
                      {playlist.createdAt && <p className="text-xs text-white/30">{new Date(playlist.createdAt).toLocaleDateString()}</p>}
                    </div>

                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Button
                        size="icon"
                        className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 rounded-full shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (playlist.songs && playlist.songs.length) {
                            navigate(`/player/${playlist.songs[0].id}`);
                          } else {
                            navigate(`/playlists/${playlist.id}`);
                          }
                        }}
                        aria-label="Play"
                      >
                        <PlayIcon className="w-6 h-6" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete(String(playlist.id));
                        }}
                        aria-label="Delete"
                      >
                        <Trash2Icon className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-2 mt-2 justify-end">
                  <Button size="sm" variant="ghost" onClick={() => { exportPlaylist(playlist); }}>
                    <DownloadCloudIcon className="w-4 h-4 mr-2" /> Export
                  </Button>

                  <Button size="sm" variant="ghost" onClick={() => duplicatePlaylist(playlist)}>
                    <CopyIcon className="w-4 h-4 mr-2" /> Duplicate
                  </Button>

                  <Button size="sm" variant="ghost" onClick={() => renamePlaylist(playlist)}>
                    <Edit2Icon className="w-4 h-4 mr-2" /> Rename
                  </Button>
                </div>

                {confirmDelete === String(playlist.id) && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-2xl p-6">
                    <p className="mb-4 text-white/90">Delete <span className="font-bold">{playlist.name}</span>?</p>
                    <div className="flex gap-4">
                      <Button variant="destructive" onClick={() => handleDelete(playlist.id)}>Yes, Delete</Button>
                      <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};
