import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { PlayIcon, HeartIcon, UserPlusIcon, CheckIcon } from 'lucide-react';
import { useArtists } from '../../hooks/useData';

export const Artists: React.FC = () => {
  const { artists, loading } = useArtists();
  const [followedArtists, setFollowedArtists] = React.useState<Set<number>>(new Set());

  const toggleFollow = (artistId: number) => {
    const newFollowed = new Set(followedArtists);
    if (newFollowed.has(artistId)) {
      newFollowed.delete(artistId);
    } else {
      newFollowed.add(artistId);
    }
    setFollowedArtists(newFollowed);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Popular </span>
            <span className="text-[#ee0faf]">Artists</span>
          </h1>
          <p className="text-white/70 text-lg">Discover your favorite artists</p>
        </motion.div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-32 h-32 mx-auto rounded-full object-cover"
                    />
                    {artist.verified && (
                      <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-[#ee0faf] rounded-full p-1">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                      <Button
                        size="icon"
                        className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 w-12 h-12"
                      >
                        <PlayIcon className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                    <p className="text-[#ee0faf] font-medium">{artist.genre}</p>
                    
                    <div className="space-y-2 text-white/70 text-sm">
                      <p>{(artist.followers / 1000000).toFixed(1)}M followers</p>
                      <p>{(artist.monthlyListeners / 1000000).toFixed(1)}M monthly listeners</p>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="text-white font-medium mb-2">Top Songs:</h4>
                      <div className="space-y-1">
                        {artist.topSongs.slice(0, 3).map((song, songIndex) => (
                          <p key={songIndex} className="text-white/60 text-sm">
                            {songIndex + 1}. {song}
                          </p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 pt-6">
                      <Button
                        onClick={() => toggleFollow(artist.id)}
                        className={`flex items-center gap-2 px-6 ${
                          followedArtists.has(artist.id)
                            ? 'bg-[#0d9eef] hover:bg-[#0d9eef]/90'
                            : 'bg-[#ee0faf] hover:bg-[#ee0faf]/90'
                        }`}
                      >
                        {followedArtists.has(artist.id) ? (
                          <>
                            <CheckIcon className="w-4 h-4" />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="w-4 h-4" />
                            Follow
                          </>
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white/70 hover:text-[#ee0faf]"
                      >
                        <HeartIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="border-[#ee0faf] text-[#ee0faf] hover:bg-[#ee0faf]/10 px-8 py-3"
          >
            Load More Artists
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
