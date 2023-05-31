const WebSocket = require('ws');

let wss;
let connections = {};
let connectionIDCounter = 1;


const init = (port) => {
    wss = new WebSocket.Server({port});
    wss.on('connection', function(ws) {
        let interval;
        console.log('Client connecté');
        ws.id = connectionIDCounter ++;
        connections[ws.id] = ws;
        ws.send(JSON.stringify({ type: 'id', id: ws.id }));
        ws.on("close", () => {
            if (interval) clearInterval(interval)
            console.log("Client ["+ws.id+"] disconnected");
            delete connections[ws.id];
        });
        interval = setInterval(()=> {
            ws.send(JSON.stringify({ type: 'ping' }));
        }, 25000);
    });
}

const getWs = (wsId) => {
    return wsId?connections[wsId]:undefined;
}

module.exports = { init, getWs };


