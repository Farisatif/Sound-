import { useNavigate } from "react-router-dom";
import songsData from "../../data/songs.json"; // ملف الداتا اللي عطيتني إياه

// نبني قائمة الفنانين من الداتا
const buildArtists = () => {
  const map = new Map<
    string,
    { id: number; name: string; image: string; genre?: string; songs: any[] }
  >();

  let idCounter = 1;
  const allSongs = [
    ...songsData.weeklyTopSongs,
    ...songsData.newReleaseSongs,
    ...songsData.trendingSongs,
  ];

  allSongs.forEach((song) => {
    if (!map.has(song.artist)) {
      map.set(song.artist, {
        id: idCounter++,
        name: song.artist,
        image: song.image,
        genre: song.genre,
        songs: [song],
      });
    } else {
      map.get(song.artist)!.songs.push(song);
    }
  });

  return Array.from(map.values());
};

export const ArtistsPage: React.FC = () => {
  const navigate = useNavigate();
  const artists = buildArtists();

  if (!artists.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">😔 No artists available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Artists</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="cursor-pointer flex flex-col items-center gap-3 hover:scale-105 transition-transform"
            onClick={() => navigate(`/artist/${artist.id}`, { state: artist })}
          >
            <img
              src={artist.image ?? "https://via.placeholder.com/150"}
              alt={artist.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg"
            />
            <span className="text-center text-white font-medium">
              {artist.name}
            </span>
            <span className="text-xs text-white/60">
              {artist.songs.length} songs
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
