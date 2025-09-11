// src/pages/albums/Albums.tsx
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  PlayIcon,
  HeartIcon,
  MoreHorizontalIcon,
  DownloadIcon,
  PlusCircleIcon,
} from "lucide-react";
import { useAlbums, useSongs } from "../../hooks/useData";
import songsData from "../../data/songs.json";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

type Song = {
  id: number;
  title: string;
  artist?: string;
  path?: string;
  image?: string | null;
  duration?: string;
  album?: string | null;
  likes?: number;
  plays?: number;
  releaseDate?: string | null;
};

type AlbumRaw = {
  id?: number;
  title: string;
  artist?: string;
  image?: string | null;
  releaseDate?: string | null;
  songIds?: number[];
  genre?: string;
  tracks?: number;
  duration?: string;
  label?: string;
  sales?: number;
  rating?: number;
};

type Album = AlbumRaw & {
  songs: Song[];
};

const FALLBACK_IMG = "https://via.placeholder.com/300x300?text=No+Cover";
const LS_FAVS = "local_favorite_ids";
const LS_PLAYLIST_KEY = "playlists";
const LS_NOW_PLAYING = "nowPlaying";

export const Albums: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const { user } = useAuth();

  // try hook-provided albums (if implemented)
  const albumsHookResult: any = (() => {
    try {
      return useAlbums?.() || {};
    } catch {
      return {};
    }
  })();
  const albumsFromHook: AlbumRaw[] | null =
    albumsHookResult?.albums ?? albumsHookResult?.data ?? null;
  const albumsLoadingFromHook: boolean = albumsHookResult?.loading ?? false;

  // try to get songs from hook (preferred)
  const songsHookResult: any = (() => {
    try {
      return useSongs?.() || {};
    } catch {
      return {};
    }
  })();
  const songsFromHook: any = songsHookResult?.songs ?? null;

  // Build allSongs robustly and dedupe by id
  const allSongs: Song[] = useMemo(() => {
    const parts: any[] = [];

    if (Array.isArray(songsFromHook)) {
      parts.push(...songsFromHook);
    } else if (songsFromHook && typeof songsFromHook === "object") {
      parts.push(
        ...(songsFromHook.weeklyTopSongs ?? []),
        ...(songsFromHook.newReleaseSongs ?? []),
        ...(songsFromHook.trendingSongs ?? []),
        ...(songsFromHook.songs ?? [])
      );
    } else {
      // fallback to local JSON
      parts.push(
        ...(songsData?.weeklyTopSongs ?? []),
        ...(songsData?.newReleaseSongs ?? []),
        ...(songsData?.trendingSongs ?? [])
      );
    }

    const map = new Map<number, Song>();
    parts.forEach((s: any) => {
      if (!s) return;
      const id = Number(s.id);
      if (isNaN(id)) return;
      map.set(id, {
        id,
        title: s.title ?? s.name ?? "Unknown",
        artist: s.artist ?? "Unknown Artist",
        path: s.path ?? s.url ?? "",
        image: s.image ?? s.cover ?? null,
        duration: s.duration ?? s.time ?? "0:00",
        album: s.album ?? null,
        likes: s.likes ?? 0,
        plays: s.plays ?? 0,
        releaseDate: s.releaseDate ?? null,
      });
    });

    return Array.from(map.values());
  }, [songsFromHook]);

  // --- Build albums list (several strategies) ---
  const albumsList: Album[] = useMemo(() => {
    // 1) prefer hook-provided albums
    if (Array.isArray(albumsFromHook) && albumsFromHook.length > 0) {
      const list: Album[] = (albumsFromHook as AlbumRaw[]).map((raw) => {
        const songIds = Array.isArray(raw.songIds) ? raw.songIds : [];
        let songs = songIds
          .map((id) => allSongs.find((s) => s.id === id))
          .filter(Boolean) as Song[];

        if (!songs.length) {
          const artistKey = (raw.artist ?? "").toString().trim().toLowerCase();
          const titleKey = (raw.title ?? "").toString().trim().toLowerCase();
          songs = allSongs.filter((s) => {
            const sameArtist =
              (s.artist ?? "").toString().trim().toLowerCase() === artistKey;
            const sameAlbum =
              (s.album ?? "").toString().trim().toLowerCase() === titleKey;
            return sameArtist && (sameAlbum || (s.album ?? "").toString().length === 0);
          });
        }

        if (!songs.length && raw.artist) {
          songs = allSongs.filter(
            (s) =>
              (s.artist ?? "").toString().trim().toLowerCase() ===
              raw.artist!.toString().trim().toLowerCase()
          );
        }

        return {
          ...raw,
          songs,
        } as Album;
      });

      return list;
    }

    // 2) if songs.json contains albums array
    const albumsFromJson: AlbumRaw[] = (songsData as any)?.albums ?? [];
    if (Array.isArray(albumsFromJson) && albumsFromJson.length > 0) {
      const list = albumsFromJson.map((raw) => {
        const songIds = Array.isArray(raw.songIds) ? raw.songIds : [];
        let songs = songIds
          .map((id) => allSongs.find((s) => s.id === id))
          .filter(Boolean) as Song[];

        if (!songs.length) {
          const artistKey = (raw.artist ?? "").toString().trim().toLowerCase();
          const titleKey = (raw.title ?? "").toString().trim().toLowerCase();
          songs = allSongs.filter((s) => {
            const sameArtist =
              (s.artist ?? "").toString().trim().toLowerCase() === artistKey;
            const sameAlbum =
              (s.album ?? "").toString().trim().toLowerCase() === titleKey;
            return sameArtist && (sameAlbum || (s.album ?? "").toString().length === 0);
          });
        }

        return {
          ...raw,
          songs,
        } as Album;
      });

      return list.sort(
        (a, b) =>
          b.songs.length - a.songs.length ||
          (new Date(b.releaseDate || 0).getTime() -
            new Date(a.releaseDate || 0).getTime())
      );
    }

    // 3) derive from songs by grouping on song.album
    const map = new Map<string, Album>();
    allSongs.forEach((s) => {
      const rawAlbum = (s.album ?? "").toString().trim();
      const artistPart = (s.artist ?? "Unknown Artist").toString().trim();
      const key = rawAlbum && rawAlbum.length > 0 ? rawAlbum : `${artistPart} - Single`;

      if (!map.has(key)) {
        map.set(key, {
          id: undefined,
          title: key,
          artist: s.artist,
          image: s.image ?? FALLBACK_IMG,
          releaseDate: s.releaseDate ?? null,
          songIds: undefined,
          songs: [],
        });
      }
      const entry = map.get(key)!;
      if ((!entry.image || entry.image === FALLBACK_IMG) && s.image) entry.image = s.image;
      entry.songs.push(s);
    });

    return Array.from(map.values()).sort((a, b) => b.songs.length - a.songs.length);
  }, [albumsFromHook, allSongs]);

  // favorite context handling (prefer context, fallback to localStorage)
  const favCtx: any = (() => {
    try {
      return useFavorites?.() || {};
    } catch {
      return {};
    }
  })();
  const { addToFavorites, removeFromFavorites, isFavorite } = favCtx;

  const [localFavIds, setLocalFavIds] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(LS_FAVS);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_FAVS, JSON.stringify(localFavIds));
    } catch {
      // ignore
    }
  }, [localFavIds]);

  const songIsFavorited = (id: number) => {
    if (isFavorite) {
      try {
        return Boolean(isFavorite(id));
      } catch {
        // fallback
      }
    }
    return localFavIds.includes(id);
  };

  const toggleFavorite = (song: Song) => {
    if (!song) return;
    if (addToFavorites && removeFromFavorites && isFavorite) {
      try {
        if (isFavorite(song.id)) removeFromFavorites(song.id);
        else addToFavorites({ ...song, releaseDate: song.releaseDate ?? "" });
        return;
      } catch {
        // fallback to local
      }
    }
    setLocalFavIds((prev) => {
      const exists = prev.includes(song.id);
      if (exists) return prev.filter((i) => i !== song.id);
      return [...prev, song.id];
    });
  };

  // playlist state (for UI feedback)
  const [playlistIds, setPlaylistIds] = useState<number[]>([]);
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

  // simple UI notice message
  const [notice, setNotice] = useState<string | null>(null);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  // download helper
  const handleDownloadAll = (songs: Song[]) => {
    if (!user) {
      alert("You must be logged in to download songs.");
      return;
    }
    if (!songs || !songs.length) {
      alert("No songs to download.");
      return;
    }

    // Ask for confirmation
    const ok = window.confirm(`Download ${songs.length} songs from this album?`);
    if (!ok) return;

    songs.forEach((song) => {
      if (!song.path) return;
      const a = document.createElement("a");
      a.href = song.path;
      a.download = `${song.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
    setNotice("Download started.");
  };

  // Add album to default playlist (requires login)
  const addAlbumToPlaylist = (album: Album) => {
    if (!user) {
      alert("You must be logged in to add albums to playlist.");
      return;
    }
    const songs = album.songs ?? [];
    if (!songs.length) {
      setNotice("No songs to add to playlist.");
      return;
    }

    try {
      const saved = JSON.parse(localStorage.getItem(LS_PLAYLIST_KEY) || "[]");
      let def = saved.find((p: any) => p.id === "default");
      if (!def) {
        def = { id: "default", name: "My Playlist", songs: [] as Song[] };
        saved.push(def);
      }

      let added = 0;
      songs.forEach((s) => {
        if (!def.songs.find((x: Song) => x.id === s.id)) {
          def.songs.push(s);
          added++;
        }
      });

      localStorage.setItem(LS_PLAYLIST_KEY, JSON.stringify(saved));
      setPlaylistIds(def.songs.map((s: Song) => s.id));
      setNotice(added > 0 ? `Added ${added} songs to your playlist.` : "All songs already in playlist.");
    } catch (e) {
      console.error("Playlist save error", e);
      setNotice("Failed to add to playlist.");
    }
  };

  // Play album: save nowPlaying and navigate to first song
  const playAlbum = (album: Album) => {
    const songs = album.songs ?? [];
    if (!songs.length) {
      setNotice("No songs to play.");
      return;
    }
    const ids = songs.map((s) => s.id);
    try {
      localStorage.setItem(LS_NOW_PLAYING, JSON.stringify(ids));
      const firstId = ids[0];
      navigate(`/player/${firstId}`);
    } catch {
      // fallback navigation
      navigate(`/player/${songs[0].id}`);
    }
  };

  // loading indicator if albums hook is explicitly loading
  if (albumsLoadingFromHook) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // --- render ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-[2rem] mb-8 text-center sm:text-left"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="text-white">Top </span>
            <span className="text-[#ee0faf]">Albums</span>
          </h1>
          <p className="text-white/70 text-sm sm:text-base lg:text-lg">
            Discover the most popular albums
          </p>
        </motion.div>

        {/* small notice */}
        {notice ? (
          <div className="mb-4 text-sm text-white/90 bg-[#121212] p-2 rounded">
            {notice}
          </div>
        ) : null}

        {/* Albums Grid */}
        <div className="grid grid-cols-1 gap-6">
          {albumsList.map((album, index) => {
            const artistSongs = album.songs ?? [];
            return (
              <motion.div
                key={album.id ?? `${album.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="group"
              >
                <Card className="bg-[#1e1e1e] border-none transition-all duration-300">
                  <CardContent className="p-4">
                    {/* Album Header */}
                    <div className="flex gap-4 items-center mb-4">
                      <img
                        src={album.image ?? FALLBACK_IMG}
                        alt={album.title}
                        className="w-28 h-28 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{album.title}</h3>
                        <p className="text-[#ee0faf] text-sm">{album.artist}</p>
                        <p className="text-white/50 text-xs">
                          Released:{" "}
                          {album.releaseDate
                            ? new Date(album.releaseDate).getFullYear()
                            : "Unknown"}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {/* Favorite */}
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`text-white/70 hover:text-[#ee0faf] ${
                              artistSongs.some((s) => songIsFavorited(s.id))
                                ? "text-[#ee0faf]"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              const target = artistSongs[0];
                              if (target) toggleFavorite(target);
                            }}
                            aria-label={`Toggle favorite for ${album.title}`}
                          >
                            <HeartIcon className="w-5 h-5" />
                          </Button>

                          {/* Play Album */}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-white/70 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              playAlbum(album);
                            }}
                            aria-label={`Play album ${album.title}`}
                          >
                            <PlayIcon className="w-5 h-5" />
                          </Button>

                          {/* Add to Playlist (requires login) */}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-white/70 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              addAlbumToPlaylist(album);
                            }}
                            aria-label={`Add ${album.title} to playlist`}
                          >
                            <PlusCircleIcon className="w-5 h-5" />
                          </Button>

                          {/* Download Album (requires login) */}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-white/70 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleDownloadAll(artistSongs);
                            }}
                            aria-label={`Download album ${album.title}`}
                          >
                            <DownloadIcon className="w-5 h-5" />
                          </Button>

                  
                        </div>
                      </div>
                    </div>

                    {/* Songs List */}
                    <div className="bg-[#111] rounded-lg p-3">
                      <h4 className="font-semibold mb-2">Songs</h4>
                      {artistSongs.length > 0 ? (
                        <ul className="space-y-2">
                          {artistSongs.map((song) => (
                            <li
                              key={song.id}
                              className="flex justify-between items-center p-2 rounded-md hover:bg-white/10"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={song.image ?? "https://via.placeholder.com/50"}
                                  alt={song.title}
                                  className="w-10 h-10 rounded object-cover"
                                  loading="lazy"
                                />
                                <div className="truncate">
                                  <p className="font-medium truncate">{song.title}</p>
                                  <p className="text-xs text-white/70 truncate">
                                    {song.artist}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="text-xs text-white/60">
                                  {song.duration ?? "0:00"}
                                </span>

                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-white/60 hover:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      navigate(`/player/${song.id}`);
                                    }}
                                    aria-label={`Play ${song.title}`}
                                  >
                                    <PlayIcon className="w-4 h-4" />
                                  </Button>

                                  {user ? (
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="text-white/60 hover:text-white"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        if (!song.path) return;
                                        const a = document.createElement("a");
                                        a.href = song.path || "";
                                        a.download = `${song.title}.mp3`;
                                        document.body.appendChild(a);
                                        a.click();
                                        a.remove();
                                      }}
                                      aria-label={`Download ${song.title}`}
                                    >
                                      <DownloadIcon className="w-4 h-4" />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-white/50">No songs available.</p>
                      )}
                    </div>

                    {/* Download All Button (redundant with header download icon, kept for clarity) */}
                    <div className="mt-4 text-center">
                      {user ? (
                        <Button
                          onClick={() => handleDownloadAll(artistSongs)}
                          className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white px-4 py-2"
                        >
                          <DownloadIcon className="w-4 h-4 mr-2" /> Download All Songs
                        </Button>
                      ) : (
                        <p className="text-sm text-white/60">
                          Login to download all songs from this album.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Albums;
