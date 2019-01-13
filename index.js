// Main file
const http = require('http');

// Server setup
const server  = http.createServer((req,res) => {
    console.log(req)
    console.log(req.method);
    let route = req.url;
    
    switch(req.method) {
        case 'GET':
                res.end('Hello Aman\n');
            break;
        case 'POST':
                res.end('Thanks for your contribution');
            break;
        case 'PUT':
                res.end('It has just been updated');
            break;
        case 'DELETE':
                res.end('We just deleted that sir');
            break;
    }
})

server.listen('2019',function() {
    console.log("The server is listening on 2019")
})