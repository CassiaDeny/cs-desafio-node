"use strict";

const app = require("./app");

const server = app.appInstance.listen(process.env.PORT || 3000, function(){

	const port = server.address().port;
	console.log("Servidor rodando na porta " + port);
});

exports.serverLoaded = server;