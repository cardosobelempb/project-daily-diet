import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../database/database";

export const metricsMealsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = request.cookies;

  const numberOfMeals = await db("meals")
    .where("user_id", userId)
    .count("id", { as: "total" })
    .first();

  if (!numberOfMeals) {
    return { message: "Meal not found" };
  }

  const offDietMeals = await db("meals")
    .where("user_id", userId)
    .where("is_on_diet", "false")
    .count("is_on_diet", { as: "total" })
    .first();

  if (!offDietMeals) {
    return { message: "Meal not found" };
  }

  const onDietMeals = await db("meals")
    .where("user_id", userId)
    .where("is_on_diet", "true")
    .count("is_on_diet", { as: "total" })
    .first();

  if (!onDietMeals) {
    return { message: "Meal not found" };
  }

  const totalLoggedMeals = await db("meals")
    .where("user_id", userId)
    .orderBy("created_at", "desc");

  const { bestOnDietMeals } = totalLoggedMeals.reduce(
    (acc, meal) => {
      if (meal.is_on_diet) {
        acc.currentBestOnDietMeals += 1;
      } else {
        acc.currentBestOnDietMeals = 0;
      }

      if (acc.currentBestOnDietMeals > acc.bestOnDietMeals) {
        acc.bestOnDietMeals = acc.currentBestOnDietMeals;
      }

      return acc;
    },
    { bestOnDietMeals: 0, currentBestOnDietMeals: 0 }
  );

  return reply.status(200).send({
    number_of_meals: numberOfMeals,
    on_diet_meals: onDietMeals,
    off_diet_meals: offDietMeals,
    best_on_diet_meals: { total: bestOnDietMeals },
  });
};
