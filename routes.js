var userController = require("./controllers/user");
var config = require("./config")

exports.routes = function(app){

	app.post("/user", function(req, res){
		userController.createUser(req, res);
	});

	app.patch("/user", function(req, res){
		userController.login(req, res);
	});

	app.get("/user/:id", function(req, res){
		userController.findUser(req, res);
	});

	app.use((req, res) =>{
		res.status(404).json({ "mensagem": config.msgs.resourceNotFound });
	});
}