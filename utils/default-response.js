var res;
var HttpStatus = require('http-status');
var msgs = require("../config").msgs;

exports.HttpStatus = HttpStatus;
exports.msgs = msgs;

exports.setResponse = function(resp){
	res = resp;
}

exports.success = function(data, statusCode){
	if(statusCode === null || !statusCode){
		statusCode = HttpStatus.OK;
	}

	return res.status(statusCode).json(data);
}

exports.error = function(message, statusCode){
	
	if(statusCode === null || !statusCode){
		statusCode = HttpStatus.BAD_REQUEST;
	}
	return res.status(statusCode).json({mensagem:message});
}

