import type { FastifyRequest, FastifyReply } from "fastify";

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = request.cookies;

  if (!userId) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
