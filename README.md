#WebSocket test environment

This is a test environment for WebSocket functionalities. WebSocket Server (wss.js) sends randomly generated JSON data packets to the client on fixed intervals. For testing the client there is a very simple web page (index.html) which starts WebSocket connection to the server and then logs received data to browser console.

#Starting the server and opening WebSocket

Run WebSocket Server with command `node wss.js` or `npm run start-web`.

Open the index.html -file in local browser.

#Running test environment on server

There is also an option to run two servers simulating server and client. You can start both services with command `npn start`. Console shows only the clients log entries when connection is opened.

If you want to run services separately, run two separate console sessions. Run command `npm run start-web` or `node app.js` in the other console session and `npm run start-wss` or `node wss.js` in the other one.

Then start up the WebSocket connection by loading address `localhost:3000` with web browser. You should see incomming generated data packets counter in the client session console.