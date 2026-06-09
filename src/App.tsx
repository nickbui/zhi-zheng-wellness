/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  ArrowRight,
  Mail,
  Globe,
  BookOpen,
  Heart,
  Award,
  Menu,
  X,
  Sparkles,
  Instagram,
  Youtube,
  CheckCircle2,
  Calendar
} from "lucide-react";

// Components
import BookingModal from "./components/BookingModal";
import DigitalSanctuaryPlayer from "./components/DigitalSanctuaryPlayer";
import EbookReaderModal from "./components/EbookReaderModal";
import StoreModal from "./components/StoreModal";
import BiographyModal from "./components/BiographyModal";

// Data
import { INSTAGRAM_POSTS } from "./data";

export default function App() {
  // Navigation Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal Open states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preSelectedSession, setPreSelectedSession] = useState<string | undefined>(undefined);

  const [sanctuaryOpen, setSanctuaryOpen] = useState(false);
  const [sanctuaryMode, setSanctuaryMode] = useState<"video" | "breathing" | "philosophy">("video");

  const [ebookOpen, setEbookOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);

  // Newsletter signup Form State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleBookingTrigger = (sessionId?: string) => {
    setPreSelectedSession(sessionId);
    setBookingOpen(true);
  };

  const handleSanctuaryTrigger = (mode: "video" | "breathing" | "philosophy") => {
    setSanctuaryMode(mode);
    setSanctuaryOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterSuccess(true);
    // Instant gratification: open the Ebook reader modal immediately so they can read Chapter 1!
    setTimeout(() => {
      setEbookOpen(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden antialiased">

      {/* Sticky Top Bar Header */}
      <header className="w-full sticky top-0 z-40 bg-surface/80 backdrop-blur-md shadow-sm shadow-primary/5 transition-all">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-16 py-3.5">
          {/* Logo Brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-serif text-2xl text-primary font-semibold tracking-tight cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            id="brand-logo"
          >
            Zhi Wei Zheng
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-primary font-bold border-b-2 border-primary pb-0.5 text-xs uppercase tracking-wider font-semibold hover:opacity-95"
              id="nav-home"
            >
              Home
            </button>
            <button
              onClick={() => setEbookOpen(true)}
              className="text-secondary hover:text-primary transition-colors text-xs uppercase tracking-wider font-semibold"
              id="nav-inner-care"
            >
              Inner Care Chapter
            </button>
            <button
              onClick={() => setStoreOpen(true)}
              className="text-secondary hover:text-primary transition-colors text-xs uppercase tracking-wider font-semibold"
              id="nav-store"
            >
              Store
            </button>
            <button
              onClick={() => handleBookingTrigger("mentorship")}
              className="text-secondary hover:text-primary transition-colors text-xs uppercase tracking-wider font-semibold"
              id="nav-mentorship"
            >
              Mentorship
            </button>

            <button
              onClick={() => handleBookingTrigger()}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-sm active:scale-95"
              id="nav-btn-book"
            >
              Book Session
            </button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors"
            id="mobile-menu-toggle"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile Sidebar Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end md:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-inverse-surface/30 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-72 max-w-sm h-full bg-background p-6 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-outline/10 pb-4">
                  <span className="font-serif text-lg font-bold text-primary">Navigation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-4 font-sans text-xs uppercase tracking-wider font-semibold text-secondary">
                  <button
                    onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-left py-2 hover:text-primary transition-colors"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setEbookOpen(true); }}
                    className="text-left py-2 hover:text-primary transition-colors"
                  >
                    Inner Care Chapter
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setStoreOpen(true); }}
                    className="text-left py-2 hover:text-primary transition-colors"
                  >
                    Store
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleBookingTrigger("mentorship"); }}
                    className="text-left py-2 hover:text-primary transition-colors"
                  >
                    Mentorship
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-outline/10 space-y-4">
                <button
                  onClick={() => { setMobileMenuOpen(false); handleBookingTrigger(); }}
                  className="w-full bg-primary text-on-primary py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Book Session
                </button>
                <p className="text-[10px] text-center text-[#5f5e5a] font-sans">© 2026 Zhi Zheng Wellness</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main>

        {/* 1. HERO SECTION */}
        <section className="relative min-h-[820px] lg:min-h-[880px] flex items-center overflow-hidden">
          {/* Cover background imagery */}
          <div className="absolute inset-0 z-0">
            <img
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVCfW8BOdDt0nXNYGUnmm6foKeUhL4gLTW4X27aZ6YnuIDfObxYMME1V6WF6BqXmFMkyuG5pZ1igfVWh6ESJYn1coyx-1a2tV2eLSDa6OsdurRoV5A7z9T0NPR6Ouj39oZTsOIsw6k9Da_caR4I37NDsYhyM-wOOrwaQgSTT2Nh36lCV5V3fxguWXkpL_4uUbbI3sWXBTZjV9WkUJnk5LgjES1uN3K-67tREXfF3QmQyaVWh1wzMxRl8LShk9sG8JwszKGJIFxcfs"
              alt="Misty landscape morning hills"
              className="w-full h-full object-cover opacity-25"
            />
            {/* Subtle gradient wash */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20 lg:py-28">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-4">
                {/* Visual Label Badge */}
                <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-wider font-sans">
                  Conscious Living
                </span>

                {/* Primary Display heading */}
                <h1 className="font-serif text-3.5xl sm:text-4xl lg:text-5xl font-bold text-on-surface leading-tight tracking-tight max-w-2xl">
                  Transform self-criticism into self-love, navigate your inner world, and experience <span className="text-primary italic font-medium">purposeful living</span>.
                </h1>

                {/* Subtitle */}
                <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-lg leading-relaxed pt-2">
                  Professional wellness coaching and structured narrative analysis for a more conscious, peaceful life.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-1">
                <button
                  onClick={() => handleBookingTrigger()}
                  className="bg-primary hover:opacity-90 text-on-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 soft-shadow"
                  id="hero-explore-btn"
                >
                  Explore Inner Care
                </button>
                <button
                  onClick={() => handleSanctuaryTrigger("philosophy")}
                  className="flex items-center gap-2 hover:text-tertiary transition-colors text-primary text-xs font-bold uppercase tracking-wider"
                  id="hero-philosophy-btn"
                >
                  <span className="material-symbols-outlined text-lg leading-none">play_circle</span>
                  <span>Watch Zhi&apos;s Philosophy</span>
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* 2. BIOGRAPHY SECTION */}
        <section className="py-24 bg-surface-container-low" id="about-section">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Photo representation (Left) */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden soft-shadow border border-outline/5">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrKze9dUZhAe4y59oeZgEO9BySO7BcT9x2pBHcEfZhWHOTKo4ONQ2frNhuo5_ZXyAwF_y515uJhoqb1s_93QUfHkOamDXkTWCpI3AePPxxcpqlyaCyC4Vf288IbnsbfrTka3eSgJReejugh_RKzhs8zBLvy68vbHyKp1VRZMftxWmMoB9efGU6e4RQun5W4DlEXQKv2bKREFD_EOZxYDRx1GmHiKEsnWHdgXjmh5KsDOI6-4guskPKLBtHeVUcqU18y_Yx3ozuE7rzJQ"
                    alt="男性ウェルネスガイド Zhi Zheng portrait"
                    className="w-full h-full object-cover select-none"
                  />
                </div>
                {/* Absolute overlay count card */}
                <div className="absolute -bottom-4 right-6 glass-card px-5 py-3.5 rounded-2xl soft-shadow border border-outline/10 text-center scale-95 md:scale-100">
                  <div className="font-serif text-2xl font-bold text-tertiary leading-none">10+</div>
                  <div className="text-[10px] text-on-surface-variant font-sans font-bold uppercase tracking-wider mt-1">Years of Guidance</div>
                </div>
              </div>

              {/* Story elements (Right) */}
              <div className="lg:col-span-7 space-y-6 lg:pl-8 text-left">
                <h2 className="font-serif text-2.5xl sm:text-3xl font-bold text-on-surface tracking-tight">Who is Zhi Zheng?</h2>

                <div className="space-y-4 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  <p>
                    Zhi&apos;s journey began in the fast-paced corridors of Silicon Valley software engineering. Despite rapid professional growth, he felt a profound structural disconnect from his deep inner self—a common modern malaise.
                  </p>
                  <p>
                    This critical realization sparked a decade-long transition from building global software architectures to exploring the architecture of the human soul. Today, he serves as a spiritual wellness guide, helping folks debug their negative inner narratives and rewrite them with pure compassion.
                  </p>

                  {/* Quote block */}
                  <blockquote className="italic border-l-4 border-primary pl-4 py-2 bg-primary/5 font-serif text-sm sm:text-base text-on-surface">
                    &ldquo;The most important code we will ever compile is the narrative of our own lives.&rdquo;
                  </blockquote>

                  <p>
                    His teachings are beautifully distilled in his acclaimed guide book, <span className="text-primary font-bold">&ldquo;Inner Care: A Simple Guide to Coming Alive&rdquo;</span>, which expertly bridges the gap between structured analysis and somatic presence.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setBioOpen(true)}
                    className="border border-outline hover:bg-[#e8e8e6] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-on-surface transition-colors"
                    id="bio-read-more-btn"
                  >
                    Read the Full Story
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* 3. CORE MISSION / VISION BENTO GRID */}
        <section className="py-24" id="vision-section">
          {/* Main Titles */}
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-16 space-y-3">
            <h2 className="font-serif text-2.5xl sm:text-3xl font-bold text-on-surface tracking-tight">A Vision for the Collective</h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Inner Care is more than a coaching clinic; it&apos;s a movement toward a conscious future, ensuring our collective legacy is one of absolute presence.
            </p>
          </div>

          {/* Bento dynamic structures */}
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Card item 1: Collective (Main large card) */}
              <div className="lg:col-span-2 bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 border border-outline/5 text-left">
                <div className="space-y-4 max-w-md">
                  <span className="material-symbols-outlined text-primary text-4xl">diversity_3</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-on-surface">For the Collective</h3>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Healing ourselves is the foundational transition toward healing the wider world. Our community circles and group sessions foster active spaces of radical healing, empathy, and shared organic expansion.
                  </p>
                </div>
                {/* Scenic circle garden image */}
                <div className="mt-8 rounded-2xl overflow-hidden h-48 border border-outline/5 soft-shadow">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI8HbbPqrERaUwtEW6abm-gYZp8MzB1Gh2xrYpMEVOh7IexhfCruNV0u4JgGlI_qypUSgma21MJtUPWQm26IARdMIGGInrySsNWnZawoXc0ItS-GsXH6g9AYERfqAZwfFoGhobi2BFT8ERPa8Lv7KYi1CvezgCuWhp4poJIdtxZyt8A9vgTn1i5iepXdR8BdRN7SBCGGkhaq_glP6bZkzjd5yC2kCL7BPS8qnkfq9kGzaaL41cUnMXtL8KI9JqvPYnuHyvo8dREC4"
                    alt="Active outdoor meditation group circle"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card item 2: Future Generations */}
              <div className="bg-primary text-on-primary rounded-3xl p-8 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 soft-shadow text-left">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-on-primary text-4xl">eco</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">Future Generations</h3>
                  <p className="font-sans text-xs sm:text-sm text-on-primary/90 leading-relaxed">
                    We teach actionable methodologies of emotional resilience, quiet presence, and somatic focus today so that the leaders of tomorrow navigate the world with clarity and heart.
                  </p>
                </div>
                {/* Decorative circular design badge */}
                <div className="mt-8 aspect-square rounded-full border border-on-primary/15 flex items-center justify-center p-4">
                  <span className="material-symbols-outlined text-5xl opacity-30">history_edu</span>
                </div>
              </div>

              {/* Card item 3: Full-width Core Mission quote strip */}
              <div className="bg-tertiary-container text-on-tertiary-container rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center lg:col-span-3 hover:scale-[1.005] transition-transform duration-300 border border-[#a96245]/20 text-center">
                <div className="max-w-xl space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl italic font-bold">
                    &ldquo;Inner Care is the practice of coming alive, again and again.&rdquo;
                  </h3>
                  <p className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-80">
                    The Core Spiritual Mission
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* 4. NEWSLETTER / MAILING CONVERTER */}
        <section className="py-24 px-6 md:px-16" id="newsletter-section">
          <div className="max-w-7xl mx-auto bg-surface-container rounded-[40px] overflow-hidden border border-outline/10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Form container Column (Left) */}
              <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center space-y-6 text-left">
                <h2 className="font-serif text-2.5xl sm:text-3xl font-bold text-on-surface tracking-tight">Begin Your Journey</h2>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Join our weekly newsletter circular for contemplative writing, somatic patterns, and obtain the <span className="text-tertiary font-bold underline decoration-tertiary/20">first chapter of &ldquo;Inner Care&rdquo; ebook</span> for free instantly.
                </p>

                {!newsletterSuccess ? (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="relative flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"><Mail size={16} /></span>
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Your email address (e.g. alignment@care.com)"
                          className="w-full bg-[#ffffff] border border-outline/30 focus:border-primary focus:ring-0 rounded-full pl-11 pr-4 py-3 text-xs font-sans"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-primary hover:opacity-90 text-on-primary px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
                      >
                        Get Chapter
                      </button>
                    </div>
                    <p className="text-[10px] text-on-surface-variant font-sans text-center sm:text-left">
                      We respect your deep quiet. Unsubscribe at any time.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-primary/10 border border-primary/25 rounded-2xl space-y-2 flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-sans text-xs font-bold text-primary">Chapter Delivery Confirmed!</h4>
                      <p className="text-xs text-on-surface-variant leading-normal">
                        Welcome Nicholas. The PDF and companion audio resources are flying to your mailbox. Opening your online e-Reader console preview right now...
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Cover Image Column (Right) */}
              <div className="relative hidden lg:block border-l border-outline/10">
                <img
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw3mXjsJgtJV0lRabdvgGVtf-dAG-8zdMbYNiajv22HHlCRM4KlpbJfbASYMSOCwKSki3pJk57C4CtnGJyxPwVdrxhUTwTOR-OSgGAQ_3p_OdN7GsV-rwHUQjSyqKohcM4b0o4Q6xBEleuF1zbed6zDUTG1PVEGEQYv9xfRjl9thGnrGWrQ6HCnU717Hu0-cqVDHM13q-VbLn9OC7z2yZpf16WqID7jOjyWZWzKjFcnF9jrxu39aXhCjGkdFlsqiszJX_Rzx15Qww"
                  alt="Minimalist Book cover lying on linen sheets next to dry sage"
                  className="w-full h-full object-cover select-none"
                />
              </div>

            </div>
          </div>
        </section>


        {/* 5. FOOTER & DIGITAL SANCTUARY FEATURE */}
        <section className="py-24 bg-surface-container-low" id="sanctuary-section">
          <div className="max-w-7xl mx-auto px-6 md:px-16">

            {/* Title headers */}
            <div className="text-center mb-16 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#a96245]">Online Reflections</span>
              <h2 className="font-serif text-2.5xl sm:text-3xl font-bold text-on-surface tracking-tight">Digital Sanctuary</h2>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Tune-in to weekly soundscapes, pranayama pacers, and short video assemblies on YouTube or Instagram.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* Large YouTube Play Card Feature (Left) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div
                  onClick={() => handleSanctuaryTrigger("video")}
                  className="relative group cursor-pointer rounded-3xl overflow-hidden soft-shadow border border-outline/10 aspect-video w-full h-full min-h-[280px] lg:min-h-auto"
                >
                  <img
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida/AP1WRLtKb_BTqsaB3h1T3GTD2MPxk8NmTN2AK6CWFYJV1FAFgk4jjpaqlpbYo6SRf8PCwOjFxPK4SgYS-czTlugslglfoHLEh7PpRoVoTbckgL1jKpAbuwIPEV39Ju6Xrs1dz8SDTnnvkBAe66feOywSscIudDw3ZndPp8vjWjlqoMd7fqqU8F-rhBePIuXmYdDk2OtMWfYRXSYA-dtNij1O4SO7ycJrw4Gwj806rkZE-YrjQ_JG1bkw8DbAvn0"
                    alt="5 Minutes of Inner Peace video thumbnail"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  {/* Backdrop play signifier */}
                  <div className="absolute inset-0 bg-black/15 flex items-center justify-center transition-colors group-hover:bg-black/25">
                    <div className="bg-white/90 backdrop-blur-md rounded-full p-5 shadow-lg shadow-black/10 transition-transform group-hover:scale-110 flex items-center justify-center">
                      <Play className="text-primary fill-primary ml-0.5" size={24} />
                    </div>
                  </div>
                  {/* Floating Action Badge */}
                  <div className="absolute bottom-5 left-5">
                    <span className="bg-primary text-on-primary px-4.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                      <Youtube size={12} />
                      <span>Watch Latest Video</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Instagram grid blocks (Right) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {INSTAGRAM_POSTS.map((post, idx) => (
                    <div
                      key={post.id}
                      onClick={() => handleSanctuaryTrigger("breathing")}
                      className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer soft-shadow border border-outline/10"
                    >
                      <img
                        referrerPolicy="no-referrer"
                        src={post.imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      {/* Hover caption sheet overlay */}
                      <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-on-primary">
                        <p className="text-[11px] leading-relaxed font-sans line-clamp-4 italic">
                          &ldquo;{post.caption}&rdquo;
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-bold tracking-wide uppercase border-t border-on-primary/20 pt-1.5 font-sans">
                          <span className="flex items-center gap-1">
                            <Heart size={10} fill="currentColor" />
                            <span>{post.likes}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Instagram size={10} />
                            <span>View</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pr-1">
                  <button
                    onClick={() => handleSanctuaryTrigger("breathing")}
                    className="flex items-center gap-2 text-tertiary font-bold text-xs uppercase tracking-wider hover:underline"
                  >
                    <span>View Private Sanctuary Coach</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="w-full bg-surface-container py-16 border-t border-outline/5 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Logo & description column */}
          <div className="md:col-span-5 space-y-4">
            <span
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-serif text-2xl text-primary font-bold tracking-tight cursor-pointer block"
            >
              Zhi Zheng
            </span>
            <p className="font-sans text-xs text-on-surface-variant max-w-sm leading-relaxed indent-0">
              Guidance for the soul, rooted in physical presence. Based in serene, secluded environments, serving a highly conscious global creative community.
            </p>
            {/* Social handles */}
            <div className="flex items-center gap-3 text-secondary pt-1">
              <button
                onClick={() => handleSanctuaryTrigger("breathing")}
                className="hover:text-primary transition-colors p-1"
                title="Global Outreach"
              >
                <Globe size={18} />
              </button>
              <button
                onClick={() => setEbookOpen(true)}
                className="hover:text-primary transition-colors p-1"
                title="Mailing chapter"
              >
                <Mail size={18} />
              </button>
              <button
                onClick={() => handleSanctuaryTrigger("video")}
                className="hover:text-primary transition-colors p-1"
                title="YouTube meditations"
              >
                <Youtube size={18} />
              </button>
            </div>
          </div>

          {/* Quick linkages lists */}
          <div className="grid grid-cols-2 gap-8 md:col-span-7">

            {/* Content links list */}
            <div className="space-y-4 font-sans text-xs">
              <span className="block font-bold text-primary uppercase tracking-wider">Sanctuary Content</span>
              <ul className="space-y-2.5 font-sans">
                <li>
                  <button
                    onClick={() => handleSanctuaryTrigger("video")}
                    className="text-on-surface-variant hover:text-primary transition-colors hover:underline tracking-normal text-left block"
                  >
                    YouTube Meditations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setEbookOpen(true)}
                    className="text-on-surface-variant hover:text-primary transition-colors hover:underline tracking-normal text-left block"
                  >
                    Digital &ldquo;Inner Care&rdquo; Chapter Reader
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setStoreOpen(true)}
                    className="text-on-surface-variant hover:text-primary transition-colors hover:underline tracking-normal text-left block"
                  >
                    Collectable Book Supplies &amp; Audio Store
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal links */}
            <div className="space-y-4 font-sans text-xs">
              <span className="block font-bold text-primary uppercase tracking-wider">Legal Terms</span>
              <ul className="space-y-2.5 font-sans">
                <li>
                  <button
                    onClick={() => alert("Privacy Policy:\n\nWe respect your somatic quiet. We never disclose, distribute or compile your email logs onto third-party listings.")}
                    className="text-on-surface-variant hover:text-primary transition-colors hover:underline tracking-normal text-left block"
                  >
                    Privacy Protection Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Terms of Service:\n\nOur wellness sessions, meditations, and cognitive-debugger frameworks serve as creative, self-guided spiritual alignment, and are not intended to replace professional psychiatric, clinical healthcare therapies.")}
                    className="text-on-surface-variant hover:text-primary transition-colors hover:underline tracking-normal text-left block"
                  >
                    Medical Disclaimer &amp; Terms
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Brand Copyright */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-8 mt-12 border-t border-outline/10 text-center md:text-left text-[11px] text-on-surface-variant/70 font-sans">
          © 2026 Zhi Zheng Wellness. Created in Silicon-Neutral Grounding. All rights reserved.
        </div>
      </footer>

      {/* ========================================================= */}
      {/* MONUMENTS OVERLAY SYSTEM (MODALS)                         */}
      {/* ========================================================= */}
      <AnimatePresence>

        {/* 1. Booking Calendar modal */}
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <BookingModal
              isOpen={bookingOpen}
              onClose={() => setBookingOpen(false)}
              preSelectedSessionId={preSelectedSession}
            />
          </motion.div>
        )}

        {/* 2. Digital Sanctuary Video & Breathing client */}
        {sanctuaryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <DigitalSanctuaryPlayer
              isOpen={sanctuaryOpen}
              onClose={() => setSanctuaryOpen(false)}
              initialMode={sanctuaryMode}
            />
          </motion.div>
        )}

        {/* 3. Ebook excerpt chapter reader */}
        {ebookOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <EbookReaderModal
              isOpen={ebookOpen}
              onClose={() => setEbookOpen(false)}
            />
          </motion.div>
        )}

        {/* 4. Products Commerce Store modal */}
        {storeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <StoreModal
              isOpen={storeOpen}
              onClose={() => setStoreOpen(false)}
            />
          </motion.div>
        )}

        {/* 5. Zhi Biographical story overlay */}
        {bioOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <BiographyModal
              isOpen={bioOpen}
              onClose={() => setBioOpen(false)}
            />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
