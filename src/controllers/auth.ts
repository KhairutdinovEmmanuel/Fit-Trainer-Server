import {Router} from "express";
import bcrypt from "bcrypt";
import {
    validationRegister,
    validationVerify,
    validationLogin,
    validationChangePassword,
    validationRefreshTokens
} from "../validations/modules/auth";
import {createUser, findUser, updateUser} from "../services/users";
import {hashPassword, refreshTokens} from "../services/auth";
import {validationRefreshToken} from "../middlewares/validationToken";

const router = Router();

router.post(
    '/register',
    ...validationRegister,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const candidate = await findUser({ email });
            if (candidate) {
                return res.status(412).json({
                    message: 'User with same email is already exist'
                });
            }
            await createUser( { email, password });
            return res.status(201).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.post(
    '/verify',
    ...validationVerify,
    async (req, res) => {
        try {
            const { email, confirmCode } = req.body;
            const user = await findUser({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User with email isn't exist"
                });
            }
            if (user.confirmCode !== confirmCode) {
                return res.status(400).json({
                    message: "Incorrect email or confirm code"
                })
            }
            await updateUser(
                { email },
                { $set: { isVerified: true } }
            );
            refreshTokens(res, { userId: user.id });
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.post(
    '/login',
    ...validationLogin,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await findUser({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User with email isn't exist"
                });
            }
            const isMatchedPassword = bcrypt.compare(password, user.password);
            if (isMatchedPassword) {
                return res.status(400).json({
                    message: "Incorrect email or password"
                });
            }
            refreshTokens(res, { userId: user.id });
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.post(
    '/change-password',
    ...validationChangePassword,
    async (req, res) => {
        try {
            const { email, password, confirmCode } = req.body;
            const user = await findUser({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User with email isn't exist"
                });
            }
            if (user.isPasswordChanged) {
                return res.status(400).json({
                    message: "User can't reset password"
                })
            }
            if (confirmCode !== user.confirmCode) {
                return res.status(400).json({
                    message: "Incorrect email or confirm code"
                })
            }
            const hashedPassword = hashPassword(password);
            await updateUser(
                { email },
                {
                    $set: {
                        password: hashedPassword,
                        isPasswordChanged: true
                    }
                }
            );
            refreshTokens(res, { userId: user.id });
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.post(
    '/refresh-tokens',
    ...validationRefreshTokens,
    validationRefreshToken,
    async (req, res) => {
        try {
            const { userId } = req.body;
            refreshTokens(res, { userId });
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

export default router;
