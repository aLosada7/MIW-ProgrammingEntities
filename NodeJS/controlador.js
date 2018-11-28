class Information{

	constructor($data){
		this.json=JSON.parse($data);
	}

	getEntity(req,res){
		var listEntities=[];
		  console.log('Entity:', req.params.entity);
		  for (let i = 0; i < this.json.length; i++) {
		  	if(this.json[i]["@type"]==req.params.entity){
		  		console.log(this.json[i]);
		  		listEntities.push(this.json[i]);
		  	}
		  }
		  res.header("Access-Control-Allow-Origin", "*");
		  res.status(200).send(listEntities);
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
}

module.exports.Information=Information;