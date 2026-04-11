/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

  const { id: userTesteId } = knex('users').where('name', 'teste').first();
  const { id: userLoserId } = knex('users').where('name', 'loser').first();

  await knex('bet').insert([
    // Russia 2018 - Grupos
    { fkUserId: userTesteId, fkFixtureId: 1, homeTeamScoreBet: 5, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 2, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 3, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 4, homeTeamScoreBet: 3, awayTeamScoreBet: 3, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 5, homeTeamScoreBet: 2, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 6, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 7, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 8, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 9, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 10, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 11, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 12, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 13, homeTeamScoreBet: 3, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 14, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 15, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 16, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },

    { fkUserId: userTesteId, fkFixtureId: 17, homeTeamScoreBet: 3, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 18, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 19, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 20, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 21, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 22, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 23, homeTeamScoreBet: 0, awayTeamScoreBet: 3, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 24, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 25, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 26, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 27, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 28, homeTeamScoreBet: 2, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 29, homeTeamScoreBet: 5, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 30, homeTeamScoreBet: 6, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 31, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 32, homeTeamScoreBet: 0, awayTeamScoreBet: 3, points: 3 },

    { fkUserId: userTesteId, fkFixtureId: 33, homeTeamScoreBet: 2, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 34, homeTeamScoreBet: 3, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 35, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 36, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 37, homeTeamScoreBet: 0, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 38, homeTeamScoreBet: 0, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 39, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 40, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 41, homeTeamScoreBet: 0, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 42, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 43, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 44, homeTeamScoreBet: 0, awayTeamScoreBet: 3, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 45, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 46, homeTeamScoreBet: 1, awayTeamScoreBet: 2, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 47, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 48, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },

    // Copa America 2019 - Eliminatórias
    { fkUserId: userTesteId, fkFixtureId: 89, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 90, homeTeamScoreBet: 1, awayTeamScoreBet: 1, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 91, homeTeamScoreBet: 0, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 92, homeTeamScoreBet: 5, awayTeamScoreBet: 0, points: 3 },

    { fkUserId: userTesteId, fkFixtureId: 93, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userTesteId, fkFixtureId: 94, homeTeamScoreBet: 0, awayTeamScoreBet: 1, points: 3 },

    { fkUserId: userTesteId, fkFixtureId: 95, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },

    { fkUserId: userTesteId, fkFixtureId: 96, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },

    // Copa America 2019 - Eliminatórias
    { fkUserId: userLoserId, fkFixtureId: 89, homeTeamScoreBet: 3, awayTeamScoreBet: 3, points: 1 },
    { fkUserId: userLoserId, fkFixtureId: 90, homeTeamScoreBet: 3, awayTeamScoreBet: 3, points: 1 },
    { fkUserId: userLoserId, fkFixtureId: 91, homeTeamScoreBet: 0, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userLoserId, fkFixtureId: 92, homeTeamScoreBet: 10, awayTeamScoreBet: 0, points: 1 },

    { fkUserId: userLoserId, fkFixtureId: 93, homeTeamScoreBet: 2, awayTeamScoreBet: 0, points: 3 },
    { fkUserId: userLoserId, fkFixtureId: 94, homeTeamScoreBet: 1, awayTeamScoreBet: 3, points: 1 },

    { fkUserId: userLoserId, fkFixtureId: 95, homeTeamScoreBet: 2, awayTeamScoreBet: 2, points: 3 },

    { fkUserId: userLoserId, fkFixtureId: 96, homeTeamScoreBet: 1, awayTeamScoreBet: 0, points: 3 },
  ]);
};
