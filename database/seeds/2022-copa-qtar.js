const helper = require('../helpers');
/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const h = new helper(knex);

  const [champId] = await knex('championship')
    .insert({ name: 'Copa do Mundo Qtar 2022', logo: 'qatar_2022.png', startDate: '2022-11-20', endDate: '2022-12-18' });

  await knex('phase').insert([
    { name: 'Grupos', fkChampionshipId: champId, },
    { name: 'Eliminatórias', fkChampionshipId: champId, },
  ]);

  const fase1 = await h.getPhase('Grupos', champId);
  const fase2 = await h.getPhase('Eliminatórias', champId);
  await knex('part').insert([
    { name: 'Grupo A', status: 'finalizado', fkPhaseId: fase1, },
    { name: 'Grupo B', status: 'finalizado', fkPhaseId: fase1, },
    { name: 'Grupo C', status: 'finalizado', fkPhaseId: fase1, },
    { name: 'Grupo D', status: 'finalizado', fkPhaseId: fase1, },
    { name: 'Grupo E', status: 'finalizado', fkPhaseId: fase1, },
    { name: 'Grupo F', status: 'finalizado', fkPhaseId: fase1, },
    { name: 'Grupo G', status: 'finalizado', fkPhaseId: fase1, },
    { name: 'Grupo H', status: 'finalizado', fkPhaseId: fase1, },
    { name: 'Oitavas', status: 'finalizado', fkPhaseId: fase2, },
    { name: 'Quartas', status: 'finalizado', fkPhaseId: fase2, },
    { name: 'Semifinal', status: 'finalizado', fkPhaseId: fase2, },
    { name: 'Terceiro Lugar', status: 'finalizado', fkPhaseId: fase2, },
    { name: 'Final', status: 'finalizado', fkPhaseId: fase2, },
  ]);

  const teams = await h.getTeams();

  const grupoA = await h.getPart('Grupo A', fase1);
  const grupoB = await h.getPart('Grupo B', fase1);
  const grupoC = await h.getPart('Grupo C', fase1);
  const grupoD = await h.getPart('Grupo D', fase1);
  const grupoE = await h.getPart('Grupo E', fase1);
  const grupoF = await h.getPart('Grupo F', fase1);
  const grupoG = await h.getPart('Grupo G', fase1);
  const grupoH = await h.getPart('Grupo H', fase1);
  const oitavas = await h.getPart('Oitavas', fase2);
  const quartas = await h.getPart('Quartas', fase2);
  const semi = await h.getPart('Semifinal', fase2);
  const terceiro = await h.getPart('Terceiro Lugar', fase2);
  const final = await h.getPart('Final', fase2);

  await knex('fixture').insert([
    { fkPartId: grupoA, fkHomeTeamId: teams.QAT, fkAwayTeamId: teams.ECU, dateTime: '2022-11-20 13:00', location: 'Al Bayt', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: grupoA, fkHomeTeamId: teams.SEN, fkAwayTeamId: teams.NED, dateTime: '2022-11-21 13:00', location: 'Al Thumama', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: grupoB, fkHomeTeamId: teams.ENG, fkAwayTeamId: teams.IRN, dateTime: '2022-11-21 10:00', location: 'Internacional Khalifa', homeTeamScore: 6, awayTeamScore: 2 },
    { fkPartId: grupoB, fkHomeTeamId: teams.USA, fkAwayTeamId: teams.WAL, dateTime: '2022-11-21 16:00', location: 'Ahmad bin Ali', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: grupoC, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.KSA, dateTime: '2022-11-22 07:00', location: 'Lusail', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoC, fkHomeTeamId: teams.MEX, fkAwayTeamId: teams.POL, dateTime: '2022-11-22 13:00', location: 'Estádio 974', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoD, fkHomeTeamId: teams.DEN, fkAwayTeamId: teams.TUN, dateTime: '2022-11-22 10:00', location: 'Cidade da Educação', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoD, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.AUS, dateTime: '2022-11-22 16:00', location: 'Al Janoub', homeTeamScore: 4, awayTeamScore: 1 },
    { fkPartId: grupoE, fkHomeTeamId: teams.GER, fkAwayTeamId: teams.JPN, dateTime: '2022-11-23 10:00', location: 'Internacional Khalifa', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoE, fkHomeTeamId: teams.ESP, fkAwayTeamId: teams.CRC, dateTime: '2022-11-23 13:00', location: 'Al Thumama', homeTeamScore: 7, awayTeamScore: 0 },
    { fkPartId: grupoF, fkHomeTeamId: teams.MAR, fkAwayTeamId: teams.CRO, dateTime: '2022-11-23 07:00', location: 'Al Bayt', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoF, fkHomeTeamId: teams.BEL, fkAwayTeamId: teams.CAN, dateTime: '2022-11-23 16:00', location: 'Ahmad bin Ali', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoG, fkHomeTeamId: teams.SUI, fkAwayTeamId: teams.CMR, dateTime: '2022-11-24 07:00', location: 'Al Janoub', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoG, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.SRB, dateTime: '2022-11-24 16:00', location: 'Lusail', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoH, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.KOR, dateTime: '2022-11-24 10:00', location: 'Cidade da Educação', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoH, fkHomeTeamId: teams.POR, fkAwayTeamId: teams.GHA, dateTime: '2022-11-24 13:00', location: 'Estádio 974', homeTeamScore: 3, awayTeamScore: 2 },

    { fkPartId: grupoA, fkHomeTeamId: teams.QAT, fkAwayTeamId: teams.SEN, dateTime: '2022-11-25 10:00', location: 'Al Thumama', homeTeamScore: 1, awayTeamScore: 3 },
    { fkPartId: grupoA, fkHomeTeamId: teams.NED, fkAwayTeamId: teams.ECU, dateTime: '2022-11-25 13:00', location: 'Internacional Khalifa', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: grupoB, fkHomeTeamId: teams.WAL, fkAwayTeamId: teams.IRN, dateTime: '2022-11-25 07:00', location: 'Ahmad bin Ali', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: grupoB, fkHomeTeamId: teams.ENG, fkAwayTeamId: teams.USA, dateTime: '2022-11-25 16:00', location: 'Al Bayt', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoC, fkHomeTeamId: teams.POL, fkAwayTeamId: teams.KSA, dateTime: '2022-11-26 10:00', location: 'Cidade da Educação', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoC, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.MEX, dateTime: '2022-11-26 16:00', location: 'Lusail', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoD, fkHomeTeamId: teams.TUN, fkAwayTeamId: teams.AUS, dateTime: '2022-11-26 07:00', location: 'Al Janoub', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoD, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.DEN, dateTime: '2022-11-26 13:00', location: 'Estádio 974', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: grupoE, fkHomeTeamId: teams.JPN, fkAwayTeamId: teams.CRC, dateTime: '2022-11-27 07:00', location: 'Ahmad bin Ali', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoE, fkHomeTeamId: teams.ESP, fkAwayTeamId: teams.GER, dateTime: '2022-11-27 16:00', location: 'Al Bayt', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: grupoF, fkHomeTeamId: teams.BEL, fkAwayTeamId: teams.MAR, dateTime: '2022-11-27 10:00', location: 'Al Thumama', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: grupoF, fkHomeTeamId: teams.CRO, fkAwayTeamId: teams.CAN, dateTime: '2022-11-27 13:00', location: 'Internacional Khalifa', homeTeamScore: 4, awayTeamScore: 1 },
    { fkPartId: grupoG, fkHomeTeamId: teams.CMR, fkAwayTeamId: teams.SRB, dateTime: '2022-11-28 07:00', location: 'Al Janoub', homeTeamScore: 3, awayTeamScore: 3 },
    { fkPartId: grupoG, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.SUI, dateTime: '2022-11-28 13:00', location: 'Estádio 974', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoH, fkHomeTeamId: teams.KOR, fkAwayTeamId: teams.GHA, dateTime: '2022-11-28 10:00', location: 'Cidade da Educação', homeTeamScore: 2, awayTeamScore: 3 },
    { fkPartId: grupoH, fkHomeTeamId: teams.POR, fkAwayTeamId: teams.URU, dateTime: '2022-11-28 16:00', location: 'Lusail', homeTeamScore: 2, awayTeamScore: 0 },

    { fkPartId: grupoA, fkHomeTeamId: teams.ECU, fkAwayTeamId: teams.SEN, dateTime: '2022-11-29 12:00', location: 'Internacional Khalifa', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoA, fkHomeTeamId: teams.NED, fkAwayTeamId: teams.QAT, dateTime: '2022-11-29 12:00', location: 'Al Bayt', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoB, fkHomeTeamId: teams.WAL, fkAwayTeamId: teams.ENG, dateTime: '2022-11-29 16:00', location: 'Ahmad bin Ali', homeTeamScore: 0, awayTeamScore: 3 },
    { fkPartId: grupoB, fkHomeTeamId: teams.IRN, fkAwayTeamId: teams.USA, dateTime: '2022-11-29 16:00', location: 'Al Thumama', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoC, fkHomeTeamId: teams.POL, fkAwayTeamId: teams.ARG, dateTime: '2022-11-30 16:00', location: 'Estádio 974', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: grupoC, fkHomeTeamId: teams.KSA, fkAwayTeamId: teams.MEX, dateTime: '2022-11-30 16:00', location: 'Lusail', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoD, fkHomeTeamId: teams.TUN, fkAwayTeamId: teams.FRA, dateTime: '2022-11-30 12:00', location: 'Cidade da Educação', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoD, fkHomeTeamId: teams.AUS, fkAwayTeamId: teams.DEN, dateTime: '2022-11-30 12:00', location: 'Al Janoub', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoE, fkHomeTeamId: teams.JPN, fkAwayTeamId: teams.ESP, dateTime: '2022-12-01 16:00', location: 'Internacional Khalifa', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: grupoE, fkHomeTeamId: teams.CRC, fkAwayTeamId: teams.GER, dateTime: '2022-12-01 16:00', location: 'Al Bayt', homeTeamScore: 2, awayTeamScore: 4 },
    { fkPartId: grupoF, fkHomeTeamId: teams.CRO, fkAwayTeamId: teams.BEL, dateTime: '2022-12-01 12:00', location: 'Ahmad bin Ali', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoF, fkHomeTeamId: teams.CAN, fkAwayTeamId: teams.MAR, dateTime: '2022-12-01 12:00', location: 'Al Thumama', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoG, fkHomeTeamId: teams.CMR, fkAwayTeamId: teams.BRA, dateTime: '2022-12-02 16:00', location: 'Lusail', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoG, fkHomeTeamId: teams.SRB, fkAwayTeamId: teams.SUI, dateTime: '2022-12-02 16:00', location: 'Estádio 974', homeTeamScore: 2, awayTeamScore: 3 },
    { fkPartId: grupoH, fkHomeTeamId: teams.GHA, fkAwayTeamId: teams.URU, dateTime: '2022-12-02 12:00', location: 'Al Janoub', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: grupoH, fkHomeTeamId: teams.KOR, fkAwayTeamId: teams.POR, dateTime: '2022-12-02 12:00', location: 'Cidade da Educação', homeTeamScore: 2, awayTeamScore: 1 },

    { fkPartId: oitavas, fkHomeTeamId: teams.NED, fkAwayTeamId: teams.USA, dateTime: '2022-12-03 12:00', location: 'Internacional Khalifa', homeTeamScore: 3, awayTeamScore: 1 },
    { fkPartId: oitavas, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.AUS, dateTime: '2022-12-03 16:00', location: 'Ahmad bin Ali', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: oitavas, fkHomeTeamId: teams.JPN, fkAwayTeamId: teams.CRO, dateTime: '2022-12-05 12:00', location: 'Al Janoub', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: oitavas, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.KOR, dateTime: '2022-12-05 16:00', location: 'Estádio 974', homeTeamScore: 4, awayTeamScore: 1 },
    { fkPartId: oitavas, fkHomeTeamId: teams.ENG, fkAwayTeamId: teams.SEN, dateTime: '2022-12-04 12:00', location: 'Al Bayt', homeTeamScore: 3, awayTeamScore: 0 },
    { fkPartId: oitavas, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.POL, dateTime: '2022-12-04 12:00', location: 'Al Thumama', homeTeamScore: 3, awayTeamScore: 1 },
    { fkPartId: oitavas, fkHomeTeamId: teams.MAR, fkAwayTeamId: teams.ESP, dateTime: '2022-12-06 12:00', location: 'Cidade da Educação', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: oitavas, fkHomeTeamId: teams.POR, fkAwayTeamId: teams.SUI, dateTime: '2022-12-06 16:00', location: 'Lusail', homeTeamScore: 6, awayTeamScore: 1 },

    { fkPartId: quartas, fkHomeTeamId: teams.NED, fkAwayTeamId: teams.ARG, dateTime: '2022-12-09 16:00', location: 'Lusail', homeTeamScore: 2, awayTeamScore: 2 },
    { fkPartId: quartas, fkHomeTeamId: teams.CRO, fkAwayTeamId: teams.BRA, dateTime: '2022-12-09 12:00', location: 'Cidade da Educação', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: quartas, fkHomeTeamId: teams.ENG, fkAwayTeamId: teams.FRA, dateTime: '2022-12-10 16:00', location: 'Al Bayt', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: quartas, fkHomeTeamId: teams.MAR, fkAwayTeamId: teams.POR, dateTime: '2022-12-10 12:00', location: 'Al Thumama', homeTeamScore: 1, awayTeamScore: 0 },

    { fkPartId: semi, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.CRO, dateTime: '2022-12-13 16:00', location: 'Lusail', homeTeamScore: 3, awayTeamScore: 0 },
    { fkPartId: semi, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.MAR, dateTime: '2022-12-14 16:00', location: 'Al Bayt', homeTeamScore: 2, awayTeamScore: 0 },

    { fkPartId: terceiro, fkHomeTeamId: teams.CRO, fkAwayTeamId: teams.MAR, dateTime: '2022-12-17 12:00', location: 'Internacional Khalifa', homeTeamScore: 2, awayTeamScore: 1 },

    { fkPartId: final, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.FRA, dateTime: '2022-12-18 12:00', location: 'Lusail', homeTeamScore: 3, awayTeamScore: 3 },
  ]);

};
