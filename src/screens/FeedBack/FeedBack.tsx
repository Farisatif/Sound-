// src/pages/feedback/Feedback.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { CheckCircleIcon, SendIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Feedback: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // محاكاة API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSending(false);
    setIsSubmitted(true);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="bg-[#1a1a1a] border border-[#2a2a2a] shadow-2xl rounded-2xl">
          <CardContent className="p-8">
            {!isSubmitted ? (
              <>
                <h1 className="text-3xl font-bold text-white mb-2 text-center">
                  We value your <span className="text-[#ee0faf]">Feedback</span>
                </h1>
                <p className="text-white/70 text-center mb-6">
                  Share your thoughts to help us improve.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-transparent border-[#333] text-white placeholder:text-white/50"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-transparent border-[#333] text-white placeholder:text-white/50"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="bg-transparent border-[#333] text-white placeholder:text-white/50 min-h-[120px]"
                      placeholder="Write your feedback here..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white py-3 text-lg font-medium"
                  >
                    {isSending ? "Sending..." : "Send Feedback"}
                    <SendIcon className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Thank you!
                </h2>
                <p className="text-white/70">
                  Your feedback has been submitted successfully.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white px-6"
                >
                  Send Another
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
