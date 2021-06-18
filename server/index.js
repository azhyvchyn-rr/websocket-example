const express = require('express');
const http = require('http');
const ws = require('ws');

const PORT = 3030;

const app = express();
const server = http.createServer(app);
const wsServer = new ws.Server({server, path: '/ws'});

const sendToClient = (client, text, times) => {
    Array.from({length: times}).forEach((_, index) => {
        const payload = {
            text: `Hello, you sent -> ${text}. This is ${index + 1} response`,
            type: 'TEXT'
        };

        client.send(JSON.stringify(payload));
    });
};

wsServer.on('connection', (wsConnection) => {
    wsConnection.on('message', (rawMessage) => {
        console.log('received: %s', rawMessage);

        const message = JSON.parse(rawMessage);
        const {text, times = 1, all = false} = message;

        if (all) {
            wsServer.clients.forEach((client) => sendToClient(client, text, times));
        } else {
            sendToClient(wsConnection, text, times);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
