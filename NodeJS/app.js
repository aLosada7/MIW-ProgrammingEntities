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
  res.header("Access-Control-Allow-Origin", "*");
	res.send("Especificación API");
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
  res.status(200).send({listEntities, "status" : 200});
});

app.post('/', function (req, res) {
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



app.get('/:entity/:id', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  console.log('ID:',req.params.id);
  console.log('Entity:',req.params.entity);
  for (let i = 0; i < series.length; i++) {
  	if(series[i].id==req.params.id && series[i]["@type"]==req.params.entity){
  		console.log(series[i]);
  		var result=series[i]
  		res.status(200).send({result, "status" : 200});
  		break;
  	}
  }
});



app.delete('/', function (req, res) {
	console.log('Entity:', req.body.entity);
	console.log('ID:', req.body.id);
	if(req.body.password=="passworddelete"){
		console.log("a borrar");
	}
	for (let i = 0; i < series.length; i++) {
	  	if(series[i].id==req.body.id && series[i]["@type"]==req.body.entity){
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

});

app.listen(8081, function () {
  console.log('NodeJS listening on port 8081!');
});