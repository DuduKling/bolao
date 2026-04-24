/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

  await knex('pool').insert([
    { uuid: '1', name: 'Campeonato da Família Addams', description: 'Fase de Grupos', status: 'finished', startDate: '2022-11-20 00:00:00', endDate: '2022-12-18 00:00:00' },
    { uuid: '2', name: 'Mestres do Palpite', description: 'Fase de Eliminatórias', status: 'open', startDate: '2022-11-20 00:00:00', endDate: '2022-12-18 00:00:00' },
    { uuid: '3', name: 'Bolão 1', description: 'Bolão numero 1', status: 'onGoing', startDate: '2022-11-20 00:00:00', endDate: '2022-12-18 00:00:00' },
    { uuid: '4', name: 'Bolão 2', description: 'Bolão numero 2', status: 'tba', startDate: '2022-11-20 00:00:00', endDate: '2022-12-18 00:00:00' },
    { uuid: '5', name: 'Bolão 3', description: 'Bolão numero 3', status: 'open', startDate: '2022-11-20 00:00:00', endDate: '2022-12-18 00:00:00' },
  ]);

  await knex('pool_part').insert([
    { fkPoolId: 1, fkPartId: 1 },
    { fkPoolId: 1, fkPartId: 2 },
    { fkPoolId: 1, fkPartId: 3 },
    { fkPoolId: 1, fkPartId: 4 },
    { fkPoolId: 1, fkPartId: 5 },
    { fkPoolId: 1, fkPartId: 6 },
    { fkPoolId: 1, fkPartId: 7 },
    { fkPoolId: 1, fkPartId: 8 },

    { fkPoolId: 2, fkPartId: 18 },
    { fkPoolId: 2, fkPartId: 19 },
    { fkPoolId: 2, fkPartId: 20 },
    { fkPoolId: 2, fkPartId: 21 },

    { fkPoolId: 3, fkPartId: 18 },
    { fkPoolId: 3, fkPartId: 19 },
    { fkPoolId: 3, fkPartId: 20 },
    { fkPoolId: 3, fkPartId: 21 },

    { fkPoolId: 4, fkPartId: 18 },
    { fkPoolId: 4, fkPartId: 19 },
    { fkPoolId: 4, fkPartId: 20 },
    { fkPoolId: 4, fkPartId: 21 },

    { fkPoolId: 5, fkPartId: 18 },
    { fkPoolId: 5, fkPartId: 19 },
    { fkPoolId: 5, fkPartId: 20 },
    { fkPoolId: 5, fkPartId: 21 },
  ]);

  const { id: userTesteId } = await knex('user').where('name', 'teste').first();
  const { id: userLoserId } = await knex('user').where('name', 'loser').first();

  await knex('user_pool').insert([
    { fkUserId: userTesteId, fkPoolId: 1 },
    { fkUserId: userTesteId, fkPoolId: 2 },
    { fkUserId: userLoserId, fkPoolId: 2 },
  ]);

  await knex('bet').insert([
    // Russia 2018 - Grupos
    { fkUserPoolId: 1, fkFixtureId: 1, homeTeamScoreBet: 5, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 2, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 3, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 4, homeTeamScoreBet: 3, awayTeamScoreBet: 3, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 5, homeTeamScoreBet: 2, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 6, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 7, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 8, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 9, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 10, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 11, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 12, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 13, homeTeamScoreBet: 3, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 14, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 15, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 16, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },

    { fkUserPoolId: 1, fkFixtureId: 17, homeTeamScoreBet: 3, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 18, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 19, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 20, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 21, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 22, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 23, homeTeamScoreBet: 0, awayTeamScoreBet: 3, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 24, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 25, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 26, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 27, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 28, homeTeamScoreBet: 2, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 29, homeTeamScoreBet: 5, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 30, homeTeamScoreBet: 6, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 31, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 32, homeTeamScoreBet: 0, awayTeamScoreBet: 3, points: 3 },

    { fkUserPoolId: 1, fkFixtureId: 33, homeTeamScoreBet: 2, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 34, homeTeamScoreBet: 3, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 35, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 36, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 37, homeTeamScoreBet: 0, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 38, homeTeamScoreBet: 0, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 39, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 40, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 41, homeTeamScoreBet: 0, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 42, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 43, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 44, homeTeamScoreBet: 0, awayTeamScoreBet: 3, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 45, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 46, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 47, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 1, fkFixtureId: 48, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },

    // Copa America 2019 - Eliminatórias
    { fkUserPoolId: 2, fkFixtureId: 89, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 2, fkFixtureId: 90, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserPoolId: 2, fkFixtureId: 91, homeTeamScoreBet: 0, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 2, fkFixtureId: 92, homeTeamScoreBet: 5, awayTeamScoreBet: 0, points: 3 },

    { fkUserPoolId: 2, fkFixtureId: 93, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 2, fkFixtureId: 94, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },

    { fkUserPoolId: 2, fkFixtureId: 95, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },

    { fkUserPoolId: 2, fkFixtureId: 96, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },

    // Copa America 2019 - Eliminatórias
    { fkUserPoolId: 3, fkFixtureId: 89, homeTeamScoreBet: 3, awayTeamScoreBet: 3, points: 1 },
    { fkUserPoolId: 3, fkFixtureId: 90, homeTeamScoreBet: 3, awayTeamScoreBet: 3, points: 1 },
    { fkUserPoolId: 3, fkFixtureId: 91, homeTeamScoreBet: 0, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 3, fkFixtureId: 92, homeTeamScoreBet: 10, awayTeamScoreBet: 0, points: 1 },

    { fkUserPoolId: 3, fkFixtureId: 93, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserPoolId: 3, fkFixtureId: 94, homeTeamScoreBet: 1, awayTeamScoreBet: 3, points: 1 },

    { fkUserPoolId: 3, fkFixtureId: 95, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },

    { fkUserPoolId: 3, fkFixtureId: 96, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
  ]);
};
