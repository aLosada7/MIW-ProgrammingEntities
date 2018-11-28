<?php 
  require_once './TVSerie.php';
  require_once './controller.php';
  $res=new Operaciones();

	header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
  //echo $_SERVER["REQUEST_URI"]


//echo $_GET['id'];

  if($_SERVER['REQUEST_METHOD']=="GET"){
    if($_SERVER["REQUEST_URI"] == "/"){
      echo $res->getAPI();
    }elseif($_SERVER["REQUEST_URI"] == "/TVSeries") { //means getentity
      echo $res->getEntity("TVSeries");
    }elseif($_SERVER["REQUEST_URI"] == "/Article"){
        echo $res->getEntity("Article");
    }else{ //means getid
      $separateURI = explode("/", $_SERVER["REQUEST_URI"]);
      echo $res->getEntityId($separateURI[1],$separateURI[2]);
    }
	}elseif($_SERVER['REQUEST_METHOD']=="POST"){
    echo $res->postEntity($_POST["newEntity"]);
  }elseif($_SERVER['REQUEST_METHOD']=="DELETE"){
    $separateURI = explode("/", $_SERVER["REQUEST_URI"]);
    parse_str(file_get_contents("php://input"),$post_vars);
    echo $res->deleteEntityId($post_vars,$separateURI[1],$separateURI[2]);
  }elseif($_SERVER['REQUEST_METHOD']=="PUT"){
    $separateURI = explode("/", $_SERVER["REQUEST_URI"]);
    parse_str(file_get_contents("php://input"),$post_vars);
    echo $res->putEntityId($post_vars,$separateURI[1],$separateURI[2]);
  }
?>