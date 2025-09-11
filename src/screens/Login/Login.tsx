// Login.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  // تحقق عند كل تغيير — يمكنك تغييره إلى onBlur لو تفضل التأخير
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

    // منع الإرسال إذا كان هناك خطأ في الإيميل أو حقل فارغ
    if (!email) {
      setEmailError('Please enter your email.');
      return;
    }
    if (emailError) return;

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="mt-[3rem] min-h-screen bg-black flex justify-center items-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-[#21061b] border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white">
                Sound<span className="text-[#ee0faf]">Blast</span>
              </h1>
              <p className="text-white/70">Welcome back! Please sign in to your account.</p>
            </div>

            {error && <div className="text-red-400 text-sm text-center mb-3">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="text-center mt-1">
                <Link
                  to="/forgot-password"
                  className="text-[#ee0faf] hover:text-[#ee0faf]/80 text-sm font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !!emailError}
                className="w-full bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white py-3 text-lg font-medium"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <div className="text-center mt-2">
                <span className="text-white/70">Don't have an account? </span>
                <Link to="/signup" className="text-[#ee0faf] font-medium">Sign up</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
