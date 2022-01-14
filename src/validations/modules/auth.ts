import {
    validationCookieAccessToken,
    validationCookieRefreshToken,
    validationFieldConfirmCode,
    validationFieldEmail,
    validationFieldPassword
} from "../rules";
import {
    validationEnd,
    validationTokensEnd
} from "../../utils/helperExpressValidator";

export const validationRegister = [
    validationFieldEmail,
    validationFieldPassword,
    validationEnd,
];

export const validationVerify = [
    validationFieldEmail,
    validationFieldConfirmCode,
    validationEnd,
];

export const validationLogin = [
    validationFieldEmail,
    validationFieldPassword,
    validationEnd,
];

export const validationChangePassword = [
    validationFieldEmail,
    validationFieldPassword,
    validationFieldConfirmCode,
    validationEnd,
];

export const validationRefreshTokens = [
    validationCookieAccessToken,
    validationCookieRefreshToken,
    validationTokensEnd,
];
