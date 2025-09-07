import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { PlayIcon, PlusIcon, UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlaylists } from "../../hooks/useData";

export const Playlists: React.FC = () => {
  const { playlists, loading } = usePlaylists();
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const navigate = useNavigate();

  // تحميل القوائم من localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    setUserPlaylists(saved);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-8"
    >
      <div className="mt-[10%] max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Your </span>
            <span className="text-[#ee0faf]">Playlists</span>
          </h1>
          <p className="text-white/70 text-lg">Manage and discover playlists</p>
        </motion.div>

        {/* Create New Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-[#ee0faf]/20 to-[#0d9eef]/20 border-[#ee0faf]/30">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Create New Playlist
                </h3>
                <p className="text-white/70">
                  Start building your perfect music collection
                </p>
              </div>
              <Button
                onClick={() => navigate("/playlists/create")}
                className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Create Playlist
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mood Playlists */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Mood Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {playlists.moodPlaylists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={playlist.image}
                        alt={playlist.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <Button
                          size="icon"
                          className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 w-12 h-12"
                        >
                          <PlayIcon className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-white">{playlist.title}</h3>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {playlist.description}
                      </p>

                      <div className="flex items-center justify-between text-white/60 text-xs">
                        <span>{playlist.tracks} tracks</span>
                        <span>{playlist.duration}</span>
                      </div>

                      {playlist.followers && (
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <UsersIcon className="w-3 h-3" />
                          <span>
                            {(playlist.followers / 1000000).toFixed(1)}M
                            followers
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* User Playlists (من localStorage) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userPlaylists.length === 0 ? (
              <p className="text-white/50">No playlists yet. Create one!</p>
            ) : (
              userPlaylists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <Card
                    onClick={() => navigate(`/playlists/${playlist.id}`)}
                    className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={playlist.cover}
                          alt={playlist.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white">
                            {playlist.name}
                          </h3>
                          <p className="text-white/70 text-sm line-clamp-1">
                            {playlist.description}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          className="bg-[#ee0faf] hover:bg-[#ee0faf]/90"
                        >
                          <PlayIcon className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
