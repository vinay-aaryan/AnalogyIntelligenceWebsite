
import mongoose, { Schema, Model, models } from 'mongoose';

export interface IBooking {
    _id?: string;
    clientName: string;
    clientEmail: string;
    phone?: string;
    company?: string;
    city?: string;
    country?: string;
    message?: string; // Looking to solve...
    date: string;
    time: string;
    type: 'intro' | 'follow-up' | 'consultation';
    link?: string;
    createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    city: { type: String },
    country: { type: String },
    message: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, enum: ['intro', 'follow-up', 'consultation'], default: 'consultation' },
    link: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Force recompilation in dev to pick up schema changes
if (process.env.NODE_ENV === 'development' && mongoose.models && mongoose.models.Booking) {
    delete mongoose.models.Booking;
}

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
