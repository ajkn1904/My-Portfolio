import compression from "compression";
import cors from "cors";
import express from "express";

const app = express();

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json()); 

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


// Default route for testing
app.get("/", (_req, res) => {
  res.send("My Portfolio API is running...");
});


export default app;
