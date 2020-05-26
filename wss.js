const WebSocket = require('ws')
const http = require('http')

const server = http.createServer()
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
    console.log('Incoming Connection')
    ws.isAlive = true

    ws.on('close', () => {
        console.log('Connection closed')
        clearInterval(interval)
    })

    ws.on('error', (error) => {
        console.log('WebSocket ' + error)
    })

    ws.on('message', (message) => {
        console.log('received: %s', message)
        ws.isAlive = true
    })

    ws.on('pong', () => {
        console.log('Pong received')
        ws.isAlive = true
    })

    const interval = setInterval( () => {
        if (ws.isAlive === false) {
            ws.terminate()
            console.log('Websocket Terminated')
        }
        ws.isAlive = false
        ws.ping()
    }, 120000)

    setInterval(() => {
        ws.send(generateJSON())
    }, 3000)

})

function generateJSON() {
    let randomData = '{ "type" : "Feature" ,' +
        ' "geometry": { "type": "Point" ,' +
        ' "coordinates": [25.' + Math.floor(Math.random() * 1000000) +
        ', 64.' + Math.floor(Math.random() * 1000000) + '] },' +
        ' "properties": {"payload": {"windspeed": "' +
        Math.floor(Math.random() * 30) + '.' + Math.floor(Math.random() * 100) + '", "winddirection": "' +
        Math.floor(Math.random() * 30) + '.' + Math.floor(Math.random() * 100) + '", "Temperature": "' +
        Math.floor(Math.random() * 30) + '.' + Math.floor(Math.random() * 100) + '"},' +
        ' "deviceID": "Raspberry ' + Math.floor(Math.random() * 10) + '",' +
        ' "height": ' + Math.floor(Math.random() * 10) + ',' +
        ' "timestamp": ' + Date.now() + '}}'
    return randomData
}
//example (remove integrityToken!):
//{"type": "Feature", "geometry": {"type": "Point", "coordinates": [25.422475, 64.99307222222222]}, "properties": {"payload": {"windSpeed": "0.00"}, "deviceID": "Raspberry 1", "height": 5, "timestamp": 1582790338.2534041, "integrityToken": "6c269ccdb8f663635b47144d99c9caeb"}}

server.listen(8080, () => { console.log('WebSocket in port 8080') })