import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 1,
    host: 'smtp.seznam.cz',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
},{
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO
});

export async function notify(subject, text) {
    return transporter.sendMail({ subject: subject, text: text });
}