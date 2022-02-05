const fs = require("fs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(to, fileName) {
    const attachment = fs.readFileSync(fileName).toString("base64");

    const msg = {
        from: process.env.MAIL_FROM,
        to: to,
        subject: 'Assessment Report',
        text: 'Find your report data in PDF',
        attachments: [
            {
                content: attachment,
                filename: "attachment.pdf",
                type: "application/pdf",
                disposition: "attachment"
            }
        ]
    };

    return await sgMail.send(msg);
}

module.exports = {
    sendMail
}

