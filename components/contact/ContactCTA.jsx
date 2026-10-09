"use client";
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { contactPageImages } from '@/data/images';
import Button from '@/components/ui/DarkBtn';

export default function ContactCTA() {
    return (
        <section className="relative py-24 md:py-32 bg-emerald-50 px-4 md:px-8">
            
            {/* The Floating Container */}
            <div className="relative w-full max-w-[1400px] mx-auto min-h-[500px] md:min-h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-center items-center bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900">
                
                {/* Background Layers inside the Floating Container */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Background Image */}
                        <Image 
                            src={contactPageImages.cta} 
                            alt="Technology Support" 
                            fill 
                            className="object-cover opacity-30 mix-blend-overlay" 
                        />
                    </motion.div>
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply" />

                    {/* Subtle White Grid Pattern (Matches the blueprint aesthetic) */}
                    <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Eyebrow Label */}
                        <div className="inline-flex items-center gap-4 text-xs md:text-sm font-bold text-emerald-300 tracking-[0.2em] uppercase mb-8">
                            <span className="w-10 h-[2px] bg-emerald-400/50"></span> 
                            NEED TECHNICAL SUPPORT 
                            <span className="w-10 h-[2px] bg-emerald-400/50"></span>
                        </div>
                        
                        {/* Main Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white mb-6 tracking-tight leading-[1.1]">
                            Let's Build a Better Technology Setup
                        </h2>
                        
                        {/* Sub-heading */}
                        <p className="text-emerald-100/90 text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                            From computers and UPS to CCTV, networking and ongoing maintenance, OM EPC Solution is here to help.
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
                    >
                        <Link href="/contact">
                        <Button>
                            Get a Free Quote
                        </Button>
                        </Link>
                        <Link href="https://wa.me/917981413743">
                        <Button>
                            WhatsApp Us
                        </Button>
                        </Link>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}