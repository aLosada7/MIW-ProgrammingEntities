<?php

class TVSerie{

	function __construct($entity){
		$this->entity=$entity["@type"];
		$this->id=$entity["id"];
		$this->numberOfEpisodes=$entity["numberOfEpisodes"];
		$this->numberOfSeasons=$entity["numberOfSeasons"];
		$this->startDate=$entity["startDate"];
		//$this->episode=$entity["episode"];
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
  		return "";
	}

	public function isValidUpdate(){
		if(!is_int($this->numberOfEpisodes) || !is_int($this->numberOfSeasons)  || $this->startDate == ""){
  				return false;
  			}
  		return "";
	}

	public function getHTML(){
		$result='<h2>ID: '.$this->id.'</h2><p>Num episodios: '.$this->numberOfEpisodes.'</p><p>Num temporadas: '.$this->numberOfSeasons.'</p>';
		$result=$result.'<p>'.$this->startDate.'</p>';
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
		if($this->name == "" || $this->articleSection == ""){
  				return false;
  			}
  		return true;
	}

	public function getHTML(){
		$result='<h2>ID: '.$this->id.'</h2><p>Name: '.$this->name.'</p><p>Article section: '.$this->articleSection.'</p>';
		return $result;
	}
}


?>