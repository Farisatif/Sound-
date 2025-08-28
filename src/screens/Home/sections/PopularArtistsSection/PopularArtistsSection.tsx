import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../../components/ui/card";
import { useArtists, useAlbums, usePlaylists } from "../../../../hooks/useData";

export const PopularArtistsSection = (): JSX.Element => {
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
    <section className="w-full space-y-[18px] relative">
      <div className="flex flex-col items-start gap-[18px]">
        <div className="flex items-center gap-2.5 p-2.5 w-full">
          <h2 className="font-h1 font-[number:var(--h1-font-weight)] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
            <span className="text-white">Popular </span>
            <span className="text-[#ee0faf]">Artists</span>
          </h2>
        </div>

        <div className="flex items-center gap-6 w-full">
          <div className="flex items-center gap-9 flex-1">
            {artists.map((artist, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-[23px] flex-1"
              >
                <img
                  className="w-full h-[130px] rounded-[200px] object-cover"
                  alt={artist.name}
                  src={artist.image}
                />
                <div className="font-[number:var(--text-medium-font-weight)] text-[length:var(--text-medium-font-size)] text-center font-text-medium text-white tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
                  {artist.name}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col max-w-[62px] items-center gap-1 flex-1">
            <img
              className="w-full h-[62px]"
              alt="View All"
              src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-170.svg"
            />
            <div className="font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
              View All
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start mt-[266px]">
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex flex-wrap items-center gap-[10px_10px] p-2.5 w-full">
            <h2 className="font-h1 font-[number:var(--h1-font-weight)] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
              <span className="text-white">Top </span>
              <span className="text-[#ee0faf]">Albums</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-[24px_24px] px-1 py-0 w-full">
            <div className="flex items-center gap-6 flex-1">
              {albums.map((album, index) => (
                <Card key={index} className="flex-1 bg-[#1e1e1e] border-none">
                  <CardContent className="p-2">
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2.5 w-full">
                        <img
                          className="flex-1 h-[150px] rounded-lg object-cover"
                          alt={album.title}
                          src={album.image}
                        />
                      </div>
                      <div className="flex-col w-[150px] h-12 items-start flex gap-1">
                        <div className="font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                          {album.title}
                        </div>
                        <div className="opacity-80 font-[number:var(--text-small-font-weight)] text-[length:var(--text-small-font-size)] font-text-small text-white tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
                          {album.artist}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap max-w-[62px] items-start justify-center gap-[4px_4px] flex-1">
              <img
                className="flex-1 h-[62px]"
                alt="View All"
                src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-170.svg"
              />
              <div className="font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                View All
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start mt-[647px]">
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex flex-wrap items-center gap-[10px_10px] p-2.5 w-full">
            <h2 className="font-h1 font-[number:var(--h1-font-weight)] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
              <span className="text-white">Mood </span>
              <span className="text-[#ee0faf]">Playlist</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-[24px_24px] px-1 py-0 w-full">
            <div className="flex items-center gap-6 flex-1">
              {playlists.moodPlaylists.map((playlist, index) => (
                <Card key={index} className="flex-1 bg-[#1e1e1e] border-none">
                  <CardContent className="pt-0 pb-2 px-0">
                    <div className="flex flex-col items-start gap-3">
                      <div className="flex items-center gap-2.5 w-full">
                        <img
                          className="flex-1 h-[150px] rounded-lg object-cover"
                          alt={playlist.title}
                          src={playlist.image}
                        />
                      </div>
                      <div className="flex items-center gap-2.5 pl-1 pr-0 py-0 w-full">
                        <div className="font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                          {playlist.title}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap max-w-[62px] items-start justify-center gap-[4px_4px] flex-1">
              <img
                className="flex-1 h-[62px]"
                alt="View All"
                src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-170.svg"
              />
              <div className="font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                View All
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
