import {
    validationCookieAccessToken,
    validationFieldDateOfWorkout,
    validationFieldExercisesOfWorkout,
    validationParamWorkoutId
} from "../rules";
import {
    validationEnd, validationTokensEnd
} from "../../utils/helperExpressValidator";

export const validationCreateWorkout = [
    validationCookieAccessToken,
    validationTokensEnd,
    validationFieldDateOfWorkout,
    ...validationFieldExercisesOfWorkout,
    validationEnd,
];

export const validationGetWorkouts = [
    validationCookieAccessToken,
    validationTokensEnd,
];

export const validationGetWorkout = [
    validationCookieAccessToken,
    validationTokensEnd,
    validationParamWorkoutId,
    validationEnd,
];

export const validationUpdateWorkout = [
    validationCookieAccessToken,
    validationTokensEnd,
    validationParamWorkoutId,
    validationFieldDateOfWorkout,
    ...validationFieldExercisesOfWorkout,
    validationEnd,
];

export const validationDeleteWorkout = [
    validationCookieAccessToken,
    validationTokensEnd,
    validationParamWorkoutId,
    validationEnd,
];
