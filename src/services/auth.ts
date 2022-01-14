import jwt, {JwtPayload} from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {Response} from "express";

export interface IPayloadToken {
    userId: string;
}

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12)
};

export const generateConfirmCode = () => {
    return Math.round( Math.random() * (999999 - 111111) + 111111 );
};

export const refreshTokens = (res: Response, payloadToken: IPayloadToken) => {
    // ACCESS TOKEN
    const secretAccessToken = (process.env.SECRET_ACCESS_TOKEN as string);
    const access_token = jwt.sign(
        payloadToken,
        secretAccessToken,
        { expiresIn: "4h" },
    );
    res.cookie(
        "access_token",
        access_token,
        { httpOnly: true }
    );
    // REFRESH TOKEN
    const secretRefreshToken = (process.env.SECRET_REFRESH_TOKEN as string);
    const refresh_token = jwt.sign(
        payloadToken,
        secretRefreshToken,
        { expiresIn: "10d" },
    );
    res.cookie(
        "refresh_token",
        refresh_token,
        { httpOnly: true }
    );
}

export const decodeAccessToken = (token: string): JwtPayload | string => {
    const secretAccessToken = (process.env.SECRET_ACCESS_TOKEN as string);
    return jwt.verify(token, secretAccessToken);
};

export const decodeRefreshToken = (token: string): JwtPayload | string => {
    const secretAccessToken = (process.env.SECRET_REFRESH_TOKEN as string);
    return jwt.verify(token, secretAccessToken);
};
