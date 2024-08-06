import express from "express";
import cors from "cors";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
//import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import Lab5 from './Lab5/index.js';

const app = express();
app.use(cors());
app.use(express.json());

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
//AssignmentRoutes(app);
Lab5(app);
//Hello(app);

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('Server is up and running');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});