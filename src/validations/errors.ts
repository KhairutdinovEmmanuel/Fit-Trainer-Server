// Statics errors
export const ERROR_INVALID_EMAIL = "Invalid email";
export const ERROR_INVALID_CONFIRM_CODE = 'Field confirmCode must be at least 6 long and not more 6 chars';
export const ERROR_INVALID_FORMAT_DATE_DD_MM_YYYY = "Field date isn't date format DD.MM.YYYY";
// Dynamic errors
export const DYNAMIC_ERROR_FIELD_IS_NOT_STRING = (value, {path}) => {
    return `Field ${path} isn't a string`;
};

export const DYNAMIC_ERROR_FIELD_IS_NOT_NUMBER = (value, {path}) => {
    return `Field ${path} isn't a number`;
};

export const DYNAMIC_ERROR_INVALID_LENGTH = (min: number, max: number) => (value, {path}) => {
    return `Field ${path} must be at least ${min} long and not more ${max} chars`;
};

export const DYNAMIC_ERROR_INVALID_FORMAT_URL = (value, {path}) => {
    return `Field ${path} isn't format url`;
};

export const DYNAMIC_ERROR_FIELD_IS_EMPTY = (value, {path}) => {
    return `Param ${path} is empty`;
};

export const DYNAMIC_ERROR_FIELD_IS_NOT_INTEGER = (value, {path}) => {
    return `Field ${path} isn't integer`;
};

export const DYNAMIC_ERROR_FIELD_IS_NOT_MONGO_ID = (value, {path}) => {
    return `Field ${path} isn't mongo id`;
};
