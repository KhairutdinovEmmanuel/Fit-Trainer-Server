import {Router} from "express";
import {
    validationGetProfile,
    validationUpdateProfile
} from "../validations/modules/users";
import {validationAccessToken} from "../middlewares/validationToken";
import {findUser, updateUser} from "../services/users";

const router = Router();

router.get(
    '/profile',
    ...validationGetProfile,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId } = req.body;
            const {email, name, surname, avatar} = await findUser({ id: userId });
            return res.status(200).json({email, name, surname, avatar});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.put(
    '/profile',
    ...validationUpdateProfile,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId, name, surname, avatar } = req.body;
            await updateUser(
                { id: userId },
                {
                    $set: {
                        name,
                        surname,
                        avatar
                    }
                }
            );
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

export default router;
