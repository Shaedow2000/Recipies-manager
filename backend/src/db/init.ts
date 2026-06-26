import { Pool } from "pg";
import type { QueryResult } from "pg";
import { readFileSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname: string = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: resolve(__dirname, "../../../.env"),
  override: true,
  quiet: true,
  encoding: "utf-8",
});

const PGUSER: string = process.env.PGUSER || "";
const PGPASSWROD: string = process.env.PGPASSWROD || "";
const PGDB: string = process.env.PGDB || "";

const pool: Pool = new Pool({
  user: PGUSER,
  password: PGPASSWROD,
  database: PGDB,
});

async function initDB(): Promise<void> {
  try {
    const dbInit: string = readFileSync(join(__dirname, "init.sql"), "utf-8");
    await pool.query(dbInit);

    const categoriesNumber: QueryResult<any> = (
      await pool.query("SELECT count(*) FROM category;")
    ).rows[0].count;

    if (parseInt(String(categoriesNumber) || "0") < 4) {
      await pool.query("INSERT INTO category(id, name) VALUES($1, $2)", [
        1,
        "Breakfast",
      ]);
      await pool.query("INSERT INTO category(id, name) VALUES($1, $2)", [
        2,
        "Lunch",
      ]);
      await pool.query("INSERT INTO category(id, name) VALUES($1, $2)", [
        3,
        "Dinner",
      ]);
      await pool.query("INSERT INTO category(id, name) VALUES($1, $2)", [
        4,
        "Desert",
      ]);
    }

    console.log("[ INFO ]> Init database");
  } catch (e: Error | unknown) {
    console.error("[ ERROR ]> %s", e instanceof Error ? e.message : e);
  } finally {
    await pool.end();
  }
}

await initDB();
