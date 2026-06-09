/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, BookOpen, ChevronLeft, ChevronRight, CheckSquare, Sparkles, Terminal, ArrowRight, Play } from "lucide-react";
import { EBOOK_CHAPTER_ONE } from "../data";

interface EbookProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EbookReaderModal({ isOpen, onClose }: EbookProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 0: intro, 1: section 1, 2: section 2, 3: section 3, 4: exercise
  const totalPages = 5;

  // Interactive Exercise Form State
  const [inputScript, setInputScript] = useState("");
  const [inputSensation, setInputSensation] = useState("");
  const [analysisResult, setAnalysisResult] = useState<{
    originalScript: string;
    identifiedBug: string;
    compiledFix: string;
  } | null>(null);
  const [isRefactoring, setIsRefactoring] = useState(false);

  if (!isOpen) return null;

  const nextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  // Self Narrative Debugger algorithm
  const handleRefactorScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputScript) return;

    setIsRefactoring(true);

    // Simulate compilation
    setTimeout(() => {
      let bugType = "Recursive Expectations Loop";
      let fixStatement = "I am allowed to rest. I do not need to constantly compile success to deserve grace.";

      const cleaned = inputScript.toLowerCase();
      if (cleaned.includes("fail") || cleaned.includes("not good") || cleaned.includes("loser")) {
        bugType = "Fatal Classification Bug";
        fixStatement = "A setback is just a caught exception, not a runtime crash. I learn, catch the error, and keep living.";
      } else if (cleaned.includes("work") || cleaned.includes("productive") || cleaned.includes("busy")) {
        bugType = "CPU Exhaustion (Productivity Loop)";
        fixStatement = "Work is an execution thread, not the entire operating system. It is safe to pause the server.";
      } else if (cleaned.includes("perfect") || cleaned.includes("mistake")) {
        bugType = "Absolute Boundary Condition Overflow";
        fixStatement = "Perfection is a mathematically impossible float. I embrace standard organic increments instead.";
      }

      setAnalysisResult({
        originalScript: inputScript,
        identifiedBug: bugType,
        compiledFix: fixStatement
      });
      setIsRefactoring(false);
    }, 1500);
  };

  const resetDebugger = () => {
    setInputScript("");
    setInputSensation("");
    setAnalysisResult(null);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-[#fefefe] rounded-[28px] overflow-hidden soft-shadow border border-outline/10 flex flex-col z-10 h-[90vh] md:h-auto max-h-[92vh] text-[#1f201e]">
        
        {/* Banner header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline/5 bg-[#fbfbf9]">
          <div className="flex items-center gap-2">
            <BookOpen className="text-tertiary" size={18} />
            <span className="font-serif text-sm font-semibold text-tertiary">Book Excerpt: Inner Care Chapter 1</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-container-high text-[#1a1c1b] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Reader stage */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar min-h-[460px] md:min-h-[520px] bg-[#fdfdfc]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPageIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              {/* PAGE INDEX ZERO: Cover / Intro */}
              {currentPageIndex === 0 && (
                <div className="space-y-6 py-4">
                  <div className="text-center space-y-2 mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary uppercase text-[10px] font-sans font-bold tracking-wider">
                      Free Chapter Reveal
                    </span>
                    <h1 className="font-serif text-3xl font-bold tracking-tight text-on-surface">
                      {EBOOK_CHAPTER_ONE.title}
                    </h1>
                    <p className="font-serif text-base italic text-secondary leading-relaxed">
                      {EBOOK_CHAPTER_ONE.subtitle}
                    </p>
                  </div>

                  <div className="border-l-2 border-primary/25 pl-6 py-1 italic font-serif text-sm leading-relaxed text-on-surface-variant bg-surface-container-low/40 rounded-r-lg">
                    {EBOOK_CHAPTER_ONE.introduction}
                  </div>

                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Turn the page to explore how standard mental narratives replicate software logic, and learn the basic mechanisms of cognitive compilation.
                  </p>
                </div>
              )}

              {/* PAGE INDEX 1-3: Sections */}
              {currentPageIndex >= 1 && currentPageIndex <= 3 && (
                <div className="space-y-5 py-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary font-sans">
                    Part {currentPageIndex} of 3
                  </span>
                  
                  <h3 className="font-serif text-xl font-bold text-on-surface">
                    {EBOOK_CHAPTER_ONE.sections[currentPageIndex - 1].heading}
                  </h3>

                  <p className="font-serif text-sm leading-relaxed text-on-surface-variant indent-6 whitespace-pre-line py-2">
                    {EBOOK_CHAPTER_ONE.sections[currentPageIndex - 1].content}
                  </p>

                  <div className="p-4 rounded-xl bg-[#f9f9f7] border border-outline/5 text-xs text-[#5f5e5a] flex items-center gap-2 font-sans mt-8">
                    <Terminal size={14} className="text-primary flex-shrink-0" />
                    <span>Zhi Zheng: &ldquo;In silence, you realize that you are not the program running on screen; you are the developer.&rdquo;</span>
                  </div>
                </div>
              )}

              {/* PAGE INDEX 4: Dynamic Self Narrative Review Exercises */}
              {currentPageIndex === 4 && (
                <div className="space-y-6 py-2">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#a96245] font-sans">
                      Interactive Exercise Case
                    </span>
                    <h3 className="font-serif text-lg font-bold text-on-surface">
                      {EBOOK_CHAPTER_ONE.exercises[0].title}
                    </h3>
                    <p className="text-xs text-on-surface-variant font-sans">
                      {EBOOK_CHAPTER_ONE.exercises[0].description}
                    </p>
                  </div>

                  {/* Narrative input console */}
                  {!analysisResult ? (
                    <form onSubmit={handleRefactorScript} className="p-5 bg-surface-container-low rounded-2xl border border-outline/10 space-y-4">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary mb-1">
                        <Terminal size={14} />
                        <span>cognitive-debugger-console.v1</span>
                      </div>

                      <div className="space-y-3 font-sans text-xs">
                        <div>
                          <label className="block text-secondary font-semibold mb-1">
                            1. What is the self-critical script currently executing?
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 'I'm not doing enough work, I should be coding or studying right now'"
                            value={inputScript}
                            onChange={(e) => setInputScript(e.target.value)}
                            className="w-full bg-[#ffffff] border-outline/25 focus:border-primary focus:ring-0 rounded-lg px-3 py-2 text-xs font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-secondary font-semibold mb-1">
                            2. Where is it causing bodily sensations? (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Tightening in my chest, heavy shoulders"
                            value={inputSensation}
                            onChange={(e) => setInputSensation(e.target.value)}
                            className="w-full bg-[#ffffff] border-outline/25 focus:border-primary focus:ring-0 rounded-lg px-3 py-2 text-xs font-sans"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          disabled={isRefactoring}
                          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 transition-all"
                        >
                          {isRefactoring ? (
                            <>
                              <span className="w-3 h-3 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
                              <span>Compiling Fix...</span>
                            </>
                          ) : (
                            <>
                              <span>Analyze &amp; Refactor</span>
                              <Sparkles size={12} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Display debugger results */
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 bg-[#50614a]/95 text-[#f8fff0] rounded-2xl space-y-4 shadow-md font-sans"
                    >
                      <div className="flex items-center justify-between border-b border-[#f8fff0]/10 pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                          <Terminal size={14} />
                          <span>REFACTOR_COMPLETED</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f8fff0]/15 text-[#f8fff0]">
                          SUCCESS ✓
                        </span>
                      </div>

                      <div className="space-y-3 font-sans text-xs">
                        <div>
                          <span className="text-[10px] font-mono opacity-70 block">ORIGINAL MENTAL CODE LOGS:</span>
                          <p className="italic pl-2.5 border-l-2 border-[#fff]/40 mt-0.5 mt-1">&ldquo;{analysisResult.originalScript}&rdquo;</p>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-[#ffb599] font-bold block">IDENTIFIED COMPILER EXCEPTION:</span>
                          <span className="font-bold text-sm text-[#ffb599] font-serif block mt-0.5">{analysisResult.identifiedBug}</span>
                        </div>

                        <div className="pt-2 border-t border-[#f8fff0]/10">
                          <span className="text-[10px] font-mono text-[#b1c7a8] font-bold block">RE-COMPILED COMPASSIONATE ALGORITHM:</span>
                          <p className="text-sm font-semibold leading-relaxed text-[#ffffff] font-serif mt-1">&ldquo;{analysisResult.compiledFix}&rdquo;</p>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={resetDebugger}
                          className="bg-[#f8fff0] text-[#50614a] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wide hover:opacity-95"
                        >
                          Review Another Script
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Manual checklist of exercise steps */}
                  <div className="space-y-2 pt-2 border-t border-outline/5">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-secondary">Manual Execution Instructions</span>
                    <div className="grid grid-cols-1 gap-2">
                      {EBOOK_CHAPTER_ONE.exercises[0].steps.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs font-sans text-on-surface-variant leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer navigational bar */}
        <div className="px-6 py-4 border-t border-outline/5 bg-[#fbfbf9] flex items-center justify-between font-sans text-xs">
          
          <button
            onClick={prevPage}
            disabled={currentPageIndex === 0}
            className="flex items-center gap-1 h-8 px-3 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:pointer-events-none text-[#1a1c1b] transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          {/* Progress bar */}
          <div className="flex-1 max-w-xs mx-4 text-center space-y-1">
            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentPageIndex + 1) / totalPages) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-secondary font-semibold">
              Page {currentPageIndex + 1} of {totalPages}
            </span>
          </div>

          <button
            onClick={nextPage}
            disabled={currentPageIndex === totalPages - 1}
            className="flex items-center gap-1 h-8 px-3 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:pointer-events-none text-[#1a1c1b] transition-colors"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
