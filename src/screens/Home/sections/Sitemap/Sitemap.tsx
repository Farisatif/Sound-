// src/pages/sitemap/Sitemap.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../../components/ui/card";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  AlbumIcon,
  UserIcon,
  MusicIcon,
  MessageSquareIcon,
  InfoIcon,
  KeyIcon,
  SearchIcon,
} from "lucide-react";

const sections = [
  {
    title: "Main",
    pages: [
      { name: "Home", path: "/", icon: HomeIcon },
      { name: "Albums", path: "/albums", icon: AlbumIcon },
      { name: "Artists", path: "/artists", icon: UserIcon },
      { name: "Old Songs", path: "/old-songs", icon: MusicIcon },
    ],
  },
  {
    title: "User",
    pages: [
      { name: "Profile", path: "/profile", icon: UserIcon },
      { name: "Feedback", path: "/feedback", icon: MessageSquareIcon },
      { name: "Forgot Password", path: "/forgot-password", icon: KeyIcon },
    ],
  },
  {
    title: "Info",
    pages: [{ name: "About Us", path: "/about", icon: InfoIcon }],
  },
];

export const Sitemap: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredSections = sections.map((section) => ({
    ...section,
    pages: section.pages.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white relative">
      {/* Hero Section */}
      <div className="text-center py-16 px-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-4"
        >
          <span className="text-white">Explore Our </span>
          <span className="text-[#ee0faf]">Sitemap</span>
        </motion.h1>
  
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto px-4 mb-12 text-white">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
          <input
            type="text"
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1c1c1c] text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#ee0faf] outline-none"
          />
        </div>
      </div>

      {/* Sitemap Sections */}
      <div className="text-white max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredSections.map(
          (section, idx) =>
            section.pages.length > 0 && (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-[#ee0faf]">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.pages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <Link to={page.path} key={page.path}>
                        <Card className="bg-[#1e1e1e] hover:bg-[#2a2a2a] border-none rounded-xl transition-all duration-300 shadow-lg text-white">
                          <CardContent className="p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#ee0faf]/20 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-[#ee0faf]" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium">
                                {page.name}
                              </h3>
                              <p className="text-xs text-white/60">
                                Go to {page.name}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};
