"use client";
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { servicePageImages } from '@/data/images';
import { Phone, Mail } from 'lucide-react';
import DarkBtn  from '../ui/DarkBtn';

const WhatsAppIcon = ({ size = 18, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
);

export default function ServicesCTA() {
    const contactChannels = [
        { label: "Call Us", icon: Phone, href: "tel:+917981413743" },
        { label: "WhatsApp", icon: WhatsAppIcon, href: "https://wa.me/917981413743" },
        { label: "Email", icon: Mail, href: "mailto:omepcsolution@gmail.com" }
    ];

    return (
        <section className="relative py-16 md:py-24 lg:py-32 bg-emerald-50 px-4 sm:px-6 md:px-8">
            {/* FIXED: Changed p-6 to px-6 py-10 to add more vertical padding (breathing room) on mobile */}
            <div className='relative w-full max-w-[1400px] mx-auto min-h-[450px] md:min-h-[550px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-center items-center bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 px-6 py-10 md:p-12'>
                
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {servicePageImages?.cta && (
                            <Image src={servicePageImages.cta} alt="Technical Support" fill className="object-cover opacity-15 mix-blend-overlay" />
                        )}
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-emerald-800/60" />
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-emerald-200 tracking-widest uppercase mb-4 md:mb-6 w-full">
                            <span className="w-6 md:w-8 h-px bg-emerald-400/50"></span> 
                            LET'S WORK TOGETHER 
                            <span className="w-6 md:w-8 h-px bg-emerald-400/50"></span>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">
                            Need Reliable Technology Support?
                        </h2>
                        
                        <p className="text-emerald-50/90 text-sm sm:text-base md:text-xl mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto">
                            Tell us what your business needs and our team will help you find the right solution.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-14 w-full max-w-xs mx-auto sm:max-w-none"
                    >
                        <Link 
                            href="/contact#contact-form" 
                            prefetch={false}
                            
                        >
                            <DarkBtn>Get a Free Quote</DarkBtn>
                        </Link>
                        
                        <Link 
                            href="/contact" 
                            prefetch={false}
                           
                        >
                            <DarkBtn>Contact Us</DarkBtn>
                        </Link>
                    </motion.div>

                    {/* Contact Icons Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        // FIXED: Added pb-2 for just a little extra breathing room if needed
                        className="flex flex-wrap items-center justify-center gap-3 md:gap-5 pb-2 md:pb-0"
                    >
                        {contactChannels.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs md:text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-sm"
                            >
                                <item.icon size={16} className="text-emerald-200 md:w-4 md:h-4 w-3.5 h-3.5 shrink-0" />
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}