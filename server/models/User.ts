import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional if using OAuth only, but required for password auth
  applicationId: string;
  branch?: string;
  year?: string;
  section?: string;
  rollNumber?: string;
  avatar?: string;
  bio?: string;
  rankPoints: number;
  badges: string[];
  connections: mongoose.Types.ObjectId[];
  pendingRequests: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  // Auth Fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Hashed password to be stored here
  applicationId: { type: String, required: true, unique: true },

  // Academic Fields
  branch: { type: String },
  year: { type: String },
  section: { type: String },
  rollNumber: { type: String },

  // Profile
  avatar: { type: String },
  bio: { type: String },

  // Gamification
  rankPoints: { type: Number, default: 0 },
  badges: [{ type: String }],

  // Network
  connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pendingRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
