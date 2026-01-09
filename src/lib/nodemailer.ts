import nodemailer from 'nodemailer';

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

console.log("Email Config Check:");
console.log("- EMAIL_USER loaded:", email ? "YES (" + email.substring(0, 3) + "***)" : "NO");
console.log("- EMAIL_PASS loaded:", pass ? "YES (Length: " + pass.length + ")" : "NO");

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass,
    },
});

export const mailOptions = {
    from: email,
    to: email,
};
