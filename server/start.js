const express = require('express');
const process = require('process');

const root = `${__dirname}/..`;

let app = express();
app.get('/*', (req, res) => {
	if(req.headers["x-forwarded-proto"] !== "https")
		res.redirect('https://'+req.hostname+req.url);
	res.sendFile(req.params[0] || './client/index.html', {root}) 
}); 


async function start() {
	app.listen(process.env.PORT || '4096', process.env.LISTEN_ADDR);
}

start();