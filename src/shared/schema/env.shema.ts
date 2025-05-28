import { config } from "dotenv";
import z from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config;
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().default("postgres"),
  DB_PASSWORD: z.string().default("docker"),
  DB_NAME: z.string().default("api-daily-diet"),
  PORT: z.coerce.number().default(3333),
  HOST_NAME: z.string().default("127.0.0.1"),
  DATABASE_URL: z
    .string()
    .default("postgres://postgres:docker@localhost:5432/api-daily-diet"),
  DATABASE_CLIENT: z.enum(["pg", "mysql", "sqlite"]).default("pg"),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
