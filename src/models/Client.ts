
import mongoose, { Schema, Model, models } from 'mongoose';

export interface IClient {
    _id?: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    status: 'prospect' | 'active' | 'churned';
    notes?: string;
    createdAt: Date;
}

const ClientSchema = new Schema<IClient>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    company: { type: String },
    phone: { type: String },
    status: { type: String, enum: ['prospect', 'active', 'churned'], default: 'prospect' },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Client: Model<IClient> = models.Client || mongoose.model<IClient>('Client', ClientSchema);

export default Client;
