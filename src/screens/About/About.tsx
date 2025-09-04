import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowLeftIcon, MusicIcon, UsersIcon, HeartIcon, StarIcon, Import } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const About: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <MusicIcon className="w-8 h-8" />, value: "50M+", label: "Songs" },
    { icon: <UsersIcon className="w-8 h-8" />, value: "10M+", label: "Users" },
    { icon: <HeartIcon className="w-8 h-8" />, value: "1B+", label: "Likes" },
    { icon: <StarIcon className="w-8 h-8" />, value: "4.8", label: "Rating" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#ee0faf]/20 to-[#0d9eef]/20 py-16">
        <div className="absolute inset-0 bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/1000-f-645546712-clv1sotwmf2k99veh5cvx7tvqc38k6hp-1.png)] bg-cover bg-center opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="icon"
              className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </Button>
            <h1 className="text-5xl font-bold">
              <span className="text-white">About </span>
              <span className="text-[#ee0faf]">SoundBlast</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/80 max-w-3xl"
          >
            Your ultimate destination for discovering, streaming, and enjoying music from around the world.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            >
              <Card className="bg-[#1e1e1e] border-none text-center">
                <CardContent className="p-6">
                  <div className="text-[#ee0faf] mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-white">Our </span>
              <span className="text-[#ee0faf]">Story</span>
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <span className="text-[#ee0faf] font-semibold">SoundBlast</span> was created with a simple mission: 
                to make music discovery and streaming accessible to everyone, everywhere.
              </p>
              <p>
                For over <span className="text-[#0d9eef] font-semibold">5 years</span>, we've been building 
                one of the world's most comprehensive music platforms, featuring millions of songs from 
                artists around the globe.
              </p>
              <p>
                Whether you're looking to discover new artists, create the perfect playlist, or simply 
                enjoy your favorite tracks, SoundBlast provides the tools and experience you need.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://c.animaapp.com/mecm5afmnFTEcQ/img/img.png"
              alt="Music Experience"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Why Choose </span>
            <span className="text-[#ee0faf]">SoundBlast?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Vast Music Library",
                description: "Access millions of songs from every genre and era",
                color: "text-[#ee0faf]"
              },
              {
                title: "Smart Discovery",
                description: "Find new music tailored to your taste with our AI recommendations",
                color: "text-[#0d9eef]"
              },
              {
                title: "Premium Experience",
                description: "Enjoy ad-free listening with our premium subscription plans",
                color: "text-[#ee0faf]"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-[#1e1e1e] border-none h-full">
                  <CardContent className="p-6">
                    <h3 className={`text-xl font-bold mb-3 ${feature.color}`}>
                      {feature.title}
                    </h3>
                    <p className="text-white/70">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
        </motion.div>

      </div>
      
    </motion.div>
  );
};
