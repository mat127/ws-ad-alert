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
    to: process.env.MAIL_TO,
    subject: "WsAd!"
});

export async function notify(ads) {
    return Promise.all(ads.map(
        ad => transporter.sendMail({ 'text': ad })
    ));
}