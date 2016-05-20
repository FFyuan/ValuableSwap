var http = require("http");
	fs = require('fs');
	imagedir = './image';


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
	else if(url == '/messages'){
		getMessages(request, function(err,result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'application/json'});
			console.log(result);
			response.end(result);
		});
	}else if (url == '/requesttrade'){
		requestTrade(request, function(err){
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

	}else if (url == '/confirmtrade'){
		confirmTrade(request, function(err){
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

	else if(url == '/sendmessage'){
		sendMessage(request, function(err){
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
	}else if(url == '/uploadimage'){
		uploadImage(request, function(err, result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'image/jpeg'});
			console.log(result);
			response.end(result);
		});
	}else if(url == '/getimage'){
		getImage(request, function(err, result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'image/jpeg'});
			response.end(result);
		});
	} else if(url == '/userconnections'){
		getUsersConnection(request, function(err,result){
			if(err) throw err;
			response.writeHead(200, {'Content-Type' : 'application/json'});
			console.log(result);
			response.end(result);
		});
	}else{
		response.write("404 NOT FOUND");
		response.end();
	}


}).listen(5000);

function confirmTrade(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString()
	});
	request.on('end', function(){
		var pBody;
		if (body != "") {
			pBody = JSON.parse(body, function(k,v){ return v;});
			console.log("Trade: " + pBody.tradeId + " is wanting to be confirmed");
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
				console.log("Connected to database");
				new sql.Request().input('Trade_id', pBody.tradeId)
						 .execute('confirmTrade').then(function(result) {
							console.log("Trade Confirmed!");
							callback(0);
						}).catch(function(err) {
							console.log(err);
							callback(1);
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

function requestTrade(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString()
	});
	request.on('end', function(){
		var pBody;
		if (body != "") {
			pBody = JSON.parse(body, function(k,v){ return v;});
			console.log("User: " + pBody.user1 + " and User: " + pBody.user2 + " is trading with items + ", pBody.item1, pBody.item2);
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
				console.log("Connected to database");
				new sql.Request().input('user1', pBody.user1)
						 .input('user2', pBody.user2)
						 .input('item_1', pBody.item1)
						 .input('item_2', pBody.item2)
						 .execute('tradeItem').then(function(result) {
							console.log("Trade Requested!");
							callback(0);
						}).catch(function(err) {
							console.log(err);
							callback(1);
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
function sendMessage(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString()
	});
	request.on('end', function(){
		var pBody;
		if (body != "") {
			pBody = JSON.parse(body, function(k,v){ return v;});
			console.log("Name:", pBody.User1, " is wanting to send a message");
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
				console.log("Connected to database");
				new sql.Request().input('sender', pBody.sender)
						 .input('receiver', pBody.receiver)
						 .input('message_text', pBody.text)
						 .execute('sendMessage').then(function(result) {
							console.log("Message Sent!");
							callback(0);
						}).catch(function(err) {
							console.log(err);
							callback(1);
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

function getUsersConnection(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString()
	});
	request.on('end', function(){
		var pBody;
		if (body != "") {
			pBody = JSON.parse(body, function(k,v){ return v;});
			console.log("Name:", pBody.user, " is wanting connection list");
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
				console.log("Connected to database");
				new sql.Request().input('User', pBody.user)
						 .execute('userConnections').then(function(result) {
							console.log("Connections Retrieved!");
							console.log(result[0]);
							callback(null, JSON.stringify(result[0]));
						}).catch(function(err) {
							console.log(err);
							callback(err,null);
						});
			}).catch(function(err){
				console.log(err);
				callback(err, null);
			});
		} else {
			callback(null, null);
		}
	});
}
function getMessages(request, callback){
	var sql = require('mssql');
	var body = "";
	request.on('data', function(chunk){
		body += chunk.toString()
	});
	request.on('end', function(){
		var pBody;
		if (body != "") {
			pBody = JSON.parse(body, function(k,v){ return v;});
			console.log("Name:", pBody.User1, " is wanting to send a message");
			sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
				console.log("Connected to database");
				new sql.Request().input('user1', pBody.user1)
						 .input('user2', pBody.user2)
						 .execute('getMessages').then(function(result) {
							console.log("Messages Retrieved!");
							console.log(result[0]);
							callback(null, JSON.stringify(result[0]));
						}).catch(function(err) {
							console.log(err);
							callback(err, null);
						});
			}).catch(function(err){
				callback(err,null);
			});
		} else {
			callback(null,null);
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
							console.log("Item :", pBody.Media_Id, " has been added to the wishlist");
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


function getImage(request, callback){
	var sql = require('mssql');
	var body = "";

	//request.on('data', function(chunk) {
	//	body += chunk.toString();
	//});

	//var pbody = JSON.parse(body,function(k,v){ return v;});
	var testjson = [{"media_id":"11111111"}];
	var mID = testjson[0]['media_id'];

	sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		// Query

		new sql.Request().query('select img_path from Media Where media_id = \''+mID+'\'').then(function(result) {
			console.log(result);
			var imgpath = result[0]['img_path'];
			var img = fs.readFileSync(imgpath);
			//console.log(img);

			//return only image
			callback(null, img);


			//return a json with media_id and image
			/*
			 var Base64img =  new Buffer(img, 'binary').toString('base64');	//encode in base64 to fit in the json
			 var returnjs = [{"media_id": mID, "image": Base64img }];
			 callback(null, returnjs);
			 //var decodeimg = new Buffer(testjs[0]['image'], 'base64').toString('binary'); //docode in the frontend
			 */
		}).catch(function(err) {
			console.log('Image fetch failed');
			console.log(err);
		});
	}).catch(function(err) {
		// ... connect error checks
	});
}


function uploadImage(request, callback){

	var image = "";
	request.setEncoding('binary');

	//read image(base64) from frontend
	/*
	 request.on('data', function(chunk) {
	 image += chunk;
	 });
	 */

	//read an image from local disk for testing since we do not have front-end part yet
	var img = fs.readFileSync('./icon.jpg');

	var Base64img =  new Buffer(img, 'binary').toString('base64');
	var testjs = [{"media_id":"11111111", "image": Base64img }];
	var mID = testjs[0]['media_id'];
	var image = new Buffer(testjs[0]['image'], 'base64').toString('binary');

	var filename = mID + '.jpg';
	var filesavepath = imagedir + '/'+ filename;
	console.log(filesavepath);

	request.on('end', function(){
		fs.writeFile(filesavepath, image, 'binary', function(err){
			if (err) throw err
			console.log('image saved on disk');
		})
	});


	var sql = require('mssql');
	sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		// Query

		new sql.Request().query('Update Media Set img_path = \''+filesavepath+'\' Where media_id = \''+mID+'\'').then(function(result) {
			console.log(result);
			//console.log(img);
			var reply = 'image uploaded'
			callback(null, reply);
		}).catch(function(err) {
			console.log('Image upload failed');
			console.log(err);
		});
	}).catch(function(err) {
		// ... connect error checks
	});

}
