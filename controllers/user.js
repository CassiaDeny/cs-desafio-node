var createUser = require("../models/create-user");
var login = require("../models/login");
var findUser = require("../models/find-user");

exports.createUser = function(req, res){
	validateContentType(req, res, ()=>{
		createUser.create(req.body, res);	
	});
}

exports.login = function(req, res){
	validateContentType(req, res, ()=>{
		login.singIn(req.body, res);
	});
}

exports.findUser = function(req, res){

	validateContentType(req, res, ()=>{
		var user = {
			id: req.params.id,
			token: req.headers["authentication"]
		}
		
		findUser.find(user, res);
	});
	
}

function validateContentType(req, res, success){

	const config = require("../config");
	const type = config.contentType;
	const msg = config.msgs.invalidContentType;

	if (req.headers[type.key] != type.value){
		return res.status(400).json({mensagem: msg});
	} else {
		success();
	}
}