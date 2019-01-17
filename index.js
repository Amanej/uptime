// Main file
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Server setup
const server  = http.createServer((req,res) => {
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



})

server.listen('2019',function() {
    console.log("The server is listening on 2019")
})

// Handlers
const handlers = {};

handlers.sample = (data,callback) => {
    // Callback HTTP status code, payload object
    callback(406,{'name':'Aman Dude'})
}
handlers.notFound = (data,callback) => {
    callback(404,{'name':'You messed up'})
}

// Request router
const router = {
    'sample': handlers.sample
}