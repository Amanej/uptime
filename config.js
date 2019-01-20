var environments = {};

// Staging
environments.staging = {
    httpPort: 2020,
    httpsPort: 2021,
    key: 'staging'
}
// Production
environments.production = {
    httpPort: 5000,
    httpsPort: 5001,
    key: 'production'
}

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;