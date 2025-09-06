import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { PlayIcon, HeartIcon, TrashIcon, ArrowLeftIcon } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';


export const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-8"
    >
      <div className="mt-[3rem] max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-4"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="icon"
            className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-white">Your </span>
              <span className="text-[#ee0faf]">Favorites</span>
            </h1>
            <p className="text-white/70 text-lg">
              {favorites.length} favorite {favorites.length === 1 ? 'song' : 'songs'}
            </p>
          </div>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center py-16"
          >
            <HeartIcon className="w-24 h-24 text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">No favorites yet</h2>
            <p className="text-white/70 mb-8">Start adding songs to your favorites by clicking the heart icon</p>
            <Button
              onClick={() => navigate('/discover')}
              className="bg-[#ee0faf] hover:bg-[#ee0faf]/90"
            >
              Discover Music
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {favorites.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={song.image}
                          alt={song.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <Button
                          size="icon"
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                        >
                          <PlayIcon className="w-6 h-6 text-white" />
                        </Button>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{song.title}</h3>
                        <p className="text-white/70 text-sm truncate">{song.artist}</p>
                        <p className="text-white/50 text-xs">{song.genre} • {song.duration}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFromFavorites(song.id)}
                          className="text-[#ee0faf] hover:text-red-400 hover:bg-red-400/10"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
            ))}
          </div>
        )}
    
      </div>
    </motion.div>
    
  );
};
