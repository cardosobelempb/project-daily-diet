import type { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  const users = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    created_at: new Date().toISOString(),
    updated_at: null,
    deleted_at: null,
  }));

  await knex("users").insert(users);

  await knex("meals").del();

  const entity = await knex("users").select("id");

  const meals = [];

  for (const user of entity) {
    const mealCount = faker.number.int({ min: 1, max: 5 });

    for (let i = 0; i < mealCount; i++) {
      meals.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        is_on_diet: faker.datatype.boolean(),
        created_at: new Date().toISOString(),
        updated_at: null,
        deleted_at: null,
        user_id: user.id,
      });
    }
  }

  await knex("meals").insert(meals);
}
