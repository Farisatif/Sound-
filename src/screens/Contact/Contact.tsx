import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import {
  ArrowLeftIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  SendIcon,
  FacebookIcon,
  TwitterIcon,
  X,
  InstagramIcon,
  YoutubeIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <MailIcon className="w-6 h-6" />,
      title: "Email Us",
      info: "support@soundblast.com",
      description: "Send us an email anytime"
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Call Us",
      info: "+967 778088098",
      description: "Yemen, Sana'a"
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: "Visit Us",
      info: "60 Street, Sana'a City",
      description: "Our headquarters"
    }
  ];

  const socialLinks = [
    { name: "Facebook", link: "https://www.facebook.com", icon: <FacebookIcon className="w-5 h-5" /> },
    { name: "Twitter", link: "https://x.com", icon: <X className="w-5 h-5" /> },
    { name: "Instagram", link: "https://www.instagram.com", icon: <InstagramIcon className="w-5 h-5" /> },
    { name: "YouTube", link: "https://www.youtube.com", icon: <YoutubeIcon className="w-5 h-5" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#ee0faf]/20 to-[#0d9eef]/20 py-12 sm:py-16">
        <div className="absolute inset-0 bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/1000-f-645546712-clv1sotwmf2k99veh5cvx7tvqc38k6hp-1.png)] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6 sm:mb-8"
          >
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="icon"
              className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10"
            >
              <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-white">Contact </span>
              <span className="text-[#ee0faf]">Us</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl"
          >
            Have questions, feedback, or need support? We'd love to hear from you!
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="bg-[#1e1e1e] border-none">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">
                  <span className="text-white">Send us a </span>
                  <span className="text-[#ee0faf]">Message</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-transparent border-[#d9d9d9] text-white placeholder:text-white/50"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white mb-2 block">
                      Message
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-3 py-2 bg-transparent border border-[#d9d9d9] rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#ee0faf]"
                      placeholder="Tell us more..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white py-3 text-base sm:text-lg font-medium flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                <span className="text-white">Get in </span>
                <span className="text-[#ee0faf]">Touch</span>
              </h2>
              <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base">
                Choose the best way to reach us. We're here to help and answer any questions you might have.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-colors duration-300">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="text-[#ee0faf] mt-1">{item.icon}</div>
                        <div>
                          <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">
                            {item.title}
                          </h3>
                          <p className="text-[#ee0faf] font-medium mb-1 text-sm sm:text-base">
                            {item.info}
                          </p>
                          <p className="text-white/70 text-xs sm:text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="bg-[#ee0faf] hover:bg-[#ee0faf]/80 text-white text-sm sm:text-base px-3 sm:px-4 flex items-center gap-2"
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
