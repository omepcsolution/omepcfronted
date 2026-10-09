"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { images } from '@/data/images';

// Custom Social Icons
const Facebook = ({ size = 20, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Twitter = ({ size = 20, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Instagram = ({ size = 20, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const Linkedin = ({ size = 20, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); 
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000); 
      } else {
        setStatus({ loading: false, success: false, error: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Network error. Please check your connection.' });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-emerald-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Inner Light Container */}
        <div className="relative bg-emerald-50 text-emerald-950 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden shadow-2xl border border-emerald-200">

          {/* Background Flare */}
          <div className="absolute top-0 right-[20%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none z-0"></div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-12"
            >
              <div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-white tracking-widest uppercase mb-4 md:mb-6 px-3 py-1.5 border border-emerald-400 rounded-full bg-emerald-800/50">
                <Mail size={12} className="text-emerald-300" /> GET IN TOUCH
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-950 mb-3 md:mb-4 tracking-tight">
                Start Your Conversation
              </h2>

              <p className="text-emerald-900/70 text-sm sm:text-base md:text-lg max-w-xl">
                Reach us anytime, let's architect your resilient IT infrastructure together.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-12 lg:gap-20 items-start">

              {/* Form Section */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-emerald-100/50 border border-emerald-900/10 rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-8 shadow-sm relative"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-white border border-emerald-200 rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-white border border-emerald-200 rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone"
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-white border border-emerald-200 rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject"
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-white border border-emerald-200 rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div className="mb-6 md:mb-8">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Your message"
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-white border border-emerald-200 rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Status Messages */}
                {status.success && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 md:mb-6 flex items-center gap-2 text-emerald-700 bg-emerald-100 p-3 rounded-lg text-sm font-bold">
                    <CheckCircle2 size={18} /> Message sent successfully!
                  </motion.div>
                )}
                {status.error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 md:mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-bold border border-red-100">
                    <AlertCircle size={18} /> {status.error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  variant="premium"
                  className={`w-full sm:w-auto ${status.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={status.loading}
                >
                  {status.loading ? 'Sending...' : 'Submit'}
                </Button>
              </motion.form>

              {/* Contact Info Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-8 md:gap-10 lg:pt-4"
              >
                <div className="flex gap-4">
                  <div className="mt-1 text-emerald-700"><MapPin size={24} className="w-5 h-5 md:w-6 md:h-6" /></div>
                  <div>
                    <p className="text-xs md:text-sm text-emerald-900/60 font-medium mb-1">Just Visit Us:</p>
                    <p className="text-sm sm:text-base font-bold text-emerald-950">Amrita, 10/8/1, Amritya Pyne Ln, Kali Babur Bazar, Naora, Shibpur, Howrah, West Bengal 711101</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 text-emerald-700"><Phone size={24} className="w-5 h-5 md:w-6 md:h-6" /></div>
                  <div>
                    <p className="text-xs md:text-sm text-emerald-900/60 font-medium mb-1">Need help? Call Us:</p>
                    <p className="text-sm sm:text-base font-bold text-emerald-950">+91 79814 13743</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 text-emerald-700"><Mail size={24} className="w-5 h-5 md:w-6 md:h-6" /></div>
                  <div>
                    <p className="text-xs md:text-sm text-emerald-900/60 font-medium mb-1">Just Mail Us:</p>
                    <p className="text-sm sm:text-base font-bold text-emerald-950 break-all">omepcsolution@gmail.com</p>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-5 md:gap-6 mt-2 md:mt-4">
                  <a href="#" className="text-emerald-800/40 hover:text-emerald-700 transition-colors"><Twitter size={20} className="w-5 h-5" /></a>
                  <a href="#" className="text-emerald-800/40 hover:text-emerald-700 transition-colors"><Facebook size={20} className="w-5 h-5" /></a>
                  <a href="#" className="text-emerald-800/40 hover:text-emerald-700 transition-colors"><Instagram size={20} className="w-5 h-5" /></a>
                  <a href="#" className="text-emerald-800/40 hover:text-emerald-700 transition-colors"><Linkedin size={20} className="w-5 h-5" /></a>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Decorative Image */}
          <div className="hidden lg:block absolute -bottom-10 -right-10 w-96 h-96 opacity-10 pointer-events-none z-0">
            <Image src="/service/service-hero.webp" alt="Decoration" fill className="object-cover rounded-full mix-blend-overlay" />
          </div>

        </div>
      </div>
    </section>
  );
}