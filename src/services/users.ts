import { FilterQuery, UpdateWithAggregationPipeline, UpdateQuery } from 'mongoose';
import UserModel, {IUserSchema, UserDocument} from "../models/users";
import {generateConfirmCode, hashPassword} from "./auth";
import { UpdateResult } from 'mongodb';

export type FilterUserType = FilterQuery<IUserSchema>;
export type CreatePayloadUserType = Pick<IUserSchema, "email" | "password">;
export type UpdatePayloadUserType = UpdateWithAggregationPipeline | UpdateQuery<IUserSchema>;

export const findUser = async (filter: FilterUserType): Promise<UserDocument> => {
    return await UserModel.findOne(filter).exec();
};

export const createUser = async (payload: CreatePayloadUserType): Promise<UserDocument> => {
    const hashedPassword = hashPassword(payload.password);
    const confirmCode = generateConfirmCode();
    const user = new UserModel({
        ...payload,
        password: hashedPassword,
        confirmCode,
        isVerified: false,
        isPasswordChanged: true,
    });
    return await user.save();
};

export const updateUser = async (filter: FilterUserType, payload: UpdatePayloadUserType): Promise<UpdateResult> => {
    return await UserModel.updateOne(filter, payload).exec();
};
