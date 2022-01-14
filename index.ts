import express from 'express';
import cors from "cors";
import * as dotenv from 'dotenv';
import * as mongoose from "mongoose";
import cookieParser from "cookie-parser";
import configCors from "./src/configs/cors";
import authController from "./src/controllers/auth";
import usersController from "./src/controllers/users";
import messagesController from "./src/controllers/messages";
import exercisesController from "./src/controllers/exercises";
import workoutsController from "./src/controllers/workouts";

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors(configCors()));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authController);
app.use('/api/users', usersController);
app.use('/api/messages', messagesController);
app.use('/api/exercises', exercisesController);
app.use('/api/workouts', workoutsController);

const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Server connected MongoDB");
    } catch (error) {
        console.log(error.message)
    }
}

app.listen(PORT, startServer)