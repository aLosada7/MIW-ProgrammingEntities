<?php 
  $url = 'data.json'; // path to your JSON file
  $data = file_get_contents($url); // put the contents of the file into a variable
  $characters = json_decode($data,true); // decode the JSON feed
	header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
  //echo $_SERVER["REQUEST_URI"]


//echo $_GET['id'];

  if($_SERVER['REQUEST_METHOD']=="GET"){
    if($_SERVER["REQUEST_URI"] == "/"){
      $language=substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2);
      if($language=="es"){
        $urlInformationEs = 'informacion.html'; // path to your JSON file
        echo file_get_contents($urlInformationEs);
      }else{
        $urlInformationEn = 'information.html'; // path to your JSON file
        echo file_get_contents($urlInformationEn);
      }
    }elseif($_SERVER["REQUEST_URI"] == "/TVSeries") { //means getentity
      $listEntities=array();
      foreach ($characters as $valor) {
          if($valor["@type"] == "TVSeries"){
            //echo json_encode($valor);
            array_push($listEntities, $valor);
          }
      }
      echo json_encode($listEntities);
    }elseif($_SERVER["REQUEST_URI"] == "/Article"){
        $listEntities=array();
      foreach ($characters as $valor) {
          if($valor["@type"] == "Article"){
            //echo json_encode($valor);
            array_push($listEntities, $valor);
          }
      }
      echo json_encode($listEntities);
    }else{ //means getid
      $separateURI = explode("/", $_SERVER["REQUEST_URI"]);
      //echo $separateURI[0];
      //echo $separateURI[2];
      foreach ($characters as $valor) {
        //echo $valor["id"];
          if($valor["id"] == $separateURI[2] && $valor["@type"] == $separateURI[1]){
           
            echo json_encode($valor);
            break;
          }
      }
      //echo isset($id);
  		//echo json_encode($data);
    }
	}elseif($_SERVER['REQUEST_METHOD']=="POST"){
      array_push($characters, $_POST["newEntity"]);
      print_r($characters);
      file_put_contents($url, json_encode($characters));
      echo "Posted correctly";
  }elseif($_SERVER['REQUEST_METHOD']=="DELETE"){
   $separateURI = explode("/", $_SERVER["REQUEST_URI"]);
   parse_str(file_get_contents("php://input"),$post_vars);
    if($post_vars['password'] == "passworddelete"){
    for ($i = 0; $i < sizeof($characters); $i++) {
        if($characters[$i]["@type"] == $separateURI[1] && $characters[$i]["id"] == $separateURI[2]){
            array_splice($characters, $i, 1);
             file_put_contents($url, json_encode($characters));
              echo "Delete correctly";
             break;
          }
    }
  }
    /*foreach ($characters as $valor) {
          if($valor["@type"] == $_POST["entity"] && $valor->id){
            //echo json_encode($valor);
             array_splice($characters, $value, 1);
             file_put_contents($url, json_encode($characters));
          }
      }*/
  }elseif($_SERVER['REQUEST_METHOD']=="PUT"){
    $separateURI = explode("/", $_SERVER["REQUEST_URI"]);
    parse_str(file_get_contents("php://input"),$post_vars);
    if($post_vars['password'] == "passwordput"){
      for ($i = 0; $i < sizeof($characters); $i++) {
          if($characters[$i]["@type"] == $separateURI[1] && $characters[$i]["id"] == $separateURI[2]){
              $characters[$i]=$post_vars['updateEntity'];
               file_put_contents($url, json_encode($characters));
               echo "Updated correctly";
               break;
            }
        }
    }
  }
?>