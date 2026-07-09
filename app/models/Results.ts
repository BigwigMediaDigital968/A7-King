import mongoose, { Schema, Model, Document } from "mongoose";

export interface IResultDocument extends Document {
  sattaId: mongoose.Types.ObjectId;
  drawDate: Date;
  result: string;
}

const ResultSchema = new Schema<IResultDocument>(
  {
    sattaId: {
      type: Schema.Types.ObjectId,
      ref: "Satta",
      required: true,
      index: true,
    },

    drawDate: {
      type: Date,
      required: true,
      index: true,
    },

    result: {
      type: String,
      required: true,
      match: /^\d{2}$/,
    },
  },
  {
    timestamps: true,
  }
);

ResultSchema.index(
  {
    sattaId: 1,
    drawDate: 1,
  },
  {
    unique: true,
  }
);

export default (mongoose.models.Result as Model<IResultDocument>) ||
  mongoose.model<IResultDocument>("Result", ResultSchema);