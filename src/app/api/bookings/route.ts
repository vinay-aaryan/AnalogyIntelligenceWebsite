
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Booking from '../../../models/Booking';

export const dynamic = "force-dynamic";

export async function GET() {
    await dbConnect();
    try {
        const bookings = await Booking.find({}).sort({ date: 1, time: 1 });
        console.log("Fetched Bookings Sample:", bookings[0]);
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

import { transporter, mailOptions } from '../../../lib/nodemailer';
import * as ics from 'ics';
import { promisify } from 'util';

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        console.log("Creating Booking with Body:", body);
        const booking = await Booking.create(body);
        console.log("Created Booking Result:", booking);

        // Generate ICS File
        const dateParts = body.date.split("-").map(Number);
        const [year, month, day] = dateParts;

        // Parse time string e.g. "10:00 AM - 11:00 AM"
        const times = body.time.split(" - ");
        const startTimeStr = times[0];
        const endTimeStr = times[1];

        const parseTime = (timeStr: string) => {
            const [time, modifier] = timeStr.split(" ");
            let [hours, minutes] = time.split(":").map(Number);
            if (modifier === "PM" && hours < 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;
            return [hours, minutes];
        };

        const [startHour, startMinute] = parseTime(startTimeStr);
        const [endHour, endMinute] = parseTime(endTimeStr);

        // Calculate duration in hours and minutes
        let durationHours = endHour - startHour;
        let durationMinutes = endMinute - startMinute;

        const event: ics.EventAttributes = {
            start: [year, month, day, startHour, startMinute],
            end: [year, month, day, endHour, endMinute],
            title: `Consultation: ${body.clientName}`,
            description: `Connect to discover your pain points and build a roadmap for growth.\n\nMessage: ${body.message}\n\nGoogle Meet: https://meet.google.com/new`,
            location: 'Google Meet',
            url: 'https://analogy.com',
            status: 'CONFIRMED',
            busyStatus: 'BUSY',
            organizer: { name: 'Analogy Team', email: process.env.EMAIL_USER },
            attendees: [
                { name: body.clientName, email: body.clientEmail, rsvp: true, partstat: 'NEEDS-ACTION', role: 'REQ-PARTICIPANT' },
                { name: 'Analogy Team', email: process.env.EMAIL_USER, rsvp: true, partstat: 'ACCEPTED', role: 'CHAIR' }
            ],
            method: 'REQUEST'
        };

        const createEventAsync = promisify(ics.createEvent);
        // @ts-ignore
        const eventValue = await createEventAsync(event);

        // Send Email Notification
        try {
            await transporter.sendMail({
                ...mailOptions,
                from: `"Analogy Team" <${process.env.EMAIL_USER}>`,
                to: [process.env.EMAIL_USER, body.clientEmail], // Send to BOTH
                subject: `Booking Confirmation: ${body.clientName}`,
                text: `
                    New Booking Received:
                    
                    Name: ${body.clientName}
                    Email: ${body.clientEmail}
                    Date: ${body.date}
                    Time: ${body.time}
                    Type: ${body.type}
                    Phone: ${body.phone || 'N/A'}
                    Company: ${body.company || 'N/A'}
                    City: ${body.city || 'N/A'}
                    Country: ${body.country || 'N/A'}
                    Message: ${body.message || 'N/A'}
                `,
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h1 style="color: #000;">New Booking Received</h1>
                        <p style="font-size: 16px;"><strong>${body.clientName}</strong> has scheduled a consultation.</p>
                        
                        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0;">Booking Details</h3>
                            <p><strong>Date:</strong> ${body.date}</p>
                            <p><strong>Time:</strong> ${body.time}</p>
                            <p><strong>Type:</strong> ${body.type}</p>
                            <p><strong>Meeting Link:</strong> <a href="https://meet.google.com/new">Google Meet</a></p>
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                            <h3 style="margin-top: 0;">Client Details</h3>
                            <p><strong>Name:</strong> ${body.clientName}</p>
                            <p><strong>Email:</strong> <a href="mailto:${body.clientEmail}">${body.clientEmail}</a></p>
                            <p><strong>Phone:</strong> ${body.phone || 'N/A'}</p>
                            <p><strong>Company:</strong> ${body.company || 'N/A'}</p>
                            <p><strong>Location:</strong> ${body.city || ''} ${body.country ? `(${body.country})` : ''}</p>
                            <br>
                            <p><strong>Message / Pain Points:</strong></p>
                            <blockquote style="background: #fff; padding: 10px; border-left: 4px solid #ccc; margin: 0;">
                                ${body.message || 'N/A'}
                            </blockquote>
                        </div>
                        
                        <p style="font-size: 14px; color: #666;">A calendar invitation has also been attached to this email.</p>
                    </div>
                `,
                icalEvent: {
                    filename: 'invitation.ics',
                    method: 'REQUEST',
                    content: eventValue as string
                }
            });
            console.log("Email invitation sent (method: REQUEST)");
        } catch (emailError) {
            console.error("Failed to send email notification", emailError);
        }

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error("Booking Create Error:", error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const { _id, ...updateData } = body;
        const booking = await Booking.findByIdAndUpdate(_id, updateData, { new: true });
        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}
