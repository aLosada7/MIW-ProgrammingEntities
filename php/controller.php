<?php
require_once './validation.php';
class Operaciones{

	private $characters;

	function __construct(){
		$url = 'data.json'; // path to your JSON file
		$data = file_get_contents($url); // put the contents of the file into a variable
		$this->characters = json_decode($data,true); // decode the JSON feed
    $series=array();
    $articles=array();
    foreach ($this->characters as $valor) {
            if($valor["@type"] == "TVSeries"){
              //echo json_encode($valor);
              array_push($series, new TVSerie($valor));
            }else if($valor["@type"] == "Articles"){
              //echo json_encode($valor);
              array_push($articles, new Article($valor));
            }
      }
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

      // $_SERVER['HTTP_ACCEPT'];
      
	    foreach ($characters as $valor) {
	          if($valor["@type"] == $entity){
	            //echo json_encode($valor);
	            array_push($listEntities, $valor);
	          }
	    }

      switch ($_SERVER['HTTP_ACCEPT']) {
        case 'application/json':
        //echo $_SERVER['HTTP_ACCEPT'];
          return json_encode($listEntities);
          break;
        case 'text/html':
          $result="<h1>Entity: ".$listEntities[0]["@type"]."</h1>";
     
          if($listEntities[0]["@type"] == "TVSeries"){
           foreach ($listEntities as $valor) {
              $TVSerie=new TVSerie($valor);
              $result.=$TVSerie->getHTML();
              
              
            }
         }else if($listEntities[0]["@type"] == "Article"){
          foreach ($listEntities as $valor) {
              $Article=new Article($valor);
              $result.=$Article->getHTML();
            }
         }
         return $result;
          break;
        default:
          return json_encode($listEntities);
      }
  	}

  	public function getEntityId($entity,$id){
  		$characters=$this->characters;
      $res="";
  		foreach ($characters as $valor) {
        //echo $valor["id"];
          if($valor["id"] == $id && $valor["@type"] == $entity){
           
            $res=$valor;
            break;
          }
      }
      if($res!=""){
        switch ($_SERVER['HTTP_ACCEPT']) {
          case 'application/json':
          //echo $_SERVER['HTTP_ACCEPT'];
            return json_encode($res);
            break;
          case 'text/html':
            $result='<h1>Entity: '.$res["@type"].'</h1>';

            if($res["@type"] == "TVSeries"){
              $TVSerie=new TVSerie($res);
              $result.=$TVSerie->getHTML();

           }else if($res["@type"] == "Article"){
    
                $Article=new Article($res);
              $result.=$Article->getHTML();
              
           }
           return $result;
            break;
            
          default:
            return json_encode($res);
        }
      	
      }else
      	echo "Wrong id introduced";
      //echo isset($id);
      //echo json_encode($data);
  	}

  	public function postEntity($newEntity){
      $characters=$this->characters;
  		$var="";
  		
  		if($newEntity["@type"]=="TVSeries"){
        $TVSerie=new TVSerie($newEntity);
        $var=$TVSerie->isValid($characters);
  			
  		}else{
  			$Article=new Article($newEntity);
        $var=$Article->isValid($characters);
  		}
  		if($var == ""){
          
          array_push($characters, $newEntity);
  			  file_put_contents('data.json', json_encode($characters));
     	    echo "Posted correctly";
  		}else{
  			 echo $var;
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
      $var="";
      
      if($entity=="TVSeries"){
        $TVSerie=new TVSerie($data['updateEntity']);
        $var=$TVSerie->isValidUpdate();
        
      }else{
        $Article=new Article($data['updateEntity']);
        $var=$Article->isValidUpdate();
      }
      if($var == ""){
    		if($data['password'] == "passwordput"){
  	      for ($i = 0; $i < sizeof($characters); $i++) {
  	          if($characters[$i]["@type"] == $entity && $characters[$i]["id"] == $id){
  	              $characters[$i]=$data['updateEntity'];
  	               file_put_contents('data.json', json_encode($characters));
  	               echo "Updated correctly";
  	               break;
  	            }
  	        }
        }else{
           echo "Wrong data introduced";
        }
	    }
  	}

}

?>