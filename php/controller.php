<?php
require_once './validation.php';
class Operaciones{

	private $characters;

	function __construct(){
		$url = 'data.json'; // path to your JSON file
		$data = file_get_contents($url); // put the contents of the file into a variable
		$this->characters = json_decode($data,true); // decode the JSON feed
    $this->series=array();
    $this->articles=array();
    foreach ($this->characters as $valor) {
        if($valor["@type"] == "TVSeries"){
          //echo json_encode($valor);
          array_push($this->series, new TVSerie($valor));
        }else if($valor["@type"] == "Article"){
          //echo json_encode($valor);
          array_push($this->articles, new Article($valor));
        }
    }

    //print_r($this->characters);
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

      if($entity=="TVSeries"){
    	    foreach ($this->series as $valor) {
    	            array_push($listEntities, $valor->getJSON());
    	          
    	    }
      }else if ($entity=="Article") {

        foreach ($this->articles as $valor) {
                  array_push($listEntities, $valor->getJSON());
                
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
      if($entity=="TVSeries"){
          foreach ($this->series as $valor) {
            //print_r($valor->id);
                 if($valor->id == $id){
           
                    $res=$valor->getJSON();
                    break;
                  }
          }
                
          
      }else if ($entity=="Article") {

        foreach ($this->articles as $valor) {
                  if($valor->id == $id){
           
                    $res=$valor->getJSON();
                    break;
                  }
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
  		$var="";
  		
  		if($newEntity["@type"]=="TVSeries"){
        $TVSerie=new TVSerie($newEntity);
        //$var=$TVSerie->isValid($this->series);
        array_push($this->series, $TVSerie);
  			
  		}else{
  			$Article=new Article($newEntity);
        //$var=$Article->isValid($this->articles);
        if($var==""){
          array_push($this->articles, $Article);
        }
  		}
  		if($var == ""){
          
  			   $result=array();
      foreach ($this->series as $valor) {
            array_push($result, $valor->getJSON());
          }
       foreach ($this->articles as $valor) {
               array_push($result, $valor->getJSON());
          }
          file_put_contents('data.json', json_encode($result));
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
        if($entity=="TVSeries"){
          $i=0;
          foreach ($this->series as $valor) {
            //print_r($valor->id);
                 if($valor->id == $id){
                    array_splice($this->series, $i, 1);
                    break;
                  }
                  $i++;
          }
                
          
      }else if ($entity=="Article") {
          $i=0;
        foreach ($this->articles as $valor) {
                  if($valor->id == $id){
                    array_splice($this->articles, $i, 1);
                    break;
                  }
                  $i++;
          }
                
      }
      $result=array();
      foreach ($this->series as $valor) {
            array_push($result, $valor->getJSON());
          }
       foreach ($this->articles as $valor) {
               array_push($result, $valor->getJSON());
          }
          file_put_contents('data.json', json_encode($result));
          echo "Delete correctly";
		    
		 }else{
      echo "Wrong password";
     }
  	}

  	public function putEntityId($data,$entity,$id){
  		$characters=$this->characters;
      $var="";
      
      if($entity=="TVSeries"){
        $TVSerie=new TVSerie($data['updateEntity']);
        //$var=$TVSerie->isValidUpdate();
        foreach ($this->series as $valor) {
                  if($valor->id == $id){
                    $valor->update($TVSerie);
                    break;
                  }
          }
        
        
      }else{
        $Article=new Article($data['updateEntity']);
        //$var=$Article->isValidUpdate();
        foreach ($this->articles as $valor) {
                  if($valor->id == $id){
                    $valor->update($Article);
                    break;
                  }
          }
      }
      if($var == ""){
    		if($data['password'] == "passwordput"){
  	       $result=array();
          foreach ($this->series as $valor) {
                array_push($result, $valor->getJSON());
              }
           foreach ($this->articles as $valor) {
                   array_push($result, $valor->getJSON());
              }
          file_put_contents('data.json', json_encode($result));
          echo "Updated successfully";
        }else{
           echo "Wrong data introduced";
        }
	    }else{
        echo "Wrong id";
      }
  	}

}

?>