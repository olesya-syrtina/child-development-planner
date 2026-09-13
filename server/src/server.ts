import express from "express";
import cors from "cors";
import skillsRouter from "./routes/skills";
import exercisesRouter from "./routes/exercises";
import childrenRouter from "./routes/children";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/skills", skillsRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/children", childrenRouter);

app.get("/", (_req, res) => {
  res.send("Child Development Planner API");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
