import { ProfileModel } from "../schemas/profile";

class Profile {
  static create = async ({ newProfile }) => {
    const createdNewProfile = await ProfileModel.create(newProfile);
    return createdNewProfile;
  };

  static findByUserId = async ({ user_id }) => {
    const Profiles = await ProfileModel.find({ user_id });
    return Profiles;
  };

  static findById = async ({ _id }) => {
    const Profile = await ProfileModel.findOne({ _id });
    return Profile;
  };

  static update = async ({ _id, fieldToUpdate, newValue }) => {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProfile = await ProfileModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProfile;
  };
  static remove = async ({ _id }) => {
    const result = await ProfileModel.remove({ _id });
    return result;
  };
}

export { Profile };
