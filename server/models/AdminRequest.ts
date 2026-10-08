import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminRequest extends Document {
  user: mongoose.Types.ObjectId;
  type: 'ID Card' | 'Bonafide Certificate' | 'Scholarship' | 'Complaint';
  status: 'Submitted' | 'In Review' | 'Action Required' | 'Ready' | 'Closed';
  timeline: { status: string; timestamp: Date; remark?: string }[];
  uploadedDocUrl?: string;
}

const AdminRequestSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['ID Card', 'Bonafide Certificate', 'Scholarship', 'Complaint'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Submitted', 'In Review', 'Action Required', 'Ready', 'Closed'],
    default: 'Submitted',
  },
  timeline: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    remark: { type: String },
  }],
  uploadedDocUrl: { type: String },
}, { timestamps: true });

export default mongoose.model<IAdminRequest>('AdminRequest', AdminRequestSchema);
