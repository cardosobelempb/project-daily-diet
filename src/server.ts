import { app } from "./app";
import { env } from "./shared/schema/env.shema";

const host = env.HOST_NAME;
const port = env.PORT;
const url = `http://${host}:${port}/`;

app.listen({ port, host }).then(() => {
  console.log(`Server listening at ${url}`);
});
