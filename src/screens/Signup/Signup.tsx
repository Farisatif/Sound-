// Signup.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signup, isLoading } = useAuth();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const trimmed = value.trim();
    if (trimmed.length > 0 && /^[0-9]/.test(trimmed)) {
      setEmailError('Number cannot be the first character in the email.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setEmailError('Please enter your email.');
      return;
    }
    if (emailError) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await signup(name, email, password);

    if (result === 'success') {
      setSuccess('Account created successfully! You can now login.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else if (result === 'exists') {
      setError('Email already exists. Please login.');
    } else {
      setError('Failed to create account. Please check your information.');
    }
  };

  return (
    <div className="mt-[3rem] min-h-screen bg-black flex justify-center items-center p-4 relative">
      {/* Background Blur */}
      <div
        className="absolute inset-0 blur-[125px]
        [background:conic-gradient(from_226deg_at_50%_50%,rgba(81,55,108,0.43)_6%,rgba(159,36,109,0.45)_42%,rgba(159,36,109,0.44)_44%,rgba(229,41,150,0.45)_58%,rgba(27,79,144,0.43)_75%,rgba(42,64,108,0.42)_87%)]
        pointer-events-none -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <Card className="bg-[#21061b] border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white">
                Sound<span className="text-[#ee0faf]">Blast</span>
              </h1>
              <p className="text-white/70">Create your account to get started.</p>
            </div>

            {error && <div className="text-red-400 text-sm text-center mb-3">{error}</div>}
            {success && <div className="text-green-400 text-sm text-center mb-3">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="pl-10 bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => handleEmailChange(e.target.value)}
                    onBlur={e => handleEmailChange(e.target.value)}
                    className={`pl-10 bg-transparent text-white placeholder:text-white/50 ${emailError ? 'border-red-500' : 'border-[#d9d9d9]'}`}
                    aria-invalid={emailError ? 'true' : 'false'}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    required
                  />
                </div>
                {emailError && (
                  <p id="email-error" className="mt-2 text-sm text-red-500">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-white mb-2 block">Password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
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
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-white mb-2 block">Confirm Password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !!emailError}
                className="w-full bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white py-3 text-lg font-medium"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center mt-2">
                <span className="text-white/70">Already have an account? </span>
                <Link to="/login" className="text-[#ee0faf] font-medium">Sign in</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
