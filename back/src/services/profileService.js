import { Profile } from "../db";
class profileService {
  static addProfile = async ({ user_id, school, major, position }) => {
    const newProfile = { user_id, school, major, position };

    const createdNewProfile = await Profile.create({ newProfile });
    createdNewProfile.errorMessage = null;

    return createdNewProfile;
  };

  static getProfiles = async ({ user_id }) => {
    const profiles = await Profile.findByUserId({ user_id });
    return profiles;
  };

  static getProfile = async ({ _id }) => {
    const profile = await Profile.findById({ _id });

    // db에 없는 경우, 에러 메시지 반환
    if (!profile) {
      const errorMessage = "_id에 해당하는 데이터가 없습니다.";
      return errorMessage;
    }

    const school = profile.school;
    const major = profile.major;
    const position = profile.position;

    const clickedProfile = {
      school,
      major,
      position,
    };
    return clickedProfile;
  };

  static setProfile = async ({ _id, toUpdate }) => {
    //우선 해당 id의 학력이 db에 존재하는지 확인
    let profile = await Profile.findById({ _id });

    // db에 없는 경우, 에러 메시지 반환
    if (!profile) {
      return profile.errorMessage;
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      profile = await Profile.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      profile = await Profile.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      profile = await Profile.update({ _id, fieldToUpdate, newValue });
    }

    return profile;
  };

  static removeProfile = async ({ _id }) => {
    const result = await Profile.remove({ _id });
    return result;
  };
}

export { profileService };
