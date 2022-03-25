import { imageModel } from "../schemas/img"

class Image {
  static async create({ newImg }) {
    const createdNewImg = await imageModel.create(newImg);
    return createdNewImg;
  }

  static async findById({ _id }) {
    const image = await imageModel.findOne({ id: _id });
    return image;
  }

  static async findAll() {
    const images = await imageModel.find({});
    return images;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { id: _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false }; // 요게 뭐지?

    const updatedimage = await imageModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedimage;
  }
}

export { Image };
