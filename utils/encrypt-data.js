var bcrypt = require('bcrypt-nodejs');

//user = usuário recebido para o login
//success = ação que que será executada após o retorno da senha criptografada
exports.encrypt = function (user, success, error){

 	bcrypt.genSalt(5, function(err, salt) {

    	if (err) return error();

    	bcrypt.hash(user.senha, salt, null, function(err, hash) {
     		
     		if (err) return error();

          user.senha = hash;
      		return success(user);
    	});
  });
}

exports.comparePasswords = function(pwdReceived, pdwFound, success, error){

    bcrypt.compare(pwdReceived, pdwFound, function(err, res) {

        if (err) return error();  

        return success(res);    
    });
}