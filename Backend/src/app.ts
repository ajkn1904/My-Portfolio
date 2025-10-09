import compression from "compression";
import cors from "cors";
import express from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFoundRoute";
import { envVars } from "./config/env";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import router from "./app/routes";


const app = express();


// Middlewares
app.use(expressSession({
  secret: envVars.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(cors());
app.use(compression());
app.use(cookieParser());

app.use(express.json()); 

app.use(
  cors({
    origin: [envVars.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
  })
);

app.use("/api", router)

// Default route for testing
app.get("/", (_req, res) => {
  res.send("My Portfolio API is running...");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
