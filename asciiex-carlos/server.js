const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const https = require("https");
const forceSSL = require("express-force-ssl");
const bodyParser = require("body-parser");
const base64Img = require("base64-img");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const webpackHotMiddleware = require('webpack-hot-middleware');
const printer = require('printer');

const httpsOptions = {
	key: fs.readFileSync('./encryption-keys/key.pem', 'utf8'),
	cert: fs.readFileSync('./encryption-keys/server.crt', 'utf8')
};

const port = process.env.PORT || 4001;

const ip = require('lodash')
	.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.find({
		family: 'IPv4',
		internal: false
	})
	.value()
	.address;

const app = express();

// const compiler = webpack(webpackConfig);

const DELETE_AFTER_PRINT = false;

app.set('port', port);


app.use(historyApiFallback({
	verbose: false
}));

// app.use(webpackMiddleware(compiler, {
// 	contentBase: path.join(__dirname, "public"),
// 	publicPath: webpackConfig.output.publicPath,
// 	noInfo: true,
// 	hot: true,
// 	quiet: false,
// 	noInfo: false,
// 	lazy: false,
// 	stats: {
// 		colors: true
// 	}
// }));

// app.use(webpackHotMiddleware(compiler));

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
	let saveDir = './images/'
	let imageName = `wt-${Date.now()}`;
	res.send({});

	base64Img.img(dataURL, saveDir, imageName, function (err, filepath) {

		let printerName = printer.getPrinters()[0].name;

		printer.printFile({
			filename: filepath,
			printer: printerName,
			success: (jobID) => {
				console.log('sent to printer with ID: ' + jobID);
				if (DELETE_AFTER_PRINT) {
					fs.unlink(filepath, err => {
						if (err) {
							console.log(`${filepath} has not been deleted`, err);
						} else {
							console.log(`${filepath} has been deleted`)
						}
					});
				}
			},
			error: function (err) {
				console.log(err);
			}
		});
	});
});

const server = https.createServer(httpsOptions, app);

server.listen(port, () => console.log(`Listening on: https://${ip}:${port}`));