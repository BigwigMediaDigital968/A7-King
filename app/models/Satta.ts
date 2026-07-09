import mongoose, { Schema, Model, Document } from "mongoose";

export interface ISattaDocument extends Document {
  name: string;
  slug: string;
    resultTime: string;

  isActive: boolean;
}

const SattaSchema = new Schema<ISattaDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    resultTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
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

export default (mongoose.models.Area as Model<ISattaDocument>) ||
mongoose.model<ISattaDocument>("Area", SattaSchema);