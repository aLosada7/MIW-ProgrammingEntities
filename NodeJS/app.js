var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

var fs = require('fs');
var series;
fs.readFile('TVSeries.json', 'utf8', function (err, data) {
  if (err) throw err;
  series = JSON.parse(data);
});



var nodemailer = require('nodemailer');
// email sender function
sendEmail = function(req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aallvariccoo@gmail.com',
            pass: '****'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'Remitente',
    to: 'aldc30sc@gmail.com',
    subject: 'Asunto',
    text: 'Contenido del email'
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, error.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};
app.post('/email', sendEmail);


app.get('/', function (req, res) {
	console.log(req.headers["accept-language"].substr(0,2));
 	res.header("Access-Control-Allow-Origin", "*");
 	if(req.headers["accept-language"].substr(0,2) == "es")
		res.send("Especificación API");
	else
		res.send("API Specification");
});

app.get('/:entity', function (req, res) {
	
	var listEntities=[];
  console.log('Entity:', req.params.entity);
  for (let i = 0; i < series.length; i++) {
  	if(series[i]["@type"]==req.params.entity){
  		console.log(series[i]);
  		listEntities.push(series[i]);
  	}
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(listEntities);
});

app.post('/:entity', function (req, res) {
	console.log(req.body.newEntity);
	let idMax=0;
	for (let i = 0; i < series.length; i++) {
	  	if(series[i].id > idMax){
	  		idMax=series[i].id;
	  	}
	}
	console.log(idMax + " "+req.body.newEntity.id);
		series.push(req.body.newEntity);
	
	console.log(series);
	fs.writeFile('TVSeries.json', JSON.stringify(series, undefined, 2), (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	});
	res.status(200).send("Updated correctly");
});

app.put('/:entity/:id', function (req, res) {
	if(req.body.password=="passwordput"){
		console.log('ID:', req.params.id);
		for (let i = 0; i < series.length; i++) {
		  	if(series[i].id==req.params.id && series[i]["@type"]==req.params.entity){
		  		series[i]=req.body.updateEntity;
		  		console.log(series[i]);
		  		fs.writeFile('TVSeries.json', JSON.stringify(series, undefined, 2), (err) => {
				  if (err) throw err;
				  console.log('The file has been saved!');
				});
		  		break;
		  	}
		  }
  	}else{
		console.log("Incorrect password");
	}
});



app.get('/:entity/:id', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  console.log('ID:',req.params.id);
  console.log('Entity:',req.params.entity);
  for (let i = 0; i < series.length; i++) {
  	if(series[i].id==req.params.id && series[i]["@type"]==req.params.entity){
  		console.log(series[i]);
  		var result=series[i]
  		res.status(200).send(result);
  		break;
  	}
  }
});



app.delete('/:entity/:id', function (req, res) {
	console.log('Entity:', req.params.entity);
	console.log('ID:', req.params.id);
	if(req.body.password=="passworddelete"){
	for (let i = 0; i < series.length; i++) {
	  	if(series[i].id==req.params.id && series[i]["@type"]==req.params.entity){
	  		//console.log(series[i]);
	  		series.splice(i, 1);
	  		console.log(series);
	  		fs.writeFile('TVSeries.json', JSON.stringify(series, undefined, 2), (err) => {
			  if (err) throw err;
			  console.log('The file has been saved!');
			});
	  		break;
	  	}
	  }
	}else{
		console.log("Incorrect password");
	}
});

app.listen(8081, function () {
  console.log('NodeJS listening on port 8081!');
});