import {Router} from "express";
import {
    validationCreateExercise,
    validationGetExercises,
    validationUpdateExercise,
    validationDeleteExercise
} from "../validations/modules/exercises";
import {validationAccessToken} from "../middlewares/validationToken";
import {createExercise, deleteExercise, findAllExercise, findExercise, updateExercise} from "../services/exercises";

const router = Router();

router.post(
    '/',
    ...validationCreateExercise,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId, name, typeMeasurement, positionInArray } = req.body;
            const exercise = await createExercise({
                userId,
                name,
                typeMeasurement,
                positionInArray
            });
            res.setHeader('Location', `exercises/${exercise.id}`);
            return res.status(201).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.get(
    '/',
    ...validationGetExercises,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId } = req.body;
            const exercises = await findAllExercise({ userId });
            return res.status(200).json(exercises);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.put(
    '/:exerciseId',
    ...validationUpdateExercise,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId, name, typeMeasurement, positionInArray } = req.body;
            const { exerciseId } = req.params;
            const exercise = await findExercise({ userId, id: exerciseId });
            if (!exercise) {
                return res.status(404).json({
                    message: "Exercise not found"
                })
            }
            await updateExercise(
                { userId, id: exerciseId },
                {
                    $set: {
                        name,
                        typeMeasurement,
                        positionInArray
                    }
                }
            );
            return res.status(200).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.delete(
    '/:exerciseId',
    ...validationDeleteExercise,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId } = req.body;
            const { exerciseId } = req.params;
            const exercise = await findExercise({ userId, id: exerciseId });
            if (!exercise) {
                return res.status(404).json({
                    message: "Exercise not found"
                })
            }
            await deleteExercise({ userId, id: exerciseId });
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

export default router;
