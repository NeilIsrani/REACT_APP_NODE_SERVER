import express from "express";
import cors from "cors";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
//import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import Lab5 from './Lab5/index.js';
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import * as dao from "./Users/dao.js";

const MONGO_CONNECTION_STRING = "mongodb+srv://neilisrani:123456.@kanbas.jl0kl.mongodb.net/kanbas?retryWrites=true&w=majority&appName=Kanbas"

mongoose.connect(MONGO_CONNECTION_STRING);
const app = express();
app.use(cors({credentials: true,
  origin: process.env.NETLIFY_URL,
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(
  session(sessionOptions)
);

app.use(express.json());

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
//AssignmentRoutes(app);
Lab5(app);
//Hello(app);
UserRoutes(app);

console.log(dao.findUserById("126"));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('Server is up and running');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
