import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../database/database";

const findByIdMealParamsSchema = z.object({
  id: z.string().uuid(),
});

export const findByIdMealController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const params = findByIdMealParamsSchema.parse(request.params);
  const { id } = params;
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
  return { meal };
};
