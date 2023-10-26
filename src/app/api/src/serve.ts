
import express from 'express';
import usersRoute from './routes/users.route';
//import userRoutes from './routes/routes';
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(usersRoute);

export default app;