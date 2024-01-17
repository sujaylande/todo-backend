import express from 'express';
import useRouter from './routes/user.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config({
    path: './data/config.env',
});

app.use(cookieParser()); //middleware to parse cookies. it should be above the router
app.use(express.json()); //middleware to parse json data. it should be above the router
app.use("/api/v1/users", useRouter); //middleware to use the router

app.get('/', (req, res) => {
    res.send('Hello World!');
    });


export default app;
