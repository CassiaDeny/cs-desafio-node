var ObjectID = require('mongodb').ObjectID;
var dbConn = require("./db");
var config = require("./db-config");
var collection = config.collection;

//recebe o email a ser persquisado
//foundUser = função que tratará caso o usuário for encontrado
//didntFindUser = função que tratará caso o usuário não seja encontrado
exports.findUserByEmail = function(email, foundUser, didntFindUser, error){

	var filter = {'email': email};
	var projection = {};

	dbConn.findOne(collection, filter, projection, 
		(doc) =>{
			//sucesso na conexão com o banco
			//se não teve retorno, é porque não temos este email cadastrado ainda
			if(doc === null){
				return didntFindUser();
			}
			
			//se teve retorno, é pq este email já existe na base
			return foundUser(doc);
		},
		()=>{
			//problemas com o banco
			return error();	
		});
}

exports.save = function(user, success, error){

	dbConn.save(collection, user, 
		(doc) =>{
		
		if(doc === null || doc.ok === 0){
			return error();
		}

		return success(user);
	});
}


exports.findUserByIdToken = function(id, token, foundUser, didntFindUser, error){

	var objectId = new ObjectID(id);
	var filter = {_id: objectId, token: token };

	var projection = {};

	dbConn.findOne(collection, filter, projection, 
		(doc) =>{
			//sucesso na conexão com o banco
			if(doc === null){
				return didntFindUser();
			}
			
			return foundUser(doc);
		},
		()=>{
			//problemas com o banco
			return error();	
		});
}

