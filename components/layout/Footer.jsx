"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';
import DarkBtn from '@/components/ui/DarkBtn';

// Custom Social SVGs
const FacebookIcon = ({ size = 18, strokeWidth = 2.5, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const TwitterIcon = ({ size = 18, strokeWidth = 2.5, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>;
const InstagramIcon = ({ size = 18, strokeWidth = 2.5, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const LinkedinIcon = ({ size = 18, strokeWidth = 2.5, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on login page
  if (pathname === '/login') return null;

  // FIXED: Advanced Scroll Handler
  // Check if target path is the same as current pathname
  const handleLinkClick = (e, targetPath) => {
    if (pathname === targetPath) {
      e.preventDefault(); // Next.js এর ডিফল্ট বিহেভিয়ার বন্ধ করে দিলাম
      window.scrollTo({ top: 0, behavior: 'smooth' }); // সরাসরি উপরে স্ক্রল করবে
    }
  };

  return (
    <footer className="w-full bg-emerald-50 pt-8 md:pt-12 px-4 md:px-6">
      <div className="bg-emerald-950 rounded-t-[2.5rem] md:rounded-t-[80px] pt-12 md:pt-20 pb-6 md:pb-8 mx-auto max-w-[1400px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            
            {/* COLUMN 1: Company Info */}
            <div className="md:col-span-8 lg:col-span-8 lg:pr-12">
              <Link href="/" onClick={(e) => handleLinkClick(e, '/')} className="inline-block mb-4 md:mb-6">
                <Image 
                  src="/light_logo.webp" 
                  alt="OM EPC Solution" 
                  width={200} 
                  height={90} 
                  className="w-auto h-12 md:h-15 object-contain" 
                />
              </Link>
              <p className="text-emerald-100/70 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-md">
                Your trusted partner for comprehensive IT infrastructure, networking, power backup, and security solutions.
              </p>

              <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base text-emerald-50 mb-8 md:mb-10">
                <a href="tel:+917981413743" className="flex items-center gap-3 md:gap-4 hover:text-emerald-300 transition-colors group w-fit">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-800/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-700 transition-colors shrink-0">
                    <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  +91 79814 13743
                </a>
                <a href="mailto:omepcsolution@gmail.com" className="flex items-center gap-3 md:gap-4 hover:text-emerald-300 transition-colors group w-fit">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-800/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-700 transition-colors shrink-0">
                    <Mail size={16} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  omepcsolution@gmail.com
                </a>
                
                <div className="flex items-start gap-3 md:gap-4 group w-fit">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-800/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 md:mt-1">
                    <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <span className="leading-relaxed pt-1 sm:pt-1.5 text-sm md:text-base">
                    Amrita, 10/8/1, Amritya Pyne Ln, Kali Babur Bazar, Naora, Shibpur, Howrah, West Bengal 711101
                  </span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Facebook" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-800 flex items-center justify-center text-emerald-400/80 hover:text-emerald-100 hover:border-emerald-500 hover:bg-emerald-800/50 transition-all">
                  <FacebookIcon size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />
                </a>
                <a href="#" aria-label="Twitter" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-800 flex items-center justify-center text-emerald-400/80 hover:text-emerald-100 hover:border-emerald-500 hover:bg-emerald-800/50 transition-all">
                  <TwitterIcon size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-800 flex items-center justify-center text-emerald-400/80 hover:text-emerald-100 hover:border-emerald-500 hover:bg-emerald-800/50 transition-all">
                  <InstagramIcon size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-800 flex items-center justify-center text-emerald-400/80 hover:text-emerald-100 hover:border-emerald-500 hover:bg-emerald-800/50 transition-all">
                  <LinkedinIcon size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />
                </a>
              </div>
            </div>

            {/* COLUMN 2: Quick Links */}
            <div className="md:col-span-4 lg:col-span-4">
              <h4 className="text-lg md:text-xl font-bold mb-5 md:mb-8 text-emerald-50 tracking-tight">Quick Links</h4>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-3 gap-x-4 text-sm md:text-base text-emerald-200/80">
                <li>
                  <Link href="/" onClick={(e) => handleLinkClick(e, '/')} className="hover:text-emerald-50 transition-colors flex items-center gap-2.5 group w-fit">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-emerald-50 transition-colors flex items-center gap-2.5 group w-fit">
                     About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => handleLinkClick(e, '/services')} className="hover:text-emerald-50 transition-colors flex items-center gap-2.5 group w-fit">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/products" onClick={(e) => handleLinkClick(e, '/products')} className="hover:text-emerald-50 transition-colors flex items-center gap-2.5 group w-fit">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-emerald-50 transition-colors flex items-center gap-2.5 group w-fit">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/login" onClick={(e) => handleLinkClick(e, '/login')} className="hover:text-emerald-50 transition-colors flex items-center gap-2.5 group w-fit">
                     Login
                  </Link>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Compact CTA Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-6 py-6 md:py-10 mt-10 md:mt-12 border-t border-emerald-800/50">
            <div>
              <h4 className="text-xl md:text-3xl font-bold text-white mb-1.5 md:mb-2 tracking-tight">Need reliable IT infrastructure?</h4>
              <p className="text-emerald-300 text-sm md:text-base font-medium">Let's build a smarter setup for your business.</p>
            </div>
            
            <Link href="/contact#contact-form" prefetch={false}>
              {/* <DarkBtn> ব্যবহার করলে HTML Nesting এরর আসতে পারে, তাই সরাসরি ক্লাসে স্টাইল দেওয়া ভালো, তবে আপনি চাইলে DarkBtn রাখতে পারেন */}
              <DarkBtn>Get a Quote</DarkBtn>
            </Link>
          </div>

          {/* Bottom Legal Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 pt-6 md:pt-8 border-t border-emerald-800/50 text-xs md:text-sm text-emerald-400/60 font-medium">
            <p className="text-center md:text-left">© {new Date().getFullYear()} OM EPC Solution. All rights reserved.</p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <Link href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="hover:text-emerald-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" onClick={(e) => handleLinkClick(e, '/terms')} className="hover:text-emerald-300 transition-colors">Terms & Conditions</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}