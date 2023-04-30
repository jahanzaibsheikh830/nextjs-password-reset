import mongoose from 'mongoose';

const ResetTokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Number,
        required: true
    },
});

export default mongoose.models.ResetTokenSchema || mongoose.model('resetToken', ResetTokenSchema);