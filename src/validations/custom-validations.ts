import {CustomValidator} from "express-validator/src/base";

export const isCustomDateFormat_DD_MM_YYYY: CustomValidator = (input: string) => {
    const isMatchedFormat = typeof input === "string"
        ? /^[\d]{2}.[\d]{2}.[\d]{4}$/g.test(input) : false;
    if (isMatchedFormat) {
        const [day, month, year]: string[] = input.split('.');
        const isDay = Number(day) > 1 && Number(day) <= 31;
        const isMonth = Number(month) >= 0 && Number(month) <= 11;
        const isYear = Number(year) >= new Date().getFullYear();
        return isDay && isMonth && isYear;
    }
    return false;
};

export const isCustomNumber: CustomValidator = (input) => {
    return typeof input === "number"
}

export const isCustomNumberLength = (min: number, max: number): CustomValidator => (input) => {
    if (typeof input === "number") {
        const inputLength = input.toString().length;
        return inputLength >= min && inputLength <= max;
    }
    return false;
}
