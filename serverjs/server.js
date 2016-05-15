var http = require("http");
var querystring = require("querystring");

http.createServer(function(request, response){
	var url = request.url;
	console.log("Requesting url:" + url);	
	if(url == '/media'){
		getMedia(function(err, result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'application/json'});
			response.end(result);
		});
	} else if(url == '/auth/login'){
		login(request, function(err, user){
			if(user){
				var res = JSON.stringify(user);
				response.writeHead(200, {
					'Content-Type' : 'application/json'
				});
				console.log('User:', user.token, ' logged in');
				response.end(res);
			} else {
				response.end();
			}
		});
	}else if(url == '/auth/logout'){

	} else if(url == '/auth/register'){
		registration(request, function(err, user){
			if (user) {
				var result = JSON.stringify(user);
				response.writeHead(200, {
					'Content-Type' : 'application/json'
				});
				console.log('User:', user.token, ' registered');
				response.end(result)
			} else {
				response.end();
			}
		});

	} else{
		response.write("404 NOT FOUND");
		response.end();
	}


}).listen(5000);


function getMedia(callback){
	var sql = require('mssql');
	var json = '';
	sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		    // Query
		new sql.Request().query('select * from getMedia').then(function(result) {
			console.log(result);
			json = JSON.stringify(result);
			callback(null, json);
		}).catch(function(err) {
			console.log('Media fetch failed');	
			console.log(err);
		});
	}).catch(function(err) {
		    // ... connect error checks
	});
};

function registration(request, callback){
		var sql = require('mssql');
		var body = "";
		request.on('data', function(chunk){
			body += chunk.toString()
		});
		request.on('end', function(){
			var pBody
			if (body != "") {
				pBody = JSON.parse(body, function(k,v){ return v;});
				console.log("Name:", pBody.UserName, " is wanting to register");
				sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
					console.log("Connected to database");
					new sql.Request().input('Name', pBody.Name)
							 .input('Email', pBody.Email)
							 .input('Password', pBody.Password)
							 .input('UserName', pBody.UserName)
							 .execute('addUser').then(function(result) {
								console.log(result);
								callback(0);
							}).catch(function(err) {
								console.log(err);
							});
			}).catch(function(err){
				console.log(err)
			});
		} else {
			callback(1, {});
		}
	});
}

					

function login(request,callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk) {
		body += chunk.toString();	 
        });     
	request.on('end', function(){
		var pBody 
		if(body != "") {
			var pBody = JSON.parse(body,function(k,v){ return v;});
			console.log("User:", pBody.username, " is asking for credential");
			
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
				console.log("Connected to database");
				new sql.Request().input('username', pBody.username)
						 .input('password', pBody.password)
					    	 .execute('LoginChecker').then(function(result) {
							 var exists = result[0][0].UserExists;
							 if(exists == "true"){
								 console.log("Login Success!");
								 callback(0, {token : pBody.username});
							 }else{
								 console.log("Login Failed");
								 callback(1, null);
							 }
						  }).catch(function(err) {
							  console.log(err);
						  });
			}).catch(function(err) {
			});
		}else{
			callback(1, {});
		}
	});
}
