import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  PlayIcon,
  TrashIcon,
  Clock as ClockIcon,
  ShuffleIcon,
  ArrowLeft,
  Share2,
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
  path?: string;
  image?: string;
  duration?: string;
  releaseDate?: string; // ISO string preferred
  playCount?: number;
}

type PlaylistShape = { id: string | number; name?: string; songs?: Song[]; [k: string]: any };

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

const savePlaylistsToLS = (list: PlaylistShape[]) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save playlists", err);
  }
};

export const PlaylistDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const playlistId = id ?? "";

  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "artist" | "date">("title");
  const [miniPlayer, setMiniPlayer] = useState<Song | null>(null);

  // debounce search (300ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  // load playlist once (or first)
  useEffect(() => {
    try {
      const saved = loadPlaylistsFromLS();
      let playlist: PlaylistShape | undefined;
      if (playlistId) {
        playlist = saved.find((p) => String(p.id) === String(playlistId));
      }
      if (!playlist) playlist = saved[0];
      setSongs(Array.isArray(playlist?.songs) ? (playlist!.songs as Song[]) : []);
    } catch (err) {
      console.error("Error loading playlist", err);
      setSongs([]);
    }
  }, [playlistId]);

  // restore last played into mini player only if present in list
  useEffect(() => {
    const last = localStorage.getItem(LAST_PLAYED_KEY);
    if (!last) return;
    const song = songs.find((s) => s.id === Number(last));
    if (song) setMiniPlayer(song);
  }, [songs]);

  // filtered & sorted
  const filteredSongs = useMemo(() => {
    let list = [...songs];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q)
      );
    }
    if (sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "artist") {
      list.sort((a, b) => a.artist.localeCompare(b.artist));
    } else {
      // date: parse ISO (fall back to empty)
      list.sort((a, b) => {
        const da = a.releaseDate ? Date.parse(a.releaseDate) : 0;
        const db = b.releaseDate ? Date.parse(b.releaseDate) : 0;
        return db - da; // newest first
      });
    }
    return list;
  }, [songs, debouncedSearch, sortBy]);

  // save (upsert playlist)
  const saveOrder = useCallback(
    (newSongs: Song[]) => {
      setSongs(newSongs);
      try {
        const saved = loadPlaylistsFromLS();
        const isArray = Array.isArray(saved);
        let updated: PlaylistShape[] = [];

        if (!isArray || saved.length === 0) {
          updated = [{ id: playlistId || Date.now(), songs: newSongs }];
        } else {
          let found = false;
          updated = saved.map((p) => {
            if (String(p.id) === String(playlistId) || (!playlistId && !found && p && p.songs)) {
              found = true;
              return { ...p, songs: newSongs };
            }
            return p;
          });
          if (!found) {
            updated.push({ id: playlistId || Date.now(), songs: newSongs });
          }
        }
        savePlaylistsToLS(updated);
      } catch (err) {
        console.error("Error saving playlist order", err);
      }
    },
    [playlistId]
  );

  // DnD handler — only apply to the full songs array (disable while filtered)
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      // if search active — do not allow reorder (UI disables drag)
      if (debouncedSearch) return;
      const reordered = Array.from(songs);
      const [removed] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, removed);
      saveOrder(reordered);
    },
    [songs, saveOrder, debouncedSearch]
  );

  const clearPlaylist = useCallback(() => {
    const ok = window.confirm("هل تريد حذف جميع الأغاني من هذه القائمة؟");
    if (!ok) return;
    saveOrder([]);
  }, [saveOrder]);

  const removeSong = useCallback(
    (idToRemove: number) => {
      const ok = window.confirm("هل تود حذف هذه الأغنية من القائمة؟");
      if (!ok) return;
      const newList = songs.filter((s) => s.id !== idToRemove);
      saveOrder(newList);
      if (miniPlayer?.id === idToRemove) setMiniPlayer(null);
    },
    [songs, saveOrder, miniPlayer]
  );

  const playSong = useCallback(
    (song: Song) => {
      if (!song) return;
      localStorage.setItem(LAST_PLAYED_KEY, String(song.id));
      setMiniPlayer(song);
      const updated = songs.map((s) =>
        s.id === song.id ? { ...s, playCount: (s.playCount || 0) + 1 } : s
      );
      saveOrder(updated);
      navigate(`/player/${song.id}`);
    },
    [songs, saveOrder, navigate]
  );

  const shufflePlay = useCallback(() => {
    if (!songs.length) return;
    const r = Math.floor(Math.random() * songs.length);
    playSong(songs[r]);
  }, [songs, playSong]);

  const sharePlaylist = useCallback(async () => {
    try {
      if (navigator.share && window.location.href) {
        await navigator.share({
          title: "🎶 My Playlist",
          text: "Check out my playlist!",
          url: window.location.href,
        });
      } else {
        const playlistData = { title: "My Playlist", songs };
        await navigator.clipboard.writeText(JSON.stringify(playlistData, null, 2));
        alert("📋 Playlist copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("Could not share playlist.");
    }
  }, [songs]);

  // keyboard shortcuts
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!songs.length) return;
      if (e.code === "Space") {
        e.preventDefault();
        if (miniPlayer) playSong(miniPlayer);
      } else if (e.code === "ArrowRight") {
        shufflePlay();
      } else if (e.code === "ArrowLeft") {
        navigate(-1);
      } else if (e.code === "KeyM") {
        setMiniPlayer(null);
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [songs, miniPlayer, playSong, shufflePlay, navigate]);

  const isDragDisabled = Boolean(debouncedSearch);

  if (!songs.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">🎶 Playlist is empty!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src={songs[0]?.image ?? "https://via.placeholder.com/150"}
          alt="Playlist Cover"
          className="w-40 h-40 rounded-lg object-cover shadow-2xl"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold">My Playlist</h1>
          <p className="text-white/70 mt-1">{songs.length} songs</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <Button
              onClick={() => playSong(songs[0])}
              className="bg-pink-600 hover:bg-pink-700 shadow-lg"
            >
              <PlayIcon className="w-5 h-5 mr-2" /> Play All
            </Button>
            <Button
              onClick={shufflePlay}
              className="bg-pink-500 hover:bg-pink-600 shadow-lg"
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

      <div className="p-6 max-w-4xl mx-auto">
        {isDragDisabled && (
          <p className="text-sm text-white/50 mb-3">
            البحث مفعل — تعطيل السحب أثناء الفلترة للحفاظ على الترتيب الصحيح.
          </p>
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="playlist" isDropDisabled={isDragDisabled}>
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
                    isDragDisabled={isDragDisabled}
                  >
                    {(prov, snapshot) => (
                      <motion.li
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
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
                            <p className="font-semibold truncate">
                              {song.title}
                            </p>
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
                              <ClockIcon className="w-4 h-4" />
                              {new Date(song.releaseDate).toLocaleDateString()}
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
                            aria-label={`Remove ${song.title}`}
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
    </div>
  );
};
