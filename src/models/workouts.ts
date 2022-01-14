import { Schema, model, Document } from 'mongoose';

export interface IWorkoutSchema {
    userId: string;
    date: string;
    exercises: string[];
}

export type WorkoutDocument = IWorkoutSchema & Document;

const workoutSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        required: true
    },
    exercises: [{
        countRepeats: Number,
        countMeasurement: Number,
        position: Number,
        exercise: {
            type: Schema.Types.ObjectId,
            ref: 'Exercise'
        },
    }],
})

export default model<IWorkoutSchema>('Workout', workoutSchema);