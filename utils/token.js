var jwt = require('jwt-simple');
var secret = "C#o9N¨C#R$e3T%e3D#e3S@a1F$i8o9Nö9";

exports.encode = function(user){

	var payload = {
		iss: user.email,
		expires : user.ultimo_login
	}

	var token = jwt.encode(payload, secret);

	return token;
}

function decode(token, secret){
	return jwt.decode(token, secret);
}
