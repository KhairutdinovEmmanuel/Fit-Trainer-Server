import {Router} from "express";
import {
    validationMessageVerify,
    validationMessageChangePassword
} from "../validations/modules/messages";
import {sendMessageMailForVerify} from "../services/sendgrind-mail";
import {findUser} from "../services/users";

const router = Router();

router.post(
    '/VFT/verify',
    ...validationMessageVerify,
    async (req, res) => {
        try {
            const { email } = req.body;
            const user = await findUser({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User isn't exit"
                })
            }
            const logo = process.env.VFT_MESSAGE_LOGO;
            const link = process.env.VFT_VERIFY_MESSAGE_LINK;
            await sendMessageMailForVerify(email, logo, link);
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.post(
    '/VFT/change-password',
    ...validationMessageChangePassword,
    async (req, res) => {
        try {
            const { email } = req.body;
            const user = await findUser({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User isn't exit"
                })
            }
            const logo = process.env.VFT_MESSAGE_LOGO;
            const link = process.env.VFT_CHANGE_PASSWORD_MESSAGE_LINK;
            await sendMessageMailForVerify(email, logo, link);
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.post(
    '/RFT/verify',
    ...validationMessageVerify,
    async (req, res) => {
        try {
            const { email } = req.body;
            const user = await findUser({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User isn't exit"
                })
            }
            const logo = process.env.RFT_MESSAGE_LOGO;
            const link = process.env.RFT_VERIFY_MESSAGE_LINK;
            await sendMessageMailForVerify(email, logo, link);
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.post(
    '/RFT/change-password',
    ...validationMessageChangePassword,
    async (req, res) => {
        try {
            const { email } = req.body;
            const user = await findUser({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User isn't exit"
                })
            }
            const logo = process.env.RFT_MESSAGE_LOGO;
            const link = process.env.RFT_CHANGE_PASSWORD_MESSAGE_LINK;
            await sendMessageMailForVerify(email, logo, link);
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

export default router;