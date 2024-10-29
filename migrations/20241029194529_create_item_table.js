/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("item", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("season");
    table.string("category");
    table.string("color");
    table.string("material");
    table.string("pattern");
    table.string("tags");
    table.string("notes");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("item");
}
