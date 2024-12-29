const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws) =>{
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
