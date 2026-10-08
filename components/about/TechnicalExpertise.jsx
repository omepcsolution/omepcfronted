"use client";
import { motion } from 'motion/react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, Mail, Lightbulb } from 'lucide-react';
import { expertiseCards } from '@/data/aboutData';

const FacebookIcon = ({ size = 16, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const InstagramIcon = ({ size = 16, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const XIcon = ({ size = 16, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4l16 16M4 20L20 4" /></svg>
);

export default function TechnicalExpertise() {
    return (
        <section className="py-24 md:py-32 bg-emerald-50/40 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 text-[10px] font-bold text-emerald-800 tracking-widest uppercase mb-6 px-4 py-1.5 border border-emerald-200/80 rounded-full bg-emerald-100/30 backdrop-blur-sm shadow-sm"
                        >
                            <Lightbulb size={12} className="text-emerald-600" strokeWidth={2.5} /> OUR EXPERTISE
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight"
                        >
                            Our Technical Expertise
                        </motion.h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {expertiseCards.map((card, index) => (
                        <motion.div
                            key={card.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative w-full h-[400px] md:h-[450px] rounded-t-[1.5rem] bg-white overflow-hidden shadow-[0_5px_15px_rgba(4,120,87,0.04)] border border-emerald-100 flex flex-col cursor-pointer"
                        >
                            <div className="absolute inset-0 w-full h-full pb-[48px]">
                                {card.image ? (
                                    <Image
                                        src={card.image}
                                        alt={card.title || "Expertise"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : null}
                            </div>

                            <div className="flex-1 pointer-events-none"></div>

                            <div className="relative w-full h-[200px] group-hover:h-[210px] bg-emerald-50/80 backdrop-blur-sm group-hover:bg-emerald-800 rounded-t-[140px] group-hover:rounded-t-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-center p-6 text-center z-10 overflow-hidden">
                                <h4 className="text-[17px] font-bold text-emerald-950 group-hover:text-white transition-colors duration-300 z-20">
                                    {card.title}
                                </h4>

                                <p className="text-[12px] font-medium text-emerald-700 group-hover:text-emerald-200 transition-colors duration-300 mt-1 z-20">
                                    Core Solutions
                                </p>

                                <div className="absolute bottom-6 flex items-center justify-center gap-5 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 delay-75">
                                    <FacebookIcon size={15} className="hover:text-emerald-300 transition-colors" />
                                    <InstagramIcon size={15} className="hover:text-emerald-300 transition-colors" />
                                    <XIcon size={14} className="hover:text-emerald-300 transition-colors" />
                                </div>
                            </div>

                            <div className="relative h-[48px] w-full bg-white flex items-center justify-between px-5 z-20 shrink-0">
                                <div className="absolute top-0 left-4 right-4 h-[1px] bg-emerald-100"></div>
                                <div className="flex items-center gap-2 text-[12px] font-medium text-emerald-700">
                                    <Mail size={14} className="text-emerald-500" />
                                    omepcsolution@gmail.com
                                </div>
                                <ArrowRight size={14} className="text-emerald-400 group-hover:text-emerald-800 transition-colors duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 md:mt-16 text-center flex justify-center"
                >
                    <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-950 hover:text-emerald-700 transition-colors">
                        <Button>
                            Explore All Expertise
                        </Button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}