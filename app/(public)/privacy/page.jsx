"use client";
import Link from 'next/link';
import { motion } from 'motion/react';
import { Shield, ArrowRight } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "September 13, 2026";

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <main className="min-h-screen bg-emerald-50 pt-32 pb-24 px-6">
        <div className="max-w-[900px] mx-auto">
          
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-[10px] font-bold text-emerald-950 tracking-widest uppercase mb-6 shadow-sm">
              <Shield size={12} className="text-emerald-800" strokeWidth={2.5} /> LEGAL
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-emerald-800/70 text-lg">Your privacy matters to us.</p>
            <p className="text-emerald-900/50 text-sm mt-4 font-medium">Last Updated: {lastUpdated}</p>
          </motion.div>

          {/* Content Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 border border-emerald-200 shadow-sm text-emerald-900/80 leading-relaxed space-y-10"
          >
            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">1. Introduction</h2>
              <p>OM EPC Solution respects the privacy of visitors and users of our website. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website and services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">2. Information We Collect</h2>
              <p className="mb-3">Depending on how you use our website, we may collect the following categories of information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Name and Job Title</li>
                <li>Email address and Phone number</li>
                <li>Company or business information</li>
                <li>Information submitted voluntarily through our contact or quote request forms</li>
                <li>Basic technical information necessary for the operation and security of our website (e.g., standard server logs).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">3. How We Use Information</h2>
              <p className="mb-3">We use the collected information for legitimate business purposes, including to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Respond to your direct enquiries and support requests.</li>
                <li>Provide requested services, consultations, or formal quotations.</li>
                <li>Communicate with you regarding your projects or infrastructure needs.</li>
                <li>Improve website functionality and user experience.</li>
                <li>Maintain the security and integrity of our website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">4. Cookies and Similar Technologies</h2>
              <p>Our website may use essential cookies and similar basic technologies required to ensure the website functions correctly and securely. We do not deploy intrusive third-party advertising trackers unless explicitly stated and consented to where required.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">5. Data Security</h2>
              <p>We implement commercially reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">6. Third-Party Services</h2>
              <p>We do not sell your personal information. We may share information with trusted third-party service providers only to the extent necessary to deliver our services (e.g., secure email hosting or internal communication tools) under strict confidentiality obligations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">7. Data Retention</h2>
              <p>We retain your personal information only for as long as reasonably necessary to fulfill the purposes outlined in this Privacy Policy, or as required for legitimate business, legal, or tax purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">8. Your Rights</h2>
              <p>Subject to applicable law, you may have the right to request access to, correction, or deletion of your personal information held by us. To exercise these rights, please contact us using the details provided below.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">9. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The updated version will be indicated by the "Last Updated" date at the top of this page.</p>
            </section>

            <section className="pt-6 border-t border-emerald-100">
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">10. Contact Us</h2>
              <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please reach out to us:</p>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 text-emerald-950 font-medium">
                <p>Email: omepcsolution@gmail.com</p>
                <p>Phone: +91 79814 13743</p>
                <p>Address: Sector V, Salt Lake, Kolkata, WB 700091, India</p>
              </div>
            </section>
            
          </motion.div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-sm"
            >
              Contact Us <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}