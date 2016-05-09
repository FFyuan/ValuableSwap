var http = require("http");

http.createServer(function(request, response){
	var callback = function(err, result){
		if(err) throw err;
		response.writeHead(200, {
			'Content-Type' : 'application/json'
		});
		console.log('json:', result);
		response.end(result);
	};
	var url = request.url;
	console.log("Requesting url:" + url);	
	if(url == '/media'){
		getMedia(callback);
	} else {
		response.write("404 NOT FOUND");
		response.end();
	}


}).listen(5000);


function getMedia(callback){
	var sql = require('mssql');
	var json = '';
	sql.connect("mssql://reitersg:8506Circle@titan.csse.rose-hulman.edu/ValuableSwaps").then(function() {
		    // Query
		new sql.Request().query('select name, genre, condition from [Media]').then(function(recordset) {
			json = JSON.stringify(recordset);
			callback(null, json);
		}).catch(function(err) {});
	}).catch(function(err) {
		    // ... connect error checks
	});
};
