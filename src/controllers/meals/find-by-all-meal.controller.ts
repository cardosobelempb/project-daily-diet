import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../database/database";

export const findByAllMealController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = request.cookies;

  if (!userId) {
    reply.code(404);
    return { message: "User not found" };
  }

  const meals = await db("meals").where("user_id", userId).select();

  return { meals };
};
