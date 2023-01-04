// /* tslint:disable await-promise */
import { Knex } from "knex";
export async function up(knex: Knex) {
  await knex.schema.createTable("merchants", (table) => {
    table.increments("id");
    table.string("merchant_name").notNullable().unique();
    table.string("phone_number").notNullable();
    table.decimal("latitude", 11, 8).notNullable();
    table.decimal("longitude", 11, 8).notNullable();
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable("merchants");
  // throw new Error(
  //   "Downward migrations are not supported. Restore from backup."
  // );
}
