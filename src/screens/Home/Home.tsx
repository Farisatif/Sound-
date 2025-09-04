import { motion } from "framer-motion";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { NewReleaseSongsSection } from "./sections/NewReleaseSongsSection/NewReleaseSongsSection";
import { PopularArtistsSection } from "./sections/PopularArtistsSection/PopularArtistsSection";
import { TrendingSongsSection } from "./sections/TrendingSongsSection/TrendingSongsSection";
import { WeeklyTopSongsSection } from "./sections/WeeklyTopSongsSection/WeeklyTopSongsSection";
import "../../index.css"
export const Home = (): JSX.Element => {
  return (
    <motion.main 
      className="bg-black
      
      
      -h-screen flex flex-col overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-model-id="1:4"
    >
      <HeroSection />
      <WeeklyTopSongsSection />
      <NewReleaseSongsSection />
      <TrendingSongsSection />
      <PopularArtistsSection />
    </motion.main>
  );
};