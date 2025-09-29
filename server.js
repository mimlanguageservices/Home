const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    fs.readFile(path.join(__dirname, 'Jerome-Dashboard-New.html'), (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Error loading page: ${err.message}`);
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});