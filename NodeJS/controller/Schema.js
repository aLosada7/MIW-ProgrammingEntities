class TVSerie{
	constructor(entity){
		this.entity=entity["@type"];
		this.id=entity["id"];
		this.numberOfEpisodes=entity["numberOfEpisodes"];
		this.numberOfSeasons=entity["numberOfSeasons"];
		this.startDate=entity["startDate"];
		this.episode=entity["episode"];

	}

	isValid(data){
		console.log(data);
		for (let i = 0; i < data.length; i++) {
		  	if(data[i].id==this.id && data[i]["@type"]==this.entity){
		  		console.log("ID already exists");
		  		return "ID already exists";
		  	}
		  }
		  	console.log(this.startDate);
  		if(this.numberOfEpisodes == 0 || !this.numberOfEpisodes){
			return "Wrong numberOfEpisodes introduced";
		}
		if(this.numberOfSeasons == 0 || !this.numberOfSeasons){
			return "Wrong numberOfSeasons introduced";
		}
		if(this.startDate == "" || this.startDate=="date" || !this.startDate){
			return "Wrong startDate introduced";
		}
		console.log("aqui" + this.episode);
		if(this.episode==undefined){
				console.log("no episode");
  			
		}else{
			console.log(this.episode.length);
			let episode;
			let validEpisode="";
			if(this.episode.length==1){
				episode=new Episode(this.episode["@type"],this.episode["episodeNumber"]);
				validEpisode=episode.isValid();
				if(validEpisode!="")
					return validEpisode;	
			}else{
					for(let i=0;i<this.episode.length;i++){
					episode=new Episode(this.episode[i]["@type"],this.episode[i]["episodeNumber"]);
					console.log("aqui" + this.episode[i]["@type"]);
					console.log("aqui" + this.episode[i]["episodeNumber"]);
					validEpisode=episode.isValid();
					if(validEpisode!="")
						return validEpisode;
				}
			}
		}
		return "";

	}


	isValidUpdate(data){
  		if(this.numberOfEpisodes == 0 || !this.numberOfEpisodes){
			return "Wrong numberOfEpisodes introduced";
		}
		if(this.numberOfSeasons == 0 || !this.numberOfSeasons){
			return "Wrong numberOfSeasons introduced";
		}
		if(this.startDate == "" || this.startDate=="date" || !this.startDate){
			return "Wrong startDate introduced";
		}
		console.log("aqui" + this.episode);
		if(this.episode==undefined){
				console.log("no episode");
  			
		}else{
			console.log(this.episode.length);
			let episode;
			let validEpisode="";
			if(this.episode.length==1){
				episode=new Episode(this.episode["@type"],this.episode["episodeNumber"]);
				validEpisode=episode.isValid();
				if(validEpisode!="")
					return validEpisode;	
			}else{
					for(let i=0;i<this.episode.length;i++){
					episode=new Episode(this.episode[i]["@type"],this.episode[i]["episodeNumber"]);
					console.log("aqui" + this.episode[i]["@type"]);
					console.log("aqui" + this.episode[i]["episodeNumber"]);
					validEpisode=episode.isValid();
					console.log(validEpisode);
					if(validEpisode!="")
						return validEpisode;
				}
			}
		}
		return "";
	}

	getHTML(){
		let result='<h2>ID: '+this.id+'</h2><p>Num episodios: '+this.numberOfEpisodes+'</p><p>Num temporadas: '+this.numberOfSeasons+'</p>';
		result+='<p>Start Date: '+this.numberOfEpisodes+'</p>';
		if(this.episode!=undefined){
			console.log(this.episode.length);
		if(this.episode.length==undefined){
				console.log("aqui");
				let episode=new Episode(this.episode["@type"],this.episode["episodeNumber"]);
				result+=episode.getHTML();	
			}else{
					for(let i=0;i<this.episode.length;i++){
					let episode=new Episode(this.episode[i]["@type"],this.episode[i]["episodeNumber"]);
					console.log("aqui" + this.episode[i]["@type"]);
					console.log("aqui" + this.episode[i]["episodeNumber"]);
					result+=episode.getHTML();
				}
			}
		}
		return result;
	}
}


class Episode extends TVSerie{
		constructor(entity,episodeNumber){
			super(entity);
			this.entity=entity;
			this.episodeNumber=episodeNumber;
		}
		isValid(){
			console.log(this.episodeNumber);
			if(this.entity != "Episode"){
				return "Wrong type introduced";
			}
			if(this.episodeNumber == 0 || !this.episodeNumber){
				return "Wrong episodeNumber introduced";
			}
			return "";
			
		
		}
		getHTML(){
			let result='<h3>'+this.entity+': '+this.episodeNumber+'</h3>';
			return result;
		}
}

class Article{
	constructor(entity){
		this.entity=entity["@type"];
		this.id=entity["id"];
		this.name=entity["name"];
		this.articleSection=entity["articleSection"];
	}

	isValid(data){
		console.log(data);
		for (let i = 0; i < data.length; i++) {
		  	if(data[i].id==this.id && data[i]["@type"]==this.entity){
		  		console.log("ID already exists");
		  		return "ID already exists";
		  	}
		  }
		if(this.name == "" || !this.name){
			return "Wrong name introduced";
		}
		if(this.articleSection == "" || !this.articleSection){
			return "Wrong articleSection introduced";
		}
		return "";
	}
	isValidUpdate(data){
		console.log(data);
		if(this.name == "" || !this.name){
			return "Wrong name introduced";
		}
		if(this.articleSection == "" || !this.articleSection){
			return "Wrong articleSection introduced";
		}
		return "";
	}

	getHTML(){
		let result='<h2>ID: '+this.id+'</h2><p>Title: '+this.name+'</p><p>Category: '+this.articleSection+'</p>';
		return result;				 
	}
}

module.exports.TVSerie=TVSerie;
module.exports.Article=Article;