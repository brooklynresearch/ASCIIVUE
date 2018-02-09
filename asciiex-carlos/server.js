const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const https = require("https");
const forceSSL = require("express-force-ssl");

const httpsOptions = {
	key: fs.readFileSync('./encryption-keys/key.pem', 'utf8'),
	cert: fs.readFileSync('./encryption-keys/server.crt', 'utf8')
};

const port = process.env.PORT || 4001;

const app = express();

app.set('port', port);

app.use(express.static(__dirname + '/public'));

app.use(forceSSL);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/public', 'index.html'));
});

const server = https.createServer(httpsOptions, app);

server.listen(port, () => console.log(`Listening on port: ${port}`));