import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../database/database";

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const result = createUserBodySchema.parse(request.body);

  const { name, email } = result;

  let userId = request.cookies.id;

  if (!userId) {
    userId = crypto.randomUUID();
    reply.setCookie("userId", userId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
  }

  await db("users").insert({
    id: userId,
    name,
    email,
  });
  return reply.status(201).send();
};
