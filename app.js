import express from 'express';
import useRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {errorMiddleware} from './middlewares/error.js';
import cors from 'cors';

const app = express();

dotenv.config({
    path: './data/config.env',
});

app.use(cookieParser()); //middleware to parse cookies. it should be above the route r
app.use(express.json()); //middleware to parse json data. it should be above the router
app.use(cors({
    origin: [process.env.FRONTEND_URL], //allow only this url to access the api
    credentials: true, //allow credentials to be sent to the frontend
    method : ['GET', 'POST', 'PUT', 'DELETE'], //allow only these methods
})
);

app.use("/api/v1/users", useRouter); //middleware to use the router
app.use("/api/v1/task", taskRouter); //middleware to use the router

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

//middleware to handle errors
app.use(errorMiddleware);

export default app;
