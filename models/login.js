var users = require("../database/users");
var encryptData = require("../utils/encrypt-data");
var response = require("../utils/default-response");
var token = require("../utils/token");

exports.singIn = function(user, resp){
	
	response.setResponse(resp);
	validateUser(user);
}

function validateUser(user){

	var msgError = "";

	//preenchimento do email
	if (!user.email){
		msgError += response.msgs.fieldEmail;
	};

	//preenchimento da senha
	if (!user.senha){
		msgError += response.msgs.fieldPassword;
	}
	
	if(msgError.length > 0){
		return response.error(msgError, response.HttpStatus.BAD_REQUEST);
	}

	//busca o contato no banco
	users.findUserByEmail(
		user.email, 
		(docFound)=>{
			compareUser(user, docFound);
		}, 
		(/*didnt**/)=>{
			invalidLogin();
		},
		(/*erro**/)=>{
			return inexpectedError();
		});
}

function compareUser(user, userFound){

	encryptData.comparePasswords(user.senha, userFound.senha, 
		(isEqual)=>{
			//sucesso
			if(isEqual){
				return getNewToken(userFound);
			} 

			return invalidLogin();

		}, 
		()=>{
			//erro
			return response.error(response.msgs.encriptError, response.HttpStatus.INTERNAL_SERVER_ERROR);
		});

}

function getNewToken(user){

	user.ultimo_login = new Date();
	user.token = token.encode(user);
	

	users.save(user, 
		(doc)=>{
		//success
		return response.success(doc, response.HttpStatus.OK);
	},
	()=>{
		//error
		return inexpectedError();
	});
}

function invalidLogin(){
	return response.error(response.msgs.invalidLogin, response.HttpStatus.UNAUTHORIZED);
}

function inexpectedError(){
	return response.error(response.msgs.databaseFailConnection, response.HttpStatus.INTERNAL_SERVER_ERROR); 
}