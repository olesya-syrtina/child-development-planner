import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(exercises);
  } catch (error) {
    console.error("Ошибка получения упражнений:", error);

    res.status(500).json({
      error: "Не удалось получить упражнения",
    });
  }
});

export default router;