import type { FastifyInstance } from "fastify";
import { createMealController } from "../controllers/meals/create-meal.controller";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
import { findByIdMealController } from "../controllers/meals/find-by-id-meal.controller";
import { findByAllMealController } from "../controllers/meals/find-by-all-meal.controller";

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [checkSessionIdExists] }, createMealController);
  app.get(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    findByIdMealController
  );
  app.get("/", { preHandler: [checkSessionIdExists] }, findByAllMealController);
}
