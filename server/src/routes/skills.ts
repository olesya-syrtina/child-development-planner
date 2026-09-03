import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(skills);
  } catch (error) {
    console.error("Ошибка получения навыков:", error);

    res.status(500).json({
      error: "Не удалось получить навыки",
    });
  }
});

export default router;
