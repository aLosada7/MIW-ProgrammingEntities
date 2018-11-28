var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

const fs = require('fs');
const Information=require('./controlador.js').Information;
let info;
let nuevo;
fs.readFile('data.json', 'utf8', function (err, data) {
  if (err) throw err;
  //info = JSON.parse(data);
  nuevo=new Information(data);
 	
});

/* All petitions GET and POST made with HTTP Create Server
const http=require('http');
const qs=require('querystring');
const server=http.createServer();
server.on('request',procesa);
server.listen(8081);


function procesa(req,res){
	console.log(req.url);
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log(req.method);
	switch(req.method){
		case 'GET':
			if(req.url == "/"){
				console.log(req.headers["accept-language"].substr(0,2));
			 	if(req.headers["accept-language"].substr(0,2) == "es"){
					fs.readFile('informacion.html', 'utf8', function (err, data) {
					  if (err) throw err;
					  res.end(data);
					});
				}else{
					fs.readFile('information.html', 'utf8', function (err, data) {
					  if (err) throw err;
					  res.end(data);
					});
				}
				//res.end();
			}
			else if(req.url == "/TVSeries"){
				  var listEntities=[];
				  console.log('Entity: TVSeries');
				  for (let i = 0; i < info.length; i++) {
				  	if(info[i]["@type"]=="TVSeries"){
				  		console.log(info[i]);
				  		listEntities.push(info[i]);
				  	}
				  }
				  res.setHeader("Access-Control-Allow-Origin", "*");
				  res.end(JSON.stringify(listEntities));
			}else if (req.url == "/Article"){
				var listEntities=[];
				  console.log('Entity: Article');
				  for (let i = 0; i < info.length; i++) {
				  	if(info[i]["@type"]=="Article"){
				  		console.log(info[i]);
				  		listEntities.push(info[i]);
				  	}
				  }
				  res.setHeader("Access-Control-Allow-Origin", "*");
				  res.end(JSON.stringify(listEntities));
			}else{
				let separateURL = req.url.split("/");
				  console.log('ID:',separateURL[1]);
				  console.log('Entity:',separateURL[2]);
				  for (let i = 0; i < info.length; i++) {
				  	if(info[i].id==separateURL[2] && info[i]["@type"]==separateURL[1]){
				  		console.log(info[i]);
				  		let result=info[i];
				  		res.setHeader("Access-Control-Allow-Origin", "*");
				  		res.end(JSON.stringify(result));
				  		break;
				  	}
				  }
			}
			break;
		case 'POST':
			var newEntity = '';

    req.on('data', function(data) 
    {
        newEntity += data;
    });
    req.on('end', function() 
    {  console.log(newEntity);
		info.push(JSON.parse(newEntity));
	
	console.log(info);
	fs.writeFile('data.json', JSON.stringify(info, undefined, 2), (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	});
	res.end("Posted correctly");
    });
			break;
			
	}
}*/



const serverMail = require('./serverMail.js');
// email sender function
app.post('/email', function(req, res){
	serverMail.sendMail(req,res);
});


app.get('/', function (req, res) {
	console.log(req.headers["accept-language"].substr(0,2));
 	res.header("Access-Control-Allow-Origin", "*");
 	if(req.headers["accept-language"].substr(0,2) == "es"){
		fs.readFile('informacion.html', 'utf8', function (err, data) {
		  if (err) throw err;
		  res.send(data);
		});
	}else{
		fs.readFile('information.html', 'utf8', function (err, data) {
		  if (err) throw err;
		  res.send(data);
		});
	}
});

app.get('/:entity', function (req, res) {	
	nuevo.getEntity(req,res);
});

app.post('/:entity', function (req, res) {
	console.log(req.body.newEntity);
	let idMax=0;
	for (let i = 0; i < info.length; i++) {
	  	if(info[i].id > idMax){
	  		idMax=info[i].id;
	  	}
	}
	console.log(idMax + " "+req.body.newEntity.id);
		info.push(req.body.newEntity);
	
	console.log(info);
	fs.writeFile('data.json', JSON.stringify(info, undefined, 2), (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	});
	res.status(200).send("Posted correctly");
});

app.put('/:entity/:id', function (req, res) {
	if(req.body.password=="passwordput"){
		console.log('ID:', req.params.id);
		for (let i = 0; i < info.length; i++) {
		  	if(info[i].id==req.params.id && info[i]["@type"]==req.params.entity){
		  		info[i]=req.body.updateEntity;
		  		console.log(info[i]);
		  		fs.writeFile('data.json', JSON.stringify(info, undefined, 2), (err) => {
				  if (err) throw err;
				  console.log('The file has been saved!');
				  res.status(200).send("Updated correctly");
				});
		  		break;
		  	}
		  }
  	}else{
		res.send("Incorrect password");
	}
});



app.get('/:entity/:id', function (req, res) {
	nuevo.getEntityId(req,res);
});



app.delete('/:entity/:id', function (req, res) {
	console.log('Entity:', req.params.entity);
	console.log('ID:', req.params.id);
	if(req.body.password=="passworddelete"){
	for (let i = 0; i < info.length; i++) {
	  	if(info[i].id==req.params.id && info[i]["@type"]==req.params.entity){
	  		//console.log(series[i]);
	  		info.splice(i, 1);
	  		console.log(info);
	  		fs.writeFile('data.json', JSON.stringify(info, undefined, 2), (err) => {
			  if (err) throw err;
			  console.log('The file has been saved!');
			  res.status(200).send("Delete correctly");
			});
	  		break;
	  	}
	  }
	}else{
		res.send("Wrong password");
	}
});

app.listen(8081, function () {
  console.log('NodeJS listening on port 8081!');
});

