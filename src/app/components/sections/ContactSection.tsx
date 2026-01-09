import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        need: "",
        description: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        const payload = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            subject: `${formData.need || 'Inquiry'} - ${formData.description || 'General'}`,
            message: `${formData.message}\n\nPhone: ${formData.phone}`
        };

        try {
            const res = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", phone: "", need: "", description: "", message: "" });
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
        <section style={{ padding: "80px 0 120px", background: "var(--token-bg-page)" }}>
            <div className="container" style={{ background: "var(--token-bg-surface)", borderRadius: 0, padding: 0, display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 0 }}>

                {/* Left: Info */}
                <div style={{ padding: "60px 40px", display: "flex", flexDirection: "column", gap: 32 }}>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "var(--foreground)" }}>Connect</div>
                        <h2 style={{ fontSize: 48, fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--foreground)", marginBottom: 16 }}>Get in touch</h2>
                        <p style={{ color: "var(--token-fg-secondary)", fontSize: 16 }}>Tell us about your project and let's build something real.</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: "auto" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                            <Mail size={18} /> <span>hello@analogyintelligence.com</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                            <Phone size={18} /> <span>+1 (555) 000-0000</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                            <MapPin size={18} /> <span>123 Sample St, Sydney NSW 2000 AU</span>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div style={{ padding: "60px 60px", background: "var(--token-bg-page)" }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <label style={{ fontSize: 14, fontWeight: 500 }}>First name</label>
                                <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" style={{ padding: 12, background: "rgba(0,0,0,0.05)", border: "none", borderRadius: 4 }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <label style={{ fontSize: 14, fontWeight: 500 }}>Last name</label>
                                <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" style={{ padding: 12, background: "rgba(0,0,0,0.05)", border: "none", borderRadius: 4 }} />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <label style={{ fontSize: 14, fontWeight: 500 }}>Email</label>
                                <input required name="email" value={formData.email} onChange={handleChange} type="email" style={{ padding: 12, background: "rgba(0,0,0,0.05)", border: "none", borderRadius: 4 }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <label style={{ fontSize: 14, fontWeight: 500 }}>Phone number</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" style={{ padding: 12, background: "rgba(0,0,0,0.05)", border: "none", borderRadius: 4 }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <label style={{ fontSize: 14, fontWeight: 500 }}>What do you need?</label>
                            <select name="need" value={formData.need} onChange={handleChange} style={{ padding: 12, background: "rgba(0,0,0,0.05)", border: "none", borderRadius: 4 }}>
                                <option value="">Select one...</option>
                                <option value="Strategy">Strategy Consultation</option>
                                <option value="Development">Software Development</option>
                                <option value="Automation">AI Automation</option>
                            </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <label style={{ fontSize: 14, fontWeight: 500 }}>Which best describes you?</label>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {["Early stage startup", "Growing business", "Enterprise company", "Freelancer or agency", "Individual or hobbyist", "Other"].map(opt => (
                                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                                        <input
                                            type="radio"
                                            name="description"
                                            value={opt}
                                            checked={formData.description === opt}
                                            onChange={handleChange}
                                            style={{ accentColor: "#000" }}
                                        /> {opt}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <label style={{ fontSize: 14, fontWeight: 500 }}>Message</label>
                            <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us what you're building..." style={{ padding: 12, background: "rgba(0,0,0,0.05)", border: "none", borderRadius: 4, fontFamily: "inherit" }} />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                                <input required type="checkbox" style={{ accentColor: "#000" }} /> I agree to the Terms and Conditions.
                            </label>
                        </div>

                        <button
                            disabled={status === "submitting"}
                            className="btn-base btn-cement-primary"
                            style={{ width: "fit-content", display: 'flex', alignItems: 'center', gap: 8 }}
                        >
                            {status === "submitting" ? <Loader2 className="animate-spin" size={16} /> : "Send Message"}
                        </button>

                        {status === "success" && (
                            <div style={{ color: "green", display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
                                <CheckCircle size={18} /> Message sent successfully! We'll be in touch.
                            </div>
                        )}
                        {status === "error" && (
                            <div style={{ color: "red", marginTop: 16 }}>
                                Failed to send message. Please try again.
                            </div>
                        )}

                    </form>
                </div>

            </div>
        </section>
    );
}
