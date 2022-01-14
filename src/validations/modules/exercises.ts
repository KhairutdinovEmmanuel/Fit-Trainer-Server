import {
    validationCookieAccessToken,
    validationFieldsOfExercise,
    validationParamExerciseId,
} from "../rules";
import {
    validationEnd,
    validationTokensEnd
} from "../../utils/helperExpressValidator";

export const validationCreateExercise = [
    validationCookieAccessToken,
    validationTokensEnd,
    ...validationFieldsOfExercise,
    validationEnd,
];

export const validationGetExercises = [
    validationCookieAccessToken,
    validationTokensEnd,
];

export const validationUpdateExercise = [
    validationCookieAccessToken,
    validationTokensEnd,
    validationParamExerciseId,
    ...validationFieldsOfExercise,
    validationEnd,
];

export const validationDeleteExercise = [
    validationCookieAccessToken,
    validationTokensEnd,
    validationParamExerciseId,
    validationEnd,
];
