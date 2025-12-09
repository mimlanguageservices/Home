const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3001;
const RAPIDAPI_KEY = '5711ba99c2mshf211a570320bb19p1b0391jsnb81741843b80';

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/check-grammar') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);
            const text = params.get('text');
            const language = params.get('language') || 'en-US';

            if (!text) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No text provided' }));
                return;
            }

            const postData = new URLSearchParams({
                text: text,
                language: language
            }).toString();

            const options = {
                hostname: 'grammarbot.p.rapidapi.com',
                path: '/check',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(postData),
                    'x-rapidapi-host': 'grammarbot.p.rapidapi.com',
                    'x-rapidapi-key': RAPIDAPI_KEY
                }
            };

            const proxyReq = https.request(options, (proxyRes) => {
                let data = '';

                proxyRes.on('data', (chunk) => {
                    data += chunk;
                });

                proxyRes.on('end', () => {
                    res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
                    res.end(data);
                });
            });

            proxyReq.on('error', (error) => {
                console.error('Error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to check grammar' }));
            });

            proxyReq.write(postData);
            proxyReq.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Grammar Proxy Server running on http://localhost:${PORT}`);
    console.log(`API key is secured on the server side`);
});
