import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import User from "../../models/users";
import resetToken from "../../models/resetToken";
import { randomBytes } from 'crypto';
import emailSender from '@/lib/emailSender';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    dbConnect()
    if (req.method === 'POST') {
        const { email } = req.body;
    
        // Check if email exists in database
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Email not found' });
        }
    
        // Generate reset token
        const reset_Token = randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 9000000 // Token expires in 15 minutes
    
        // Save reset token to database
        const resetTokenSave = new resetToken({ 
            userId: user._id,
            token: reset_Token,
            expiresAt: resetTokenExpiry,
         });

         let saved = await resetTokenSave.save()
         if(!saved){
            return res.status(500).json({ message: 'Failed to save' });
         }
         // Send reset email to user
        emailSender(resetToken,email,res)
      
      }else if (req.method === 'GET') {
        const { token } = req.query;
    
        // Check if reset token exists in database
        const resetTokenDoc = await resetToken.findOne({ token });
        if (!resetTokenDoc) {
          return res.status(400).json({ message: 'Invalid reset token' });
        }
    
        // Check if reset token has expired
        const now = Date.now();
        if (resetTokenDoc.expiresAt < now) {
          return res.status(400).json({ message: 'Reset token has expired' });
        }
    
        // Render the password reset page with the reset token
        return res.status(200).send(`Reset your password with token ${token}`);
      }
      
      else {
        res.status(405).end(); // Method Not Allowed
      }
}



