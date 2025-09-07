
import { useArtists } from "../../hooks/useData";
import { useNavigate } from "react-router-dom";

export const ArtistsPage: React.FC = () => {
  const { artists, loading } = useArtists();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-white">Loading...</div>
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
            className="cursor-pointer flex flex-col items-center gap-3"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg"
            />
            <span className="text-center text-white font-medium">{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
