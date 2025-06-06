import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id?: string;
      name: string;
      email: string;
      created_at: string;
      updated_at?: string | null;
      deleted_at?: string | null;
    };
    meals: {
      id?: string;
      name: string;
      description: string;
      is_on_diet: boolean;
      created_at: string;
      updated_at?: string | null;
      deleted_at?: string | null;
      user_id?: string | null;
    };
  }
}
