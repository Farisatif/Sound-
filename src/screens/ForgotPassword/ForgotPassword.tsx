import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowLeftIcon, MailIcon, CheckCircleIcon } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
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
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-[#ee0faf]">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#ee0faf] hover:bg-[#ee0faf]/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10 mb-4"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {!isSubmitted ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-3xl font-bold mb-2 text-white">
                    Forgot Password?
                  </h1>
                  <p className="text-white/70">
                    No worries! Enter your email and we'll send you a reset link.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email Address
                    </Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </motion.div>

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
                      {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>

                    <div className="text-center">
                      <span className="text-white/70">Remember your password? </span>
                      <Link to="/login" className="text-[#ee0faf] hover:text-[#ee0faf]/80 font-medium">
                        Sign in
                      </Link>
                    </div>
                  </motion.div>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
                <p className="text-white/70 mb-6">
                  We've sent a password reset link to <strong className="text-[#ee0faf]">{email}</strong>
                </p>
                <p className="text-white/60 text-sm mb-8">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full border-[#ee0faf] text-[#ee0faf] hover:bg-[#ee0faf]/10"
                  >
                    Try Again
                  </Button>
                  <Link to="/login" className="block">
                    <Button
                      variant="ghost"
                      className="w-full text-white hover:text-[#ee0faf]"
                    >
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      

    </div>
  
    
  );
};
