import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { PlayIcon, PlusIcon } from "lucide-react";

const LS_KEY = "playlists";

export const ArtistPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const artist = location.state as {
    id: number;
    name: string;
    image: string;
    genre?: string;
    songs: any[];
  };

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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={artist.image ?? "https://via.placeholder.com/100"}
          alt={artist.name}
          className="w-24 h-24 rounded-full object-cover shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <p className="text-white/70">
            {artist.genre ?? "Unknown genre"} • {artist.songs.length} songs
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              onClick={() => navigate(`/player/${artist.songs[0].id}`)}
              className="bg-pink-600 hover:bg-pink-700"
            >
              <PlayIcon className="w-4 h-4 mr-2" /> Play All
            </Button>
            <Button
              onClick={addToPlaylist}
              variant="outline"
              className="text-white border-white/30 hover:border-pink-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Add to Playlist
            </Button>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <ul className="space-y-3">
        {artist.songs.map((song) => (
          <li
            key={song.id}
            className="flex items-center justify-between bg-[#111] p-3 rounded-lg hover:bg-white/10 cursor-pointer"
            onClick={() => navigate(`/player/${song.id}`)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={song.image ?? "https://via.placeholder.com/50"}
                alt={song.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="truncate">
                <p className="font-semibold truncate">{song.title}</p>
                <p className="text-sm text-white/70 truncate">{song.artist}</p>
              </div>
            </div>
            <span className="text-xs">{song.duration ?? "0:00"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
