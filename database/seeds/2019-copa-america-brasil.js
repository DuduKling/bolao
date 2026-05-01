const helper = require('../helpers');
/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const h = new helper(knex);

  const [champId] = await h.runOrLog(knex('championship')
    .insert({ name: 'Copa América Brasil 2019', logo: 'copa_america_2019.png', startDate: '2019-06-14', endDate: '2019-07-07' }));

  await h.runOrLog(knex('phase').insert([
    { name: 'Grupos', fkChampionshipId: champId, },
    { name: 'Eliminatórias', fkChampionshipId: champId, },
  ]));

  const fase1 = await h.getPhase('Grupos', champId);
  const fase2 = await h.getPhase('Eliminatórias', champId);
  await h.runOrLog(knex('part').insert([
    { name: 'Grupo A', fkPhaseId: fase1, },
    { name: 'Grupo B', fkPhaseId: fase1, },
    { name: 'Grupo C', fkPhaseId: fase1, },
    { name: 'Grupo D', fkPhaseId: fase1, },
    { name: 'Quartas', fkPhaseId: fase2, },
    { name: 'Semifinal', fkPhaseId: fase2, },
    { name: 'Terceiro Lugar', fkPhaseId: fase2, },
    { name: 'Final', fkPhaseId: fase2, },
  ]));

  const teams = await h.getTeams();

  const grupoA = await h.getPart('Grupo A', fase1);
  const grupoB = await h.getPart('Grupo B', fase1);
  const grupoC = await h.getPart('Grupo C', fase1);
  const grupoD = await h.getPart('Grupo D', fase1);
  const quartas = await h.getPart('Quartas', fase2);
  const semi = await h.getPart('Semifinal', fase2);
  const terceiro = await h.getPart('Terceiro Lugar', fase2);
  const final = await h.getPart('Final', fase2);

  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoA, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.CAN, dateTime: '2024-06-20 21:00', location: 'Atlanta', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoA, fkHomeTeamId: teams.PER, fkAwayTeamId: teams.CHI, dateTime: '2024-06-21 21:00', location: 'Dallas', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoB, fkHomeTeamId: teams.ECU, fkAwayTeamId: teams.VEN, dateTime: '2024-06-22 19:00', location: 'Santa Clara', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoB, fkHomeTeamId: teams.MEX, fkAwayTeamId: teams.JAM, dateTime: '2024-06-22 22:00', location: 'Houston', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoC, fkHomeTeamId: teams.USA, fkAwayTeamId: teams.BOL, dateTime: '2024-06-23 19:00', location: 'Dallas', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoC, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.PAN, dateTime: '2024-06-23 22:00', location: 'Miami', homeTeamScore: 3, awayTeamScore: 1 },
    { fkPartId: grupoD, fkHomeTeamId: teams.COL, fkAwayTeamId: teams.PAR, dateTime: '2024-06-24 19:00', location: 'Houston', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: grupoD, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.CRC, dateTime: '2024-06-24 22:00', location: 'Los Angeles', homeTeamScore: 0, awayTeamScore: 0 },

    { fkPartId: grupoA, fkHomeTeamId: teams.PER, fkAwayTeamId: teams.CAN, dateTime: '2024-06-25 19:00', location: 'Sporting Kansas City', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoA, fkHomeTeamId: teams.CHI, fkAwayTeamId: teams.ARG, dateTime: '2024-06-25 22:00', location: 'Nova Jersey', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoB, fkHomeTeamId: teams.ECU, fkAwayTeamId: teams.JAM, dateTime: '2024-06-26 19:00', location: 'Las Vegas', homeTeamScore: 3, awayTeamScore: 1 },
    { fkPartId: grupoB, fkHomeTeamId: teams.VEN, fkAwayTeamId: teams.MEX, dateTime: '2024-06-26 22:00', location: 'Los Angeles', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoC, fkHomeTeamId: teams.PAN, fkAwayTeamId: teams.USA, dateTime: '2024-06-27 19:00', location: 'Atlanta', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: grupoC, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.BOL, dateTime: '2024-06-27 22:00', location: 'Nova Jersey', homeTeamScore: 5, awayTeamScore: 0 },
    { fkPartId: grupoD, fkHomeTeamId: teams.COL, fkAwayTeamId: teams.CRC, dateTime: '2024-06-28 19:00', location: 'Glendale', homeTeamScore: 3, awayTeamScore: 0 },
    { fkPartId: grupoD, fkHomeTeamId: teams.PAR, fkAwayTeamId: teams.BRA, dateTime: '2024-06-28 22:00', location: 'Las Vegas', homeTeamScore: 1, awayTeamScore: 4 },

    { fkPartId: grupoA, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.PER, dateTime: '2024-06-29 21:00', location: 'Miami', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoA, fkHomeTeamId: teams.CAN, fkAwayTeamId: teams.CHI, dateTime: '2024-06-29 21:00', location: 'Orlando', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoB, fkHomeTeamId: teams.JAM, fkAwayTeamId: teams.VEN, dateTime: '2024-06-30 21:00', location: 'Austin', homeTeamScore: 0, awayTeamScore: 3 },
    { fkPartId: grupoB, fkHomeTeamId: teams.MEX, fkAwayTeamId: teams.ECU, dateTime: '2024-06-30 21:00', location: 'Glendale', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoC, fkHomeTeamId: teams.BOL, fkAwayTeamId: teams.PAN, dateTime: '2024-07-01 22:00', location: 'Orlando', homeTeamScore: 1, awayTeamScore: 3 },
    { fkPartId: grupoC, fkHomeTeamId: teams.USA, fkAwayTeamId: teams.URU, dateTime: '2024-07-01 22:00', location: 'Kansas City', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoD, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.COL, dateTime: '2024-07-02 22:00', location: 'Santa Clara', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: grupoD, fkHomeTeamId: teams.CRC, fkAwayTeamId: teams.PAR, dateTime: '2024-07-02 22:00', location: 'Austin', homeTeamScore: 2, awayTeamScore: 1 },

    { fkPartId: quartas, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.ECU, dateTime: '2024-07-04 22:00', location: 'Houston', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: quartas, fkHomeTeamId: teams.VEN, fkAwayTeamId: teams.CAN, dateTime: '2024-07-05 22:00', location: 'Dallas', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: quartas, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.BRA, dateTime: '2024-07-06 22:00', location: 'Las Vegas', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: quartas, fkHomeTeamId: teams.COL, fkAwayTeamId: teams.PAN, dateTime: '2024-07-06 19:00', location: 'Glendale', homeTeamScore: 5, awayTeamScore: 0 },

    { fkPartId: semi, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.CAN, dateTime: '2024-07-09 21:00', location: 'Nova Jersey', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: semi, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.COL, dateTime: '2024-07-10 21:00', location: 'Charlotte', homeTeamScore: 0, awayTeamScore: 1 },

    { fkPartId: terceiro, fkHomeTeamId: teams.CAN, fkAwayTeamId: teams.URU, dateTime: '2024-07-13 21:00', location: 'Charlotte', homeTeamScore: 2, awayTeamScore: 2 },

    { fkPartId: final, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.COL, dateTime: '2024-07-14 21:45', location: 'Miami', homeTeamScore: 1, awayTeamScore: 0 },
  ]));

};
