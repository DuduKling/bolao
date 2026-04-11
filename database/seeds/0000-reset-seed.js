/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('bet').del();
  await knex('users').del();
  await knex('fixture').del();
  await knex('team').del();
  await knex('part').del();
  await knex('phase').del();
  await knex('championship').del();

  await knex.schema.raw('ALTER TABLE bet AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE users AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE fixture AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE team AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE part AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE phase AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE championship AUTO_INCREMENT = 1');
};
