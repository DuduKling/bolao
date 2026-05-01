const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const h = new helper(knex);

  await h.runOrLog(knex('bet').del());
  await h.runOrLog(knex('user_pool').del());
  await h.runOrLog(knex('pool_part').del());
  await h.runOrLog(knex('pool').del());
  await h.runOrLog(knex('user').del());
  await h.runOrLog(knex('fixture').del());
  await h.runOrLog(knex('team').del());
  await h.runOrLog(knex('part').del());
  await h.runOrLog(knex('phase').del());
  await h.runOrLog(knex('championship').del());

  await h.runOrLog(knex.schema.raw('ALTER TABLE bet AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE user_pool AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE pool_part AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE pool AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE user AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE fixture AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE team AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE part AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE phase AUTO_INCREMENT = 1'));
  await h.runOrLog(knex.schema.raw('ALTER TABLE championship AUTO_INCREMENT = 1'));
};
