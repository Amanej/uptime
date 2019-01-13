// Main file
const http = require('http');
const url = require('url');


// Server setup
const server  = http.createServer((req,res) => {
    // Parse url 
    let parsedUrl = url.parse(req.url,true);
    // Get path
    let trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
    // Get HTTP Method
    let method = req.method.toLowerCase();
    // Send response
    res.end(`Hello Aman\n ${trimmedPath}`);
    // Log
    console.log('Request received on path: '+trimmedPath+' with method '+method)
})

server.listen('2019',function() {
    console.log("The server is listening on 2019")
})