import {Schema, model, Document} from 'mongoose';

export interface IUserSchema {
    email: string;
    password: string;
    name?: string,
    surname?: string,
    avatar?: string,
    confirmCode: number;
    isVerified: boolean;
    isPasswordChanged: boolean;
}

export type UserDocument = IUserSchema & Document;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    surname: String,
    avatar: String,
    confirmCode: {
        type: Number,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    },
    isPasswordChanged: {
        type: Boolean,
        required: true,
    }
})

export default model<IUserSchema>('User', userSchema);
