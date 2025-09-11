// Discover.tsx (معدّل/محسّن)
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  SearchIcon,
  FilterIcon,
  PlayIcon,
  HeartIcon,
  PlusIcon,
  SortAscIcon,
} from "lucide-react";
import { useSongs, useGenres } from "../../hooks/useData";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

// constants
const LS_PLAYLIST_KEY = "playlists";
const LS_LOCAL_FAVS = "local_favorites"; // fallback storage for favorites when context absent
const FALLBACK_IMG = "https://via.placeholder.com/300x300?text=No+Cover";

// song type
interface Song {
  id: number;
  title: string;
  artist: string;
  image?: string;
  genre?: string;
  releaseDate?: string;
  likes?: number;
  plays?: number;
  language?: string;
  path?: string;
  album?: string;
}

export const Discover: React.FC = () => {
  // ====== hooks ======
  const { songs, loading: songsLoading, error: songsError } =
    useSongs?.() || { songs: null, loading: false, error: null };
  const { genres, loading: genresLoading } = useGenres?.() || {
    genres: [],
    loading: false,
  };

  // favorites context (محمي لو مش موجود) — لكن نعمل fallback محلي
  let favCtx: any = {};
  try {
    favCtx = useFavorites?.() || {};
  } catch {
    favCtx = {};
  }
  const { addToFavorites, removeFromFavorites, isFavorite } = favCtx;

  // local fallback for favorites (ids)
  const [localFavIds, setLocalFavIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_LOCAL_FAVS) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_LOCAL_FAVS, JSON.stringify(localFavIds));
  }, [localFavIds]);

  // local states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [playlistIds, setPlaylistIds] = useState<number[]>([]);

  const navigate = useNavigate();

  // ====== combine songs safely & flexibly ======
  const allSongs: Song[] = useMemo(() => {
    // if songs is null -> fallback dummy handled below
    if (!songs) return [];

    // if songs is an array (some APIs return array)
    if (Array.isArray(songs)) {
      // ensure unique by id
      const map = new Map<number, Song>();
      songs.forEach((s: any) => {
        if (!s || s.id == null) return;
        map.set(Number(s.id), { ...s });
      });
      return Array.from(map.values());
    }

    // if songs is an object with sections (weeklyTopSongs, newReleaseSongs, trendingSongs)
    const parts = [
      ...(songs?.weeklyTopSongs ?? []),
      ...(songs?.newReleaseSongs ?? []),
      ...(songs?.trendingSongs ?? []),
      // also accept a generic songs list if present
      ...(songs?.songs ?? []),
    ];
    // dedupe by id
    const map = new Map<number, Song>();
    parts.forEach((s: any) => {
      if (!s || s.id == null) return;
      map.set(Number(s.id), { ...s });
    });

    const list = Array.from(map.values());

    // dummy fallback لو API فاضي
    if (!list.length) {
      return [
        {
          id: 1,
          title: "Dummy Song",
          artist: "Unknown Artist",
          genre: "Pop",
          language: "English",
          releaseDate: "2023-01-01",
          likes: 10,
          plays: 200,
          image: FALLBACK_IMG,
        },
      ];
    }
    return list;
  }, [songs]);

  // ====== load playlist ids from localStorage ======
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_PLAYLIST_KEY) || "[]");
      const def = saved.find((p: any) => p.id === "default");
      const ids = (def?.songs ?? []).map((s: Song) => s.id);
      setPlaylistIds(ids);
    } catch {
      setPlaylistIds([]);
    }
  }, []);

  // ====== languages ======
  const languages = [
    "all",
    "English",
    "Arabic",
    "Spanish",
    "French",
    "Korean",
    "Japanese",
    "Turkish",
    "German",
    "Italian",
  ];

  // ====== filtering & sorting ======
  const filteredSongs = useMemo(() => {
    return allSongs
      .filter((song) => {
        const query = (searchQuery || "").toLowerCase();
        const matchesSearch =
          (song.title || "").toLowerCase().includes(query) ||
          (song.artist || "").toLowerCase().includes(query);

        const matchesGenre =
          selectedGenre === "all" ||
          (song.genre || "").toLowerCase() === selectedGenre.toLowerCase();

        const matchesLang =
          selectedLanguage === "all" ||
          (song.language || "").toLowerCase() ===
            selectedLanguage.toLowerCase();

        return matchesSearch && matchesGenre && matchesLang;
      })
      .sort((a, b) => {
        const safeTime = (d?: string | number) =>
          isNaN(new Date(String(d)).getTime())
            ? 0
            : new Date(String(d)).getTime();
        if (sortBy === "newest")
          return safeTime(b.releaseDate) - safeTime(a.releaseDate);
        if (sortBy === "oldest")
          return safeTime(a.releaseDate) - safeTime(b.releaseDate);
        if (sortBy === "likes") return (b.likes || 0) - (a.likes || 0);
        if (sortBy === "plays") return (b.plays || 0) - (a.plays || 0);
        return 0;
      });
  }, [allSongs, searchQuery, selectedGenre, selectedLanguage, sortBy]);

  // ====== handlers ======
  const goToPlayer = (id: number) => navigate(`/player/${id}`);

  const toggleFavorite = (song: Song) => {
    if (!song) return;

    // if context provider exists -> use it (preferred)
    if (addToFavorites && removeFromFavorites && isFavorite) {
      if (isFavorite(song.id)) removeFromFavorites(song.id);
      else addToFavorites({ ...song, releaseDate: song.releaseDate ?? "" });
      return;
    }

    // fallback: localStorage-based favorites (store ids)
    setLocalFavIds((prev) => {
      const exists = prev.includes(song.id);
      const next = exists ? prev.filter((id) => id !== song.id) : [...prev, song.id];
      return next;
    });
  };

  // determine whether a song is favorited (context first, then local fallback)
  const songIsFavorited = (id: number) => {
    if (isFavorite) {
      try {
        return Boolean(isFavorite(id));
      } catch {
        // ignore
      }
    }
    return localFavIds.includes(id);
  };

  const togglePlaylist = (song: Song) => {
    if (!song) return;
    try {
      const saved = JSON.parse(localStorage.getItem(LS_PLAYLIST_KEY) || "[]");
      let def = saved.find((p: any) => p.id === "default");
      if (!def) {
        def = { id: "default", name: "My Playlist", songs: [] as Song[] };
        saved.push(def);
      }
      const exists = def.songs.find((s: Song) => s.id === song.id);
      if (exists) def.songs = def.songs.filter((s: Song) => s.id !== song.id);
      else def.songs.push(song);
      localStorage.setItem(LS_PLAYLIST_KEY, JSON.stringify(saved));
      setPlaylistIds(def.songs.map((s: Song) => s.id));
    } catch (e) {
      console.error("Playlist save error", e);
    }
  };

  // ====== top picks ======
  const topPicks = allSongs.slice(0, 10);

  // ====== loading & error states ======
  if (songsLoading || genresLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (songsError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-red-500">
          Error loading songs: {String(songsError)}
        </div>
      </div>
    );
  }

  // ====== jsx ======
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Discover <span className="text-[#ee0faf]">Music</span>
        </h1>

        {/* search & filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          {/* search */}
          <div className="relative flex-1 w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search songs, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1e1e1e] border border-[#ee0faf]/30 text-white placeholder:text-white/50 rounded-md w-full"
            />
          </div>

          {/* genre */}
          <div className="flex items-center gap-2">
            <FilterIcon className="text-white/50 w-5 h-5" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[#1e1e1e] border border-[#ee0faf]/30 text-white rounded-md px-3 py-2"
            >
              <option value="all">All Genres</option>
              {genres?.map((g: any) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* language */}
          <div className="flex items-center gap-2">
            🌐
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-[#1e1e1e] border border-[#ee0faf]/30 text-white rounded-md px-3 py-2"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* sort */}
          <div className="flex items-center gap-2">
            <SortAscIcon className="text-white/50 w-5 h-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1e1e1e] border border-[#ee0faf]/30 text-white rounded-md px-3 py-2"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="likes">Most Liked</option>
              <option value="plays">Most Played</option>
            </select>
          </div>
        </div>

        {/* top picks */}
        <h2 className="text-2xl font-bold mb-4">Top Picks</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {topPicks.map((song) => (
            <Card key={song.id} className="bg-[#1e1e1e] min-w-[180px]">
              <CardContent className="p-3">
                <div
                  className="relative mb-2 cursor-pointer"
                  onClick={() => goToPlayer(song.id)}
                >
                  <img
                    src={song.image || FALLBACK_IMG}
                    alt={song.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    onClick={(ev) => {
                      ev.stopPropagation();
                      goToPlayer(song.id);
                    }}
                    size="icon"
                    className="absolute bottom-2 right-2 bg-[#ee0faf] w-9 h-9 rounded-full"
                  >
                    <PlayIcon className="w-5 h-5" />
                  </Button>
                </div>
                <h3 className="font-semibold truncate">{song.title}</h3>
                <p className="text-white/70 text-sm truncate">{song.artist}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* songs grid */}
        <h2 className="text-2xl font-bold mt-8 mb-6">
          {searchQuery ? `Search Results (${filteredSongs.length})` : "All Songs"}
        </h2>

        {filteredSongs.length === 0 ? (
          <p className="text-white/50">No songs found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSongs.map((song) => {
              const fav = songIsFavorited(song.id);
              const inPlaylist = playlistIds.includes(song.id);
              return (
                <Card key={song.id} className="bg-[#1e1e1e]">
                  <CardContent className="p-2 sm:p-4">
                    <div
                      className="relative mb-3 cursor-pointer"
                      onClick={() => goToPlayer(song.id)}
                    >
                      <img
                        src={song.image || FALLBACK_IMG}
                        alt={song.title}
                        className="w-full h-36 object-cover rounded-lg"
                      />
                      <Button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          goToPlayer(song.id);
                        }}
                        size="icon"
                        className="absolute bottom-2 right-2 bg-[#ee0faf] w-10 h-10 rounded-full"
                      >
                        <PlayIcon className="w-5 h-5" />
                      </Button>
                    </div>
                    <h3 className="font-semibold truncate">{song.title}</h3>
                    <p className="text-white/70 text-sm truncate">{song.artist}</p>
                    <p className="text-white/50 text-xs truncate">
                      {(song.genre || "Unknown")} • {song.releaseDate || ""}
                    </p>

                    {/* actions */}
                    <div className="flex justify-between items-center mt-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-sm ${
                          fav ? "text-[#ee0faf]" : "text-white/70"
                        }`}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          toggleFavorite(song);
                        }}
                      >
                        <HeartIcon className="w-4 h-4 mr-1" />
                        {fav ? "Favorited" : song.likes ?? 0}
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-sm ${
                          inPlaylist ? "text-[#0d9eef]" : "text-white/70"
                        }`}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          togglePlaylist(song);
                        }}
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        {inPlaylist ? "Added" : "Playlist"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};
