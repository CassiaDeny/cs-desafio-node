var dbConn = require("../database/db");
var response = require("../utils/default-response");
var encryptData = require("../utils/encrypt-data");
var token = require('../utils/token');
var users = require("../database/users");

exports.create = function(user, resp){

	response.setResponse(resp);
	validateUser(user);
}

function validateUser (user){

	//valida preenchimento mínimo dos campos
	var msgError = "";
	
	//preenchimento do nome
	if (!user.nome){
		msgError += response.msgs.fieldName;
	};

	//preenchimento do email
	if (!user.email){
		msgError += response.msgs.fieldEmail;
	};

	//preenchimento da senha
	if (!user.senha){
		msgError += response.msgs.fieldPassword;
	}

	//preenchimento do tel
	if(!user.telefones){
		msgError += response.msgs.fieldPhones;
	}else{

		Object.keys(user.telefones).map(function(p) { 

			var phone = user.telefones[p];

			if (!phone || !phone.numero || !phone.ddd){
				msgError += response.msgs.fieldPhones;
			}
		});
	}

	if(msgError.length > 0){
		return response.error(msgError, response.HttpStatus.BAD_REQUEST);
	}

	//busca o contato no banco
	users.findUserByEmail(
		user.email, 
		(docFound)=>{
			return response.error(response.msgs.emailAlreadyRegistered, response.HttpStatus.OK);
		}, 
		(/*didnt**/)=>{
			return encryptData.encrypt(user, insertNew);
		},
		(/*erro**/)=>{
			return response.error(response.msgs.databaseFailConnection, response.HttpStatus.INTERNAL_SERVER_ERROR);
		});
}

function insertNew(user){

	user.data_criacao = user.data_atualizacao = user.ultimo_login = new Date();
	user.token = token.encode(user);

	users.save(user, 
		(doc)=>{
		//success
		return response.success(doc, response.HttpStatus.CREATED);
	},
	()=>{
		//error
		return response.error(response.msgs.databaseErrorCreateNew, response.HttpStatus.INTERNAL_SERVER_ERROR);
	} );
}




