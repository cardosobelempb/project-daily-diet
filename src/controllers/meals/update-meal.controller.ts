import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../database/database";
import { validationMealsSchema, validationParams } from "../validations-schema";

export const updateMealController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = validationParams.parse(request.params);
  const { name, description } = validationMealsSchema.parse(request.body);

  const { userId } = request.cookies;

  if (!userId) {
    reply.code(404);
    return { message: "User not found" };
  }

  await db("meals").where("id", id).update({
    name,
    description,
  });
  return reply.status(204).send();
};
