import React from 'react';
import { HeartIcon, MusicIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../context/AuthContext";
import { useSongs, useGenres } from '../../../../hooks/useData';
import { Link } from 'react-router-dom';

export const HeroSection = (): JSX.Element => {
  const { user } = useAuth();
  const { loading: songsLoading } = useSongs();
  const { loading: genresLoading } = useGenres();

  if (songsLoading || genresLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-screen sm:h-[80vh] bg-black flex justify-center items-center overflow-hidden">
      {/* Background Overlay */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://c.animaapp.com/mecm5afmnFTEcQ/img/1000-f-645546712-clv1sotwmf2k99veh5cvx7tvqc38k6hp-1.png')",
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Centered Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center items-center gap-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main Image */}
        <motion.img
          src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-181.svg"
          alt="All the Best Songs"
          className="w-[300px] sm:w-[350px] md:w-[400px] rounded-xl shadow-2xl"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        />

        {/* Secondary Image */}
        <motion.img
          src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-180.svg"
          alt="In One Place"
          className="w-[220px] sm:w-[280px] md:w-[320px] rounded-xl bg-black/70 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
          <Link to="/sitemap">
            <Button className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white font-medium px-6 py-2 rounded-full text-sm sm:text-base shadow-lg">
              Explore Sitemap
            </Button>
          </Link>
          {!user && (
            <Link to="/signup">
              <Button variant="outline" className="border-[#ee0faf] text-white hover:bg-[#ee0faf]/20 rounded-full px-6 py-2 text-sm sm:text-base">
                Join Now
              </Button>
            </Link>
          )}
        </div>
      </motion.div>

      {/* Stats Right */}
      <motion.div
        className="absolute bottom-6 sm:bottom-12 right-6 sm:right-16 flex items-center gap-3"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <MusicIcon className="w-6 h-6 text-white" />
        </motion.div>
        <div className="text-white font-bold text-sm sm:text-base">
          <span className="text-[#ee0faf]">5+</span> Songs
        </div>
      </motion.div>

      {/* Likes Left */}
      <motion.div
        className="absolute bottom-6 sm:bottom-12 left-6 sm:left-16 flex items-center gap-3"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HeartIcon className="w-6 h-6 text-[#ee0faf] fill-current" />
        </motion.div>
        <div className="text-white font-bold text-sm sm:text-base">
          <span className="text-[#ee0faf]">33k</span> Likes
        </div>
      </motion.div>
    </section>
  );
};
