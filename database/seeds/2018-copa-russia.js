const helper = require('../helpers');
/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const h = new helper(knex);

  const [champId] = await knex('championship')
    .insert({ name: 'Copa do Mundo Russia 2018', logo: 'russia_2018.png', startDate: '2018-06-14', endDate: '2018-07-15' });

  await knex('phase').insert([
    { name: 'Grupos', fkChampionshipId: champId, },
    { name: 'Eliminatórias', fkChampionshipId: champId, },
  ]);

  const fase1 = await h.getPhase('Grupos', champId);
  const fase2 = await h.getPhase('Eliminatórias', champId);
  await knex('part').insert([
    { name: 'Grupo A', fkPhaseId: fase1, },
    { name: 'Grupo B', fkPhaseId: fase1, },
    { name: 'Grupo C', fkPhaseId: fase1, },
    { name: 'Grupo D', fkPhaseId: fase1, },
    { name: 'Grupo E', fkPhaseId: fase1, },
    { name: 'Grupo F', fkPhaseId: fase1, },
    { name: 'Grupo G', fkPhaseId: fase1, },
    { name: 'Grupo H', fkPhaseId: fase1, },
    { name: 'Oitavas', fkPhaseId: fase2, },
    { name: 'Quartas', fkPhaseId: fase2, },
    { name: 'Semifinal', fkPhaseId: fase2, },
    { name: 'Terceiro Lugar', fkPhaseId: fase2, },
    { name: 'Final', fkPhaseId: fase2, },
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
    { fkPartId: grupoA, fkHomeTeamId: teams.RUS, fkAwayTeamId: teams.KSA, dateTime: '2018-06-14 12:00', location: 'Moscou - Lujniki', homeTeamScore: 5, awayTeamScore: 0 },
    { fkPartId: grupoA, fkHomeTeamId: teams.EGY, fkAwayTeamId: teams.URU, dateTime: '2018-06-15 09:00', location: 'Ecaterimburgo', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoB, fkHomeTeamId: teams.MAR, fkAwayTeamId: teams.IRN, dateTime: '2018-06-15 12:00', location: 'São Petersburgo', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoB, fkHomeTeamId: teams.POR, fkAwayTeamId: teams.ESP, dateTime: '2018-06-15 15:00', location: 'Sochi', homeTeamScore: 3, awayTeamScore: 3 },
    { fkPartId: grupoC, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.AUS, dateTime: '2018-06-16 07:00', location: 'Arena Kazan', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: grupoC, fkHomeTeamId: teams.PER, fkAwayTeamId: teams.DEN, dateTime: '2018-06-16 13:00', location: 'Saransk', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoD, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.ISL, dateTime: '2018-06-16 10:00', location: 'Spartak Stadium', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: grupoD, fkHomeTeamId: teams.CRO, fkAwayTeamId: teams.NGA, dateTime: '2018-06-16 16:00', location: 'Kaliningrado', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoE, fkHomeTeamId: teams.CRC, fkAwayTeamId: teams.SRB, dateTime: '2018-06-17 09:00', location: 'Samara', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoE, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.SUI, dateTime: '2018-06-17 15:00', location: 'Rostov', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: grupoF, fkHomeTeamId: teams.GER, fkAwayTeamId: teams.MEX, dateTime: '2018-06-17 12:00', location: 'Moscou - Lujniki', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoF, fkHomeTeamId: teams.SWE, fkAwayTeamId: teams.KOR, dateTime: '2018-06-18 09:00', location: 'Nizhny Novgorod', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoG, fkHomeTeamId: teams.BEL, fkAwayTeamId: teams.PAN, dateTime: '2018-06-18 12:00', location: 'Sochi', homeTeamScore: 3, awayTeamScore: 0 },
    { fkPartId: grupoG, fkHomeTeamId: teams.TUN, fkAwayTeamId: teams.ENG, dateTime: '2018-06-18 15:00', location: 'Volgogrado', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoH, fkHomeTeamId: teams.COL, fkAwayTeamId: teams.JPN, dateTime: '2018-06-19 09:00', location: 'Saransk', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoH, fkHomeTeamId: teams.POL, fkAwayTeamId: teams.SEN, dateTime: '2018-06-19 12:00', location: 'Spartak Stadium', homeTeamScore: 1, awayTeamScore: 2 },

    { fkPartId: grupoA, fkHomeTeamId: teams.RUS, fkAwayTeamId: teams.EGY, dateTime: '2018-06-19 15:00', location: 'São Petersburgo', homeTeamScore: 3, awayTeamScore: 1 },
    { fkPartId: grupoA, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.KSA, dateTime: '2018-06-20 12:00', location: 'Rostov', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoB, fkHomeTeamId: teams.POR, fkAwayTeamId: teams.MAR, dateTime: '2018-06-20 09:00', location: 'Moscou - Lujniki', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoB, fkHomeTeamId: teams.IRN, fkAwayTeamId: teams.ESP, dateTime: '2018-06-20 15:00', location: 'Arena Kazan', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoC, fkHomeTeamId: teams.DEN, fkAwayTeamId: teams.AUS, dateTime: '2018-06-21 09:00', location: 'Samara', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: grupoC, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.PER, dateTime: '2018-06-21 12:00', location: 'Ecaterimburgo', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: grupoD, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.CRO, dateTime: '2018-06-21 15:00', location: 'Nizhny Novgorod', homeTeamScore: 0, awayTeamScore: 3 },
    { fkPartId: grupoD, fkHomeTeamId: teams.NGA, fkAwayTeamId: teams.ISL, dateTime: '2018-06-22 12:00', location: 'Volgogrado', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoE, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.CRC, dateTime: '2018-06-22 09:00', location: 'São Petersburgo', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoE, fkHomeTeamId: teams.SRB, fkAwayTeamId: teams.SUI, dateTime: '2018-06-22 15:00', location: 'Kaliningrado', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoF, fkHomeTeamId: teams.KOR, fkAwayTeamId: teams.MEX, dateTime: '2018-06-23 12:00', location: 'Rostov', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoF, fkHomeTeamId: teams.GER, fkAwayTeamId: teams.SWE, dateTime: '2018-06-23 15:00', location: 'Sochi', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: grupoG, fkHomeTeamId: teams.BEL, fkAwayTeamId: teams.TUN, dateTime: '2018-06-23 09:00', location: 'Spartak Stadium', homeTeamScore: 5, awayTeamScore: 2 },
    { fkPartId: grupoG, fkHomeTeamId: teams.ENG, fkAwayTeamId: teams.PAN, dateTime: '2018-06-24 09:00', location: 'Nizhny Novgorod', homeTeamScore: 6, awayTeamScore: 1 },
    { fkPartId: grupoH, fkHomeTeamId: teams.JPN, fkAwayTeamId: teams.SEN, dateTime: '2018-06-24 12:00', location: 'Ecaterimburgo', homeTeamScore: 2, awayTeamScore: 2 },
    { fkPartId: grupoH, fkHomeTeamId: teams.POL, fkAwayTeamId: teams.COL, dateTime: '2018-06-24 15:00', location: 'Arena Kazan', homeTeamScore: 0, awayTeamScore: 3 },

    { fkPartId: grupoA, fkHomeTeamId: teams.KSA, fkAwayTeamId: teams.EGY, dateTime: '2018-06-25 11:00', location: 'Volgogrado', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: grupoA, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.RUS, dateTime: '2018-06-25 11:00', location: 'Samara', homeTeamScore: 3, awayTeamScore: 0 },
    { fkPartId: grupoB, fkHomeTeamId: teams.ESP, fkAwayTeamId: teams.MAR, dateTime: '2018-06-25 15:00', location: 'Kaliningrado', homeTeamScore: 2, awayTeamScore: 2 },
    { fkPartId: grupoB, fkHomeTeamId: teams.IRN, fkAwayTeamId: teams.POR, dateTime: '2018-06-25 15:00', location: 'Saransk', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: grupoC, fkHomeTeamId: teams.DEN, fkAwayTeamId: teams.FRA, dateTime: '2018-06-26 11:00', location: 'Moscou - Lujniki', homeTeamScore: 0, awayTeamScore: 0 },
    { fkPartId: grupoC, fkHomeTeamId: teams.AUS, fkAwayTeamId: teams.PER, dateTime: '2018-06-26 11:00', location: 'Sochi', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: grupoD, fkHomeTeamId: teams.NGA, fkAwayTeamId: teams.ARG, dateTime: '2018-06-26 15:00', location: 'São Petersburgo', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoD, fkHomeTeamId: teams.ISL, fkAwayTeamId: teams.CRO, dateTime: '2018-06-26 15:00', location: 'Rostov', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoE, fkHomeTeamId: teams.SRB, fkAwayTeamId: teams.BRA, dateTime: '2018-06-27 15:00', location: 'Spartak Stadium', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: grupoE, fkHomeTeamId: teams.SUI, fkAwayTeamId: teams.CRC, dateTime: '2018-06-27 15:00', location: 'Nizhny Novgorod', homeTeamScore: 2, awayTeamScore: 2 },
    { fkPartId: grupoF, fkHomeTeamId: teams.KOR, fkAwayTeamId: teams.GER, dateTime: '2018-06-27 11:00', location: 'Arena Kazan', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: grupoF, fkHomeTeamId: teams.MEX, fkAwayTeamId: teams.SWE, dateTime: '2018-06-27 11:00', location: 'Ecaterimburgo', homeTeamScore: 0, awayTeamScore: 3 },
    { fkPartId: grupoG, fkHomeTeamId: teams.ENG, fkAwayTeamId: teams.BEL, dateTime: '2018-06-28 15:00', location: 'Kaliningrado', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoG, fkHomeTeamId: teams.PAN, fkAwayTeamId: teams.TUN, dateTime: '2018-06-28 15:00', location: 'Saransk', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: grupoH, fkHomeTeamId: teams.SEN, fkAwayTeamId: teams.COL, dateTime: '2018-06-28 11:00', location: 'Samara', homeTeamScore: 0, awayTeamScore: 1 },
    { fkPartId: grupoH, fkHomeTeamId: teams.JPN, fkAwayTeamId: teams.POL, dateTime: '2018-06-28 11:00', location: 'Volgogrado', homeTeamScore: 0, awayTeamScore: 1 },

    { fkPartId: oitavas, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.POR, dateTime: '2018-06-30 15:00', location: 'Sochi', homeTeamScore: 2, awayTeamScore: 1 },
    { fkPartId: oitavas, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.ARG, dateTime: '2018-06-30 11:00', location: 'Arena Kazan', homeTeamScore: 4, awayTeamScore: 3 },
    { fkPartId: oitavas, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.MEX, dateTime: '2018-07-02 11:00', location: 'Samara', homeTeamScore: 2, awayTeamScore: 0 },
    { fkPartId: oitavas, fkHomeTeamId: teams.BEL, fkAwayTeamId: teams.JPN, dateTime: '2018-07-02 15:00', location: 'Rostov', homeTeamScore: 3, awayTeamScore: 2 },
    { fkPartId: oitavas, fkHomeTeamId: teams.ESP, fkAwayTeamId: teams.RUS, dateTime: '2018-07-01 11:00', location: 'Moscou - Lujniki', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: oitavas, fkHomeTeamId: teams.CRO, fkAwayTeamId: teams.DEN, dateTime: '2018-07-01 15:00', location: 'Nizhny Novgorod', homeTeamScore: 1, awayTeamScore: 1 },
    { fkPartId: oitavas, fkHomeTeamId: teams.SWE, fkAwayTeamId: teams.SUI, dateTime: '2018-07-03 11:00', location: 'São Petersburgo', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: oitavas, fkHomeTeamId: teams.COL, fkAwayTeamId: teams.ENG, dateTime: '2018-07-03 15:00', location: 'Spartak Stadium', homeTeamScore: 1, awayTeamScore: 1 },

    { fkPartId: quartas, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.FRA, dateTime: '2018-07-06 11:00', location: 'Nizhny Novgorod', homeTeamScore: 0, awayTeamScore: 2 },
    { fkPartId: quartas, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.BEL, dateTime: '2018-07-06 15:00', location: 'Arena Kazan', homeTeamScore: 1, awayTeamScore: 2 },
    { fkPartId: quartas, fkHomeTeamId: teams.RUS, fkAwayTeamId: teams.CRO, dateTime: '2018-07-07 15:00', location: 'Sochi', homeTeamScore: 2, awayTeamScore: 2 },
    { fkPartId: quartas, fkHomeTeamId: teams.SWE, fkAwayTeamId: teams.ENG, dateTime: '2018-07-07 11:00', location: 'Samara', homeTeamScore: 0, awayTeamScore: 2 },

    { fkPartId: semi, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.BEL, dateTime: '2018-07-10 15:00', location: 'São Petersburgo', homeTeamScore: 1, awayTeamScore: 0 },
    { fkPartId: semi, fkHomeTeamId: teams.CRO, fkAwayTeamId: teams.ENG, dateTime: '2018-07-11 15:00', location: 'Moscou - Lujniki', homeTeamScore: 2, awayTeamScore: 1 },

    { fkPartId: terceiro, fkHomeTeamId: teams.BEL, fkAwayTeamId: teams.ENG, dateTime: '2018-07-14 11:00', location: 'São Petersburgo', homeTeamScore: 2, awayTeamScore: 0 },

    { fkPartId: final, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.CRO, dateTime: '2018-07-15 12:00', location: 'Moscou - Lujniki', homeTeamScore: 4, awayTeamScore: 2 },
  ]);

};
