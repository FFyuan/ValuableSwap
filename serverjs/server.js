var http = require("http");
	fs = require('fs');
//	imagedir = './image';

function returnCallback(response, err, result){
	if(err){
		console.log(err);
	}
	if(!result){result = {success : "true"};} 
	response.writeHead(200, {'Content-Type' : 'application/json'});
	console.log(result);
	response.end(result);
};




http.createServer(function(request, response){
	var url = request.url;
	console.log("Requesting url:" + url);	
	if(url == '/media'){
		getMedia(request, response, returnCallback);
	} else if(url == '/auth/login'){
		login(request, response, returnCallback);
	} else if(url == '/auth/register'){
		registration(request, response, returnCallback);
	} else if(url == '/has'){
		getHasMedia(request, response, returnCallback);
	}else if(url == '/want'){
		getWantMedia(request, response, returnCallback);
	}else if(url == '/id'){
		getMediaById(request, response, returnCallback);	
	}else if(url == '/post'){
		postMedia(request, response, returnCallback);
	}else if(url == '/addWishlist'){
		addWishlist(request, response, returnCallback);
	}else if(url == '/messages'){
		getMessages(request, response, returnCallback);
	}else if (url == '/requesttrade'){
		requestTrade(request, response, returnCallback); 
	}else if (url == '/confirmtrade'){
		confirmTrade(request, response, returnCallback);
	}else if(url == '/sendmessage'){
		sendMessage(request, resposne, returnCallback);	
	} else if(url == '/userconnections'){
		getUsersConnection(request, response, returnCallback);
	} else if(url == '/tradehistory'){
		getTradeHistory(request, response, returnCallback);
	}else if(url == '/tradepending'){
		getTradePending(request, response, returnCallback);
	}else{
		response.write("404 NOT FOUND");
		response.end();
	}


}).listen(5000);

function parse(request, callback){
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString()
	});
	request.on('end', function(){
	 	console.log(body);	
		var pBody;
		if (body != "") {
			pBody = JSON.parse(body, function(k,v){ return v;});
			console.log("Request body parsed as", pBody);
			callback(pBody);
		} else {
			callback({});
		};
	});
}

var sql = require('mssql');
function connection(callback){
	sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps")
		.then(function() {
			console.log("Connected to database");
			callback();
		}).catch(function(err) {
			console.log("Connected to database failed");
			console.log(err);
		});
}
	

function confirmTrade(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('Trade_id', pBody.tradeId)
						 .execute('confirmTrade')
						 .then(function(result) {
							console.log("Trade Confirmed!");
							callback(response, null, null);
						}).catch(function(err) {
							callback(response, err, null);
						});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}
	

function requestTrade(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('user1', pBody.user1)
						 .input('user2', pBody.user2)
						 .input('item1', pBody.item_1)
						 .input('item2', pBody.item_2)
						 .execute('requestTrade').then(function(result) {
							console.log("Trade Requested!");
							callback(response, null, null);
						}).catch(function(err) {
							callback(response, err, null);
						});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function sendMessage(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('sender', pBody.sender)
						 .input('receiver', pBody.receiver)
						 .input('message_text', pBody.text)
						 .execute('sendMessage').then(function(result) {
							console.log("Message Sent!");
							callback(response, null, null);
						}).catch(function(err) {
							callback(response, err, null);
						});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function getUsersConnection(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('User', pBody.user)
						 .execute('userConnections').then(function(result) {
							console.log("Connections Retrieved!");
							console.log(result[0]);
							callback(response, null, JSON.stringify(result[0]));
						}).catch(function(err) {
							callback(response, err, null);
						});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function getMessages(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('user1', pBody.user1)
						 .input('user2', pBody.user2)
						 .execute('getMessages').then(function(result) {
							console.log("Messages Retrieved!");
							console.log(result[0]);
							callback(response, null, JSON.stringify(result[0]));
						}).catch(function(err) {
							callback(response, err, null);
						});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function getMedia(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().query('select * from getMedia')
					.then(function(result) {
						console.log('Media fetch success');
						var json = JSON.stringify(result);
						callback(response, null, json);
					}).catch(function(err) {
						callback(response, err, null);
					});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function getMediaById(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('id', pBody.id)
						.execute('getMediaByid').then(function(result) {
					console.log('Media fetch by Id success');
					json = JSON.stringify(result[0]);
					callback(response, null, json);
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function postMedia(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
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
					callback(response, null, null);
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function addWishlist(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('username', pBody.UserName)
						 .input('item_id', pBody.Media_Id)
						 .execute('addWantList').then(function(result) {
					console.log("Item :", pBody.Media_Id, " has been added to the wishlist");
					callback(response, null, null);
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function getTradePending(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('USER', pBody.user)
						 .execute('getTradePending').then(function(result) {
					console.log("Trade Pending success");
					callback(response, null, JSON.stringify(result[0]));
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function getTradeHistory(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('USER', pBody.user)
						 .execute('getTradeHistory').then(function(result) {
					console.log("Trade History success");
					callback(response, null, JSON.stringify(result[0]));
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function getHasMedia(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('USER', pBody.user)
						 .execute('getUserHas').then(function(result) {
					console.log('User Media fetch success');
					callback(response, null, JSON.stringify(result[0]));
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function getWantMedia(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('USER', pBody.user)
						 .execute('getUserWant').then(function(result) {
					console.log('Wishlist fetch success');
					callback(response, null, JSON.stringify(result[0]));
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

function registration(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('Name', pBody.Name)
						 .input('Email', pBody.Email)
						 .input('Password', pBody.Password)
						 .input('UserName', pBody.UserName)
						 .execute('addUser').then(function(result) {
					console.log("User: ",pBody.UserName, "Registration Successful in Database!");
					callback(response, null, null);
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}
						
function login(request, response, callback){
	try{
		parse(request, function(pBody){
			connection(function(){
				new sql.Request().input('username', pBody.username)
						 .input('password', pBody.password)
					    	 .execute('LoginChecker').then(function(result) {
					var exists = result[0][0].UserExists;
					if(exists == "true"){
						console.log("Login Success!");
						callback(response, null, JSON.stringify({token : pBody.username}));
					}else{
						console.log("Login Failed");
						callback(response, null, {success : false});
					}
				}).catch(function(err) {
					callback(response, err, null);
				});
			});
		});
	} catch (err) {
		callback(response, err, null);
	}
}

