import { afterAll, beforeAll, beforeEach } from "vitest";
import type { FastifyInstance } from "fastify";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execSync = promisify(exec);

export async function setupTest(app: FastifyInstance) {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		try {
			execSync("npm run knex migrate:rollback --all"); // clean databese
			execSync("npm run knex migrate:latest"); // create again
		} catch (error) {
			console.error("Erro ao executar migrations:", error);
			throw error; // Propaga o erro para que o teste falhe corretamente
		}
	});
}
