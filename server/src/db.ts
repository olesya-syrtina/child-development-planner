import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "child_development_planner",
  password: "postgres",
  port: 5432,
});

pool.query("SELECT NOW()")
  .then(() => {
    console.log("PostgreSQL connected");
  })
  .catch((error) => {
    console.error("PostgreSQL connection error:", error);
});