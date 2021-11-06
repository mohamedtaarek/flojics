import express from 'express';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(router);
// console.log(`Starting ${name} v${version} in ${process.env.NODE_ENV} mode`);
app.listen(process.env.PORT);
