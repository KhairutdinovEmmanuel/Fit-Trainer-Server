import {validationEnd} from "../../utils/helperExpressValidator";
import {validationFieldEmail} from "../rules";

export const validationMessageVerify = [
    validationFieldEmail,
    validationEnd,
];

export const validationMessageChangePassword = [
    validationFieldEmail,
    validationEnd,
]
