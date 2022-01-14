import {
    validationCookieAccessToken,
    validationFieldAvatar,
    validationFieldName,
    validationFieldSurname
} from "../rules";
import {
    validationEnd,
    validationTokensEnd
} from "../../utils/helperExpressValidator";

export const validationGetAllUsers = [
    validationCookieAccessToken,
    validationTokensEnd,
];

export const validationGetProfile = [
    validationCookieAccessToken,
    validationTokensEnd,
];

export const validationUpdateProfile = [
    validationCookieAccessToken,
    validationTokensEnd,
    validationFieldName,
    validationFieldSurname,
    validationFieldAvatar,
    validationEnd,
];
