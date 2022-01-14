import {body, cookie, param} from "express-validator";
import {
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_CONFIRM_CODE,
    ERROR_INVALID_FORMAT_DATE_DD_MM_YYYY,
    DYNAMIC_ERROR_INVALID_LENGTH,
    DYNAMIC_ERROR_FIELD_IS_EMPTY,
    DYNAMIC_ERROR_INVALID_FORMAT_URL,
    DYNAMIC_ERROR_FIELD_IS_NOT_NUMBER,
    DYNAMIC_ERROR_FIELD_IS_NOT_STRING,
    DYNAMIC_ERROR_FIELD_IS_NOT_INTEGER,
    DYNAMIC_ERROR_FIELD_IS_NOT_MONGO_ID,
} from "./errors";
import {isCustomDateFormat_DD_MM_YYYY, isCustomNumber, isCustomNumberLength} from "./custom-validations";

// RULES FIELDS AUTH
export const validationFieldEmail = body('email')
    .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING)
    .isEmail().withMessage(ERROR_INVALID_EMAIL);

export const validationFieldPassword = body('password')
    .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING)
    .isLength({ min: 6, max: 12 }).withMessage(DYNAMIC_ERROR_INVALID_LENGTH(6, 12));

export const validationFieldConfirmCode = body('confirmCode')
    .custom(isCustomNumber).withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_NUMBER)
    .custom(isCustomNumberLength(6, 6)).withMessage(ERROR_INVALID_CONFIRM_CODE);

export const validationCookieAccessToken = cookie('access_token')
    .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING);

export const validationCookieRefreshToken = cookie('refresh_token')
    .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING);

// RULES FIELDS USERS
export const validationFieldName = body('name')
    .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING)
    .isLength({ min: 2, max: 18 }).withMessage(DYNAMIC_ERROR_INVALID_LENGTH(2, 18));

export const validationFieldSurname = body('surname')
    .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING)
    .isLength({ min: 2, max: 18 }).withMessage(DYNAMIC_ERROR_INVALID_LENGTH(2, 18));

export const validationFieldAvatar = body('avatar')
    .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING)
    .isURL().withMessage(DYNAMIC_ERROR_INVALID_FORMAT_URL);

// RULES FIELDS EXERCISES
export const validationFieldsOfExercise = [
    body(['name', 'typeMeasurement'])
        .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING)
        .notEmpty().withMessage(DYNAMIC_ERROR_FIELD_IS_EMPTY),
    body('positionInArray')
        .isNumeric().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_NUMBER)
        .isInt().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_INTEGER),
]

export const validationParamExerciseId = param('exerciseId')
    .notEmpty().withMessage(DYNAMIC_ERROR_FIELD_IS_EMPTY)
    .isMongoId().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_MONGO_ID);

// RULES FIELDS WORKOUTS
export const validationFieldDateOfWorkout = body('date')
    .isString().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_STRING)
    .custom(isCustomDateFormat_DD_MM_YYYY).withMessage(ERROR_INVALID_FORMAT_DATE_DD_MM_YYYY);

export const validationFieldExercisesOfWorkout = [
    body(['exercises.*.repeats', 'exercises.*.measurements', "exercises.*.position"])
        .isNumeric().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_NUMBER)
        .isInt().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_INTEGER),
    body('exercises.*.exercise')
        .isMongoId().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_MONGO_ID),
];

export const validationParamWorkoutId = param('workoutId')
    .notEmpty().withMessage(DYNAMIC_ERROR_FIELD_IS_EMPTY)
    .isMongoId().withMessage(DYNAMIC_ERROR_FIELD_IS_NOT_MONGO_ID);
