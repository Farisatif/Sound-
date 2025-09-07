// src/pages/albums/Albums.tsx
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { PlayIcon, HeartIcon, MoreHorizontalIcon, DownloadIcon } from "lucide-react";
import { useAlbums } from "../../hooks/useData";
import songsData from "../../data/songs.json";
import { useAuth } from "../../context/AuthContext";

interface Song {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
  duration?: string;
}

export const Albums: React.FC = () => {
  const { albums, loading } = useAlbums();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // كل الأغاني من JSON
  const allSongs: Song[] = [
    ...(songsData?.weeklyTopSongs ?? []),
    ...(songsData?.newReleaseSongs ?? []),
    ...(songsData?.trendingSongs ?? []),
  ];

  // تنزيل كل الأغاني الخاصة بفنان
  const handleDownloadAll = (songs: Song[]) => {
    if (!user) return;
    songs.forEach((song) => {
      if (!song.path) return;
      const a = document.createElement("a");
      a.href = song.path;
      a.download = `${song.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

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

        {/* Albums Grid */}
        <div className="grid grid-cols-1 gap-6">
          {albums?.map((album, index) => {
            // فلترة الأغاني حسب الفنان
            const artistSongs = allSongs.filter((s) => s.artist === album.artist);

            return (
              <motion.div
                key={album.id ?? index}
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
                        src={album.image}
                        alt={album.title}
                        className="w-28 h-28 object-cover rounded-lg"
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
                          <Button size="icon" variant="ghost" className="text-white/70 hover:text-[#ee0faf]">
                            <HeartIcon className="w-5 h-5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-white/70 hover:text-white">
                            <MoreHorizontalIcon className="w-5 h-5" />
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
                                />
                                <div className="truncate">
                                  <p className="font-medium truncate">{song.title}</p>
                                  <p className="text-xs text-white/70 truncate">
                                    {song.artist}
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs text-white/60">
                                {song.duration ?? "0:00"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-white/50">No songs available.</p>
                      )}
                    </div>

                    {/* Download All Button */}
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
