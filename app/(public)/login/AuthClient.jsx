"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function AuthClient() {
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your own login logic here
        setTimeout(() => {
            console.log("Login Form Submitted");
            setIsLoading(false);
        }, 1500); // ডেমো লোডিং
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-emerald-50/60 p-6 relative">
            
            {/* Subtle Emerald Grid Background Pattern */}
            <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            {/* Main Card Container */}
            <div className="relative w-full max-w-[900px] min-h-[550px] bg-white border border-emerald-200 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(4,120,87,0.15)] overflow-hidden flex flex-col md:flex-row z-10">

                {/* LEFT PANEL: Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white z-20">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-2 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-emerald-800/80 text-sm">Sign in to your OM EPC account</p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                            <div className="flex items-center border border-emerald-200/80 hover:border-emerald-400 focus-within:border-emerald-600 rounded-xl px-4 py-3.5 bg-emerald-50/60 transition-all shadow-sm">
                                <Mail className="text-emerald-600/60 mr-3 shrink-0" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    className="w-full bg-transparent outline-none text-[14px] text-emerald-950 font-medium placeholder:text-emerald-800/40"
                                    required
                                    placeholder="omepcsolution@gmail.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                            <div className="flex items-center border border-emerald-200/80 hover:border-emerald-400 focus-within:border-emerald-600 rounded-xl px-4 py-3.5 bg-emerald-50/60 transition-all shadow-sm">
                                <Lock className="text-emerald-600/60 mr-3 shrink-0" size={18} />
                                <input
                                    name="password"
                                    type={showLoginPassword ? "text" : "password"}
                                    className="w-full bg-transparent outline-none text-[14px] text-emerald-950 font-medium placeholder:text-emerald-800/40"
                                    required
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="text-emerald-600/60 hover:text-emerald-800 transition-colors cursor-pointer outline-none">
                                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-right -mt-2">
                            <Link href="/forgot-password" className="text-[12px] font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4 pt-2">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full flex justify-center items-center gap-2 cursor-pointer bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-700/70 text-white font-bold text-[13px] py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-900/20 uppercase tracking-widest"
                            >
                                {isLoading ? "Signing In..." : "Login"}
                            </button>

                            <div className="flex items-center my-2">
                                <div className="flex-grow border-t border-emerald-200"></div>
                                <span className="px-4 text-xs font-semibold text-emerald-700/50 uppercase">Or</span>
                                <div className="flex-grow border-t border-emerald-200"></div>
                            </div>

                            <Link href="/" className="w-full cursor-pointer flex items-center justify-center gap-2 border border-emerald-300 hover:border-emerald-700 hover:text-emerald-800 text-emerald-950 font-bold text-[13px] py-3.5 rounded-xl transition-all uppercase tracking-widest group">
                                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                                Back to Home
                            </Link>
                        </div>
                    </form>
                </div>

                {/* RIGHT PANEL: Image Visual - FIXED LAYOUT */}
                <div className="hidden md:flex w-1/2 relative flex-col items-center justify-center bg-emerald-950 overflow-hidden">
                    {/* Tech Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/servicePageImages_craftedBg.jpg"
                            alt="OM EPC Solution Login"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover opacity-40 mix-blend-luminosity" 
                            priority
                        />
                    </div>
                    
                    {/* Overlays for depth */}
                    <div className="absolute inset-0 bg-emerald-950/50 mix-blend-multiply z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/80 to-emerald-800/40 z-0"></div>

                    {/* Branding / Message Overlay */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-12 text-white h-full w-full">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                            <Lock size={32} className="text-emerald-300" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 tracking-tight leading-snug text-white">
                            Secure IT <br/> Management
                        </h2>
                        <p className="text-emerald-50 text-sm leading-relaxed max-w-[280px]">
                            Access your personalized dashboard to manage quotes, AMC services, and enterprise IT infrastructure.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}