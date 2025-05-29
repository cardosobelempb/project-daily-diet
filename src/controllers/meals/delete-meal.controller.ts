import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../database/database";
import { validationParams } from "../validations-schema";

export const deleteMealController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = validationParams.parse(request.params);
  const { userId } = request.cookies;

  if (!userId) {
    reply.code(404);
    return { message: "User not found" };
  }

  await db("meals").where("id", id).where("id", id).delete();
  return reply.status(204).send();
};
