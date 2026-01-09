
"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        service: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: `Contact Form - ${formData.service || "General"}`,
                    message: formData.message,
                    phone: formData.phone,
                    city: formData.city,
                    country: formData.country,
                    service: formData.service
                })
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", city: "", country: "", service: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="cement-card" style={{ padding: 40, background: "#fff", display: "flex", flexDirection: "column", gap: 24 }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Email</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@company.com" style={inputStyle} />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Contact Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>City</label>
                    <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="New York" style={inputStyle} />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Country</label>
                    <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder="United States" style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Service</label>
                    <select name="service" value={formData.service} onChange={handleChange} style={{ ...inputStyle, appearance: "none" }}>
                        <option value="">Select a service...</option>
                        <option value="AI Voice Agent">AI Voice Agent</option>
                        <option value="AI Chatbot">AI Chatbot</option>
                        <option value="SaaS Product">SaaS Product</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="AI Automation">AI Automation</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Multiple or Other">Multiple or Other</option>
                    </select>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--token-fg-secondary)" }}>Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us about your project..." style={{ ...inputStyle, resize: "none", fontFamily: "var(--font-main)" }} />
            </div>

            <button disabled={status === "submitting"} type="submit" className="btn-cement-primary" style={{ marginTop: 16, display: "flex", justifyContent: "center", alignItems: 'center', gap: 8 }}>
                {status === "submitting" ? <Loader2 className="animate-spin" size={18} /> : <>Send Message <ArrowRight size={18} /></>}
            </button>

            {status === "success" && (
                <div style={{ color: "green", fontSize: 14, textAlign: "center", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <CheckCircle size={16} /> Message sent successfully!
                </div>
            )}
            {status === "error" && (
                <div style={{ color: "red", fontSize: 14, textAlign: "center" }}>
                    Failed to send. Please try again.
                </div>
            )}

        </form>
    );
}

const inputStyle = {
    padding: 16,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
    fontSize: 15,
    outline: "none",
    boxShadow: "0 4px 0 rgba(0,0,0,0.05)"
};
