// ForgotPassword.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { MailIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    // validation
    if (!email.trim()) {
      setEmailError('Please enter your email.');
      return;
    }
    if (emailError) return;

    setIsLoading(true);

    // محاكاة إرسال (مثال)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <Card className="bg-[#21061b] border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <Link to="/login">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10">
                  <ArrowLeftIcon className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2 text-white">Forgot Password?</h1>
                  <p className="text-white/70">Enter your email and we'll send you a reset link.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => handleEmailChange(e.target.value)}
                        onBlur={e => handleEmailChange(e.target.value)}
                        className={`pl-10 bg-transparent text-white placeholder:text-white/50 ${emailError ? 'border-red-500' : 'border-[#d9d9d9]'}`}
                        placeholder="Enter your email"
                        aria-invalid={emailError ? 'true' : 'false'}
                        aria-describedby={emailError ? 'forgot-email-error' : undefined}
                        required
                      />
                    </div>
                    {emailError && (
                      <p id="forgot-email-error" className="mt-2 text-sm text-red-500">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !!emailError}
                    className="w-full bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white py-3 text-lg font-medium"
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
                <p className="text-white/70 mb-6">We've sent a password reset link to <strong className="text-[#ee0faf]">{email}</strong></p>
                <Link to="/login">
                  <Button variant="ghost" className="w-full text-white hover:text-[#ee0faf]">Back to Sign In</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
