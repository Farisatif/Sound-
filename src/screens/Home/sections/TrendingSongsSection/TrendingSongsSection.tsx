import { HeartIcon, PlusIcon, PlayIcon } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useSongs } from "../../../../hooks/useData";
import { useFavorites } from "../../../../context/FavoritesContext";

export const TrendingSongsSection = (): JSX.Element => {
  const { songs, loading } = useSongs();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const toggleFavorite = (song: any) => {
    if (isFavorite(song.id)) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <motion.section 
      className="w-full relative px-4 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center gap-2.5 p-2.5 mb-4">
        <h1 className="font-h1 font-[number:var(--h1-font-weight)] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
          <span className="text-white">Trending</span>
          <span className="text-[#ee0faf]"> Songs</span>
        </h1>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center mb-4 px-4">
        <div></div>
        <div></div>
        <div className="font-text-big font-[number:var(--text-big-font-weight)] text-white text-[length:var(--text-big-font-size)] tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] [font-style:var(--text-big-font-style)]">
          Relase Date
        </div>
        <div className="font-text-big font-[number:var(--text-big-font-weight)] text-white text-[length:var(--text-big-font-size)] tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] [font-style:var(--text-big-font-style)]">
          album
        </div>
        <div className="font-text-big font-[number:var(--text-big-font-weight)] text-white text-[length:var(--text-big-font-size)] tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] [font-style:var(--text-big-font-style)]">
          Time
        </div>
      </div>

      <div className="space-y-4">
        {songs.trendingSongs.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center hover:bg-[#1a1a1a] p-2 rounded-lg transition-all duration-200"
          >
            <div className="font-h2 font-[number:var(--h2-font-weight)] text-white text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)] w-7">
              {song.rank}
            </div>

            <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-colors duration-200">
              <CardContent className="flex items-center gap-4 p-2 h-[60px]">
                <div className="relative group">
                  <motion.img
                    className="w-[58px] h-[60px] rounded-[5px] object-cover"
                    alt="Album cover"
                    src={song.image}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Button
                    onClick={() => navigate(`/player/${song.id}`)}
                    size="icon"
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[5px] w-[58px] h-[60px]"
                  >
                    <PlayIcon className="w-6 h-6 text-white" />
                  </Button>
                </div>

                <div className="flex flex-col justify-center min-w-0">
                  <div className="font-h3 font-[number:var(--h3-font-weight)] text-white text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] leading-[var(--h3-line-height)] [font-style:var(--h3-font-style)] truncate">
                    {song.title}
                  </div>
                  <div className="font-text-small font-[number:var(--text-small-font-weight)] text-white text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)] truncate">
                    {song.artist}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="font-text-medium font-[number:var(--text-medium-font-weight)] text-white text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
              {song.releaseDate}
            </div>

            <div className="font-text-medium font-[number:var(--text-medium-font-weight)] text-white text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)] max-w-[200px] truncate">
              {song.album}
            </div>

            <div className="flex items-center gap-3.5">
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <HeartIcon 
                  className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                    isFavorite(song.id) ? 'text-[#ee0faf] fill-current' : 'text-white hover:text-[#ee0faf]'
                  }`}
                  onClick={() => toggleFavorite(song)}
                />
              </motion.div>
              <div className="font-text-medium font-[number:var(--text-medium-font-weight)] text-white text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
                {song.duration}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Button
          variant="secondary"
          className="bg-[#1e1e1e] text-white border-none rounded-[5px] h-auto px-4 py-1 hover:bg-[#2a2a2a] transition-all duration-200 hover:scale-105"
        >
          <PlusIcon className="w-6 h-6 mr-1" />
          <span className="font-h4 font-[number:var(--h4-font-weight)] text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
            View All
          </span>
        </Button>
      </motion.div>
    </motion.section>
  );
};
