import { Pool } from "pg";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import type { QueryResult } from "pg";

const __dirname: string = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: resolve(__dirname, "../../../.env"),
  override: true,
  quiet: true,
  encoding: "utf-8",
});

const PGUSER: string = process.env.PGUSER || "";
const PGPASSWORD: string = process.env.PGPASSWORD || "";
const PGDB: string = process.env.PGDB || "";

const pool: Pool = new Pool({
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDB,
});

// controllers
class Get {
  public async categories(): Promise<string[]> {
    const query: { text: string; rowMode: string } = {
      text: "SELECT name FROM category",
      rowMode: "array",
    };

    const categorieNames: QueryResult<any> = await pool.query(query);

    return categorieNames.rows.map((category: string[]): string => category[0]);
  }
}

export { Get };
