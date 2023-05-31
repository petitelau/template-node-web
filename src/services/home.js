// Demo

const demoFn = (ws)=>{
    ws.send(JSON.stringify({ type: 'message', value: 'Show Demo WebSocket..' }));
}
module.exports = {demoFn}