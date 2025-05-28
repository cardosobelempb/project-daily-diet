import fastify from "fastify";
import { usersRoutes } from "./routes/users";
import { mealsRoutes } from "./routes/meals";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

// app.addHook("preHandler", async (request, reply) => {});

app.register(fastifyCookie);
app.register(usersRoutes, { prefix: "api/v1/users" });
app.register(mealsRoutes, { prefix: "api/v1/meals" });
