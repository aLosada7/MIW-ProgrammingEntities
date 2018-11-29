<?php

class TVSerie{

	function __construct($entity){
		$this->entity=$entity["@type"];
		$this->id=$entity["id"];
		$this->numberOfEpisodes=$entity["numberOfEpisodes"];
		$this->numberOfSeasons=$entity["numberOfSeasons"];
		$this->startDate=$entity["startDate"];
		$this->episode=$entity["episode"];
	}

	public function isValid($data){

		for ($i = 0; $i < sizeof($data); $i++) {
	          if($data[$i]["@type"] == $this->entity && $data[$i]["id"] == $this->id){
	              return "ID already exists";
	            }
	        }

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
}

class Episode extends TVSerie{
	function __construct($entity){
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
		$this->entity=$newEntity["@type"];
		$this->id=$newEntity["id"];
		$this->name=$newEntity["name"];
		$this->articleSection=$newEntity["articleSection"];
	}

	public function isValid($data){

		for ($i = 0; $i < sizeof($data); $i++) {
	          if($data[$i]["@type"] == $this->entity && $data[$i]["id"] == $this->id){
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
}


?>