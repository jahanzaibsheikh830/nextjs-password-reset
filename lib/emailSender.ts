import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});


const emailSender = (resetToken:any,email:String,res:any) => {
    const resetUrl = `http://localhost/reset-password/${resetToken}`;
    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'Reset your password',
        text: `Click the following link to reset your password: ${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to send reset email' });
        }
        console.log(`Reset email sent to ${email}: ${info.response}`);
        return res.status(200).json({ message: 'Reset email sent' });
    });
}


export default emailSender