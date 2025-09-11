import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { PlayIcon, PlusIcon, ArrowLeftIcon, DownloadIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAuth } from "../../context/AuthContext";

const LS_KEY = "playlists";

export const ArtistPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const artist = location.state as {
    id: number;
    name: string;
    image: string;
    genre?: string;
    songs: any[];
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!artist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">❌ No artist data available.</p>
      </div>
    );
  }

  const addToPlaylist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      let playlist = saved.find((p: any) => p.id === "default");
      if (!playlist) {
        playlist = { id: "default", songs: [] };
        saved.push(playlist);
      }
      playlist.songs.push(...artist.songs);
      localStorage.setItem(LS_KEY, JSON.stringify(saved));
      alert(`✅ Added ${artist.name}'s songs to playlist!`);
    } catch (err) {
      console.error("Error saving playlist", err);
    }
  };

  const downloadImage = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Gradient */}
      <div className="relative bg-gradient-to-b from-pink-700/60 to-black p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-white/80 hover:text-white"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <img
            src={artist.image ?? "https://via.placeholder.com/150"}
            alt={artist.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl"
          />
          <div>
            <h1 className="text-4xl font-extrabold">{artist.name}</h1>
            <p className="text-white/70 mt-1">
              {artist.genre ?? "Unknown genre"} • {artist.songs.length} songs
            </p>
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => navigate(`/player/${artist.songs[0].id}`)}
                className="bg-pink-600 hover:bg-pink-700 shadow-lg"
              >
                <PlayIcon className="w-5 h-5 mr-2" /> Play All
              </Button>
              <Button
                onClick={addToPlaylist}
                variant="outline"
                className="text-white border-white/40 hover:border-pink-500"
              >
                <PlusIcon className="w-5 h-5 mr-2" /> Add to Playlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {artist.songs.map((song, idx) => (
            <img
              key={idx}
              src={song.image ?? "https://via.placeholder.com/300"}
              alt={song.title}
              className="w-full h-40 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-md"
              onClick={() => setSelectedImage(song.image)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      >
        <Dialog.Panel className="relative">
          {/* زر إغلاق */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <XIcon className="w-7 h-7" />
          </button>

          {/* الصورة */}
          <img
            src={selectedImage!}
            alt="Selected"
            className="max-h-[80vh] rounded-xl shadow-2xl"
          />

          {/* زر التحميل فقط للمسجل */}
          {user && (
            <div className="absolute bottom-6 right-6">
              <Button
                onClick={() => downloadImage(selectedImage!, artist.name)}
                className="bg-pink-600 hover:bg-pink-700"
              >
                <DownloadIcon className="w-5 h-5 mr-2" /> Download
              </Button>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>

      {/* Songs List */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <ul className="space-y-3">
          {artist.songs.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between bg-[#111] p-3 rounded-lg hover:bg-white/10 cursor-pointer transition"
              onClick={() => navigate(`/player/${song.id}`)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={song.image ?? "https://via.placeholder.com/50"}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover shadow"
                />
                <div className="truncate">
                  <p className="font-semibold truncate">{song.title}</p>
                  <p className="text-sm text-white/60 truncate">{song.artist}</p>
                </div>
              </div>
              <span className="text-xs text-white/60">
                {song.duration ?? "0:00"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
