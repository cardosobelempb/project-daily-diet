import type { FastifyInstance } from "fastify";
import { createMealController } from "../controllers/meals/create-meal.controller";
import { deleteMealController } from "../controllers/meals/delete-meal.controller";
import { findByAllMealController } from "../controllers/meals/find-by-all-meal.controller";
import { findByIdMealController } from "../controllers/meals/find-by-id-meal.controller";
import { metricsMealsController } from "../controllers/meals/metrics-meals.controller";
import { updateMealController } from "../controllers/meals/update-meal.controller";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
import { onAndOfMealController } from "../controllers/meals/on-and-off-diet-meal.controller copy";

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [checkSessionIdExists] }, createMealController);

  app.get(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    findByIdMealController
  );

  app.patch(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    onAndOfMealController
  );

  app.get("/", { preHandler: [checkSessionIdExists] }, findByAllMealController);

  app.get(
    "/metrics",
    { preHandler: [checkSessionIdExists] },
    metricsMealsController
  );

  app.put("/:id", { preHandler: [checkSessionIdExists] }, updateMealController);

  app.delete(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    deleteMealController
  );
}
