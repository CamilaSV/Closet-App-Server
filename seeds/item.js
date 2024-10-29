/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import itemData from "../seed-data/item.js";

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("item").del();
  await knex("item").insert(itemData);
}
