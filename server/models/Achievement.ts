import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  date: Date;
  type: 'Hackathon' | 'Sports' | 'Cultural' | 'Workshop';
  level: 'International' | 'National' | 'Inter-College' | 'Intra-College';
  position: 'Winner' | 'Runner-Up' | 'Participant';
  proofUrl?: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

const AchievementSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  type: {
    type: String,
    enum: ['Hackathon', 'Sports', 'Cultural', 'Workshop'],
    required: true,
  },
  level: {
    type: String,
    enum: ['International', 'National', 'Inter-College', 'Intra-College'],
    required: true,
  },
  position: {
    type: String,
    enum: ['Winner', 'Runner-Up', 'Participant'],
    required: true,
  },
  proofUrl: { type: String },
  status: {
    type: String,
    enum: ['Verified', 'Pending', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
