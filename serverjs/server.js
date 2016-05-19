var http = require("http");

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
		registration(request, function(err){
			var result;
			if (err==0){
				result = {success : "true"};
			}else{
				result = {success : "false"};
			}
			var jRes = JSON.stringify(result);
			response.writeHead(200, {
				'Content-Type' : 'application/json'
			});
			response.end(jRes);
		});
	} else if(url == '/has'){
		getHasMedia(request, function(err, result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'application/json'});
			console.log(result);
			response.end(result);
		});
	}else if(url == '/want'){
		getWantMedia(request, function(err, result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'application/json'});
			console.log(result);
			response.end(result);
		});
	}else if(url == '/id'){
		getMediaById(request, function(err, result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'application/json'});
			console.log(result);
			response.end(result);
		});
	}else if(url == '/post'){
		postMedia(request, function(err){
			var result;
			if (err==0){
				result = {success : "true"};
			}else{
				result = {success : "false"};
			}
			var jRes = JSON.stringify(result);
			response.writeHead(200, {
				'Content-Type' : 'application/json'
			});
			console.log(jRes);
			response.end(jRes);
		});
	}else if(url == '/addWishlist'){
		addWishlist(request, function(err){
			var result;
			if (err==0){
				result = {success : "true"};
			}else{
				result = {success : "false"};
			}
			var jRes = JSON.stringify(result);
			response.writeHead(200, {
				'Content-Type' : 'application/json'
			});
			console.log(jRes);
			response.end(jRes);
		});

	}
	else if (url == '/MessagesReceivedBy'){
		getMessagesReceived(function(err, result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'application/json'});
			console.log(result);
			response.end(result);
		});
	}
	else{
		response.write("404 NOT FOUND");
		response.end();
	}


}).listen(5000);

function getMessagesReceived(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data',function(chunk){
		body += chunk.toString();
	});
	request.on('end', function(){
		var pBody;
		if(body != ""){
			pBody = JSON.parse(body, function(k,v){return v;});
			console.log(pBody);
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		    // Query
				new sql.Request().query('select * from VS_Messages where receiver=\''+pBody.user+'\'').then(function(result) {
					console.log('Received messages success');
					json = JSON.stringify(result);
					callback(null, json);
				}).catch(function(err) {
					console.log('Received messages failed');	
					console.log(err);
  				});
			});
		}
	});
}
function getMedia(callback){
	var sql = require('mssql');
	var json = '';
	sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		    // Query
		new sql.Request().query('select * from getMedia').then(function(result) {
			console.log('Media fetch success');
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
function getMediaById(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data',function(chunk){
		body += chunk.toString();
	});
	request.on('end', function(){
		var pBody;
		if(body != ""){
			pBody = JSON.parse(body, function(k,v){return v;});
			console.log(pBody);
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		    // Query
				new sql.Request().query('select * from getMedia where Media_id='+pBody.id).then(function(result) {
					console.log('Media fetch success');
					json = JSON.stringify(result);
					callback(null, json);
				}).catch(function(err) {
					console.log('Media fetch failed');	
					console.log(err);
  				});
			});
		}
	});
}

function postMedia(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString();
	});
	request.on('end', function(){
		var pBody;
		if(body != ""){
			pBody = JSON.parse(body, function(k,v){return v;});
			console.log(pBody);
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
				console.log("Connected to database");
				new sql.Request().input('UserName', pBody.UserName)
						 .input('Name', pBody.Name)
						 .input('Genre', pBody.Genre)
						 .input('Artist', pBody.Artist)
						 .input('Music_Type', pBody.Music_Type)
						 .input('Condition', pBody.Condition)
						 .input('System', pBody.System)
						 .input('Type_of_Media', pBody.Type_of_Media)
						 .execute('addMedia').then(function(result) {
							console.log("Item :", pBody.Name, " has been added to the database");
							callback(0);
						}).catch(function(err) {
							console.log(err);
							callbakc(1);
						});
			}).catch(function(err){
				console.log(err);
				callback(1);
			});
		} else {
			callback(1);
		}
	});
}

function addWishlist(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString();
	});
	request.on('end', function(){
		var pBody;
		if(body != ""){
			pBody = JSON.parse(body, function(k,v){return v;});
			console.log("Parsed Data: " ,pBody);
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
				console.log("Connected to database");
				new sql.Request().input('username', pBody.UserName)
						 .input('item_id', pBody.Media_Id)
						 .execute('addWantList').then(function(result) {
							console.log("Item :", pBody.UserName, " has been added to the wishlist");
							callback(0);
						}).catch(function(err) {
							console.log(err);
							callbakc(1);
						});
			}).catch(function(err){
				console.log(err);
				callback(1);
			});
		} else {
			callback(1);
		}
	});

}
function getHasMedia(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data',function(chunk){
		body += chunk.toString();
	});
	request.on('end', function(){
		var pBody;
		if(body != ""){
			pBody = JSON.parse(body, function(k,v){return v;});
			console.log(pBody);
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		    // Query
				new sql.Request().query('select * from getUserMedia where username =\''+pBody.user+'\'').then(function(result) {
					console.log('User Media fetch success');
					json = JSON.stringify(result);
					callback(null, json);
				}).catch(function(err) {
					console.log('User Media fetch failed');	
					console.log(err);
  				});
			});
		}
	});
}
function getWantMedia(request, callback){

	var sql = require('mssql');
	var body = "";
	request.on('data',function(chunk){
		body += chunk.toString();
	});
	request.on('end', function(){
		var pBody;
		if(body != ""){
			pBody = JSON.parse(body, function(k,v){return v;});
			console.log(pBody);
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		    // Query
				new sql.Request().query('select * from getUserWants where username =\''+pBody.user+'\'').then(function(result) {
					console.log('Wish List success');
					json = JSON.stringify(result);
					callback(null, json);
				}).catch(function(err) {
					console.log('Wish List failed');	
					console.log(err);
  				});
			});
		}
	});


}

function registration(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString()
	});
	request.on('end', function(){
		var pBody;
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
							console.log("User: ",pBody.UserName, "Registration Successful in Database!");
							callback(0);
						}).catch(function(err) {
							console.log(err);
							callbakc(1);
						});
			}).catch(function(err){
				console.log(err);
				callback(1);
			});
		} else {
			callback(1);
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
