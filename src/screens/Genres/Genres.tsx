import React from "react";
import { motion } from "framer-motion";
import { Music2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const genres = [
  { id: 1, name: "Pop", slug: "pop", color: "from-pink-500 to-red-500", image: "https://i.scdn.co/image/ab67616d0000b2739d4c3b73aa7f1b8b3f7e9a8b" },
  { id: 2, name: "Hip Hop", slug: "hiphop", color: "from-yellow-500 to-orange-600", image: "https://i.scdn.co/image/ab67616d0000b273bc3f8c4f9d5f9d3b5f0c6f20" },
  { id: 3, name: "Rock", slug: "rock", color: "from-gray-700 to-black", image: "https://i.scdn.co/image/ab67616d0000b2731f58d3c257a7b5e0f0b42b09" },
  { id: 4, name: "Electronic", slug: "electronic", color: "from-blue-500 to-indigo-600", image: "https://i.scdn.co/image/ab67616d0000b273a5f9b4e8b3c2b99c21e5b77e" },
  { id: 5, name: "Jazz", slug: "jazz", color: "from-purple-500 to-pink-600", image: "https://i.scdn.co/image/ab67616d0000b2730a9f66a3bbcbf79f2d2c4f5d" },
  { id: 6, name: "Classical", slug: "classical", color: "from-green-500 to-emerald-600", image: "https://i.scdn.co/image/ab67616d0000b2734a5f1c9a66ffcc3e7a0c8f2f" },
];

export const Genres: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-black text-white min-h-screen px-6 lg:px-12 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Music2Icon className="w-8 h-8 text-pink-500" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Browse <span className="text-pink-500">Genres</span>
          </h1>
        </div>
        <p className="text-white/70 text-base sm:text-lg">
          Find the perfect music by exploring different styles and moods 🎶
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {genres.map((genre, index) => (
          <motion.div
            key={genre.id}
            onClick={() => navigate(`/genres/${genre.slug}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer bg-gradient-to-br ${genre.color}`}
          >
            <img
              src={genre.image}
              alt={genre.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative p-5 h-40 flex items-end">
              <h2 className="text-xl font-bold">{genre.name}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
