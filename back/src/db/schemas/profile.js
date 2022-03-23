import { Schema, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    user_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProfileModel = model("Profile", ProfileSchema);

export { ProfileModel };
