class Helper {
    constructor(knex) {
        this.knex = knex;
    }

    async getPhase(phase, champId) {
        const result = await this.knex('phase')
            .select('id')
            .where({
                'name': phase,
                'fkChampionshipId': champId
            });

        return result[0].id;
    }

    async getPart(part, phase) {
        const result = await this.knex('part')
            .select('id')
            .where({
                'name': part,
                'fkPhaseId': phase
            });

        return result[0].id;
    }

    async getTeams() {
        const result = await this.knex('team')
            .select('*');

        return result.reduce((acc, team) => {
            acc[team.code] = team.id;
            return acc;
        }, {});
    }

    async runOrLog(query) {
        if (this.knex.client.config.logQuery) {
            console.log(`${query.toString()};`);
        }
        return query;
    }

}

module.exports = Helper;