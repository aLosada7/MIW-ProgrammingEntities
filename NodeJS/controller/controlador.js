const fs = require('fs');
const TVSerie=require('./Schema.js').TVSerie;
const Article=require('./Schema.js').Article;


class Information{

	constructor(data){
		this.json=JSON.parse(data);
		this.series =[];
		this.articles=[];
		for(let i=0; i < this.json.length;i++){
			if(this.json[i]["@type"]=="TVSeries"){
				this.series.push(new TVSerie(this.json[i]));
			}else if(this.json[i]["@type"]=="Article"){
				this.articles.push(new Article(this.json[i]));
			}
		}

		for(let i=0; i < this.series.length;i++){
			console.log(this.series[i]);
		}
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
		var listEntities=[];
		  console.log('Entity:', req.params.entity);
		if(req.params.entity=="TVSeries"){
			for (let i = 0; i < this.series.length; i++) {
			  	if(this.series[i].entity==req.params.entity){
			  		console.log(this.series[i]);
			  		listEntities.push(this.series[i]);
			  	}
			  }
		}else if(req.params.entity=="Article"){
			for (let i = 0; i < this.articles.length; i++) {
			  	if(this.articles[i].entity==req.params.entity){
			  		console.log(this.articles[i]);
			  		listEntities.push(this.articles[i]);
			  	}
			  }
		}
		  console.log("aqui");
		  console.log(req.headers["accept"]);
		  
		  switch(req.headers["accept"]){
		  	case "application/json":
		  		res.header("Access-Control-Allow-Origin", "*");
		  		let resultJSON=[];
		  		for (let i = 0; i < listEntities.length; i++) {
			  			//let TVSerieIn=new TVSerie(listEntities[i]);
			  			resultJSON.push(listEntities[i].getJSON());
					  }
		  		res.status(200).send(resultJSON);
		  		break;
		  	case "text/html":
				 
		  		let result='<h1>Entity: '+ listEntities[0].entity+'</h1>';

		  		
			  		for (let i = 0; i < listEntities.length; i++) {
			  			//let TVSerieIn=new TVSerie(listEntities[i]);
			  			result+=listEntities[i].getHTML();
					  }
				 
		  		console.log(result);
		  		res.status(200).send(result);
		  		break;
		  	
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
		let TVSerieValid=""; let ArticleValid="";
		if(req.body.newEntity["@type"] == "TVSeries"){
			TVSerieValid=new TVSerie(req.body.newEntity);
			valid=TVSerieValid.isvalidId(this.series);
			if(valid==""){
				valid=TVSerieValid.isValid();
			}
		}else if(req.body.newEntity["@type"] == "Article"){
			ArticleValid=new Article(req.body.newEntity);
			valid=ArticleValid.isvalidId(this.articles);
			if(valid==""){
				valid=ArticleValid.isValid();
			}
		}else{
			res.status(200).send("Wrong data introduced");
		}
		console.log(valid);
		if(valid==""){

			if(req.body.newEntity["@type"] == "TVSeries"){
				this.series.push(TVSerieValid);
			}else if(req.body.newEntity["@type"] == "Article"){
				this.articles.push(ArticleValid);
			}
			let guardar=[];
			for (let i = 0; i < this.series.length; i++) {
				guardar.push(this.series[i].getJSON());
			}
			for (let i = 0; i < this.articles.length; i++) {
				guardar.push(this.articles[i].getJSON());
			}
			
			console.log(guardar);
			fs.writeFile('./model/data.json', JSON.stringify(guardar, undefined, 2), (err) => {
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
		let TVSerieValid=""; let ArticleValid="";
		if(req.params.entity == "TVSeries"){
			TVSerieValid=new TVSerie(req.body.updateEntity);
			valid=TVSerieValid.isValid();
		}else if(req.params.entity == "Article"){
			ArticleValid=new Article(req.body.updateEntity);
			valid=ArticleValid.isValid();
		}else{
			res.status(200).send("Wrong data introduced");
		}
		console.log(valid);
		if(valid==""){
			if(req.body.password=="passwordput"){
				console.log('ID:', req.params.id);
				if(req.params.entity == "TVSeries"){
					for (let i = 0; i < this.series.length; i++) {
					  	if(this.series[i].id==req.params.id){
					  		this.series[i].updateEntity(TVSerieValid);
					  		break;
					  	}
					 }
				}else if(req.params.entity == "Article"){
					for (let i = 0; i < this.articles.length; i++) {
					  	if(this.articles[i].id==req.params.id){
					  		this.articles[i].updateEntity(ArticleValid);
					  		break;
					  	}
					 }
				}

				let guardar=[];
				for (let i = 0; i < this.series.length; i++) {
					guardar.push(this.series[i].getJSON());
				}
				for (let i = 0; i < this.articles.length; i++) {
					guardar.push(this.articles[i].getJSON());
				}
			
				console.log(guardar);
				fs.writeFile('./model/data.json', JSON.stringify(guardar, undefined, 2), (err) => {
				  if (err) throw err;
				  console.log('The file has been saved!');
				});
				res.send("Updated succesfully");
				  
		  	}else{
				res.send("Incorrect password");
			}
		}
	}

	getEntityId(req,res){
		let result="";
		  console.log('ID:',req.params.id);
		  console.log('Entity:',req.params.entity);
		  let obj;
		  if(req.params.entity=="TVSeries"){
			for (let i = 0; i < this.series.length; i++) {
			  	if(this.series[i].id==req.params.id){
			  		console.log(this.series[i]);
			  		result=this.series[i];
			  		break;
			  	}
			  }
		}else if(req.params.entity=="Article"){
			for (let i = 0; i < this.articles.length; i++) {
			  	if(this.articles[i].id==req.params.id){
			  		result=this.articles[i];
			  		break;
			  	}
			  }
		}
		if(result==""){
			console.log("aqui");
			res.send("Wrong id introduced");
			return;
		}
		 
		  	console.log(result);
		  	console.log(req.headers["accept"]);
		  switch(req.headers["accept"]){
		  	case "application/json":
		  		console.log("aaaaaa"+result);
		  		res.header("Access-Control-Allow-Origin", "*");
		  		res.status(200).send(result.getJSON());
		  		break;
		  	case "text/html":
		  		let html="";
		  		html='<h1>Entity: '+ result["@type"];
		  		html+=result.getHTML();
		  		console.log(result);
		  		res.status(200).send(html);
		  		break;
		  }
		
		  	
		  
	}

	deleteEntityId(req,res){
		console.log('Entity:', req.params.entity);
		console.log('ID:', req.params.id);
		if(req.body.password=="passworddelete"){
		if(req.params.entity=="TVSeries"){
			for (let i = 0; i < this.series.length; i++) {
			  	if(this.series[i].id==req.params.id){
			  		console.log(this.series[i]);
			  		this.series.splice(i, 1);
			  		break;
			  	}
			}
		}else if(req.params.entity=="Article"){
			for (let i = 0; i < this.articles.length; i++) {
			  	if(this.articles[i].id==req.params.id){
			  		this.articles.splice(i, 1);
			  		break;
			  	}
			  }
		}
		let guardar=[];
			for (let i = 0; i < this.series.length; i++) {
				guardar.push(this.series[i].getJSON());
			}
			for (let i = 0; i < this.articles.length; i++) {
				guardar.push(this.articles[i].getJSON());
			}
			
			console.log(guardar);
			fs.writeFile('./model/data.json', JSON.stringify(guardar, undefined, 2), (err) => {
			  if (err) throw err;
			  console.log('The file has been saved!');
			});
		res.send("Delte corrrectly");
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