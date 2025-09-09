import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { PlayIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Playlists: React.FC = () => {
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const navigate = useNavigate();

  // تحميل القوائم من localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    setUserPlaylists(saved);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-8"
    >
      <div className="mt-[10%] max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Your </span>
            <span className="text-[#ee0faf]">Playlists</span>
          </h1>
          <p className="text-white/70 text-lg">
            Create and manage your playlists
          </p>
        </motion.div>

        {/* Create New Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 flex justify-center"
        >
          <Button
            onClick={() => navigate("/playlists/create")}
            className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Create Playlist
          </Button>
        </motion.div>

        {/* User Playlists */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
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
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer rounded-xl overflow-hidden"
                    onClick={() => navigate(`/playlists/${playlist.id}`)}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <img
                        src={playlist.cover || "https://via.placeholder.com/150"}
                        alt={playlist.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">
                          {playlist.name}
                        </h3>
                        <p className="text-white/70 text-sm truncate">
                          {playlist.description || "No description"}
                        </p>
                        {playlist.songs && playlist.songs.length > 0 && (
                          <p className="text-white/50 text-xs mt-1">
                            {playlist.songs.length} song
                            {playlist.songs.length > 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                      <Button
                        size="icon"
                        className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation(); // ما يفتح الكارت نفسه
                          navigate(`/playlists/${playlist.id}`);
                        }}
                      >
                        <PlayIcon className="w-5 h-5" />
                      </Button>
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
