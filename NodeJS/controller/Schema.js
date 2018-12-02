//Clases TVSerie, Episode, Article
class TVSerie{
	constructor(entity){
		this.context=entity["@context"];
		this.entity=entity["@type"];
		this.id=entity["id"];
		this.numberOfEpisodes=entity["numberOfEpisodes"];
		this.numberOfSeasons=entity["numberOfSeasons"];
		this.startDate=entity["startDate"];
		this.episode=[];
		if(entity["episode"] != undefined){
			let eps=entity["episode"]
			if(eps.length==undefined){
				this.episode.push(new Episode(eps["@type"],eps["episodeNumber"]));
				console.log(this.episode[0].entity);
			}else{
				for (let i = 0; i < eps.length; i++) {
				  	this.episode.push(new Episode(eps[i]["@type"],eps[i]["episodeNumber"]));
				  }
			}
		}

	}

	isvalidId(series){
		for (var i = 0; i < series.length; i++) {
			if(series[i].id==this.id){
				return "Id already exists";
			}
		}
		return "";
	}

	isValid(){
		if(this.context != "http://schema.org"){
			return "Wrong schema introduced";
		}
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
				let validEpisode="";
				for(let i=0;i<this.episode.length;i++){
					validEpisode=this.episode[i].isValid();
					if(validEpisode!="")
						return validEpisode;
				}
			
		}
		return "";

	}

	getHTML(){
		let result='<h2>ID: '+this.id+'</h2><p>Num episodios: '+this.numberOfEpisodes+'</p><p>Num temporadas: '+this.numberOfSeasons+'</p>';
		result+='<p>Start Date: '+this.numberOfEpisodes+'</p>';
		if(this.episode!=undefined){
			for(let i=0;i<this.episode.length;i++){
				result+=this.episode[i].getHTML();
			}
		}
			
		return result;
	}

	getJSON(){
		let result=({
                    '@context': this.context,
                    '@type': this.entity,
                    'id': this.id,
                    'numberOfEpisodes': this.numberOfEpisodes,
                    'numberOfSeasons': this.numberOfSeasons,
                    'startDate':this.startDate
                })
		if(this.episode.length!=0){
			console.log("aquiiii");
			console.log(this.episode[0]);
			console.log(this.episode[0].entity);
			if(this.episode.length==1){
				result['episode']=({
                    '@type': this.episode[0].entity,
                    'episodeNumber': this.episode[0].episodeNumber
                }
                )
			}else{
				let vect=[];
				for (var i = 0; i < this.episode.length; i++) {
					vect.push(({
                    '@type': this.episode[i].entity,
                    'episodeNumber': this.episode[i].episodeNumber
                }))
					
				}
				console.log(vect);
				result['episode']=vect;

			}
		}
		return result;
		
		
	}

	updateEntity(up_entity){
		this.id = up_entity.id
        this.numberOfEpisodes = up_entity.numberOfEpisodes;
        this.numberOfSeasons = up_entity.numberOfSeasons;
        this.startDate = up_entity.startDate;
        if(this.episode!=undefined){
	        for(let i=0;i<this.episode.length;i++){
	        	this.episode[i].episodeNumber=up_entity.episode[i].episodeNumber;
	        }
	    }
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
		this.context=entity["@context"];
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

	getJSON(){
		let result=({
                    '@context': this.context,
                    '@type': this.entity,
                    'id': this.id,
                    'name': this.name,
                    'articleSection':this.articleSection
                })
		return result;
	}

	updateEntity(up_entity){
		this.id = up_entity.id
        this.name = up_entity.name;
        this.articleSection = up_entity.articleSection;
	}
}

module.exports.TVSerie=TVSerie;
module.exports.Article=Article;