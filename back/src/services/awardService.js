import Award from "../db";

class awardService {
    static addAward = async ({ user_id, title, description, whenDate }) => {
        const newAward = { user_id, title, description, whenDate };
        
        const createdNewAward = await Award.create({ newAward });
        createdNewAward.errorMessage = null;

        return createdNewAward;
    };

    static getAward = async ({ award_id }) => {
        const award = await Award.findById({ award_id });

        const title = award.title;
        const description = award.description;
        const whenDate = award.whenDate;

        const clickedAward = {
            title,
            description,
            whenDate,
            errorMessage: null,
        };

        return award;
    };

    static getAwards = async () => {
        const awards = await Award.findAll();
        return awards;
    };

    static setAwards = async ({ award_id, toUpdate }) => {
        let award = await Award.findById({ award_id });

        if (!award) {
            const errorMessage =
                "수상 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        };

        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update({ award_id, fieldToUpdate, newValue });
        };

        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update({ award_id, fieldToUpdate, newValue });
        };

        if (toUpdate.whenDate) {
            const fieldToUpdate = "whenDate";
            const newValue = toUpdate.whenDate;
            award = await Award.update({ award_id, fieldToUpdate, newValue });
        };

        return award;
    };

    static getAwardInfo({ user_id }) {
        const award = await Award.findById({ award_id });

        if (!award) {
            const errorMessage =
                "수상 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        };

        return award;
    };
};

export { awardService };