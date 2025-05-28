import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db, dbConfig } from "../../database/database";

const createUserBodySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const createMealController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const result = createUserBodySchema.parse(request.body);
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
