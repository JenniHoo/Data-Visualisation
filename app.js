const express = require('express')
const WebSocket = require('ws')

const app = express()

app.get('/', function (req, res) {
    res.send('Thist is functional!')
    openWebSocketConnection()
})

let incomingMessageArray = []

function openWebSocketConnection() {
    const ws = new WebSocket('ws://localhost:8080')
    ws.isAlive = true
    
    ws.on('close', () => {
        console.log('Connection disconnected')
        clearInterval(interval)
    })

    ws.on('error', (error) => {
        console.log('WebSocket error: ' + error)
    })

    ws.on('message', (message) => {
        incomingMessageArray.push(JSON.parse(message))
        console.log('Data Packets in Array: ' + incomingMessageArray.length)
        ws.isAlive = true
    })

    ws.on('open', () => {
        console.log('Websocket connected')
        ws.send(Date.now())
    })

    ws.on('pong', () => {
        console.log('Pong received')
        ws.isAlive = true
    })

    ws.on('unexpected-response', (request, response) => {
        console.log('Unexpected response from server: ' + response)
    })

    const interval = setInterval( () => {
        if (ws.isAlive === false) {
            ws.terminate()
            console.log('Websocket Terminated')
        }
        ws.isAlive = false
        ws.ping()
    }, 30000)

}

app.listen(3000, () => console.log('Listening to port 3000'))