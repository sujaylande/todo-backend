import express from 'express';
import useRouter from './routes/user.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config({
    path: './data/config.env',
});

app.use(express.json()); //middleware to parse json data
app.use("/users", useRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
    });


export default app;