import axios from 'axios';

const url = process.env.REACT_APP_URL_BACK;

const apiRoutes = {
    create: `${url}/api/v1/user/create.php`,
    login: `${url}/api/v1/user/login.php`,
    getAccess: `${url}/api/v1/user/getAccess.php`,
    authReset: `${url}/api/v1/user/authReset.php`,
    authValidate: `${url}/api/v1/user/authValidate.php`,

    getPools: `${url}/api/v1/campeonato/getPools.php`,
    getPool: `${url}/api/v1/campeonato/getPool.php`,
    getChampionshipsInfo: `${url}/api/v1/campeonato/getChampionshipsInfo.php`,
    updatePoolInfo: `${url}/api/v1/campeonato/updatePoolInfo.php`,
    createPool: `${url}/api/v1/campeonato/createPool.php`,
    getFixturesFromCampeonato: `${url}/api/v1/fixture/getFixturesFromCampeonato.php`,
    getCampeonatos: `${url}/api/v1/campeonato/getCampeonatos.php`,

    getBetsFromUser: `${url}/api/v1/bets/getBetsFromUser.php`,
    getBetsFromFixture: `${url}/api/v1/bets/getBetsFromFixture.php`,
    makeBets: `${url}/api/v1/bets/makeBets.php`,

    getRank: `${url}/api/v1/fixture/getRank.php`,
    getPoolFixtures: `${url}/api/v1/fixture/getPoolFixtures.php`,
};

class http {

    static create(data = {}) {
        const url = apiRoutes.create;
        return this.post({ url, data, withCredentials: true });
    }

    static login(data = {}) {
        const url = apiRoutes.login;
        return this.post({ url, data, withCredentials: true });
    }

    static getAccess(data = {}) {
        const url = apiRoutes.getAccess;
        return this.post({ url, data });
    }

    static getBetsFromUser(data = {}) {
        const url = apiRoutes.getBetsFromUser;
        return this.post({ url, data, withCredentials: true });
    }

    static getPools(data = {}) {
        const url = apiRoutes.getPools;
        return this.post({ url, data, withCredentials: true });
    }

    static getPool(data = {}) {
        const url = apiRoutes.getPool;
        return this.post({ url, data, withCredentials: true });
    }

    static getChampionshipsInfo(data = {}) {
        const url = apiRoutes.getChampionshipsInfo;
        return this.post({ url, data, withCredentials: true });
    }

    static updatePoolInfo(data = {}) {
        const url = apiRoutes.updatePoolInfo;
        return this.post({ url, data, withCredentials: true });
    }

    static createPool(data = {}) {
        const url = apiRoutes.createPool;
        return this.post({ url, data, withCredentials: true });
    }

    static getBetsFromFixture(data = {}) {
        const url = apiRoutes.getBetsFromFixture;
        return this.post({ url, data, withCredentials: true });
    }

    static getRank(data = {}) {
        const url = apiRoutes.getRank;
        return this.post({ url, data, withCredentials: true });
    }

    static makeBets(data = {}) {
        const url = apiRoutes.makeBets;
        return this.post({ url, data, withCredentials: true });
    }

    static getPoolFixtures(data = {}) {
        const url = apiRoutes.getPoolFixtures;
        return this.post({ url, data, withCredentials: true });
    }

    static getFixturesFromCampeonato(data = {}) {
        const url = apiRoutes.getFixturesFromCampeonato;
        return this.post({ url, data });
    }

    static getCampeonatos(data = {}) {
        const url = apiRoutes.getCampeonatos;
        return this.post({ url, data });
    }

    static authReset(data = {}) {
        const url = apiRoutes.authReset;
        return this.post({ url, data, withCredentials: true });
    }

    static authValidate(data = {}) {
        const url = apiRoutes.authValidate;
        return this.post({ url, data, withCredentials: true });
    }

    static post({ url, data, withCredentials = false }) {
        return new Promise((resolve, reject) => {
            const isDebug = process.env.REACT_APP_DEBUG === 'true';

            if (isDebug) {
                console.groupCollapsed(`Request URL: ${url}`);
                console.log(`Request Data: ${JSON.stringify(data)}`);
            }

            function requestThen(response) {
                if (isDebug) {
                    console.log(`Request Response: ${JSON.stringify(response.data)}`);
                    console.groupEnd();
                }

                resolve(response.data);
            }

            function catchThen(error) {
                if (isDebug) {
                    console.log('Request Error');
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(`Status: ${error.response.status}`);
                        console.log(`Data: ${JSON.stringify(error.response.data)}`);
                        console.log(`Headers: ${JSON.stringify(error.response.headers)}`);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(`Request: ${error.request}`);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log(`Message: ${error.message}`);
                    }
                    console.log(`Config: ${JSON.stringify(error.config)}`);
                    console.groupEnd();
                }

                reject(error.response ? error.response.data : error.message);
            }

            axios.post(url, JSON.stringify(data), { withCredentials })
                .then(requestThen)
                .catch(catchThen);
        });
    }
}

export default http;
