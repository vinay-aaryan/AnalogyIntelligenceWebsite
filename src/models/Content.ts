import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: String,
    desc: String,
    visualUrl: String, // For uploaded image/video
    youtubeUrl: String, // New field for YouTube
    videoColor: String, // CSS gradient/color
    tags: String, // Comma separated
    link: String,
    createdAt: { type: Date, default: Date.now }
});

const WorkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: String,
    desc: String,
    visualUrl: String,
    youtubeUrl: String,
    videoColor: String,
    createdAt: { type: Date, default: Date.now }
});

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: String,
    bio: String,
    image: String,
    quote: String, // Dynamic quote
    createdAt: { type: Date, default: Date.now }
});

const TestimonialSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: String,
    role: String,
    visualUrl: String, // Photo or Video
    layout: { type: String, default: 'standard' },
    createdAt: { type: Date, default: Date.now }
});

const TrustedCompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: String,
    createdAt: { type: Date, default: Date.now }
});

const StatSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: String,
    createdAt: { type: Date, default: Date.now }
});

const FounderInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: String,
    quote: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});

// Use existing models if they exist, otherwise create them
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const Work = mongoose.models.Work || mongoose.model('Work', WorkSchema);
export const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
export const FounderInfo = mongoose.models.FounderInfo || mongoose.model('FounderInfo', FounderInfoSchema);
export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export const TrustedCompany = mongoose.models.TrustedCompany || mongoose.model('TrustedCompany', TrustedCompanySchema);
export const Stat = mongoose.models.Stat || mongoose.model('Stat', StatSchema);
