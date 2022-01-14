import { Schema, model, Document } from 'mongoose';

export interface IExerciseSchema {
    userId: string;
    name: string;
    typeMeasurement: string;
    positionInArray: number;
}

export type ExerciseDocument = IExerciseSchema & Document;

const exerciseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    typeMeasurement: {
        type: String,
        required: true,
    },
    positionInArray: {
        type: Number,
        required: true,
    }
})

export default model<IExerciseSchema>('Exercise', exerciseSchema);
