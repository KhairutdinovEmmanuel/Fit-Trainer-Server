import { FilterQuery, UpdateWithAggregationPipeline, UpdateQuery } from 'mongoose';
import ExerciseModel, {IExerciseSchema, ExerciseDocument} from "../models/exericises";
import { UpdateResult, DeleteResult } from 'mongodb';

export type FilterExerciseType = FilterQuery<IExerciseSchema>;
export type CreatePayloadExerciseType = IExerciseSchema;
export type UpdatePayloadExerciseType = UpdateWithAggregationPipeline | UpdateQuery<IExerciseSchema>;

export const findAllExercise = async (filter: FilterExerciseType): Promise<ExerciseDocument[]> => {
    return await ExerciseModel.find(filter).exec();
};

export const findExercise = async (filter: FilterExerciseType): Promise<ExerciseDocument> => {
    return await ExerciseModel.findOne(filter).exec();
};

export const createExercise = async (payload: CreatePayloadExerciseType): Promise<ExerciseDocument> => {
    const exercise = new ExerciseModel(payload);
    return await exercise.save();
};

export const updateExercise = async (filter: FilterExerciseType, payload: UpdatePayloadExerciseType): Promise<UpdateResult> => {
    return await ExerciseModel.updateOne(filter, payload).exec();
};

export const deleteExercise = async (filter: FilterExerciseType): Promise<DeleteResult> => {
    return await ExerciseModel.deleteOne(filter).exec();
};
