/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Volume2, VolumeX, Eye, Info, Sparkles, Sliders } from "lucide-react";

interface DigitalSanctuaryProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "video" | "breathing" | "philosophy";
}

export default function DigitalSanctuaryPlayer({ isOpen, onClose, initialMode = "video" }: DigitalSanctuaryProps) {
  const [activeMode, setActiveMode] = useState<"video" | "breathing" | "philosophy">(initialMode);
  
  // Video state
  const videosList = [
    {
      id: "dQw4w9WgXcQ", // calm sceneries or standard placeholder, let's embed a real calming meditation scenery
      title: "5 Minutes of Inner Peace — Daily Forest Alignment",
      embedId: "6p_K_h-vYig" // Calm forest soundscape with piano
    }
  ];

  // Breathing Coach State
  const [breathingText, setBreathingText] = useState("Get Ready");
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("rest");
  const [breathCounter, setBreathCounter] = useState(0);
  const [breathingIntervalRatio, setBreathingIntervalRatio] = useState(1); // multiplier
  const [breathingPattern, setBreathingPattern] = useState<"box" | "relax" | "equal">("equal");

  // Audio Synth State (Web Audio API for actual soothing humming sound!)
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);

  // Breathing Loop Timeline (Runs in useEffect)
  useEffect(() => {
    if (activeMode !== "breathing") {
      setBreathingPhase("rest");
      setBreathingText("Get Ready");
      return;
    }

    let isCancelled = false;
    let timerId: NodeJS.Timeout;

    const runBreathingCycle = async () => {
      // Equal breathing default: 4s inhale, 4s hold, 4s exhale, 4s hold
      // Relax 4-7-8: 4s inhale, 7s hold, 8s exhale
      // Box breathing: 4s inhale, 4s hold, 4s exhale, 4s hold
      
      const patternConfig = {
        equal: [
          { phase: "inhale" as const, text: "Inhale Green...", duration: 4000 },
          { phase: "hold" as const, text: "Hold Presence", duration: 4000 },
          { phase: "exhale" as const, text: "Release Stale Code...", duration: 4000 },
          { phase: "hold" as const, text: "Rest Empty", duration: 4000 }
        ],
        box: [
          { phase: "inhale" as const, text: "Breathe In...", duration: 4000 },
          { phase: "hold" as const, text: "Suspend Mind", duration: 4000 },
          { phase: "exhale" as const, text: "Release Air...", duration: 4000 },
          { phase: "hold" as const, text: "Void Clarity", duration: 4000 }
        ],
        relax: [
          { phase: "inhale" as const, text: "Slow Inhale...", duration: 4000 },
          { phase: "hold" as const, text: "Lock Energy", duration: 7000 },
          { phase: "exhale" as const, text: "Sigh Out Slowly...", duration: 8000 }
        ]
      };

      const timeline = patternConfig[breathingPattern];
      let stepIndex = 0;

      const runNextStep = () => {
        if (isCancelled) return;
        
        const currentStep = timeline[stepIndex];
        setBreathingPhase(currentStep.phase);
        setBreathingText(currentStep.text);

        // Web Audio filter tracking
        if (isSynthPlaying && filterRef.current) {
          const now = audioCtxRef.current?.currentTime || 0;
          if (currentStep.phase === "inhale") {
            filterRef.current.frequency.exponentialRampToValueAtTime(380, now + currentStep.duration / 1000);
          } else if (currentStep.phase === "exhale") {
            filterRef.current.frequency.exponentialRampToValueAtTime(140, now + currentStep.duration / 1000);
          } else if (currentStep.phase === "hold") {
            filterRef.current.frequency.exponentialRampToValueAtTime(260, now + 1);
          }
        }

        timerId = setTimeout(() => {
          if (stepIndex === timeline.length - 1) {
            setBreathCounter(prev => prev + 1);
            stepIndex = 0;
          } else {
            stepIndex++;
          }
          runNextStep();
        }, currentStep.duration * breathingIntervalRatio);
      };

      runNextStep();
    };

    runBreathingCycle();

    return () => {
      isCancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [activeMode, breathingPattern, breathingIntervalRatio, isSynthPlaying]);

  // Audio synthesis triggers
  const toggleCalmSynth = () => {
    if (isSynthPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  const startSynth = () => {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        alert("Web Audio API is not supported in this browser version.");
        return;
      }

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      // Soft fade in
      masterGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2.0);
      gainRef.current = masterGain;

      // Lowpass wash filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);
      filterRef.current = filter;

      // Base carrier hum: low C-sharp (68.25Hz) and soft G-sharp fifth (102.38Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(68.25, ctx.currentTime);
      osc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(102.38, ctx.currentTime);
      osc2Ref.current = osc2;

      // Sub LFO to sweep filter slightly back & forth like breathing
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow sweep: 12 seconds per wash
      lfoRef.current = lfo;

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(45, ctx.currentTime);
      lfoGainRef.current = lfoGain;

      // Connect nodes
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency); // Sweep the lowpass filter frequency

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Play
      osc1.start();
      osc2.start();
      lfo.start();

      setIsSynthPlaying(true);
    } catch (e) {
      console.error("Audio Synthesis error: ", e);
    }
  };

  const stopSynth = () => {
    if (gainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      // Soft release
      gainRef.current.gain.cancelScheduledValues(now);
      gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, now);
      gainRef.current.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      
      const ctx = audioCtxRef.current;
      const os1 = osc1Ref.current;
      const os2 = osc2Ref.current;
      const lf = lfoRef.current;

      setTimeout(() => {
        try {
          os1?.stop();
          os2?.stop();
          lf?.stop();
          ctx.close();
        } catch (err) {}
      }, 1500);
    }
    
    setIsSynthPlaying(false);
    osc1Ref.current = null;
    osc2Ref.current = null;
    lfoRef.current = null;
    gainRef.current = null;
    audioCtxRef.current = null;
  };

  // Stop sound if menu closes
  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-md cursor-pointer"
        onClick={() => { stopSynth(); onClose(); }}
      />

      <div className="relative w-full max-w-4xl bg-background rounded-[32px] overflow-hidden soft-shadow border border-outline/10 flex flex-col z-10 h-[90vh] md:h-auto max-h-[92vh]">
        
        {/* Header bar banner */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline/10 bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <h3 className="font-serif text-xl text-primary font-semibold">Digital Sanctuary</h3>
          </div>
          <button 
            onClick={() => { stopSynth(); onClose(); }}
            className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mode Selector Panel */}
        <div className="grid grid-cols-3 bg-surface-container-lowest border-b border-outline/5 text-center">
          <button
            onClick={() => setActiveMode("video")}
            className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative ${activeMode === "video" ? "text-primary font-bold" : "text-secondary hover:text-on-surface"}`}
          >
            Guided Video Scenery
            {activeMode === "video" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          
          <button
            onClick={() => setActiveMode("breathing")}
            className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative ${activeMode === "breathing" ? "text-primary font-bold" : "text-secondary hover:text-on-surface"}`}
          >
            Breathing Coach &amp; Drone
            {activeMode === "breathing" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>

          <button
            onClick={() => setActiveMode("philosophy")}
            className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative ${activeMode === "philosophy" ? "text-primary font-bold" : "text-secondary hover:text-on-surface"}`}
          >
            Zhi&apos;s Philosophy
            {activeMode === "philosophy" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col justify-center scrollbar min-h-[420px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* VIDEO MODE */}
            {activeMode === "video" && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 flex flex-col justify-center h-full"
              >
                <div className="aspect-video w-full rounded-2xl overflow-hidden soft-shadow bg-surface-container-highest border border-outline/5">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videosList[0].embedId}?autoplay=1&mute=1&playlist=${videosList[0].embedId}&loop=1`}
                    title="Guided Forest Meditation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="text-center max-w-xl mx-auto">
                  <h4 className="font-serif text-lg font-semibold text-on-surface mb-1">
                    {videosList[0].title}
                  </h4>
                  <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                    Allow your eyes to soften. Look at the diffused lighting filtering through the ancient pine tree leaves, breathing concurrently with the movement of the mist.
                  </p>
                </div>
              </motion.div>
            )}

            {/* BREATHING COACH MODE */}
            {activeMode === "breathing" && (
              <motion.div
                key="breathing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 flex flex-col items-center justify-center py-4 h-full"
              >
                {/* Visualizer Circle */}
                <div className="relative flex items-center justify-center w-60 h-60">
                  
                  {/* Subtle pulsing particle rings */}
                  <div className="absolute inset-2 border border-primary/10 rounded-full scale-[1.05] animate-pulse" />
                  <div className="absolute inset-4 border border-tertiary/5 rounded-full scale-[1.12]" />

                  {/* Pulsing Core Circle */}
                  <motion.div
                    animate={{
                      scale: breathingPhase === "inhale" ? 1.5 : breathingPhase === "hold" ? 1.5 : 0.8,
                      backgroundColor: 
                        breathingPhase === "inhale" 
                          ? "rgba(80, 97, 74, 0.18)" 
                          : breathingPhase === "hold" 
                            ? "rgba(140, 74, 47, 0.12)" 
                            : "rgba(80, 97, 74, 0.08)",
                      borderColor: 
                        breathingPhase === "inhale" 
                          ? "#50614a" 
                          : breathingPhase === "hold" 
                            ? "#8c4a2f" 
                            : "#c4c8be"
                    }}
                    transition={{
                      duration: (breathingPhase === "inhale" ? 4 : breathingPhase === "exhale" ? 4 : 3) * breathingIntervalRatio,
                      ease: "easeInOut"
                    }}
                    className="w-40 h-40 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-center p-6 transition-colors"
                  >
                    <motion.span 
                      key={breathingText}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm font-sans font-semibold tracking-wide text-primary"
                    >
                      {breathingText}
                    </motion.span>
                    
                    {breathingPhase !== "rest" && (
                      <span className="text-[10px] font-mono text-secondary mt-1.5 uppercase font-medium">
                        Phase {breathingPhase}
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Synth Playback Controls */}
                <div className="flex flex-col items-center space-y-4 max-w-md w-full bg-surface-container-low/60 rounded-2xl p-4 border border-outline/5 text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#a96245]">Synthesizer Integration</span>
                      <h5 className="font-serif text-sm font-bold text-on-surface">Calm Singing Bowl Drone</h5>
                      <p className="text-[11px] text-on-surface-variant font-sans">Plays beautiful analog low-frequency frequencies client-side</p>
                    </div>

                    <button
                      onClick={toggleCalmSynth}
                      className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isSynthPlaying ? "bg-tertiary text-on-tertiary" : "bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-sm"}`}
                    >
                      {isSynthPlaying ? (
                        <>
                          <VolumeX size={14} />
                          <span>Mute Drone</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={14} />
                          <span>Hum Drone</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Breathing Style Selector */}
                  <div className="border-t border-outline/5 pt-3 w-full flex flex-col sm:flex-row gap-2 items-center justify-between text-xs font-sans">
                    <span className="text-secondary font-semibold font-sans">Breathing Pattern:</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setBreathingPattern("equal")}
                        className={`px-3 py-1 rounded-full font-semibold border ${breathingPattern === "equal" ? "bg-primary/15 border-primary text-primary" : "border-outline/10 text-secondary"}`}
                      >
                        Equal Pace (4-4-4-4)
                      </button>
                      <button
                        onClick={() => setBreathingPattern("box")}
                        className={`px-3 py-1 rounded-full font-semibold border ${breathingPattern === "box" ? "bg-primary/15 border-primary text-primary" : "border-outline/10 text-secondary"}`}
                      >
                        Box Style
                      </button>
                      <button
                        onClick={() => setBreathingPattern("relax")}
                        className={`px-3 py-1 rounded-full font-semibold border ${breathingPattern === "relax" ? "bg-[#8c4a2f]/15 border-[#8c4a2f] text-[#8c4a2f]" : "border-outline/10 text-secondary"}`}
                      >
                        Stress Relief (4-7-8)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Counters / Stats */}
                <div className="flex items-center gap-6 font-sans text-xs text-on-surface-variant">
                  <span>Completed Cycles: <strong className="text-primary font-bold">{breathCounter}</strong></span>
                  <div className="w-1 h-1 bg-outline rounded-full" />
                  <span>Interactive Frequency Oscillation: <strong className="text-[#8c4a2f] font-bold">~68.2 Hz (C#)</strong></span>
                </div>
              </motion.div>
            )}

            {/* PHILOSOPHY MODE */}
            {activeMode === "philosophy" && (
              <motion.div
                key="philosophy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 max-w-2xl mx-auto py-4"
              >
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <Sparkles className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div className="space-y-2">
                    <h4 className="font-serif text-base font-semibold text-[#50614a]">The Logic of the Soul</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Before becoming a wellness spiritual guide, Zhi Zheng was spent his years in Silicon Valley building digital architectures. He noticed that developers spent immense focus correcting code exceptions and analyzing performance loops—yet ignored the compiling scripts that governed their own lives.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs text-on-surface-variant leading-relaxed">
                  <p>
                    &ldquo;When a compiler sees an unexpected variable, it doesn&apos;t hate the variable. It catches the exemption, log it, and safely proceeds. That is the essence of self-compassion. The absolute deepest level of self-criticism represents a loop running in your head, eating 100% of your cognitive capacity, draining your physical batteries, while producing zero helpful outputs.&rdquo;
                  </p>
                  
                  <div className="border-l-4 border-primary pl-4 py-1 bg-surface-container-low font-serif text-sm italic text-on-surface">
                    &ldquo;To reconstruct your application flow, you must first pause the server. That pause is complete silent mindfulness.&rdquo;
                  </div>

                  <p>
                    By learning to look at your brain like an execution thread, you create space between who you are and what is happening. You decouple from raw input variables and establish a reliable, grounding container.
                  </p>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setActiveMode("breathing")}
                    className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 flex items-center gap-1.5"
                  >
                    <span>Try the Breathing Coach now</span>
                    <Sparkles size={14} />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
