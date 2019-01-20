// Main file
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config.js')
var fs = require('fs');

// Server setup
    // Make server handle https and http
const httpServer = http.createServer(function(req,res) {
    unifiedServer(req,res)
});

// Start the HTTP server
httpServer.listen(config.httpPort,function() {
    console.log(`The server is listening on ${config.httpPort} in ${config.key} now`)
})

var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
}
// Instantiate the HTTPS server
const httpsServer = https.createServer(httpsServerOptions,function(req,res) {
    unifiedServer(req,res)
})

// Start the HTTP server
console.log('httpsServerOptions ',httpsServerOptions);
httpsServer.listen(config.httpsPort,function() {
    console.log(`The server is listening on ${config.httpsPort} in ${config.key} now`)
})

// All server logic
var unifiedServer = (req,res) => {
    console.log('Req ',req);
    // Parse url 
    const parsedUrl = url.parse(req.url,true);
    // Get path
    let trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
    // Get query string as an object
    const queryStringObject = parsedUrl.query;
    // Get HTTP Method
    let method = req.method.toLowerCase();
    // Get headers as an object
    const headers = req.headers;
    // Parse Payload, if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',(data) => {
        buffer += decoder.write(data)
    });
    req.on('end', () => {
        buffer += decoder.end();

        // Choose handler for request, if none found use notFound
        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct data object to send to handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        chosenHandler(data, (statusCode, payload) => {
            // use status code by handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            // use payload called back by handler or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};
            // Converting payload to string
            let payloadString = JSON.stringify(payload);
            // Return response
            res.writeHead(statusCode);
            res.setHeader('Content-Type','application/json');
            res.end(payloadString);

            console.log('Returning this response: ',statusCode, payloadString)
        })

    })

}

// Handlers
const handlers = {};

handlers.ping = (data,callback) => {
    callback(200,{'name':'You messed up'})
}
handlers.notFound = (data,callback) => {
    callback(404,{'name':'You messed up'})
}

// Request router
const router = {
    'sample': handlers.sample,
    'ping': handlers.ping
}