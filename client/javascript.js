 var action=0;
   var idGlobal=0;
  var entityGlobal=0;
$(document).ready(function(){

$('select').on('change', function() {
  //alert( this.value );
  if(this.value=="TVSeries"){
    var obj={
      "@context": "http://schema.org",
      "@type": "TVSeries",
      "id":"0",
      "numberOfEpisodes":"integer",
      "numberOfSeasons": "integer",
      "startDate":"date",
      "episode": {
          "@type": "Episode",
          "episodeNumber": "integer"
        }
      }
      
  }else if(this.value == "Article"){
    var obj={
      "@context": "http://schema.org",
      "@type": "Article",
      "id": "0",
      "name": "string",
      "articleSection": "string"
    }
    }
     var pretty = JSON.stringify(obj, undefined, 2);
     var ugly = document.getElementById('jsonpost').value;
      document.getElementById('jsonpost').value = pretty;
});



    $("#panelExecution").hide();
    $("#showHTML").hide();
    $('#getEntitys').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").show();
      $("#selectEntityParameter").hide();
      $("#selectIDParameter"
        ).hide();
      $("#createParameters").hide();
      $("#editParameters").hide();
      $("#typeAnswer").hide();
      $("#typeAnswerJson").hide();
      $("#typeAnswerHtml").show();
      $("#jsonput").hide();

      action=1;
    })
    $('#getEntity').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").hide();
      $("#createParameters").hide();
      $("#editParameters").hide();
            $("#typeAnswer").show();
      $("#typeAnswerJson").hide();
      $("#typeAnswerHtml").hide();
      $("#jsonput").hide();
      action=2;
    })
    $('#postEntity').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").hide();
      $("#createParameters").show();
      $("#editParameters").hide();
            $("#typeAnswer").hide();
      $("#typeAnswerJson").show();
      $("#typeAnswerHtml").hide();
      $("#jsonput").hide();
      var obj={
      "@context": "http://schema.org",
      "@type": "TVSeries",
      "id":"0",
      "numberOfEpisodes":"integer",
      "numberOfSeasons": "integer",
      "startDate":"date",
      "episode": {
          "@type": "Episode",
          "episodeNumber": "integer"
        }
      };
      var pretty = JSON.stringify(obj, undefined, 2);
     var ugly = document.getElementById('jsonpost').value;
      document.getElementById('jsonpost').value = pretty;
      action=3;
    })
    $('#putEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").show();
      $("#createParameters").hide();
      $("#editParameters").hide();
            $("#typeAnswer").hide();
      $("#typeAnswerJson").show();
      $("#typeAnswerHtml").hide();
      $("#jsonput").hide();
      action=4;
    })
    $('#getEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").show();
      $("#createParameters").hide();
      $("#editParameters").hide();
            $("#typeAnswer").show();
      $("#typeAnswerJson").hide();
      $("#typeAnswerHtml").hide();
      $("#jsonput").hide();
      action=5;
    })
    $('#deleteEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").show();
      $("#createParameters").hide();
      $("#editParameters").hide();
            $("#typeAnswer").hide();
      $("#typeAnswerJson").show();
      $("#typeAnswerHtml").hide();
      $("#jsonput").hide();
      action=6;
    })
})

function processForm(){
  var operacion=new operaciones();
  var server=document.getElementById("server").value;
  var locationServer="";
  var answer=document.getElementById("typeAnswer").value;
  console.log(server + " " + answer + " " + action);
  switch(server){
    case "NodeJS":
    locationServer="http://156.35.95.85:8081";
      console.log(locationServer);
      break;
    case "PHP":
      locationServer="http://156.35.95.85:8082";
      console.log(locationServer);
      break;
    case "Phyton":
      locationServer="http://156.35.95.85:8083";
      console.log(locationServer);
      break;
  }
  switch(action){
    case 1:
      operacion.getEntities(locationServer);
      break;
    case 2:
      var entity=$('#entitySelected').val();
      console.log(entity);
      operacion.getEntity(locationServer,server,answer,entity);
      break;

    case 3:
    console.log($('#jsonpost').val());
    var entity=$('#entitySelected').val();
    if(server=="PHP")
      var post=JSON.parse($('#jsonpost').val());
    else
      var post=$('#jsonpost').val();
      console.log(post);
      operacion.postEntity(locationServer,entity,post);
      break;
    case 4:
      var id=$('#IDSelected').val();
      idGlobal=id;
      var entity=$('#entitySelected').val();
      entityGlobal=entity;
      operacion.getEditData(locationServer,id,entity);
      action=7;
      break;
    case 5:
      var id=$('#IDSelected').val();
       var entity=$('#entitySelected').val();
      console.log(id);
      operacion.getEntityID(locationServer,server,answer,id,entity);
      break;
    case 6:
      let password = prompt("Introduce your password for deleting an Entity","passworddelete");
      var id=$('#IDSelected').val();
      var entity=$('#entitySelected').val();
      console.log(id);
      operacion.deleteEntityID(locationServer,entity,id,password);
      
      break;
    case 7:
      let passwordPut = prompt("Introduce your password for updating an Entity","passwordput");
      var put=JSON.parse($('#jsonput').val());
      console.log(idGlobal);
      operacion.putEntityID(locationServer,entityGlobal,idGlobal,put,passwordPut);
      break;
  }
  if(answer=="text/html"){
    $("#showHTML").show();
  }else{
    $("#showHTML").hide();
  }
}

function showHTML(){
  console.log($("#response").val());
 document.getElementById("HTMLInfo").innerHTML = $("#response").val();
}
