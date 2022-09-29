import axios from "axios";

class http {

    static post({ url, data, thenCallback, catchCallback }){
        return new Promise((resolve, reject) => {
            const isDebug = process.env.REACT_APP_DEBUG === "true";
    
            if (isDebug) {
                console.groupCollapsed(`Request URL: ${url}`);
                console.log(`Request Data: ${JSON.stringify(data)}`);
            }
    
            function requestThen(response) {
                if (isDebug) {
                    console.log(`Request Response: ${JSON.stringify(response.data)}`);
                    console.groupEnd();
                }
    
                thenCallback(response.data);
                resolve();
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
    
                catchCallback(error.response.data);
                reject();
            }
    
            axios.post(url, data)
                .then(requestThen)
                .catch(catchThen);
        });
    }
}

export default http;