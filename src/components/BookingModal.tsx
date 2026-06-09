/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, User, Mail, FileText, CheckCircle2, ListFilter, Trash2 } from "lucide-react";
import { SESSION_TYPES } from "../data";
import { SessionType, BookedSession } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedSessionId?: string;
}

export default function BookingModal({ isOpen, onClose, preSelectedSessionId }: BookingModalProps) {
  const [selectedSession, setSelectedSession] = useState<SessionType>(
    SESSION_TYPES.find(s => s.id === preSelectedSessionId) || SESSION_TYPES[0]
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", email: "", notes: "" });
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newBooking, setNewBooking] = useState<BookedSession | null>(null);
  const [activeTab, setActiveTab] = useState<"book" | "my-sessions">("book");

  // Load bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("zhi_zheng_bookings");
    if (saved) {
      try {
        setBookedSessions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update selection if prop changes
  useEffect(() => {
    if (preSelectedSessionId) {
      const found = SESSION_TYPES.find(s => s.id === preSelectedSessionId);
      if (found) setSelectedSession(found);
    }
  }, [preSelectedSessionId]);

  // Generate next 14 days of calendar
  const getNext14Days = () => {
    const days = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      days.push({
        formattedValue: date.toISOString().split("T")[0],
        dayName: weekdays[date.getDay()],
        dayNumber: date.getDate(),
        monthName: months[date.getMonth()],
        isWeekend
      });
    }
    return days;
  };

  const daysList = getNext14Days();

  // Time slots template
  const TIME_SLOTS = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot || !formData.name || !formData.email) {
      return;
    }

    const booking: BookedSession = {
      id: "booking_" + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      sessionType: selectedSession,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      createdAt: new Date().toISOString(),
      notes: formData.notes
    };

    const updated = [...bookedSessions, booking];
    localStorage.setItem("zhi_zheng_bookings", JSON.stringify(updated));
    setBookedSessions(updated);
    setNewBooking(booking);
    setIsSuccess(true);
  };

  const deleteBooking = (id: string) => {
    const updated = bookedSessions.filter(b => b.id !== id);
    localStorage.setItem("zhi_zheng_bookings", JSON.stringify(updated));
    setBookedSessions(updated);
  };

  const resetForm = () => {
    setSelectedDate("");
    setSelectedTimeSlot("");
    setFormData({ name: "", email: "", notes: "" });
    setIsSuccess(false);
    setNewBooking(null);
    setActiveTab("book");
  };

  // Format visual date label for booked screen
  const formatDateLabel = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-background rounded-3xl overflow-hidden soft-shadow border border-outline/10 h-[90vh] md:h-auto max-h-[92vh] flex flex-col z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline/10 bg-surface-container-low">
          <div>
            <h3 className="font-serif text-2xl text-primary font-medium">Wellness Sanctuary Scheduling</h3>
            <p className="text-xs text-on-surface-variant font-sans">Reserve personal offline alignment or group sessions</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs Control */}
        <div className="flex border-b border-outline/5 bg-surface-container-lowest">
          <button
            onClick={() => setActiveTab("book")}
            className={`flex-1 py-3 text-center font-sans text-xs font-semibold uppercase tracking-wider relative ${activeTab === "book" ? "text-primary font-bold" : "text-secondary hover:text-on-surface"}`}
          >
            Schedule a Session
            {activeTab === "book" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("my-sessions")}
            className={`flex-1 py-3 text-center font-sans text-xs font-semibold uppercase tracking-wider relative ${activeTab === "my-sessions" ? "text-primary font-bold" : "text-secondary hover:text-on-surface"}`}
          >
            My Upcoming Sessions ({bookedSessions.length})
            {activeTab === "my-sessions" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar">
          <AnimatePresence mode="wait">
            
            {/* BOOK TAB */}
            {activeTab === "book" ? (
              !isSuccess ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Select Session Type */}
                  <div className="lg:col-span-5 space-y-4">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">
                      1. Select Your Service
                    </label>
                    <div className="space-y-3">
                      {SESSION_TYPES.map((session) => {
                        const isChosen = selectedSession.id === session.id;
                        return (
                          <div
                            key={session.id}
                            onClick={() => setSelectedSession(session)}
                            className={`p-4 rounded-xl cursor-pointer border text-left transition-all duration-200 ${isChosen ? "border-primary bg-primary/10 shadow-sm" : "border-outline/10 bg-surface-container-lowest hover:bg-surface-container-low"}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-serif text-sm font-semibold text-on-surface">{session.title}</h4>
                              <span className="text-xs font-semibold text-tertiary font-sans bg-tertiary/10 px-2.5 py-0.5 rounded-full">
                                {session.price}
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant font-sans line-clamp-2 mb-2">
                              {session.description}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-primary font-sans font-medium">
                              <span className="material-symbols-outlined text-[13px]">schedule</span>
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Date, Time & Details */}
                  <form onSubmit={handleBookingSubmit} className="lg:col-span-7 space-y-6">
                    
                    {/* Date Selector */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-3 flex items-center gap-1">
                        <Calendar size={14} className="text-primary" />
                        2. Choose Available Date
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {daysList.map((day) => {
                          const isSelected = selectedDate === day.formattedValue;
                          return (
                            <button
                              key={day.formattedValue}
                              type="button"
                              onClick={() => setSelectedDate(day.formattedValue)}
                              className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                                isSelected 
                                  ? "bg-primary border-primary text-on-primary shadow-sm" 
                                  : day.isWeekend 
                                    ? "bg-surface-container border-outline/10 text-secondary/70 opacity-80" 
                                    : "bg-surface-container-lowest border-outline/10 text-on-surface hover:bg-surface-container-low"
                              }`}
                            >
                              <span className="text-[10px] uppercase font-semibold opacity-75">{day.monthName}</span>
                              <span className="text-sm font-serif font-bold my-0.5">{day.dayNumber}</span>
                              <span className="text-[10px] uppercase font-semibold opacity-75">{day.dayName}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slot Selector */}
                    {selectedDate && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <label className="block text-xs uppercase tracking-wider font-semibold text-secondary flex items-center gap-1">
                          <Clock size={14} className="text-primary" />
                          3. Choose Available Time
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = selectedTimeSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-2 px-1 rounded-lg border text-center text-xs font-semibold transition-all ${
                                  isSelected 
                                    ? "bg-primary border-primary text-on-primary shadow-sm" 
                                    : "bg-surface-container-lowest border-outline/10 text-on-surface hover:bg-surface-container-low"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Client Forms */}
                    {selectedDate && selectedTimeSlot && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 pt-2 border-t border-outline/10"
                      >
                        <span className="block text-xs uppercase tracking-wider font-semibold text-secondary">
                          4. Provide Your Contact Details
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"><User size={16} /></span>
                            <input
                              type="text"
                              required
                              placeholder="Your Name (e.g. Nicholas)"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-surface-container-lowest border-outline/25 focus:border-primary focus:ring-0 rounded-xl pl-11 pr-4 py-3 text-sm font-sans"
                            />
                          </div>

                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"><Mail size={16} /></span>
                            <input
                              type="email"
                              required
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-surface-container-lowest border-outline/25 focus:border-primary focus:ring-0 rounded-xl pl-11 pr-4 py-3 text-sm font-sans"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <span className="absolute left-4 top-4 text-outline"><FileText size={16} /></span>
                          <textarea
                            placeholder="Optional: Mention what you hope to address, debug or reflect (e.g., career burnout, software isolation, spiritual blockages)..."
                            value={formData.notes}
                            rows={3}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full bg-surface-container-lowest border-outline/25 focus:border-primary focus:ring-0 rounded-xl pl-11 pr-4 py-3 text-sm font-sans"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2 flex justify-end">
                          <button
                            type="submit"
                            className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 active:scale-95 soft-shadow"
                          >
                            Confirm Booking Reservation
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </form>
                </div>
              ) : (
                /* Success screen inside booking tab */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 max-w-md mx-auto text-center"
                >
                  <CheckCircle2 size={56} className="text-primary mb-4" />
                  <h3 className="font-serif text-2xl text-on-surface font-semibold mb-2">Reservation Scheduled</h3>
                  <p className="text-sm text-on-surface-variant font-sans mb-6">
                    Peace has been committed. An automated confirmation thread and self-guided questionnaire has been dispatched to <span className="font-semibold text-primary">{newBooking?.email}</span>.
                  </p>

                  {/* Summary ticket */}
                  <div className="w-full bg-surface-container-low border border-outline/10 rounded-2xl p-5 text-left mb-8 space-y-3">
                    <div className="flex justify-between border-b border-outline/5 pb-2">
                      <span className="text-xs uppercase text-secondary font-bold font-sans">Scheduled Session:</span>
                      <span className="text-xs font-bold font-sans text-primary">Confirmed ✓</span>
                    </div>
                    
                    <div className="text-sm font-serif font-medium text-on-surface leading-tight">
                      {newBooking?.sessionType.title}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <Calendar size={14} className="text-primary" />
                      <span>{newBooking && formatDateLabel(newBooking.date)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <Clock size={14} className="text-primary" />
                      <span>{newBooking?.timeSlot} ({newBooking?.sessionType.duration})</span>
                    </div>

                    <div className="border-t border-outline/5 pt-2 flex justify-between items-center text-xs">
                      <span className="text-secondary font-sans">Registered Host:</span>
                      <span className="font-semibold text-on-surface font-sans">{newBooking?.name}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={resetForm}
                      className="border border-outline px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-surface-container-high transition-colors"
                    >
                      Book Another
                    </button>
                    <button
                      onClick={() => setActiveTab("my-sessions")}
                      className="bg-primary text-on-primary px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
                    >
                      View All Bookings
                    </button>
                  </div>
                </motion.div>
              )
            ) : (
              /* MY SESSIONS TAB */
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {bookedSessions.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-sm text-secondary font-sans mb-4">No reservations registered under this browser session.</p>
                    <button
                      onClick={() => setActiveTab("book")}
                      className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90"
                    >
                      Schedule first session
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookedSessions.map((booking) => (
                      <div 
                        key={booking.id}
                        className="bg-surface-container-lowest border border-outline/10 rounded-2xl p-5 hover:border-primary transition-colors flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#a96245] bg-[#a96245]/10 px-2 py-0.5 rounded-full">
                              {booking.sessionType.price}
                            </span>
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="text-outline hover:text-error transition-colors p-1"
                              title="Cancel Session"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          
                          <h4 className="font-serif text-base font-semibold text-on-surface leading-snug">{booking.sessionType.title}</h4>
                          
                          <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant pt-2 border-t border-outline/5">
                            <div className="flex items-center gap-1.5 leading-none">
                              <Calendar size={13} className="text-primary" />
                              <span>{formatDateLabel(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 leading-none mt-1">
                              <Clock size={13} className="text-primary" />
                              <span>{booking.timeSlot} ({booking.sessionType.duration})</span>
                            </div>
                            <div className="flex items-center gap-1.5 leading-none mt-1">
                              <User size={13} className="text-primary" />
                              <span>{booking.name}</span>
                            </div>
                          </div>
                          {booking.notes && (
                            <p className="text-[11px] text-on-surface-variant italic font-sans border-l-2 border-primary/20 pl-2 py-1 mt-2 bg-surface-container-low/40 rounded-r-lg">
                              &ldquo;{booking.notes}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
