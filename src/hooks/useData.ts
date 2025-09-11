// src/hooks/useData.ts
import { useState, useEffect } from "react";

// Import JSON data (keep old files for backward compatibility)
import songsData from "../data/songs.json";
import artistsData from "../data/artists.json";
// NOTE: albums.json import removed because you said you merged albums into songs.json
import playlistsData from "../data/playlists.json";
import genresData from "../data/genres.json";

// Types
export interface Song {
  id: number;
  title: string;
  artist: string;
  image?: string | null;
  genre?: string;
  duration?: string;
  releaseDate?: string | null;
  rank?: string;
  album?: string | null;
  plays?: number;
  path?: string;
  likes?: number;
}

export interface Artist {
  id: number;
  name: string;
  image?: string;
  genre?: string;
  followers?: number;
  verified?: boolean;
  monthlyListeners?: number;
  topSongs?: string[];
}

export interface Album {
  id?: number;
  title: string;
  artist?: string;
  artistId?: number;
  image?: string;
  releaseDate?: string | null;
  genre?: string;
  tracks?: number;
  duration?: string;
  label?: string;
  sales?: number;
  rating?: number;
  songIds?: number[]; // new/used when linking to songs
}

export interface Playlist {
  artistId?: number;
  id: number;
  title: string;
  image?: string;
  description?: string;
  mood?: string;
  tracks?: number;
  duration?: string;
  followers?: number;
  tags?: string[];
  color?: string;
  isPrivate?: boolean;
  createdAt?: string;
  updatedAt?: string;
  songs?: Song[]; // optional full song list for convenience
}

export interface Genre {
  id: number;
  name: string;
  description?: string;
  color?: string;
  popularArtists?: string[];
  subgenres?: string[];
}

// Helper to build unified songs array from songsData (dedupe)
const buildAllSongsFromSource = (): Song[] => {
  const parts: any[] = [];
  // support multiple shapes if songsData may contain older/newer formats
  if (Array.isArray((songsData as any).weeklyTopSongs)) {
    parts.push(...((songsData as any).weeklyTopSongs ?? []));
  }
  if (Array.isArray((songsData as any).newReleaseSongs)) {
    parts.push(...((songsData as any).newReleaseSongs ?? []));
  }
  if (Array.isArray((songsData as any).trendingSongs)) {
    parts.push(...((songsData as any).trendingSongs ?? []));
  }
  // also support a generic `songs` array if present
  if (Array.isArray((songsData as any).songs)) {
    parts.push(...((songsData as any).songs ?? []));
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
      image: s.image ?? s.cover ?? null,
      genre: s.genre ?? undefined,
      duration: s.duration ?? s.time ?? undefined,
      releaseDate: s.releaseDate ?? null,
      rank: s.rank ?? undefined,
      album: s.album ?? null,
      plays: s.plays ?? undefined,
      path: s.path ?? s.url ?? undefined,
      likes: s.likes ?? undefined,
    });
  });

  return Array.from(map.values());
};

// Custom hooks
export const useSongs = () => {
  const [songs, setSongs] = useState({
    weeklyTopSongs: [] as Song[],
    newReleaseSongs: [] as Song[],
    trendingSongs: [] as Song[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate async fetch
    const timer = setTimeout(() => {
      // build robustly: if songsData has separate arrays use them, else try to split unified list
      const weekly = Array.isArray((songsData as any).weeklyTopSongs)
        ? (songsData as any).weeklyTopSongs
        : [];
      const newRelease = Array.isArray((songsData as any).newReleaseSongs)
        ? (songsData as any).newReleaseSongs
        : [];
      const trending = Array.isArray((songsData as any).trendingSongs)
        ? (songsData as any).trendingSongs
        : [];

      // if none of the specific arrays exist, but there's a unified list, split heuristically
      if (!weekly.length && !newRelease.length && !trending.length) {
        const unified = buildAllSongsFromSource();
        // heuristic split: newest by releaseDate, trending by plays
        const sortedByDate = [...unified].sort((a, b) => {
          const ta = a.releaseDate ? new Date(String(a.releaseDate)).getTime() : 0;
          const tb = b.releaseDate ? new Date(String(b.releaseDate)).getTime() : 0;
          return tb - ta;
        });
        setSongs({
          weeklyTopSongs: sortedByDate.slice(0, 5),
          newReleaseSongs: sortedByDate.slice(0, 5),
          trendingSongs: sortedByDate.slice(0, 7),
        });
      } else {
        setSongs({
          weeklyTopSongs: weekly,
          newReleaseSongs: newRelease,
          trendingSongs: trending,
        });
      }

      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { songs, loading };
};

export const useArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // fallback if shape differs
      const list = (artistsData as any)?.popularArtists ?? (artistsData as any)?.artists ?? [];
      setArtists(list);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { artists, loading };
};

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        const allSongs = buildAllSongsFromSource();

        // 1) prefer albums defined inside songs.json (merged case)
        const albumsFromSongsJson: any[] = (songsData as any)?.albums ?? [];
        if (Array.isArray(albumsFromSongsJson) && albumsFromSongsJson.length > 0) {
          // map and attach songIds (ensure numbers)
          const mapped = albumsFromSongsJson.map((a: any) => {
            const songIds = Array.isArray(a.songIds) ? a.songIds.map((id: any) => Number(id)).filter((n: number) => !isNaN(n)) : [];
            return {
              id: a.id,
              title: a.title,
              artist: a.artist,
              image: a.image,
              releaseDate: a.releaseDate ?? null,
              genre: a.genre,
              tracks: a.tracks,
              duration: a.duration,
              label: a.label,
              sales: a.sales,
              rating: a.rating,
              songIds,
            } as Album;
          });
          setAlbums(mapped);
          setLoading(false);
          return;
        }

        // 2) try dynamic import of legacy albums.json if it exists (optional)
        let topAlbumsLegacy: any[] | null = null;
        try {
          // dynamic import: if file exists in the build it will be loaded, otherwise it will throw
          // note: some bundlers may inline JSON; this is a best-effort fallback
          // @ts-ignore
          const mod = await import("../data/songs.json").catch(() => null);
          topAlbumsLegacy = mod ? (mod.default ?? mod).topAlbums ?? (mod.default ?? mod) : null;
        } catch {
          topAlbumsLegacy = null;
        }

        if (Array.isArray(topAlbumsLegacy) && topAlbumsLegacy.length > 0) {
          // try to fill songIds by matching artist + title or just artist (best-effort)
          const mapped = topAlbumsLegacy.map((a: any) => {
            let songIds: number[] = [];
            if (Array.isArray(a.songIds) && a.songIds.length) {
              songIds = a.songIds.map((id: any) => Number(id)).filter((n: number) => !isNaN(n));
            } else {
              // best-effort: find songs with same artist and/or album title
              const artistKey = (a.artist ?? "").toString().trim().toLowerCase();
              const titleKey = (a.title ?? "").toString().trim().toLowerCase();
              const matched = allSongs.filter((s) => {
                const sameArtist = (s.artist ?? "").toString().trim().toLowerCase() === artistKey;
                const sameAlbum = (s.album ?? "").toString().trim().toLowerCase() === titleKey;
                return sameArtist && (sameAlbum || !s.album);
              });
              songIds = matched.map((s) => s.id);
            }

            return {
              id: a.id,
              title: a.title,
              artist: a.artist,
              image: a.image,
              releaseDate: a.releaseDate ?? null,
              genre: a.genre,
              tracks: a.tracks,
              duration: a.duration,
              label: a.label,
              sales: a.sales,
              rating: a.rating,
              songIds,
            } as Album;
          });

          setAlbums(mapped);
          setLoading(false);
          return;
        }

        // 3) last resort: derive albums by grouping songs by s.album (or Artist - Single)
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
              image: s.image ?? undefined,
              releaseDate: s.releaseDate ?? null,
              genre: s.genre,
              tracks: undefined,
              duration: undefined,
              label: undefined,
              sales: undefined,
              rating: undefined,
              songIds: [],
            } as Album);
          }
          const entry = map.get(key)!;
          entry.songIds = [...(entry.songIds ?? []), s.id];
        });

        setAlbums(Array.from(map.values()));
        setLoading(false);
      })();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { albums, loading };
};

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState({
    moodPlaylists: [] as Playlist[],
    userPlaylists: [] as Playlist[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mood = (playlistsData as any)?.moodPlaylists ?? [];
      const user = (playlistsData as any)?.userPlaylists ?? [];
      setPlaylists({
        moodPlaylists: mood,
        userPlaylists: user,
      });
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { playlists, loading };
};

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const g = (genresData as any)?.genres ?? [];
      setGenres(g);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { genres, loading };
};

// Utility functions
export const searchSongs = (query: string, allSongs: Song[]): Song[] => {
  if (!query || !query.trim()) return [];

  const lowercaseQuery = query.toLowerCase();
  return allSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(lowercaseQuery) ||
      song.artist.toLowerCase().includes(lowercaseQuery) ||
      (song.genre ?? "").toLowerCase().includes(lowercaseQuery)
  );
};

export const getSongsByGenre = (genre: string, allSongs: Song[]): Song[] => {
  return allSongs.filter((song) => (song.genre ?? "").toLowerCase() === genre.toLowerCase());
};

export const getSongsByArtist = (artist: string, allSongs: Song[]): Song[] => {
  return allSongs.filter((song) => (song.artist ?? "").toLowerCase() === artist.toLowerCase());
};

export const getRandomSongs = (allSongs: Song[], count: number = 10): Song[] => {
  const shuffled = [...allSongs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
