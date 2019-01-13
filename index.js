// Main file
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Server setup
const server  = http.createServer((req,res) => {
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

        // When the buffer has ended, we will do something ie respond and log
        // Send response
        res.end(`Hello Aman\n ${trimmedPath}`);
        // Log
        console.log('Request received on path: '+trimmedPath+' with method '+method);
        console.log(`With these query string parameters `,queryStringObject);
        console.log('Here is the headers ',headers);
        console.log('Buffer ',buffer);
    })
})

server.listen('2019',function() {
    console.log("The server is listening on 2019")
})