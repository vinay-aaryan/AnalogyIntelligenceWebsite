
import mongoose, { Schema, Model, models } from 'mongoose';

export interface IEnquiry {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    service?: string; // For Service selection in Contact Page
    city?: string;
    country?: string;
    status: 'new' | 'read' | 'archived';
    createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    service: { type: String },
    city: { type: String },
    country: { type: String },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
    createdAt: { type: Date, default: Date.now },
});

// Prevent model recompilation error in development

// Force recompilation in dev to pick up schema changes
if (process.env.NODE_ENV === 'development' && mongoose.models && mongoose.models.Enquiry) {
    delete mongoose.models.Enquiry;
}

const Enquiry: Model<IEnquiry> = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

export default Enquiry;
