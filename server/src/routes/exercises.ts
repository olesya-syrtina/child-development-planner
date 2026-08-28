import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        id,
        skill_id AS "skillId",
        title,
        description
      FROM exercises
      ORDER BY id`,
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка получения упражнений:", error);

    res.status(500).json({
      error: "Не удалось получить упражнения",
    });
  }
});

export default router;