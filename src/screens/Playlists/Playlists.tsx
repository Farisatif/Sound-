import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { PlayIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Playlists: React.FC = () => {
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  // تحميل القوائم من localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    setUserPlaylists(saved);
  }, []);

  // حذف Playlist
  const handleDelete = (id: string) => {
    const updated = userPlaylists.filter((p) => p.id !== id);
    setUserPlaylists(updated);
    localStorage.setItem("playlists", JSON.stringify(updated));
    setConfirmDelete(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-8"
    >
      <div className="mt-[6%] max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-white">Your </span>
            <span className="text-[#ee0faf]">Playlists</span>
          </h1>
          <p className="text-white/60 text-lg">
            Organize your music, create vibes, and play anytime 🎶
          </p>
        </motion.div>

        {/* Create New Playlist */}
        <div className="mb-12 flex justify-center">
          <Button
            onClick={() => navigate("/playlists/create")}
            className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 px-6 py-3 rounded-xl flex items-center gap-2 text-lg font-semibold shadow-lg"
          >
            <PlusIcon className="w-5 h-5" />
            New Playlist
          </Button>
        </div>

        {/* User Playlists */}
        <h2 className="text-2xl font-bold mb-6">Your Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPlaylists.length === 0 ? (
            <p className="text-white/50">No playlists yet. Create one!</p>
          ) : (
            userPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <Card
                  className="bg-[#1e1e1e] border-none rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition-all duration-500 cursor-pointer"
                  onClick={() => navigate(`/playlists/${playlist.id}`)}
                >
                  {/* Cover */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={
                        playlist.cover ||
                        playlist.songs?.[0]?.image ||
                        "https://via.placeholder.com/300"
                      }
                      alt={playlist.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* اسم وعدد الأغاني */}
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-lg font-bold">{playlist.name}</h3>
                      <p className="text-sm text-white/60">
                        {playlist.songs?.length || 0} song
                        {playlist.songs?.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    {/* أزرار */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Button
                        size="icon"
                        className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 rounded-full shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/playlists/${playlist.id}`);
                        }}
                      >
                        <PlayIcon className="w-6 h-6" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="rounded-full shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete(playlist.id);
                        }}
                      >
                        <Trash2Icon className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* نافذة تأكيد الحذف */}
                {confirmDelete === playlist.id && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-2xl p-6">
                    <p className="mb-4 text-white/90">
                      Are you sure you want to delete{" "}
                      <span className="font-bold">{playlist.name}</span>?
                    </p>
                    <div className="flex gap-4">
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(playlist.id)}
                      >
                        Yes, Delete
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setConfirmDelete(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};
