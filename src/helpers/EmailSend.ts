import nodemailer from 'nodemailer'

interface ISendMail {
    body?: string;
    emailType?: string;
    userEmail: string;
    trackingId: string;
}

export const sendEmailAsync = async ({ body, emailType, userEmail, trackingId }: ISendMail) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: "",
            // port: 334,
            // secure: true,
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASS_USER
            },
        })

        const mailOption = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: emailType === "Tracking" ? "PRCS Complaint Tracking Email" : "PRCS IT Section",
            html: body ||
                `Click on the following link to track your complaint:<br/>
        <a href="${process.env.NEXT_APP_URL}/complaint-tracking/${trackingId}">
          Track Your Complaint
        </a>`
        }
        return await transporter.sendMail(mailOption)
    }
    catch (error: any) {
        console.log("error while sending email" + error);
        throw new Error(error.message);
    }
}