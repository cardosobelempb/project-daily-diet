import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../database/database";
import { validationMealsSchema } from "../validations-schema";

export const createMealController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const result = validationMealsSchema.parse(request.body);
  const { name, description } = result;
  const { userId } = request.cookies;

  if (!userId) {
    reply.code(404);
    return { message: "User not found" };
  }

  await db("meals").insert({
    name,
    description,
    user_id: userId,
  });
  return reply.status(201).send();
};
