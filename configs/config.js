// import { GetIPv4 } from "./GetIPaddress";

const dev = {
    apis: {
        idealTutor: `http://192.168.1.14:8080`,
    }
};

const prod = {
    apis: {
        idealTutor: `http://192.168.1.13:8080`,
    }
};

const staging = {
    apis: {
        idealTutor: `http://192.168.1.138080`,
    }
};

const config = process.env.REACT_APP_ENVIRONMENT === 'production'
    ? prod
    : (process.env.REACT_APP_ENVIRONMENT === 'staging' ? staging : dev);

export default {
    // Add common config values here
    ...config
};
