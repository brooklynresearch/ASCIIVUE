const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const https = require("https");
const forceSSL = require("express-force-ssl");
const bodyParser = require("body-parser");
const base64Img = require("base64-img");

const httpsOptions = {
	key: fs.readFileSync('./encryption-keys/key.pem', 'utf8'),
	cert: fs.readFileSync('./encryption-keys/server.crt', 'utf8')
};

const port = process.env.PORT || 4001;

const app = express();

app.set('port', port);

app.use(express.static(__dirname + '/public'));

app.use(forceSSL);

app.use(bodyParser.json({
	limit: '50mb'
}));

app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/public', 'index.html'));
});

app.post('/save-image', (req, res) => {

	let {
		dataURL
	} = req.body;

	base64Img.img(dataURL, './images/', `wt-${Date.now()}`, function (err, filepath) {});


});

const server = https.createServer(httpsOptions, app);

server.listen(port, () => console.log(`Listening on port: ${port}`));