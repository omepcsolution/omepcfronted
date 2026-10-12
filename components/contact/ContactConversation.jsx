"use client";
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import Image from 'next/image';
import { contactData } from '@/data/contactData';
import { productsList } from '@/data/productsData';
import { resolveProductNameBySlug, getAdminApiUrl } from '@/lib/adminApi';
import { MapPin, Phone, Mail, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import Button from '@/components/ui/Button';

// Custom Social SVGs
const XIcon = ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>;
const FacebookIcon = ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const InstagramIcon = ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const YouTubeIcon = ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>;

function resolveLocalProductName(slugOrName) {
    if (!slugOrName) return null;
    const q = String(slugOrName).toLowerCase();
    const found = productsList.find(
        (p) => p.slug === slugOrName || p.id === slugOrName ||
            p.name?.toLowerCase() === q
    );
    return found?.name ?? null;
}

function ContactForm() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [status, setStatus] = useState({ loading: false, error: '' });

    // Prefill subject from `?product=<slug>`: resolve slug -> name via Admin API.
    // If ?product missing or slug not found, leave subject empty.
    // Existing Full Name / Email / Phone / Message + submit logic unchanged.
    useEffect(() => {
        const slug = searchParams.get('product');
        const service = searchParams.get('service');

        if (service && !slug) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time query-param prefill
            setFormData(prev => (prev.subject ? prev : { ...prev, subject: `Enquiry about Service: ${service}` }));
            return;
        }
        if (!slug) return;

        let cancelled = false;
        (async () => {
            let name = null;
            // 1) Admin backend as source of truth (detail API, then list search)
            if (getAdminApiUrl()) {
                name = await resolveProductNameBySlug(slug);
            }
            // 2) Local catalogue fallback (covers offline + legacy ?product=<name> links)
            if (!name) {
                name = resolveLocalProductName(slug);
                // Legacy links passed the raw product name — accept it if it matches,
                // otherwise per spec leave subject empty (don't blindly echo the slug).
                if (!name) return;
            }
            if (!cancelled) {
                setFormData(prev => (prev.subject ? prev : { ...prev, subject: `Enquiry about Product: ${name}` }));
            }
        })();
        return () => { cancelled = true; };
    }, [searchParams]);

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = "Valid phone number is required";
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setStatus({ loading: true, error: '' });

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (res.ok) {
                    setStatus({ loading: false, error: '' });
                    setIsSubmitted(true);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

                    setTimeout(() => setIsSubmitted(false), 5000);
                } else {
                    setStatus({ loading: false, error: 'Something went wrong. Please try again.' });
                }
            } catch (error) {
                setStatus({ loading: false, error: 'Network error. Please check your connection.' });
            }
        }
    };

    return (
        <section id="contact-form" className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1.2fr_500px] gap-10 lg:gap-16 xl:gap-20 items-start relative z-10">

                {/* LEFT COLUMN: Text + Form */}
                <div className="flex flex-col">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-2 border border-emerald-200 bg-emerald-100 rounded-full px-4 py-1.5 text-[10px] md:text-xs font-bold text-emerald-900 tracking-widest uppercase mb-4 md:mb-6 shadow-sm">
                            <Send size={12} className="text-emerald-700" /> GET IN TOUCH
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-4 md:mb-6 tracking-tight">
                            Start Your Conversation
                        </h2>
                        <p className="text-emerald-100 text-sm sm:text-base md:text-lg mb-8 md:mb-12 max-w-xl leading-relaxed">
                            Have a question, need technical support, or looking for the right technology solution? Tell us what you need and our team will get back to you.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
                    >
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center text-center h-full min-h-[350px] py-12">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 md:mb-6">
                                    <CheckCircle2 size={40} className="w-8 h-8 md:w-10 md:h-10" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-emerald-950 mb-2">Message Sent!</h3>
                                <p className="text-sm md:text-base text-emerald-700/70">Thank you! Your message has been received. Our team will contact you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                                    <div>
                                        <input type="text" placeholder="Full Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={`w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-emerald-50/50 border ${errors.name ? 'border-red-300' : 'border-emerald-100'} rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors`} />
                                        {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Email Address *" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={`w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-emerald-50/50 border ${errors.email ? 'border-red-300' : 'border-emerald-100'} rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors`} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                                    <div>
                                        <input type="text" placeholder="Phone Number *" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={`w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-emerald-50/50 border ${errors.phone ? 'border-red-300' : 'border-emerald-100'} rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors`} />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone}</p>}
                                    </div>
                                    <input type="text" placeholder="Subject (Optional)" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-emerald-50/50 border border-emerald-100 rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
                                </div>

                                <div>
                                    <textarea rows={4} placeholder="Your Message *" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={`w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-emerald-50/50 border ${errors.message ? 'border-red-300' : 'border-emerald-100'} rounded-xl text-sm font-medium text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none min-h-[120px] md:min-h-[140px]`}></textarea>
                                    {errors.message && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.message}</p>}
                                </div>

                                {/* API Error Message Display */}
                                {status.error && (
                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-bold border border-red-100 mt-2">
                                        <AlertCircle size={18} /> {status.error}
                                    </div>
                                )}

                                <div className="mt-2 md:mt-4">
                                    <Button
                                        type="submit"
                                        disabled={status.loading}
                                        className={`w-full sm:w-auto ${status.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {status.loading ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Contact Info + Tech Visual */}
                <div className="flex flex-col h-full lg:pt-4">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col gap-6 md:gap-8 mb-10 md:mb-12"
                    >
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-800/50 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-emerald-300 uppercase tracking-widest mb-1">Main Office</p>
                                <p className="text-sm sm:text-base font-bold text-white leading-snug">{contactData.locations[0].address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-800/50 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                                <Phone className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-emerald-300 uppercase tracking-widest mb-1">Call Us</p>
                                <p className="text-sm sm:text-base font-bold text-white leading-snug">{contactData.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-800/50 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                                <Mail className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-emerald-300 uppercase tracking-widest mb-1">Email Us</p>
                                <p className="text-sm sm:text-base font-bold text-white break-all leading-snug">{contactData.email}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-3 sm:gap-4 mb-10 lg:mb-16"
                    >
                        <Link href={contactData.social.twitter || '#'} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-400/30 flex items-center justify-center text-white hover:bg-white hover:text-emerald-800 transition-colors"><XIcon size={14} /></Link>
                        <Link href={contactData.social.facebook || '#'} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-400/30 flex items-center justify-center text-white hover:bg-white hover:text-emerald-800 transition-colors"><FacebookIcon size={16} /></Link>
                        <Link href={contactData.social.instagram || '#'} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-400/30 flex items-center justify-center text-white hover:bg-white hover:text-emerald-800 transition-colors"><InstagramIcon size={16} /></Link>
                        <Link href={contactData.social.youtube || '#'} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-400/30 flex items-center justify-center text-white hover:bg-white hover:text-emerald-800 transition-colors"><YouTubeIcon size={16} /></Link>
                    </motion.div>

                    {/* Decorative Floating Tech Visual - Hidden on extra small, shown as banner on mobile/tablet, full height on Desktop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative w-full h-[200px] sm:h-[250px] lg:flex-1 min-h-[250px] lg:min-h-[300px] rounded-[1.5rem] md:rounded-[2.5rem] bg-emerald-800/50 overflow-hidden border border-emerald-500/20 shadow-2xl lg:animate-[floating_6s_ease-in-out_infinite] hidden md:block"
                    >
                        <Image src="/service/service-hero.webp" alt="IT Infrastructure" fill className="object-cover opacity-80" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function ContactConversation() {
    return (
        <Suspense fallback={null}>
            <ContactForm />
        </Suspense>
    );
}