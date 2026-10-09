"use client";
import Link from 'next/link';
import { motion } from 'motion/react';
import { FileText, ArrowRight } from 'lucide-react';

export default function TermsAndConditions() {
  const lastUpdated = "September 13, 2026";
  const jurisdiction = "West Bengal, India";

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
              <FileText size={12} className="text-emerald-800" strokeWidth={2.5} /> LEGAL
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight mb-4">
              Terms & Conditions
            </h1>
            <p className="text-emerald-800/70 text-lg">Please read these terms before using our website.</p>
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
              <p>Welcome to OM EPC Solution. By accessing and using this website, you agree to comply with and be bound by the following Terms and Conditions. If you disagree with any part of these terms, please do not use our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">2. Website Use</h2>
              <p>The content provided on this website is for general informational purposes only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">3. Services and Products</h2>
              <p>Information regarding our IT infrastructure, networking, security, and power backup solutions provided on this website does not constitute a legally binding offer. Specific service details, warranties, and deliverables are subject to individual formal agreements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">4. Enquiries and Quotations</h2>
              <p>Any pricing, cost estimates, or timelines discussed via our website contact forms are provisional. A formal quotation, agreement, or contract issued directly by OM EPC Solution management is required to establish a binding commercial relationship.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">5. User Responsibilities</h2>
              <p>When using our contact features, you agree to provide accurate and current information. You must not use our website to transmit any malicious code, spam, or unlawful material.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">6. Intellectual Property</h2>
              <p>This website contains material which is owned by or licensed to OM EPC Solution. This material includes, but is not limited to, the design, layout, look, appearance, graphics, and text. Reproduction is prohibited without explicit prior consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">7. Third-Party Links</h2>
              <p>From time to time, this website may include links to external websites. These links are provided for your convenience to provide further information. We have no responsibility for the content or security of the linked websites.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">8. Disclaimer</h2>
              <p>While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information contained on it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">9. Limitation of Liability</h2>
              <p>In no event will OM EPC Solution be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">10. Changes to These Terms</h2>
              <p>We reserve the right to modify these Terms and Conditions at any time. Any modifications will be effective immediately upon posting on this website. Your continued use of the website signifies your acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">11. Governing Law</h2>
              <p>Your use of this website and any dispute arising out of such use is subject to the laws of <strong>{jurisdiction}</strong>, without regard to its conflict of law provisions.</p>
            </section>

            <section className="pt-6 border-t border-emerald-100">
              <h2 className="text-2xl font-bold text-emerald-950 mb-4">12. Contact Us</h2>
              <p className="mb-4">If you have any questions about these Terms & Conditions, please contact us:</p>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 text-emerald-950 font-medium">
                <p>Email: omepcsolution@gmail.com</p>
                <p>Phone: +91 79814 13743</p>
                <p>Address: Amrita, 10/8/1, Amritya Pyne Ln, Kali Babur Bazar, Naora, Shibpur, Howrah, West Bengal 711101</p>
              </div>
            </section>

            {/* Acknowledgement Note */}
            <div className="mt-8 p-4 bg-emerald-100/50 rounded-xl text-center text-emerald-900/70 text-sm font-medium border border-emerald-200/50">
              By using this website, you acknowledge that you have read and understood these terms.
            </div>
            
          </motion.div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-sm"
            >
              Back to Home <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}