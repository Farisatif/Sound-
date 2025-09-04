import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password. Password must be at least 6 characters.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-[40px] h-[38px] object-cover"
              alt="SoundBlast"
              src="https://c.animaapp.com/mecm5afmnFTEcQ/img/picsart-25-08-07-15-22-00-238--1--1.png"
            />
            <h1 className="text-xl font-bold">
              <span className="text-white">Sound</span>
              <span className="text-[#ee0faf]">Blast</span>
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/signup">
              <Button className="bg-[#ee0faf] hover:bg-[#ee0faf]/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="absolute w-[669px] h-[1174px] top-[200px] left-[300px] rotate-[90.24deg] blur-[125px] [background:conic-gradient(from_226deg_at_50%_50%,rgba(81,55,108,0.43)_6%,rgba(159,36,109,0.45)_42%,rgba(159,36,109,0.44)_44%,rgba(229,41,150,0.45)_58%,rgba(27,79,144,0.43)_75%,rgba(42,64,108,0.42)_87%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-[#21061b] border-0 shadow-2xl">
          <CardContent className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold mb-2">
                <span className="text-white">Sound</span>
                <span className="text-[#ee0faf]">Blast</span>
              </h1>
              <p className="text-white/70">Welcome back! Please sign in to your account.</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Label htmlFor="email" className="text-white mb-2 block">
                  Email
                </Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Label htmlFor="password" className="text-white mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-4"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white py-3 text-lg font-medium"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-center space-y-2">
                  <Link to="/forgot-password" className="block text-[#0d9eef] hover:text-[#0d9eef]/80 text-sm">
                    Forgot your password?
                  </Link>
                  <div>
                    <span className="text-white/70">Don't have an account? </span>
                    <Link to="/signup" className="text-[#ee0faf] hover:text-[#ee0faf]/80 font-medium">
                      Sign up
                    </Link>
                  </div>
                </div>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      </div>


    </div>
  );
};
