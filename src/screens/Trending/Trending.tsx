import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { PlayIcon, FlameIcon } from "lucide-react";
import { useSongs } from "../../hooks/useData";
import { useNavigate } from "react-router-dom";

export const Trending: React.FC = () => {
  const { songs, loading } = useSongs();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const trendingSongs = songs.trendingSongs ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-[3rem] bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* عنوان الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <FlameIcon className="w-8 h-8 text-orange-500 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Trending <span className="text-orange-500">Songs</span>
            </h1>
          </div>
          <p className="text-white/70 text-sm sm:text-lg">
            Listen to the hottest tracks people are loving right now 🔥
          </p>
        </motion.div>

        {/* شبكة الأغاني */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trendingSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-3 sm:p-4">
                    {/* صورة الأغنية */}
                    <div className="relative mb-3 group">
                      <img
                        src={song.image}
                        alt={song.title}
                        className="w-full h-36 sm:h-44 md:h-52 object-cover rounded-xl"
                      />
                      {/* زر تشغيل */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300">
                        <Button
                          onClick={() => navigate(`/player/${song.id}`)}
                          size="icon"
                          className="bg-orange-500 hover:bg-orange-600 w-12 h-12 rounded-full"
                        >
                          <PlayIcon className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>

                    {/* معلومات الأغنية */}
                    <h3 className="font-semibold text-white truncate">
                      {song.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm truncate">
                      {song.artist}
                    </p>
                    <p className="text-white/50 text-xs mt-1 truncate">
                      {song.genre}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
