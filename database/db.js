const mongodb = require("mongodb");
const config = require("./db-config");
const connectionStr = "mongodb://" + config.usr + ":" + config.pwd + "@" +config.host + "/" + config.db;

exports.findOne = function(collection, filter, projection, success, error){

	mongodb.MongoClient.connect(connectionStr, function(err, db){

		if (err){
			db = null;
			console.log(err);
			error();

		} else{

			db.collection(collection).findOne(filter, projection, function(err, doc){

				if (err){

					db = null;
					console.log(err);
					error();

				} else {

					db.close();
					success(doc);		
				}
			});
		}
	});
}

exports.save = function(collection, fields, success, error){

	mongodb.MongoClient.connect(connectionStr, function(err, db){

		if (err){
			db = null;
			console.log(err);
			error();
		} else {

			db.collection(collection).save(fields, {w:1}, function(err, doc){

				if (err){
					db = null;
					console.log(err);
					error();
				} else {

					db.close();
					success(doc);	
				}
			});
		}
	});
}