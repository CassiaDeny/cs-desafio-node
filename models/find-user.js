var users = require("../database/users");
var response = require("../utils/default-response");
var token = require("../utils/token");

exports.find = function(user, resp){

	response.setResponse(resp);
	validateUser(user);
}

function validateUser(user){

	var token = !user.token? "" : user.token.replace("Bearer", "").trim();

	if (!user.id || !token){
		return unauthorizedError();
	};

	users.findUserByIdToken(
		user.id, token, 
		(docFound)=>{
			
			var minDateToLogin = getMinDateToValidLogin();
			var lastDateLogin = docFound.ultimo_login;

			if(lastDateLogin >= minDateToLogin){
				return response.success(docFound, response.HttpStatus.OK);
			} else {
				return response.error(response.msgs.invalidSession, response.HttpStatus.BAD_REQUEST);	
			}
		}, 
		(/*didnt**/)=>{
			return unauthorizedError();
		},
		(/*erro**/)=>{
			return response.error(response.msgs.databaseFailConnection, response.HttpStatus.INTERNAL_SERVER_ERROR);
		});
}

function getMinDateToValidLogin(){
	
	//verificar se o último login foi a MENOS que 30 minutos atrás.
	var qtdMinutes = 30;
	var limit = new Date();
    var min = limit.getMinutes() - qtdMinutes;
    
    limit.setMinutes(min);

    return limit;
}

function unauthorizedError(){
	 return response.error(response.msgs.notAuthorized, response.HttpStatus.UNAUTHORIZED);
}