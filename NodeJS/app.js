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
const Information=require('./controller/controlador.js').Information;
let info;
let nuevo;
fs.readFile('./model/data.json', 'utf8', function (err, data) {
  if (err) throw err;
  //info = JSON.parse(data);
  nuevo=new Information(data);
 	
});





const serverMail = require('./controller/serverMail.js');
// email sender function
app.post('/email', function(req, res){
	serverMail.sendMail(req,res);
});


app.get('/', function (req, res) {
	nuevo.getAPI(req,res);
});

app.get('/:entity', function (req, res) {	
	nuevo.getEntity(req,res);
});

app.post('/:entity', function (req, res) {
	nuevo.postEntity(req,res);
});

app.put('/:entity/:id', function (req, res) {
	nuevo.putEntityId(req,res)
});



app.get('/:entity/:id', function (req, res) {
	nuevo.getEntityId(req,res);
});



app.delete('/:entity/:id', function (req, res) {
	nuevo.deleteEntityId(req,res);
});

app.listen(8081, function () {
  console.log('NodeJS listening on port 8081!');
});


module.exports = app;


/* All petitions GET and POST made with HTTP Create Server*//*
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
		case "OPTIONS":
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
			res.end();
			break;
		case "GET":
			if(req.url == "/"){
				nuevo.getAPI(req,res);
			}
			else if(req.url == "/TVSeries"){
				nuevo.getEntityTVSeries(req,res);
			}else if (req.url == "/Article"){
				nuevo.getEntityArticle(req,res);
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
		case "POST":
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
			case "DELETE":
				console.log("aqui");
				break;
			case "UPDATE":
	}
}
*/
