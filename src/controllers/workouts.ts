import {Router} from "express";
import {
    validationCreateWorkout,
    validationGetWorkouts,
    validationGetWorkout,
    validationUpdateWorkout,
    validationDeleteWorkout
} from "../validations/modules/workouts";
import {validationAccessToken} from "../middlewares/validationToken";
import {createWorkout, findAllWorkout, findWorkout} from "../services/workouts";
import {deleteExercise, updateExercise} from "../services/exercises";

const router = Router();

router.post(
    '/',
    ...validationCreateWorkout,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId, date, exercises } = req.body;
            const workout = await createWorkout({
                userId,
                date,
                exercises,
            })
            res.setHeader('Location', `workouts/details/${workout.id}`);
            return res.status(201).json({})
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.get(
    '/',
    ...validationGetWorkouts,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId } = req.body;
            const workouts = await findAllWorkout({ userId });
            return res.status(200).json(workouts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.get(
    '/details/:workoutId',
    ...validationGetWorkout,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId } = req.body;
            const { workoutId } = req.params;
            const workout = await findWorkout({ userId, id: workoutId });
            if (!workout) {
                return res.status(404).json({
                    message: "Workout not found"
                })
            }
            return res.status(200).json(workout);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.put(
    '/:workoutId',
    ...validationUpdateWorkout,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId, repeats, measurements, position, exercise } = req.body;
            const { workoutId } = req.params;
            const workout = await findWorkout({ userId, id: workoutId });
            if (!workout) {
                return res.status(404).json({
                    message: "Workout not found"
                })
            }
            await updateExercise(
                { userId, id: workoutId },
                {
                    $set: {
                        repeats,
                        measurements,
                        position,
                        exercise,
                    }
                }
            );
            return res.status(204).json({})
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
)

router.delete(
    '/:workoutId',
    ...validationDeleteWorkout,
    validationAccessToken,
    async (req, res) => {
        try {
            const { userId } = req.body;
            const { workoutId } = req.params;
            const workout = await findWorkout({ userId, id: workoutId });
            if (!workout) {
                return res.status(404).json({
                    message: "Workout not found"
                })
            }
            await deleteExercise({ userId, id: workoutId });
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
)

export default router;
