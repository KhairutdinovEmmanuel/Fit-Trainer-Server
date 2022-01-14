// @ts-ignore
import http from 'http';
import {validationResult} from "express-validator";

export const validationEnd = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorArray = errors.array();
            const errorMessage = errorArray.length
                ? errorArray[0].msg : http.STATUS_CODES['400'];
            throw new Error(errorMessage);
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const validationTokensEnd = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorArray = errors.array();
            const errorMessage = errorArray.length
                ? errorArray[0].msg : http.STATUS_CODES['401'];
            throw new Error(errorMessage);
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}
