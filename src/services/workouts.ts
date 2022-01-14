import { FilterQuery, UpdateWithAggregationPipeline, UpdateQuery } from 'mongoose';
import WorkoutModel, {IWorkoutSchema, WorkoutDocument} from "../models/workouts";
import { UpdateResult, DeleteResult } from 'mongodb';

export type FilterWorkoutType = FilterQuery<IWorkoutSchema>;
export type CreatePayloadWorkoutType = IWorkoutSchema;
export type UpdatePayloadWorkoutType = UpdateWithAggregationPipeline | UpdateQuery<IWorkoutSchema>;

export const findAllWorkout = async (filter: FilterWorkoutType): Promise<WorkoutDocument[]> => {
    return await WorkoutModel.find(filter).exec();
};

export const findWorkout = async (filter: FilterWorkoutType): Promise<WorkoutDocument> => {
    return await WorkoutModel.findOne(filter).exec();
};

export const createWorkout = async (payload: CreatePayloadWorkoutType): Promise<WorkoutDocument> => {
    const exercise = new WorkoutModel(payload);
    return await exercise.save();
};

export const updateWorkout = async (filter: FilterWorkoutType, payload: UpdatePayloadWorkoutType): Promise<UpdateResult> => {
    return await WorkoutModel.updateOne(filter, payload).exec();
};

export const deleteWorkout = async (filter: FilterWorkoutType): Promise<DeleteResult> => {
    return await WorkoutModel.deleteOne(filter).exec();
};