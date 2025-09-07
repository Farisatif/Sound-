
import { Card, CardContent } from "../../../../components/ui/card";
import { useArtists, useAlbums, usePlaylists } from "../../../../hooks/useData";

interface MediaCardProps {
  title: string;
  subtitle?: string;
  image: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ title, subtitle, image }) => (
  <Card className="bg-[#1e1e1e] border-none rounded-lg hover:scale-105 transition-transform duration-200">
    <CardContent className="p-2">
      <img className="w-full h-[150px] rounded-lg object-cover" src={image} alt={title} />
      <div className="mt-2 font-semibold text-white text-sm">{title}</div>
      {subtitle && <div className="text-white/70 text-xs">{subtitle}</div>}
    </CardContent>
  </Card>
);

const ViewAllCard: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div
    className="flex flex-col items-center justify-center cursor-pointer"
    onClick={onClick}
  >
    <img
      src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-170.svg"
      alt="View All"
      className="w-16 h-16"
    />
    <span className="text-white text-sm mt-1">View All</span>
  </div>
);

export const PopularArtistsSection: React.FC = () => {
  const { artists, loading: artistsLoading } = useArtists();
  const { albums, loading: albumsLoading } = useAlbums();
  const { playlists, loading: playlistsLoading } = usePlaylists();

  if (artistsLoading || albumsLoading || playlistsLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col space-y-16">
      {/* Popular Artists */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-white">Popular </span>
          <span className="text-[#ee0faf]">Artists</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {artists.map((artist) => (
            <MediaCard key={artist.id} title={artist.name} image={artist.image} />
          ))}
          <ViewAllCard />
        </div>
      </div>

      {/* Top Albums */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-white">Top </span>
          <span className="text-[#ee0faf]">Albums</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {albums.map((album) => (
            <MediaCard
              key={album.id}
              title={album.title}
              subtitle={album.artist}
              image={album.image}
            />
          ))}
          <ViewAllCard />
        </div>
      </div>

      {/* Mood Playlists */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-white">Mood </span>
          <span className="text-[#ee0faf]">Playlists</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {playlists.moodPlaylists.map((playlist) => (
            <MediaCard key={playlist.id} title={playlist.title} image={playlist.image} />
          ))}
          <ViewAllCard />
        </div>
      </div>
    </section>
  );
};
