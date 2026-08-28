import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        id,
        category,
        title,
        age_group AS "ageGroup"
      FROM skills
      ORDER BY id`,
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка получения навыков:", error);

    res.status(500).json({
      error: "Не удалось получить навыки",
    });
  }
});

export default router;