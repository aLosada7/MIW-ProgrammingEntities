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


app.get('/', function (req, res) {
  console.log("aqui");
});

app.get('/getEntities', function(req,res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.status(200).send({series, "status" : 200});

});

app.get('/getEntity/:entity', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	var listEntities=[]
  console.log('Entity:', req.params.entity);
  for (let i = 0; i < series.length; i++) {
  	if(series[i]["@type"]==req.params.entity){
  		console.log(series[i]);
  		listEntities.push(series[i]);
  	}
  }
  res.status(200).send({listEntities, "status" : 200});
});

app.post('/postEntity/', function (req, res) {
	console.log(req.body.newEntity);
	series.push(req.body.newEntity);
	console.log(series);
	res.header("Access-Control-Allow-Origin", "*");
  	res.status(200).send({"success": "Updated successfully", "status" : 200});
});

app.put('/editEntityID/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	console.log('ID:', req.body.edit);
	for (let i = 0; i < series.length; i++) {
	  	if(series[i].id==req.body.edit[0]){
	  		console.log(series[i]);
	  		
	  		break;
	  	}
	  }
  	res.status(200).send({"success": "Updated successfully", "status" : 200});
});



app.get('/getEntityID/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  console.log('ID:', req.param("id"));
  for (let i = 0; i < series.length; i++) {
  	if(series[i].id==req.param("id")){
  		console.log(series[i]);
  		var result=series[i]
  		res.status(200).send({result, "status" : 200});
  		break;
  	}
  }
});



app.delete('/deleteEntityID/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	console.log('ID:', req.body.id);
	for (let i = 0; i < series.length; i++) {
	  	if(series[i].id==req.body.id){
	  		console.log(series[i]);
	  		res.status(200).send({"success": "Delete successfully", "status" : 200});
	  		break;
	  	}
	  }

});

app.listen(8081, function () {
  console.log('NodeJS listening on port 8081!');
});