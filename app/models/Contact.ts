import mongoose, { Schema, Model, Document } from "mongoose";

export interface IContactDocument extends Document {
  name: string;
  whatsappNumber?: string;
  telegramLink?: string;
  email?: string;
  isActive: boolean;
  referenceId: string;
}

const ContactSchema = new Schema<IContactDocument>(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    whatsappNumber: {
      type: String,
      trim: true,
    },
    telegramLink: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default (
  mongoose.models.Contact as Model<IContactDocument>
) || mongoose.model<IContactDocument>("Contact", ContactSchema);
