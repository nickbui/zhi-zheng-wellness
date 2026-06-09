/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Award, MapPin, Feather, Heart } from "lucide-react";

interface BiographyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BiographyModal({ isOpen, onClose }: BiographyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-background rounded-[28px] overflow-hidden soft-shadow border border-outline/10 h-[85vh] md:h-auto max-h-[85vh] flex flex-col z-10 text-[#1a1c1b]">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline/10 bg-surface-container-low">
          <div className="flex items-center gap-1.5">
            <Feather className="text-primary" size={18} />
            <span className="font-serif text-sm font-semibold text-primary">Biographical Narrative</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-container-high transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content reader */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 scrollbar">
          
          <div className="flex flex-col md:flex-row gap-6 md:items-center pb-6 border-b border-outline/5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 bg-surface-container-high border border-outline/10 soft-shadow">
              <img 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrKze9dUZhAe4y59oeZgEO9BySO7BcT9x2pBHcEfZhWHOTKo4ONQ2frNhuo5_ZXyAwF_y515uJhoqb1s_93QUfHkOamDXkTWCpI3AePPxxcpqlyaCyC4Vf288IbnsbfrTka3eSgJReejugh_RKzhs8zBLvy68vbHyKp1VRZMftxWmMoB9efGU6e4RQun5W4DlEXQKv2bKREFD_EOZxYDRx1GmHiKEsnWHdgXjmh5KsDOI6-4guskPKLBtHeVUcqU18y_Yx3ozuE7rzJQ" 
                alt="Zhi Zheng portrait circular" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-2xl font-bold text-on-surface">Zhi Zheng</h4>
              <p className="text-xs uppercase font-bold tracking-widest text-tertiary font-sans">Wellness Spiritual Coach &amp; Author</p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-on-surface-variant font-sans">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-primary" />
                  <span>Seattle, Washington (Global Outreach)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Award size={12} className="text-primary" />
                  <span>10+ Years of Spiritual Guidance</span>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 font-sans text-sm text-on-surface-variant leading-relaxed">
            <h5 className="font-serif text-lg font-bold text-on-surface">The Technical Origins</h5>
            <p>
              Born and trained in mathematical science, Zhi completed his academic roots with high honors in computer architectural design. Upon entering Silicon Valley, he immediately caught waves of high-growth software expansion, scaling complex cloud applications and leading teams of highly skilled programmers. 
            </p>
            <p>
              To the external world, he was achieving Peak Performance. He was writing clean compiling logic for complex structures and designing high-fidelity routing tables. Yet under the hood, his own bodily processor was overheating. The high-adrenaline demands, permanent latency alerts, and severe sleep deprivation was executing a constant wear on his nervous systems. 
            </p>

            <h5 className="font-serif text-lg font-bold text-on-surface">The Realization</h5>
            <p>
              &ldquo;The turning point came during an emergency server-migration at 3:00 AM on a freezing Tuesday. I had the server log output on one screen and my biological heart monitor running on another. I noticed both line-graphs looked identical—erratic, screaming for processing breathing room, overflowing into panic bounds.&rdquo;
            </p>
            <p>
              In search of deep restoration, Zhi departed the high-speed hubs. He spent a decade traveling through remote monasteries, healing reserves, and organic sanctuary centers in eastern highlands. He trained under seasoned meditation teachers and integrated ancient spiritual systems.
            </p>

            <div className="border-l-4 border-tertiary pl-4 py-1.5 italic font-serif text-base text-on-surface bg-[#8c4a2f]/5 rounded-r-lg my-6">
              &ldquo;I realized that humans write computer code beautifully, but fail to maintain our own compilers. We inherit broken mental loops and run them on start-up. We deserve a compassionate debugging session.&rdquo;
            </div>

            <h5 className="font-serif text-lg font-bold text-on-surface font-semibold">Bridging the Two Worlds</h5>
            <p>
              Today, Zhi Zheng has built a unique pedagogy. Under his brand <strong className="text-primary font-bold">Inner Care</strong>, he synthesizes ancient eastern mindfulness with systematic architectural diagnostics. He helps tech builders, creators, executives, and families identify emotional blockages, exit critical cognitive loops, and run their daily human experience on a framework of self-compassion, physical presence, and purposeful alignment.
            </p>
          </div>

          <div className="border-t border-outline/5 pt-6 flex justify-end gap-3 font-sans text-xs">
            <button
              onClick={onClose}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Close Story
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
