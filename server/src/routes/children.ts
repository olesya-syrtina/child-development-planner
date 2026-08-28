import { Router } from "express";
import { pool } from "../db";

const router = Router();

// Получить всех детей
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        id,
        name,
        age,
        selected_skills AS "selectedSkills"
      FROM children
      ORDER BY id`,
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка получения детей:", error);

    res.status(500).json({
      error: "Не удалось получить данные детей",
    });
  }
});

// Получить ребёнка по ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        id,
        name,
        age,
        selected_skills AS "selectedSkills"
      FROM children
      WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Ребёнок не найден",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка получения ребёнка:", error);

    res.status(500).json({
      error: "Не удалось получить данные ребёнка",
    });
  }
});

// Создать ребёнка
router.post("/", async (req, res) => {
  try {
    const { name, age, selectedSkills } = req.body;

    const result = await pool.query(
      `INSERT INTO children (name, age, selected_skills)
       VALUES ($1, $2, $3)
       RETURNING
         id,
         name,
         age,
         selected_skills AS "selectedSkills"`,
      [name, age, selectedSkills],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка создания ребёнка:", error);

    res.status(500).json({
      error: "Не удалось сохранить данные ребёнка",
    });
  }
});

// Обновить выбранные навыки ребёнка
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedSkills } = req.body;

    const result = await pool.query(
      `UPDATE children
       SET selected_skills = $1
       WHERE id = $2
       RETURNING
         id,
         name,
         age,
         selected_skills AS "selectedSkills"`,
      [selectedSkills, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Ребёнок не найден",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка обновления ребёнка:", error);

    res.status(500).json({
      error: "Не удалось обновить данные ребёнка",
    });
  }
});

export default router;