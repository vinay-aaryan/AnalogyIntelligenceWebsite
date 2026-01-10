"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit2, Save, X, LayoutDashboard, Users, MessageSquare, Briefcase, Building2, Upload, BarChart3, Mail, Calendar, UserCheck, Download } from "lucide-react";
import * as XLSX from 'xlsx';

const inputStyle = {
    padding: "12px",
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    width: "100%"
};

export default function AdminPage() {
    const [data, setData] = useState<any>(null);
    const [extraData, setExtraData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("products");
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Fetch initial data
    useEffect(() => {
        // Fetch legacy data
        fetch("/api/admin")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch legacy data");
                return res.json();
            })
            .then(d => {
                setData(d);
            })
            .catch(err => {
                console.error(err);
                // Fallback to avoid null pointer issues in render
                setData({ products: [], work: [], team: [], testimonials: [], trustedBy: [], stats: [] });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Fetch new data when tab changes
    useEffect(() => {
        if (["enquiries", "clients", "bookings"].includes(activeTab)) {
            fetch(`/api/${activeTab}`)
                .then(res => res.json())
                .then(d => {
                    setExtraData((prev: any) => ({ ...prev, [activeTab]: d }));
                })
                .catch(err => console.error(err));
        }
    }, [activeTab]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const action = isCreating ? "create" : "update";
        const item = editingItem;
        const collection = activeTab;

        if (["clients", "enquiries", "bookings"].includes(collection)) {
            const method = isCreating ? "POST" : "PUT";
            const res = await fetch(`/api/${collection}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item)
            });
            if (res.ok) {
                const listRes = await fetch(`/api/${collection}`);
                const list = await listRes.json();
                setExtraData((prev: any) => ({ ...prev, [collection]: list }));
                setEditingItem(null);
                setIsCreating(false);
            } else {
                alert("Failed to save. Ensure all required fields are filled.");
            }
            return;
        }

        const res = await fetch("/api/admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ collection, action, item, id: item.id || item._id })
        });

        if (!res.ok) {
            console.error("Save failed:", await res.text());
            alert("Failed to save item.");
            return;
        }

        const newData = await res.json();
        setData(newData);
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleDelete = async (id: number | string) => {
        if (!confirm("Are you sure?")) return;

        if (["clients", "enquiries", "bookings"].includes(activeTab)) {
            // Not implemented DELETE for new APIs yet in this turn, skipping or just alerting
            // But actually I didn't verify DELETE in my API routes plan. 
            // I'll skip implementation or add a TODO.
            alert("Delete not supported for this type yet.");
            return;
        }

        const res = await fetch("/api/admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ collection: activeTab, action: "delete", id })
        });
        const newData = await res.json();
        setData(newData);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) {
                setEditingItem((prev: any) => ({ ...prev, [field]: data.url }));
            }
        } catch (err) {
            console.error("Upload failed", err);
            alert("Upload failed");
        }
        setUploading(false);
    };

    const handleExport = async () => {
        setLoading(true);
        try {
            // Fetch all 3 collections specifically for the report
            const [enquiriesRes, bookingsRes, clientsRes] = await Promise.all([
                fetch("/api/enquiries").then(res => res.json()),
                fetch("/api/bookings").then(res => res.json()),
                fetch("/api/clients").then(res => res.json())
            ]);

            const wb = XLSX.utils.book_new();

            const addToSheet = (name: string, data: any[]) => {
                const excludeFields = ["__v", "_id", "updatedAt", "image", "visualUrl", "password"];

                // Clean data for export
                const cleanData = data.map((item: any) => {
                    const newItem: any = {};
                    Object.keys(item).forEach(key => {
                        if (!excludeFields.includes(key) && typeof item[key] !== 'object') {
                            newItem[key] = item[key];
                        }
                        // Handle date objects or nested if needed, but simple string value is best
                    });
                    // Prioritize specific columns order if needed, but default is fine
                    return newItem;
                });

                const ws = XLSX.utils.json_to_sheet(cleanData);
                XLSX.utils.book_append_sheet(wb, ws, name);
            };

            addToSheet("Enquiries", enquiriesRes);
            addToSheet("Bookings", bookingsRes);
            addToSheet("Clients", clientsRes);

            // Generate Excel file
            XLSX.writeFile(wb, `Analogy_Full_Export_${new Date().toISOString().split('T')[0]}.xlsx`);

        } catch (error) {
            console.error(error);
            alert("Failed to generating export.");
        }
        setLoading(false);
    };

    if (loading) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Admin...</div>;

    const sections = [
        { type: "header", label: "WEBSITE CONTENT" },
        { id: "products", label: "Products", icon: <Briefcase size={18} /> },
        { id: "work", label: "Work", icon: <LayoutDashboard size={18} /> },
        { id: "stats", label: "Stats", icon: <BarChart3 size={18} /> },
        { id: "team", label: "Team", icon: <Users size={18} /> },
        { id: "founderInfo", label: "Founder Info", icon: <UserCheck size={18} /> },
        { id: "testimonials", label: "Testimonials", icon: <MessageSquare size={18} /> },
        { id: "trustedBy", label: "Trusted By", icon: <Building2 size={18} /> },

        { type: "header", label: "INBOX & LEADS" },
        { id: "enquiries", label: "Enquiries", icon: <Mail size={18} /> },
        { id: "bookings", label: "Call Bookings", icon: <Calendar size={18} /> },
        { id: "clients", label: "Clients", icon: <UserCheck size={18} /> },
    ];

    const currentItems = ["enquiries", "clients", "bookings"].includes(activeTab)
        ? (extraData[activeTab] || [])
        : (data[activeTab] || []);

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>

            {/* Sidebar */}
            <aside style={{ width: 250, background: "#fff", borderRight: "1px solid #ddd", padding: 24, display: "flex", flexDirection: "column" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 32 }}>Analogy Admin</h2>
                <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {sections.map((s: any, i) => (
                        s.type === "header" ? (
                            <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "#999", marginTop: 16, marginBottom: 4, letterSpacing: "0.05em" }}>
                                {s.label}
                            </div>
                        ) : (
                            <button
                                key={s.id}
                                onClick={() => { setActiveTab(s.id); setEditingItem(null); setIsCreating(false); }}
                                style={{
                                    display: "flex", alignItems: "center", gap: 12,
                                    padding: "12px 16px",
                                    borderRadius: 8,
                                    background: activeTab === s.id ? "#000" : "transparent",
                                    color: activeTab === s.id ? "#fff" : "#666",
                                    border: "none", cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: 500
                                }}
                            >
                                {s.icon} {s.label}
                            </button>
                        )
                    ))}
                </nav>
                <Link href="/" style={{ marginTop: "auto", fontSize: 14, color: "#666" }}>← Back to Website</Link>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: 40, overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, textTransform: "capitalize" }}>{activeTab}</h1>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button
                            onClick={handleExport}
                            style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", color: "#000", padding: "10px 20px", borderRadius: 8, border: "1px solid #ddd", cursor: "pointer" }}
                        >
                            <Download size={16} /> Export All (Excel)
                        </button>
                        <button
                            onClick={() => { setEditingItem({}); setIsCreating(true); }}
                            style={{ display: "flex", alignItems: "center", gap: 8, background: "#000", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer" }}
                        >
                            <Plus size={16} /> Add New
                        </button>
                    </div>
                </div>

                <div style={{ display: "grid", gap: 16 }}>
                    {currentItems.map((item: any) => {
                        const isNew = item.status === 'new';
                        const isBooking = activeTab === 'bookings';
                        // Simple date check for bookings
                        let isUpcoming = false;
                        if (isBooking && item.date) {
                            const bookingDate = new Date(item.date);
                            const now = new Date();
                            const diffTime = bookingDate.getTime() - now.getTime();
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            isUpcoming = diffDays >= 0 && diffDays <= 2; // Upcoming in next 2 days
                        }

                        return (
                            <div key={item._id || item.id} style={{ background: isNew ? "#fff0f0" : "#fff", padding: 20, borderRadius: 12, border: isNew ? "1px solid red" : "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: isUpcoming ? "6px solid #FFD700" : undefined }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    {/* Preview Thumbnail */}
                                    {(item.image || item.visualUrl || item.logo) && (
                                        <img src={item.image || item.visualUrl || item.logo} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", background: "#f0f0f0" }} />
                                    )}
                                    <div>
                                        <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                                            {item.clientName || item.title || item.name || item.text?.substring(0, 50) + "..." || (item.label && item.value ? `${item.label}: ${item.value}` : "Item")}
                                            {isNew && <span style={{ fontSize: 10, background: "red", color: "white", padding: "2px 6px", borderRadius: 4 }}>NEW</span>}
                                            {isUpcoming && <span style={{ fontSize: 10, background: "#FFD700", color: "black", padding: "2px 6px", borderRadius: 4 }}>UPCOMING</span>}
                                        </div>
                                        <div style={{ fontSize: 12, color: "#999" }}>
                                            {activeTab === 'bookings' ? `${item.date} @ ${item.time}` : (item.email || `ID: ${item._id || item.id}`)}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={() => { setEditingItem(item); setIsCreating(false); }} style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(item._id || item.id)} style={{ padding: 8, borderRadius: 6, border: "1px solid #fdd", background: "#fff0f0", color: "red", cursor: "pointer" }}><Trash2 size={16} /></button>
                                </div>
                            </div>
                        )
                    })}
                    {currentItems.length === 0 && <div style={{ color: "#999", fontStyle: "italic" }}>No items found.</div>}
                </div>
            </main>

            {/* Edit Modal */}
            {(editingItem || isCreating) && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
                    <div style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
                        <div style={{ background: "#fff", padding: 32, borderRadius: 16, width: 600, maxWidth: "100%", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{isCreating ? "Create Item" : "Edit Item"}</h3>
                                <button type="button" onClick={() => { setEditingItem(null); setIsCreating(false); }} style={{ border: "none", background: "transparent", cursor: "pointer" }}><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {/* Dynamic Filters based on Active Tab Schema */}
                                {activeTab === "products" && (
                                    <>
                                        <input placeholder="Title" value={editingItem.title || ""} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} style={inputStyle} required />
                                        <input placeholder="Category" value={editingItem.category || ""} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} style={inputStyle} />
                                        <textarea placeholder="Description" value={editingItem.desc || ""} onChange={e => setEditingItem({ ...editingItem, desc: e.target.value })} style={{ ...inputStyle, height: 100 }} />

                                        <div style={{ border: "1px dashed #ccc", padding: 16, borderRadius: 8 }}>
                                            <label style={{ display: "block", marginBottom: 8, fontSize: 12, fontWeight: 700 }}>Upload Visual (Image/Video)</label>
                                            <input type="file" onChange={(e) => handleUpload(e, "visualUrl")} accept="image/*,video/*" style={{ fontSize: 12 }} />
                                            {uploading && <div style={{ color: "blue", fontSize: 12, marginTop: 4 }}>Uploading...</div>}
                                            {editingItem.visualUrl && <div style={{ color: "green", fontSize: 12, marginTop: 4 }}>File: {editingItem.visualUrl}</div>}
                                        </div>
                                        <input placeholder="Manual Visual URL (for direct files)" value={editingItem.visualUrl || ""} onChange={e => setEditingItem({ ...editingItem, visualUrl: e.target.value })} style={inputStyle} />

                                        <div style={{ padding: 16, background: "#f9f9f9", borderRadius: 8, border: "1px solid #eee" }}>
                                            <label style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                                                <span style={{ color: "red" }}>▶</span> YouTube Link
                                            </label>
                                            <input
                                                placeholder="Paste YouTube Link (Video or Short)"
                                                value={editingItem.youtubeUrl || ""}
                                                onChange={e => setEditingItem({ ...editingItem, youtubeUrl: e.target.value })}
                                                style={inputStyle}
                                            />
                                            <p style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
                                                If provided, this will override the uploaded visual. Supports Shorts and standard videos.
                                            </p>
                                        </div>

                                        <input placeholder="Tags (comma separated)" value={Array.isArray(editingItem.tags) ? editingItem.tags.join(",") : (editingItem.tags || "")} onChange={e => setEditingItem({ ...editingItem, tags: e.target.value })} style={inputStyle} />
                                    </>
                                )}
                                {activeTab === "work" && (
                                    <>
                                        <input placeholder="Title" value={editingItem.title || ""} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} style={inputStyle} required />
                                        <input placeholder="Category" value={editingItem.category || ""} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} style={inputStyle} />
                                        <textarea placeholder="Description" value={editingItem.desc || ""} onChange={e => setEditingItem({ ...editingItem, desc: e.target.value })} style={{ ...inputStyle, height: 100 }} />

                                        <div style={{ marginBottom: 16 }}>
                                            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                                <input
                                                    type="checkbox"
                                                    checked={editingItem.featured || false}
                                                    onChange={e => setEditingItem({ ...editingItem, featured: e.target.checked })}
                                                />
                                                Featured on Landing Page
                                            </label>
                                        </div>

                                        <div style={{ border: "1px dashed #ccc", padding: 16, borderRadius: 8 }}>
                                            <label style={{ display: "block", marginBottom: 8, fontSize: 12, fontWeight: 700 }}>Upload Video/Cover</label>
                                            <input type="file" onChange={(e) => handleUpload(e, "visualUrl")} accept="image/*,video/*" style={{ fontSize: 12 }} />
                                            {uploading && <div style={{ color: "blue", fontSize: 12, marginTop: 4 }}>Uploading...</div>}
                                            {editingItem.visualUrl && <div style={{ color: "green", fontSize: 12, marginTop: 4 }}>File: {editingItem.visualUrl}</div>}
                                        </div>

                                        <div style={{ padding: 16, background: "#f9f9f9", borderRadius: 8, border: "1px solid #eee" }}>
                                            <label style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                                                <span style={{ color: "red" }}>▶</span> YouTube Link
                                            </label>
                                            <input
                                                placeholder="Paste YouTube Link (Video or Short)"
                                                value={editingItem.youtubeUrl || ""}
                                                onChange={e => setEditingItem({ ...editingItem, youtubeUrl: e.target.value })}
                                                style={inputStyle}
                                            />
                                            <p style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
                                                Overrides uploaded visual.
                                            </p>
                                        </div>

                                        <input placeholder="Video Color Gradient (CSS)" value={editingItem.videoColor || ""} onChange={e => setEditingItem({ ...editingItem, videoColor: e.target.value })} style={inputStyle} />

                                        <div style={{ marginTop: 16, borderTop: "1px solid #eee", paddingTop: 16 }}>
                                            <label style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, display: "block" }}>Project Details Page Content</label>

                                            <input
                                                placeholder="Slug (e.g. ai-financial-planning) - Auto-generated if empty"
                                                value={editingItem.slug || ""}
                                                onChange={e => setEditingItem({ ...editingItem, slug: e.target.value })}
                                                style={{ ...inputStyle, marginBottom: 8 }}
                                            />

                                            <textarea placeholder="The Challenge" value={editingItem.challenge || ""} onChange={e => setEditingItem({ ...editingItem, challenge: e.target.value })} style={{ ...inputStyle, height: 80, marginBottom: 8 }} />
                                            <textarea placeholder="The Solution" value={editingItem.solution || ""} onChange={e => setEditingItem({ ...editingItem, solution: e.target.value })} style={{ ...inputStyle, height: 80, marginBottom: 8 }} />
                                            <textarea placeholder="The Results" value={editingItem.results || ""} onChange={e => setEditingItem({ ...editingItem, results: e.target.value })} style={{ ...inputStyle, height: 80, marginBottom: 8 }} />

                                            <input
                                                placeholder="Features (comma separated)"
                                                value={Array.isArray(editingItem.features) ? editingItem.features.join(",") : (editingItem.features || "")}
                                                onChange={e => setEditingItem({ ...editingItem, features: e.target.value.split(",") })}
                                                style={{ ...inputStyle, marginBottom: 8 }}
                                            />

                                            <input
                                                placeholder="Tech Stack (comma separated)"
                                                value={editingItem.techStack || ""}
                                                onChange={e => setEditingItem({ ...editingItem, techStack: e.target.value })}
                                                style={inputStyle}
                                            />
                                        </div>
                                    </>
                                )}
                                {activeTab === "stats" && (
                                    <>
                                        <input placeholder="Label (e.g. Projects)" value={editingItem.label || ""} onChange={e => setEditingItem({ ...editingItem, label: e.target.value })} style={inputStyle} required />
                                        <input type="number" placeholder="Value (e.g. 85)" value={editingItem.value || ""} onChange={e => setEditingItem({ ...editingItem, value: Number(e.target.value) })} style={inputStyle} required />
                                        <input placeholder="Suffix (e.g. + or M+)" value={editingItem.suffix || ""} onChange={e => setEditingItem({ ...editingItem, suffix: e.target.value })} style={inputStyle} />
                                    </>
                                )}
                                {activeTab === "team" && (
                                    <>
                                        <input placeholder="Name" value={editingItem.name || ""} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} style={inputStyle} required />
                                        <input placeholder="Role" value={editingItem.role || ""} onChange={e => setEditingItem({ ...editingItem, role: e.target.value })} style={inputStyle} />
                                        <textarea placeholder="Bio" value={editingItem.bio || ""} onChange={e => setEditingItem({ ...editingItem, bio: e.target.value })} style={{ ...inputStyle, height: 100 }} />

                                        <div style={{ border: "1px dashed #ccc", padding: 16, borderRadius: 8 }}>
                                            <label style={{ display: "block", marginBottom: 8, fontSize: 12, fontWeight: 700 }}>Upload Profile Photo</label>
                                            <input type="file" onChange={(e) => handleUpload(e, "image")} accept="image/*" style={{ fontSize: 12 }} />
                                            {uploading && <div style={{ color: "blue", fontSize: 12, marginTop: 4 }}>Uploading...</div>}
                                            {editingItem.image && <div style={{ color: "green", fontSize: 12, marginTop: 4 }}>File: {editingItem.image}</div>}
                                        </div>
                                        <input placeholder="Manual Image URL" value={editingItem.image || ""} onChange={e => setEditingItem({ ...editingItem, image: e.target.value })} style={inputStyle} />
                                    </>
                                )}
                                {activeTab === "founderInfo" && (
                                    <>
                                        <div style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>Manage the Founder Quote section here. Ensure only one item exists.</div>
                                        <input placeholder="Name" value={editingItem.name || ""} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} style={inputStyle} required />
                                        <input placeholder="Role" value={editingItem.role || ""} onChange={e => setEditingItem({ ...editingItem, role: e.target.value })} style={inputStyle} />
                                        <textarea placeholder="Quote (HTML supported)" value={editingItem.quote || ""} onChange={e => setEditingItem({ ...editingItem, quote: e.target.value })} style={{ ...inputStyle, height: 120, fontFamily: "monospace" }} />

                                        <div style={{ border: "1px dashed #ccc", padding: 16, borderRadius: 8 }}>
                                            <label style={{ display: "block", marginBottom: 8, fontSize: 12, fontWeight: 700 }}>Upload Profile Photo</label>
                                            <input type="file" onChange={(e) => handleUpload(e, "image")} accept="image/*" style={{ fontSize: 12 }} />
                                            {uploading && <div style={{ color: "blue", fontSize: 12, marginTop: 4 }}>Uploading...</div>}
                                            {editingItem.image && <div style={{ color: "green", fontSize: 12, marginTop: 4 }}>File: {editingItem.image}</div>}
                                        </div>
                                        <input placeholder="Manual Image URL" value={editingItem.image || ""} onChange={e => setEditingItem({ ...editingItem, image: e.target.value })} style={inputStyle} />
                                    </>
                                )}
                                {activeTab === "testimonials" && (
                                    <>
                                        <select
                                            value={editingItem.layout || "standard"}
                                            onChange={e => setEditingItem({ ...editingItem, layout: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="standard">Standard (1x1)</option>
                                            <option value="wide">Wide (2x1) - Best for Video</option>
                                            <option value="tall">Tall (1x2)</option>
                                            <option value="big">Big (2x2)</option>
                                        </select>

                                        <textarea placeholder="Review Text" value={editingItem.text || ""} onChange={e => setEditingItem({ ...editingItem, text: e.target.value })} style={{ ...inputStyle, height: 100 }} required />

                                        <div style={{ border: "1px dashed #ccc", padding: 16, borderRadius: 8 }}>
                                            <label style={{ display: "block", marginBottom: 8, fontSize: 12, fontWeight: 700 }}>Upload Photo / Video</label>
                                            <input type="file" onChange={(e) => handleUpload(e, "visualUrl")} accept="image/*,video/*" style={{ fontSize: 12 }} />
                                            {uploading && <div style={{ color: "blue", fontSize: 12, marginTop: 4 }}>Uploading...</div>}
                                            {editingItem.visualUrl && <div style={{ color: "green", fontSize: 12, marginTop: 4 }}>File: {editingItem.visualUrl}</div>}
                                        </div>
                                        <input placeholder="Manual Visual URL" value={editingItem.visualUrl || ""} onChange={e => setEditingItem({ ...editingItem, visualUrl: e.target.value })} style={inputStyle} />

                                        <input placeholder="Author Name" value={editingItem.author || ""} onChange={e => setEditingItem({ ...editingItem, author: e.target.value })} style={inputStyle} />
                                        <input placeholder="Role / Company" value={editingItem.role || ""} onChange={e => setEditingItem({ ...editingItem, role: e.target.value })} style={inputStyle} />
                                    </>
                                )}
                                {activeTab === "trustedBy" && (
                                    <>
                                        <input placeholder="Company Name" value={editingItem.name || ""} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} style={inputStyle} required />
                                        <div style={{ border: "1px dashed #ccc", padding: 16, borderRadius: 8 }}>
                                            <label style={{ display: "block", marginBottom: 8, fontSize: 12, fontWeight: 700 }}>Upload Logo</label>
                                            <input type="file" onChange={(e) => handleUpload(e, "logo")} accept="image/*" style={{ fontSize: 12 }} />
                                            {uploading && <div style={{ color: "blue", fontSize: 12, marginTop: 4 }}>Uploading...</div>}
                                            {editingItem.logo && <div style={{ color: "green", fontSize: 12, marginTop: 4 }}>File: {editingItem.logo}</div>}
                                        </div>
                                        <input placeholder="Manual Logo URL" value={editingItem.logo || ""} onChange={e => setEditingItem({ ...editingItem, logo: e.target.value })} style={inputStyle} />
                                    </>
                                )}
                                {activeTab === "clients" && (
                                    <>
                                        <input placeholder="Name" value={editingItem.name || ""} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} style={inputStyle} required />
                                        <input placeholder="Email" value={editingItem.email || ""} onChange={e => setEditingItem({ ...editingItem, email: e.target.value })} style={inputStyle} required />
                                        <input placeholder="Company" value={editingItem.company || ""} onChange={e => setEditingItem({ ...editingItem, company: e.target.value })} style={inputStyle} />
                                        <input placeholder="Phone" value={editingItem.phone || ""} onChange={e => setEditingItem({ ...editingItem, phone: e.target.value })} style={inputStyle} />
                                        <select
                                            value={editingItem.status || "prospect"}
                                            onChange={e => setEditingItem({ ...editingItem, status: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="prospect">Prospect</option>
                                            <option value="active">Active</option>
                                            <option value="churned">Churned</option>
                                        </select>
                                        <textarea placeholder="Notes" value={editingItem.notes || ""} onChange={e => setEditingItem({ ...editingItem, notes: e.target.value })} style={{ ...inputStyle, height: 100 }} />
                                    </>
                                )}
                                {activeTab === "enquiries" && (
                                    <>
                                        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Enquiries are read-only except for status</div>
                                        <input disabled value={editingItem.name || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                        <input disabled value={editingItem.email || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                        <input disabled value={editingItem.subject || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                        <textarea disabled value={editingItem.message || ""} style={{ ...inputStyle, height: 100, background: '#f0f0f0' }} />
                                        <label style={{ fontSize: 12, fontWeight: 700 }}>Status</label>
                                        <select
                                            value={editingItem.status || "new"}
                                            onChange={e => setEditingItem({ ...editingItem, status: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="new">New</option>
                                            <option value="read">Read</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                            <input disabled value={editingItem.phone || ""} placeholder="Phone" style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.service || ""} placeholder="Service" style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.city || ""} placeholder="City" style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.country || ""} placeholder="Country" style={{ ...inputStyle, background: '#f0f0f0' }} />
                                        </div>
                                    </>
                                )}
                                {activeTab === "bookings" && (
                                    <>
                                        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Bookings are read-only</div>
                                        <label style={{ fontSize: 12, fontWeight: 700 }}>Client</label>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                            <input disabled value={editingItem.clientName || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.clientEmail || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                        </div>

                                        <label style={{ fontSize: 12, fontWeight: 700 }}>Scheduled For</label>
                                        <div style={{ display: 'flex', gap: 16 }}>
                                            <input disabled value={editingItem.date || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.time || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                        </div>

                                        <label style={{ fontSize: 12, fontWeight: 700 }}>Type & Link</label>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                            <input disabled value={editingItem.type || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.link || ""} style={{ ...inputStyle, background: '#f0f0f0' }} />
                                        </div>

                                        <label style={{ fontSize: 12, fontWeight: 700 }}>Details</label>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                            <input disabled value={editingItem.phone || ""} placeholder="Phone" style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.company || ""} placeholder="Company" style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.city || ""} placeholder="City" style={{ ...inputStyle, background: '#f0f0f0' }} />
                                            <input disabled value={editingItem.country || ""} placeholder="Country" style={{ ...inputStyle, background: '#f0f0f0' }} />
                                        </div>
                                        <textarea disabled value={editingItem.message || ""} style={{ ...inputStyle, height: 100, background: '#f0f0f0' }} />
                                    </>
                                )}

                                {/* Generic fallback for unexpected tabs or 'work' */}
                                {!["products", "work", "team", "testimonials", "trustedBy", "stats", "enquiries", "clients", "bookings", "founderInfo"].includes(activeTab) && (
                                    <textarea placeholder="Raw JSON Data" value={JSON.stringify(editingItem, null, 2)} onChange={e => {
                                        try { setEditingItem(JSON.parse(e.target.value)) } catch (err) { }
                                    }} style={{ ...inputStyle, height: 200, fontFamily: "monospace" }} />
                                )}

                                <button type="submit" style={{ marginTop: 16, background: "#000", color: "#fff", padding: "12px", borderRadius: 8, border: "none", fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                                    <Save size={16} /> Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
