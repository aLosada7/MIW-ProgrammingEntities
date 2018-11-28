<?php
class Operaciones{

	private $characters;

	function __construct(){
		$url = 'data.json'; // path to your JSON file
		$data = file_get_contents($url); // put the contents of the file into a variable
		$this->characters = json_decode($data,true); // decode the JSON feed
	}

  	public function getAPI(){
  		$language=substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2);
	      if($language=="es"){
	        $urlInformationEs = 'informacion.html'; // path to your JSON file
	        return file_get_contents($urlInformationEs);
	      }else{
	        $urlInformationEn = 'information.html'; // path to your JSON file
	        return file_get_contents($urlInformationEn);
	      }
  	}

  	public function getEntity($entity){
  		$characters=$this->characters;
  		$listEntities=array();
	    foreach ($characters as $valor) {
	          if($valor["@type"] == $entity){
	            //echo json_encode($valor);
	            array_push($listEntities, $valor);
	          }
	    }
	    return json_encode($listEntities);
  	}

  	public function getEntityId($entity,$id){
  		$characters=$this->characters;
  		$res="";
  		foreach ($characters as $valor) {
        //echo $valor["id"];
          if($valor["id"] == $id && $valor["@type"] == $entity){
           
            $res=json_encode($valor);
            break;
          }
      }
      if($res!=""){
      	echo $res;
      }else
      	echo "Wrong id introduced";
      //echo isset($id);
      //echo json_encode($data);
  	}

  	public function postEntity($newEntity){
  		$characters=$this->characters;
  		array_push($characters, $newEntity);
  		$var=true;
  		echo $var;
  		if($newEntity["@type"]=="TVSeries"){

  			if(!is_int($newEntity["numberOfEpisodes"]) || !is_int($newEntity["numberOfSeasons"])  || $newEntity["startDate"] == ""){
  				$var=false;
  			}
  			
  		}else{
  			if($newEntity["name"] == "" || $newEntity["articleSection"] == ""){
  				$var=false;
  			}
  		}
  		if($var == 1){
  			file_put_contents('data.json', json_encode($characters));
     	 echo "Posted correctly";
  		}else{
  			 echo "Wrong data introduced";
  		}
      	//print_r($characters);
      	//file_put_contents('data.json', json_encode($characters));
     	
  	}

  	public function deleteEntityId($data,$entity,$id){
  		$characters=$this->characters;
  		if($data['password'] == "passworddelete"){
		    for ($i = 0; $i < sizeof($characters); $i++) {
		        if($characters[$i]["@type"] == $entity && $characters[$i]["id"] == $id){
		            array_splice($characters, $i, 1);
		             file_put_contents('data.json', json_encode($characters));
		              echo "Delete correctly";
		             break;
		          }
		    }
		 }
  	}

  	public function putEntityId($data,$entity,$id){
  		$characters=$this->characters;
  		if($data['password'] == "passwordput"){
	      for ($i = 0; $i < sizeof($characters); $i++) {
	          if($characters[$i]["@type"] == $entity && $characters[$i]["id"] == $id){
	              $characters[$i]=$data['updateEntity'];
	               file_put_contents('data.json', json_encode($characters));
	               echo "Updated correctly";
	               break;
	            }
	        }
	    }
  	}

}

?>