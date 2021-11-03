import express from 'express';
import router from './router';
// import { name, version } from '../package.json';

require('dotenv').config();

const PORT = 3001;
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(router);
// console.log(`Starting ${name} v${version} in ${process.env.NODE_ENV} mode`);
app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
