import { Schema, model } from "mongoose";

const imgSchema = Schema({
  img:  {
    data: Buffer,
    contentType: String
    }
  });
const imageModel = model("image",imgSchema); 

export { imageModel };
