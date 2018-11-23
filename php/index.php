<?php 
  $url = 'TVSeries.json'; // path to your JSON file
  $data = file_get_contents($url); // put the contents of the file into a variable
  $characters = json_decode($data); // decode the JSON feed
	header("Access-Control-Allow-Origin: *");
  //echo $_SERVER["REQUEST_URI"]


//echo $_GET['id'];

  if($_SERVER['REQUEST_METHOD']=="GET"){
    if($_SERVER["REQUEST_URI"] == "/getEntity/TVSeries") { //means getentity
       echo $data;
    }elseif($_SERVER["REQUEST_URI"] == "/getEntity/Episode"){
    }elseif($_SERVER["REQUEST_URI"] == "/getEntity/Movie"){
    }else{ //means getid
      foreach ($characters as $valor) {
        
          if($valor->id == $_GET['id']){
           
            echo json_encode($valor);
          }
      }
      //echo isset($id);
  		//echo json_encode($data);
    }
	}elseif($_SERVER['REQUEST_METHOD']=="POST"){

  }elseif($_SERVER['REQUEST_METHOD']=="PUT")
?>