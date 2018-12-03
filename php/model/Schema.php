<?php
//Clases TVSerie, Episode, Article
class TVSerie{

	function __construct($entity){
		$this->context=$entity["@context"];
		$this->entity=$entity["@type"];
		$this->id=$entity["id"];
		$this->numberOfEpisodes=$entity["numberOfEpisodes"];
		$this->numberOfSeasons=$entity["numberOfSeasons"];
		$this->startDate=$entity["startDate"];
		$this->episode=$entity["episode"];
		//$this->episode=array();
		/*if(isset($entity["episode"])){
			if(isset($entity["episode"]["@type"])){
				array_push($this->episode,new Episode($entity["episode"]));
			}else{
				foreach($entity["episode"] as $valor){
					array_push($this->episode,new Episode($valor));
				}
			}
		}*/
	}

	public function isValid($series){
		foreach ($series as $valor) {
            if($valor->id == $this->id){
	              return "ID already exists";
	            }
          }

		if($this->numberOfEpisodes == 0 || $this->numberOfEpisodes=="integer"){
  				return "Wrong numberOfEpisodes introduced";
  		}
  		if($this->numberOfSeasons == 0 || $this->numberOfSeasons=="integer"){
  				return "Wrong numberOfSeasons introduced";
  		}
  		if($this->startDate == "" || $this->startDate == "date"){
  				return "Wrong startDate introduced";
  		}
  		return "";
  		print_r("aAAAAA");
  		if(isset($this->episode)){
  			$validEpisode="";
			if($this->episode["@type"] != "Episode"){
			foreach ($this->episode as $valor) {
	              $Episode=new Episode($valor);
	        		$validEpisode=$Episode->isValid($characters);
	              if($validEpisode!="")
					return $validEpisode;
	              
	            }
	        }else {
	        	 $Episode=new Episode(array("@type" => $this->episode["@type"], "episodeNumber" => $this->episode["episodeNumber"]));
	        	$validEpisode=$Episode->isValid($characters);
	        	if($validEpisode!="")
					return $validEpisode;
	        }
	    }
	    print_r("aAAAAA");
  		return "";
	}

	public function isValidUpdate(){
		if($this->numberOfEpisodes == 0){
  				return "Wrong numberOfEpisodes introduced";
  		}
  		if($this->numberOfSeasons == 0){
  				return "Wrong numberOfSeasons introduced";
  		}
  		if($this->startDate == "" || $this->startDate == ""){
  			return "Wrong startDate introduced";
  		}

  		if(isset($this->episode)){
  			$validEpisode="";
			if($this->episode["@type"] != "Episode"){
			foreach ($this->episode as $valor) {
	              $Episode=new Episode($valor);
	        		$validEpisode=$Episode->isValidEpisode($characters);
	              if($validEpisode!="")
					return $validEpisode;
	              
	            }
	        }else {
	        	 $Episode=new Episode(array("@type" => $this->episode["@type"], "episodeNumber" => $this->episode["episodeNumber"]));
	        	$validEpisode=$Episode->isValidEpisode($characters);
	        	if($validEpisode!="")
					return $validEpisode;
	        }
	    }
  		return "";
	}

	public function getJSON(){
			if(isset($this->episode)){
				$result=array(
                    '@context'=> $this->context,
                    '@type'=> $this->entity,
                    'id'=> $this->id,
                    'numberOfEpisodes'=> $this->numberOfEpisodes,
                    'numberOfSeasons'=> $this->numberOfSeasons,
                    'startDate'=>$this->startDate,
                    'episode'=>$this->episode
                );
			}else{
				$result=array(
                    '@context'=> $this->context,
                    '@type'=> $this->entity,
                    'id'=> $this->id,
                    'numberOfEpisodes'=> $this->numberOfEpisodes,
                    'numberOfSeasons'=> $this->numberOfSeasons,
                    'startDate'=>$this->startDate
                );
			}
			return $result;
	}

	public function getHTML(){
		$result='<h2>ID: '.$this->id.'</h2><p>Num episodios: '.$this->numberOfEpisodes.'</p><p>Num temporadas: '.$this->numberOfSeasons.'</p>';
		$result=$result.'<p>'.$this->startDate.'</p>';
		if(isset($this->episode)){
			if($this->episode["@type"] != "Episode"){
			foreach ($this->episode as $valor) {
	              $Episode=new Episode($valor);
	        		$result.=$Episode->getHTML($characters);
	              
	              
	            }
	        }else {
	        	 $Episode=new Episode(array("@type" => $this->episode["@type"], "episodeNumber" => $this->episode["episodeNumber"]));
	        		$result.=$Episode->getHTML($characters);
	        }
	    }
		/*if(isset($this->episode)){
			for ($i = 0; $i < sizeof($this->episode); $i++) {
				$Episode=new TVSerie($this->episode[$i]);
        		$result.=$Episode->getHTML($characters);
			}
		}*/

		return $result;
  		
	}

	public function update($TVSerie){
		$this->id=$TVSerie->id;
		$this->numberOfEpisodes=$TVSerie->numberOfEpisodes;
		$this->numberOfSeasons=$TVSerie->numberOfSeasons;
		$this->startDate=$TVSerie->startDate;
		$this->episode=$TVSerie->episode;
	}
}

class Episode extends TVSerie{
	function __construct($entity){
		//print_r($entity);
		$this->entity=$entity["@type"];
		$this->episodeNumber=$entity["episodeNumber"];
	}

	public function isValidEpisode(){
		if($this->entity != "@Episode"){
  				return "Wrong entity introduced";
  		}
  		if($this->episodeNumber == 0){
  			return "Wrong episodeNumber introduced";
  		}
  		return "";
	}

	public function getHTML(){
		$result=$result.'<h3>'.$this->entity.': '.$this->episodeNumber.'</h3>';
		return $result;
	}
}


class Article{

	function __construct($newEntity){
		$this->context=$newEntity["@context"];
		$this->entity=$newEntity["@type"];
		$this->id=$newEntity["id"];
		$this->name=$newEntity["name"];
		$this->articleSection=$newEntity["articleSection"];
	}

	public function isValid($articles){

		foreach ($articles as $valor) {
            if($valor->id == $this->id){
	              return "ID already exists";
	            }
          }

		if($this->name == ""){
  				return "Wrong name introduced";
  		}
  		if($this->articleSection == ""){
  				return "Wrong articleSection introduced";
  		}
  		return "";
	}

	public function isValidUpdate(){
		if($this->name == ""){
  				return "Wrong name introduced";
  		}
  		if($this->articleSection == ""){
  				return "Wrong articleSection introduced";
  		}
  		return "";
	}

	public function getHTML(){
		$result='<h2>ID: '.$this->id.'</h2><p>Name: '.$this->name.'</p><p>Article section: '.$this->articleSection.'</p>';
		return $result;
	}
	public function getJSON(){
			$result=array(
                    '@context'=> $this->context,
                    '@type'=> $this->entity,
                    'id'=> $this->id,
                    'name'=> $this->name,
                    'articleSection'=> $this->articleSection
               );
			
			return $result;
	}

	public function update($TVSerie){
		$this->id=$TVSerie->id;
		$this->name=$TVSerie->name;
		$this->articleSection=$TVSerie->articleSection;
	}
}


?>