import { motion } from "framer-motion";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { PopularArtistsSection } from "./sections/PopularArtistsSection/PopularArtistsSection";
import { TrendingSongsSection } from "./sections/TrendingSongsSection/TrendingSongsSection";
import { WeeklyTopSongsSection } from "./sections/WeeklyTopSongsSection/WeeklyTopSongsSection";
import "../../index.css"
export const Home = (): JSX.Element => {
  return (
    
    <motion.main 
      className="flex-1  p-1 bg-black text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-model-id="1:4"
    >
      <HeroSection />
      <WeeklyTopSongsSection />
      <TrendingSongsSection />
      <PopularArtistsSection />
    </motion.main>
  );
};