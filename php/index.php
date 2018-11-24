<?php 
  $url = 'TVSeries.json'; // path to your JSON file
  $data = file_get_contents($url); // put the contents of the file into a variable
  $characters = json_decode($data,true); // decode the JSON feed
	header("Access-Control-Allow-Origin: *");
  //echo $_SERVER["REQUEST_URI"]


//echo $_GET['id'];

  if($_SERVER['REQUEST_METHOD']=="GET"){
    if($_SERVER["REQUEST_URI"] == "/"){
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
      //echo $separateURI[2];
      foreach ($characters as $valor) {
          if($valor->id == $separateURI[2]){
           
            echo json_encode($valor);
          }
      }
      //echo isset($id);
  		//echo json_encode($data);
    }
	}elseif($_SERVER['REQUEST_METHOD']=="POST"){
      print_r($_POST["newEntity"]);
      array_push($characters, $_POST["newEntity"]);
      print_r($characters);
      file_put_contents($url, json_encode($characters));
  }elseif($_SERVER['REQUEST_METHOD']=="DELETE"){
    print("Hola mundo");
    for ($i = 0; $i < sizeof($characters); $i++) {
        if($characters[i]["@type"] == $_POST["entity"] && $characters[i]->id){
            //echo json_encode($valor);
          print_r("hola");
             array_splice($characters, i, 1);
             file_put_contents($url, json_encode($characters));
          }
    }
    /*foreach ($characters as $valor) {
          if($valor["@type"] == $_POST["entity"] && $valor->id){
            //echo json_encode($valor);
             array_splice($characters, $value, 1);
             file_put_contents($url, json_encode($characters));
          }
      }*/
  }
?>