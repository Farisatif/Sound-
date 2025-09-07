
import { useParams } from "react-router-dom";
import { useArtists, useAlbums, usePlaylists } from "../../hooks/useData";
import { Card, CardContent } from "../../components/ui/card";

export const ArtistPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const { artists } = useArtists();
  const { albums } = useAlbums();
  const { playlists } = usePlaylists();

  const artist = artists.find((a) => a.id === parseInt(artistId ?? "", 10));
  if (!artist) return <div className="text-white p-6">Artist not found</div>;

  const artistAlbums = albums.filter((a) => a.artistId === artist.id);
  const artistPlaylists = playlists.moodPlaylists.filter((p) =>
    p.artistId === artist.id
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-40 h-40 rounded-full object-cover shadow-lg"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <span className="text-white/70">{artist.genre ?? ""}</span>
        </div>
      </div>

      {/* Albums */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Albums</h2>
        {artistAlbums.length === 0 ? (
          <p className="text-white/70">No albums found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {artistAlbums.map((album) => (
              <Card key={album.id} className="bg-[#1e1e1e] border-none">
                <CardContent className="p-2">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-36 rounded-lg object-cover mb-2"
                  />
                  <div className="text-white font-medium">{album.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Playlists */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Playlists</h2>
        {artistPlaylists.length === 0 ? (
          <p className="text-white/70">No playlists found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {artistPlaylists.map((pl) => (
              <Card key={pl.id} className="bg-[#1e1e1e] border-none">
                <CardContent className="p-2">
                  <img
                    src={pl.image}
                    alt={pl.title}
                    className="w-full h-36 rounded-lg object-cover mb-2"
                  />
                  <div className="text-white font-medium">{pl.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
