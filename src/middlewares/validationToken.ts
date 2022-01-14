import {RequestHandler} from "express";
import jwt from "jsonwebtoken";

export const validationRefreshToken: RequestHandler = async (req, res, next) => {
    try {
        const secretRefreshToken = (process.env.SECRET_REFRESH_TOKEN as string);
        const refresh_token: string | undefined = req.cookies.refresh_token;
        const decodeRefreshToken = jwt.verify(refresh_token, secretRefreshToken)
        if (!decodeRefreshToken) {
            return res.status(401).json({
                message: "User unauthorized"
            })
        } else {
            req.body.userId = decodeRefreshToken.userId;
        }
        next();
    } catch (error) {
        throw error;
    }
}

export const validationAccessToken: RequestHandler = async (req, res, next) => {
    try {
        const secretAccessToken = (process.env.SECRET_ACCESS_TOKEN as string);
        const access_token: string | undefined = req.cookies.access_token;
        const decodeAccessToken = jwt.verify(access_token, secretAccessToken)
        if (!decodeAccessToken) {
            return res.status(401).json({
                message: "User unauthorized"
            })
        } else {
            req.body.userId = decodeAccessToken.userId;
        }
        next();
    } catch (error) {
        throw error;
    }
}