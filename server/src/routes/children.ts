import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const children = await prisma.child.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(children);
  } catch (error) {
    console.error("Ошибка получения детей:", error);

    res.status(500).json({
      error: "Не удалось получить данные детей",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const child = await prisma.child.findUnique({
      where: {
        id,
      },
    });

    if (!child) {
      return res.status(404).json({
        error: "Ребёнок не найден",
      });
    }

    res.json(child);
  } catch (error) {
    console.error("Ошибка получения ребёнка:", error);

    res.status(500).json({
      error: "Не удалось получить данные ребёнка",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, age, selectedSkills } = req.body;

    const child = await prisma.child.create({
      data: {
        name,
        age,
        selectedSkills,
      },
    });

    res.status(201).json(child);
  } catch (error) {
    console.error("Ошибка создания ребёнка:", error);

    res.status(500).json({
      error: "Не удалось сохранить данные ребёнка",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { selectedSkills } = req.body;

    const child = await prisma.child.update({
      where: {
        id,
      },
      data: {
        selectedSkills,
      },
    });

    res.json(child);
  } catch (error) {
    console.error("Ошибка обновления ребёнка:", error);

    res.status(500).json({
      error: "Не удалось обновить данные ребёнка",
    });
  }
});

export default router;