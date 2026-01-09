"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check, Loader2, PartyPopper } from "lucide-react";
import confetti from 'canvas-confetti';

export default function Consultation() {
    const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "", phone: "", city: "", country: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Simplified for demo
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const [showSuccess, setShowSuccess] = useState(false);

    // Trigger confetti when success modal opens
    useEffect(() => {
        if (showSuccess) {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
                zIndex: 99999
            };

            function fire(particleRatio: number, opts: any) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            }

            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        }
    }, [showSuccess]);


    // Simple Calendar Logic
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

    const timeSlots = ["10:00 AM - 11:00 AM", "01:00 PM - 03:00 PM", "04:00 PM - 06:00 PM"];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) {
            alert("Please select a date and time first.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientName: formState.name,
                    clientEmail: formState.email,
                    phone: formState.phone,
                    company: formState.company,
                    city: formState.city,
                    country: formState.country,
                    message: formState.message,
                    date: `${currentYear}-${currentMonth + 1}-${selectedDate}`,
                    time: selectedTime,
                    type: 'consultation'
                })
            });

            if (res.ok) {
                setShowSuccess(true);
                setFormState({ name: "", email: "", company: "", message: "", phone: "", city: "", country: "" });
                setSelectedDate(null);
                setSelectedTime(null);
            } else {
                alert("Failed to book. Please try again.");
            }
        } catch (error) {
            console.error("Booking failed", error);
            alert("Error booking consultation.");
        }
        setIsSubmitting(false);
    };

    return (
        <main style={{ minHeight: "100vh", background: "var(--token-bg-page)", paddingTop: 140, paddingBottom: 120, position: "relative" }}>

            {/* Loading Overlay */}
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                            background: "rgba(255,255,255,0.8)",
                            backdropFilter: "blur(4px)",
                            zIndex: 9998,
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", gap: 16
                        }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 size={48} color="#000" />
                        </motion.div>
                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ fontSize: 16, fontWeight: 600, color: "#333", letterSpacing: -0.5 }}
                        >
                            Securing your slot...
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <div style={{
                        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20
                    }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccess(false)}
                            style={{
                                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                                background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)"
                            }}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            style={{
                                background: "#fff",
                                padding: 48,
                                borderRadius: 32,
                                maxWidth: 520,
                                width: "100%",
                                textAlign: "center",
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                position: "relative",
                                zIndex: 10000,
                                border: "1px solid rgba(255,255,255,0.5)"
                            }}
                        >
                            <div style={{
                                width: 96, height: 96,
                                background: "linear-gradient(135deg, #000 0%, #333 100%)",
                                borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                margin: "0 auto 32px",
                                boxShadow: "0 12px 24px rgba(0,0,0,0.2)"
                            }}>
                                <Check size={48} color="#fff" strokeWidth={3} />
                            </div>

                            <h2 style={{
                                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                                fontWeight: 800,
                                marginBottom: 16,
                                letterSpacing: -1,
                                lineHeight: 1
                            }}>
                                All Set!
                            </h2>

                            <p style={{
                                fontSize: 18,
                                color: "#666",
                                lineHeight: 1.6,
                                marginBottom: 40,
                                fontWeight: 500
                            }}>
                                Your strategy session is confirmed. We've just sent a calendar invite to your inbox.
                            </p>

                            <div style={{ display: "flex", gap: 12 }}>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="btn-cement-primary"
                                    style={{
                                        flex: 1,
                                        cursor: "pointer",
                                        height: 56,
                                        fontSize: 16,
                                        fontWeight: 600
                                    }}
                                >
                                    Done
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="container" style={{ maxWidth: 1200 }}>

                {/* Top Context Section */}
                <div style={{ textAlign: "center", marginBottom: 80, maxWidth: 800, margin: "0 auto 80px" }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            fontWeight: 700,
                            color: "var(--foreground)",
                            marginBottom: 12,
                            fontFamily: "var(--font-heading)",
                            lineHeight: 1.1,
                            textTransform: "capitalize" // Ensure casing
                        }}
                    >
                        Book Free Consultancy
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}
                    >
                        <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--token-fg-secondary)" }}>Analyze</span>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--token-fg-secondary)", opacity: 0.5 }}></span>
                        <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--token-fg-secondary)" }}>Automate</span>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--token-fg-secondary)", opacity: 0.5 }}></span>
                        <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--token-fg-secondary)" }}>Accelerate</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--token-fg-secondary)" }}
                    >
                        Book a call to analyze where you can apply AI solutions or software to reduce manual work and let software do the work on your behalf. Confused which service will be a good fit? Connect with us to discover your pain points and build a roadmap for growth.
                    </motion.p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 40 }}>

                    {/* Left Column: Calendar & Time */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="cement-card"
                        style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column" }}
                    >
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                <CalendarIcon size={20} color="var(--token-fg-primary)" />
                                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Select a Date</h3>
                            </div>
                            <p style={{ fontSize: 14, color: "var(--token-fg-secondary)" }}>Choose a day for your 30-min strategy session.</p>
                        </div>

                        {/* Calendar Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <button onClick={() => setCurrentMonth(currentMonth - 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}><ChevronLeft size={20} /></button>
                            <span style={{ fontWeight: 700, fontSize: 16 }}>{monthName} {currentYear}</span>
                            <button onClick={() => setCurrentMonth(currentMonth + 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}><ChevronRight size={20} /></button>
                        </div>

                        {/* Calendar Grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 32 }}>
                            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                <div key={i} style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "var(--token-fg-secondary)", paddingBottom: 8 }}>{d}</div>
                            ))}
                            {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                            {Array(daysInMonth).fill(null).map((_, i) => {
                                const day = i + 1;
                                const dateObj = new Date(currentYear, currentMonth, day);
                                const isPast = dateObj < today;
                                const isSelected = selectedDate === day;

                                return (
                                    <button
                                        key={day}
                                        onClick={() => !isPast && setSelectedDate(day)}
                                        disabled={isPast}
                                        style={{
                                            width: "100%", aspectRatio: "1/1",
                                            borderRadius: "50%",
                                            border: isSelected ? "none" : "1px solid transparent",
                                            background: isSelected ? "#000" : "transparent",
                                            color: isSelected ? "#fff" : (isPast ? "#ccc" : "var(--foreground)"),
                                            fontWeight: isSelected ? 600 : 400,
                                            cursor: isPast ? "not-allowed" : "pointer",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 14,
                                            transition: "all 0.2s",
                                            opacity: isPast ? 0.5 : 1
                                        }}
                                        className="calendar-day"
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Time Slots */}
                        <div style={{ marginTop: "auto" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                <Clock size={20} color="var(--token-fg-primary)" />
                                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Select a Time</h3>
                            </div>
                            <div style={{ display: "flex", flexWrap: "nowrap", gap: 8, overflowX: "auto" }}>
                                {timeSlots.map(time => {
                                    const isSelected = selectedTime === time;

                                    // Check if time is in past for today
                                    let isDisabled = false;
                                    if (selectedDate) {
                                        const checkDate = new Date(currentYear, currentMonth, selectedDate);
                                        const now = new Date();

                                        // Use toDateString for safe comparison of "Today"
                                        if (checkDate.toDateString() === now.toDateString()) {
                                            const [startTime, _] = time.split("-"); // "10:00 AM "
                                            const cleanStartTime = startTime.trim();
                                            const [timePart, modifier] = cleanStartTime.split(" ");
                                            let [hours, minutes] = timePart.split(":").map(Number);

                                            if (modifier === "PM" && hours < 12) hours += 12;
                                            if (modifier === "AM" && hours === 12) hours = 0;

                                            const slotTime = new Date(checkDate);
                                            slotTime.setHours(hours, minutes, 0, 0);

                                            // Add small buffer if needed, but strict is fine
                                            if (slotTime < now) isDisabled = true;
                                        }
                                    }

                                    return (
                                        <button
                                            key={time}
                                            onClick={() => !isDisabled && setSelectedTime(time)}
                                            disabled={isDisabled}
                                            style={{
                                                padding: "12px 4px",
                                                borderRadius: 8,
                                                border: isSelected ? "1px solid #000" : "1px solid rgba(0,0,0,0.04)",
                                                background: isSelected ? "#000" : (isDisabled ? "#f5f5f5" : "#fff"),
                                                color: isSelected ? "#fff" : (isDisabled ? "#ccc" : "var(--foreground)"),
                                                fontSize: 13,
                                                fontWeight: 600,
                                                cursor: isDisabled ? "not-allowed" : "pointer",
                                                transition: "all 0.1s",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flex: 1,
                                                minWidth: 0,
                                                whiteSpace: "nowrap",
                                                boxShadow: isSelected ? "0 4px 0 rgba(0,0,0,0.2)" : (isDisabled ? "none" : "0 3px 0 rgba(0,0,0,0.04)"),
                                                transform: isSelected ? "translateY(-1px)" : "none",
                                                opacity: isDisabled ? 0.6 : 1
                                            }}
                                        >
                                            {time}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="cement-card"
                        style={{ padding: 40, height: "100%", display: "flex", flexDirection: "column" }}
                    >
                        <div style={{ marginBottom: 32 }}>
                            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Your Details</h3>
                            <p style={{ fontSize: 14, color: "var(--token-fg-secondary)" }}>Tell us a bit about yourself so we can prepare.</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        style={{
                                            padding: "16px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            background: "#fff",
                                            fontSize: 15,
                                            outline: "none",
                                            width: "100%",
                                            boxShadow: "0 4px 0 rgba(0,0,0,0.05)" // Detached input look
                                        }}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@company.com"
                                        style={{
                                            padding: "16px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            background: "#fff",
                                            fontSize: 15,
                                            outline: "none",
                                            width: "100%",
                                            boxShadow: "0 4px 0 rgba(0,0,0,0.05)"
                                        }}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        style={{
                                            padding: "16px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            background: "#fff",
                                            fontSize: 15,
                                            outline: "none",
                                            width: "100%",
                                            boxShadow: "0 4px 0 rgba(0,0,0,0.05)"
                                        }}
                                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Company</label>
                                    <input
                                        type="text"
                                        placeholder="Acme Inc."
                                        style={{
                                            padding: "16px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            background: "#fff",
                                            fontSize: 15,
                                            outline: "none",
                                            width: "100%",
                                            boxShadow: "0 4px 0 rgba(0,0,0,0.05)"
                                        }}
                                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>City</label>
                                    <input
                                        type="text"
                                        placeholder="New York"
                                        style={{
                                            padding: "16px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            background: "#fff",
                                            fontSize: 15,
                                            outline: "none",
                                            width: "100%",
                                            boxShadow: "0 4px 0 rgba(0,0,0,0.05)"
                                        }}
                                        onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Country</label>
                                    <input
                                        type="text"
                                        placeholder="United States"
                                        style={{
                                            padding: "16px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            background: "#fff",
                                            fontSize: 15,
                                            outline: "none",
                                            width: "100%",
                                            boxShadow: "0 4px 0 rgba(0,0,0,0.05)"
                                        }}
                                        onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>What are you looking to solve?</label>
                                <textarea
                                    rows={4}
                                    placeholder="Briefly describe your pain points or goals..."
                                    style={{
                                        padding: "16px",
                                        borderRadius: 12,
                                        border: "1px solid rgba(0,0,0,0.08)",
                                        background: "#fff",
                                        fontSize: 15,
                                        fontFamily: "var(--font-main)",
                                        outline: "none",
                                        width: "100%",
                                        resize: "none",
                                        flex: 1,
                                        minHeight: 120,
                                        boxShadow: "0 4px 0 rgba(0,0,0,0.05)"
                                    }}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-cement-primary"
                                style={{
                                    marginTop: 16,
                                    width: "100%",
                                    cursor: "pointer",
                                    opacity: isSubmitting ? 0.7 : 1,
                                    fontSize: 16
                                }}
                            >
                                {isSubmitting ? "Book Consultation" : (
                                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        Confirm Booking <Check size={18} />
                                    </span>
                                )}
                            </button>

                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
