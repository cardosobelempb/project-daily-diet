import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../database/database";
import { validationParams } from "../validations-schema";

export const onAndOfMealController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = validationParams.parse(request.params);
  const { userId } = request.cookies;

  if (!userId) {
    reply.code(404);
    return { message: "User not found" };
  }

  const meal = await db("meals").where({ user_id: userId, id }).first();

  if (!meal) {
    reply.code(404);
    return { message: "Meal not found" };
  }

  await db("meals").where("id", id).update({
    is_on_diet: !meal?.is_on_diet,
  });
  return reply.status(204).send();
};
