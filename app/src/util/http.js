import axios from "axios";

function http({ url, data, thenCallback, catchCallback }) {
    axios.post(url, data)
        .then((response) => thenCallback(response.data))
        .catch((error) => {
            if (process.env.REACT_APP_DEBUG === "true") {
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
            }

            catchCallback(error.response.data);
        });
}

export default http;