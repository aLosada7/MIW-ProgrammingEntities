const fs = require('fs');
const TVSerie=require('./Schema.js').TVSerie;
const Article=require('./Schema.js').Article;


class Information{

	constructor(data){
		this.json=JSON.parse(data);
	}



	getAPI(req,res){
		console.log(req.headers["accept-language"].substr(0,2));
	 	res.header("Access-Control-Allow-Origin", "*");
	 	if(req.headers["accept-language"].substr(0,2) == "es"){
			fs.readFile('./model/informacion.html', 'utf8', function (err, data) {
			  if (err) throw err;
			  res.send(data);
			});
		}else{
			fs.readFile('./model/information.html', 'utf8', function (err, data) {
			  if (err) throw err;
			  res.send(data);
			});
		}
	}

	getEntity(req,res){
		console.log(this.json);
		var listEntities=[];
		  console.log('Entity:', req.params.entity);
		  console.log(this.json.length);
		  for (let i = 0; i < this.json.length; i++) {
		  	if(this.json[i]["@type"]==req.params.entity){
		  		console.log(this.json[i]);
		  		listEntities.push(this.json[i]);
		  	}
		  }
		  console.log("aqui");
		  console.log(req.headers["accept"]);
		  
		  switch(req.headers["accept"]){
		  	case "application/json":
		  		res.header("Access-Control-Allow-Origin", "*");
		  		res.status(200).send(listEntities);
		  		break;
		  	case "text/html":
				 
		  		let result='<h1>Entity: '+ listEntities[0]["@type"]+'</h1>';

		  		if(listEntities[0]["@type"] == "TVSeries"){
			  		for (let i = 0; i < listEntities.length; i++) {
			  			let TVSerieIn=new TVSerie(listEntities[i]);
			  			result+=TVSerieIn.getHTML();
					  }
				 }else if(listEntities[0]["@type"] == "Article"){
				 	for (let i = 0; i < listEntities.length; i++) {
				 		let ArticleIn=new Article(listEntities[i]);
			  			result+=ArticleIn.getHTML();
			  		}
				 }
		  		console.log(result);
		  		res.status(200).send(result);
		  		break;
		  	default:
		  		res.header("Access-Control-Allow-Origin", "*");
		  		res.status(200).send(listEntities);
		  	
		  	}

		  


		  
	}

	postEntity(req,res){
		console.log(req.body.newEntity);
		try {
		    req.body.newEntity = JSON.parse(req.body.newEntity);
		  } catch (e) {
		    return res.status(200).send("Wrong data introduced");
		  }
		console.log(req.body.newEntity["@type"]);
		let valid="";
		if(req.body.newEntity["@type"] == "TVSeries"){
			let TVSerieValid=new TVSerie(req.body.newEntity);
			valid=TVSerieValid.isValid(this.json);
		}else if(req.body.newEntity["@type"] == "Article"){
			let ArticleValid=new Article(req.body.newEntity);
			valid=ArticleValid.isValid(this.json);
		}else{
			res.status(200).send("Wrong data introduced");
		}
		console.log(valid);
		if(valid==""){


			this.json.push(req.body.newEntity);
			
			console.log(this.json);
			fs.writeFile('data.json', JSON.stringify(this.json, undefined, 2), (err) => {
			  if (err) throw err;
			  console.log('The file has been saved!');
			});
			res.status(200).send("Posted correctly");
		}else{
			res.send(valid);
		}
	}

	putEntityId(req,res){
		let valid="";
		if(req.body.updateEntity["@type"] == "TVSeries"){
			let TVSerieValid=new TVSerie(req.body.updateEntity);
			valid=TVSerieValid.isValidUpdate();
		}else if(req.body.updateEntity["@type"] == "Article"){
			let ArticleValid=new Article(this.json,req.body.updateEntity);
			valid=ArticleValid.isValidUpdate();
		}else{
			res.status(200).send("Wrong data introduced");
		}
		console.log(valid);
		if(valid==""){
			if(req.body.password=="passwordput"){
				console.log('ID:', req.params.id);
				for (let i = 0; i < this.json.length; i++) {
				  	if(this.json[i].id==req.params.id && this.json[i]["@type"]==req.params.entity){
				  		this.json[i]=req.body.updateEntity;
				  		console.log(this.json[i]);
				  		fs.writeFile('data.json', JSON.stringify(this.json, undefined, 2), (err) => {
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
		}
	}

	getEntityId(req,res){
		let result;
		  console.log('ID:',req.params.id);
		  console.log('Entity:',req.params.entity);
		  for (let i = 0; i < this.json.length; i++) {
		  	if(this.json[i].id==req.params.id && this.json[i]["@type"]==req.params.entity){
		  		console.log(this.json[i]);
		  		result=this.json[i];
		  		console.log(req.headers["accept"]);
			  switch(req.headers["accept"]){
			  	case "application/json":
			  		res.header("Access-Control-Allow-Origin", "*");
			  		res.status(200).send(this.json[i]);
			  		break;
			  	case "text/html":
					 
			  		let result='<h1>Entity: '+ this.json[0]["@type"];

			  		if(this.json[i]["@type"] == "TVSeries"){
				  			let TVSerieIn=new TVSerie(this.json[i]);
			  				result+=TVSerieIn.getHTML();
					}else if(this.json[i]["@type"] == "Article"){

				  			let ArticleIn=new Article(this.json[i]);
			  				result+=ArticleIn.getHTML();
						  
					 }
			  		console.log(result);
			  		res.status(200).send(result);
			  		break;
			  	default:
			  		res.header("Access-Control-Allow-Origin", "*");
			  		res.status(200).send(this.json[i]);
			  }
		  		break;
		  	}
		  }
		  res.send("ID not found");
	}

	deleteEntityId(req,res){
		console.log('Entity:', req.params.entity);
		console.log('ID:', req.params.id);
		if(req.body.password=="passworddelete"){
		for (let i = 0; i < this.json.length; i++) {
		  	if(this.json[i].id==req.params.id && this.json[i]["@type"]==req.params.entity){
		  		//console.log(this.json[i]);
		  		this.json.splice(i, 1);
		  		console.log(this.json);
		  		fs.writeFile('data.json', JSON.stringify(this.json, undefined, 2), (err) => {
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
	}
	/*getAPI(req,res){
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
	}

	getEntityTVSeries(req,res){
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
		  
	}

	getEntityArticle(req,res){
		var listEntities=[];
				  console.log('Entity: Article');
				  for (let i = 0; i < this.json.length; i++) {
				  	if(this.json[i]["@type"]=="Article"){
				  		console.log(this.json[i]);
				  		listEntities.push(this.json[i]);
				  	}
				  }
				  res.setHeader("Access-Control-Allow-Origin", "*");
				  res.end(JSON.stringify(listEntities));
	}

	postEntity(req,res){
		var newEntity = '';

	    req.on('data', function(data) 
	    {
	        newEntity += data;
	    });
	    req.on('end', function() 
	    {  console.log(JSON.parse(newEntity,true));
			this.json.push(JSON.parse(newEntity));
		
		console.log(info);
		fs.writeFile('data.json', JSON.stringify(this.json, undefined, 2), (err) => {
		  if (err) throw err;
		  console.log('The file has been saved!');
		});
		res.end("Posted correctly");
	    });

		/*console.log(req.body.newEntity);
		try {
		    req.body.newEntity = JSON.parse(req.body.newEntity);
		  } catch (e) {
		    return res.status(200).send("Wrong data introduced");
		  }
		console.log(req.body.newEntity["@type"]);
		let valid=true;
		if(req.body.newEntity["@type"] == "TVSeries"){
			let TVSerieValid=new TVSerie(req.body.newEntity);
			valid=TVSerieValid.isValid();
		}else if(req.body.newEntity["@type"] == "TVSeries"){
			let ArticleValid=new Article(req.body.newEntity);
			valid=ArticleValid.isValid();
		}else{
			res.status(200).send("Wrong data introduced");
		}
		console.log(valid);
		if(valid==true){


		this.json.push(req.body.newEntity);
		
		console.log(this.json);
		fs.writeFile('data.json', JSON.stringify(this.json, undefined, 2), (err) => {
		  if (err) throw err;
		  console.log('The file has been saved!');
		});
		res.status(200).send("Posted correctly");
		}
		
	
	}

	putEntityId(req,res){
		if(req.body.password=="passwordput"){
			console.log('ID:', req.params.id);
			for (let i = 0; i < this.json.length; i++) {
			  	if(this.json[i].id==req.params.id && this.json[i]["@type"]==req.params.entity){
			  		this.json[i]=req.body.updateEntity;
			  		console.log(this.json[i]);
			  		fs.writeFile('data.json', JSON.stringify(this.json, undefined, 2), (err) => {
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
	}

	getEntityId(req,res){
		res.header("Access-Control-Allow-Origin", "*");
		  console.log('ID:',req.params.id);
		  console.log('Entity:',req.params.entity);
		  for (let i = 0; i < this.json.length; i++) {
		  	if(this.json[i].id==req.params.id && this.json[i]["@type"]==req.params.entity){
		  		console.log(this.json[i]);
		  		let result=this.json[i];
		  		res.status(200).send(result);
		  		break;
		  	}
		  }
	}

	deleteEntityId(req,res){
		console.log('Entity:', req.params.entity);
		console.log('ID:', req.params.id);
		if(req.body.password=="passworddelete"){
		for (let i = 0; i < this.json.length; i++) {
		  	if(this.json[i].id==req.params.id && this.json[i]["@type"]==req.params.entity){
		  		//console.log(this.json[i]);
		  		this.json.splice(i, 1);
		  		console.log(this.json);
		  		fs.writeFile('data.json', JSON.stringify(this.json, undefined, 2), (err) => {
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
	}*/
}

module.exports.Information=Information;