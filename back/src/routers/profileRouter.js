import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { profileService } from "../services/profileService";

const profileRouter = Router();

profileRouter.post(
  "/profile/create",
  login_required,
  async (req, res, next) => {
    try {
      //토큰으로 사용자 id 불러오기
      const user_id = req.currentUserId;

      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      // req 에서 데이터 가져오기
      const school = req.body.school;
      const major = req.body.major;
      const position = req.body.position;

      //데이터를 학력 DB에 추가하기
      const newprofile = await profileService.addprofile({
        user_id,
        school,
        major,
        position,
      });

      if (newprofile.errorMessage) {
        throw new Error(newprofile.errorMessage);
      }

      res.status(201).json(newprofile);
    } catch (error) {
      next(error);
    }
  }
);

profileRouter.get("/profiles/:id", login_required, async (req, res, next) => {
  try {
    const _id = req.params.id;
    const profile = await profileService.getprofile({ _id });

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
});

profileRouter.put("/profiles/:id", login_required, async (req, res, next) => {
  try {
    // URI로부터 id를 추출함.
    const _id = req.params.id;
    // body data 로부터 업데이트할 학력 정보를 추출함.
    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const position = req.body.position ?? null;

    const toUpdate = { school, major, position };

    //해당 id로 학력 정보를 db에서 찾아 업데이트함. 업데이트가 없을 시 생략
    const updatedprofile = await profileService.setprofile({
      _id,
      toUpdate,
    });

    if (updatedprofile.errorMessage) {
      throw new Error(updatedprofile.errorMessage);
    }

    res.status(200).json(updatedprofile);
  } catch (error) {
    next(error);
  }
});

//삭제 기능 추가
profileRouter.delete(
  "/profiles/:id",
  login_required,
  async (req, res, next) => {
    try {
      const result = await profileService.removeprofile({
        _id: req.params.id,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

profileRouter.get(
  "/profilelist/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      // URI로부터 user_id를 추출함.
      const user_id = req.params.user_id;
      const profiles = await profileService.getprofiles({ user_id });

      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  }
);

export { profileRouter };
