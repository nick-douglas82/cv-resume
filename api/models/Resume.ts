import { type InferSchemaType, type Model, model, models, Schema, type Types } from "mongoose";

const ResumeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export type ResumeDoc = InferSchemaType<typeof ResumeSchema> & {
  _id: Types.ObjectId;
};

export const Resume = (models.Resume as Model<ResumeDoc>) || model<ResumeDoc>("Resume", ResumeSchema);
