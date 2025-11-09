import { type InferSchemaType, type Model, model, models, Schema, type Types } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, index: true, required: true },
    name: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & {
  _id: Types.ObjectId;
};

export const User = (models.User as Model<UserDoc>) || model<UserDoc>("User", UserSchema);
