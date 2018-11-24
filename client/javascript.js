 var action=0;
$(document).ready(function(){


var obj={
  "@context": "http://schema.org",
  "@type": "TVSeries",
  "id":"0",
  "numberOfEpisodes":"integer",
  "numberOfSeasons": "integer",
  "startDate":"date"
   }


var pretty = JSON.stringify(obj, undefined, 2);

var ugly = document.getElementById('jsonpost').value;
document.getElementById('jsonpost').value = pretty;
    $("#panelExecution").hide();
    $('#getEntitys').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").show();
      $("#selectEntityParameter").hide();
      $("#selectIDParameter"
        ).hide();
      $("#createParameters").hide();
      $("#editParameters").hide();
      action=1;
    })
    $('#getEntity').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").hide();
      $("#createParameters").hide();
      $("#editParameters").hide();
      action=2;
    })
    $('#postEntity').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").hide();
      $("#selectIDParameter").hide();
      $("#createParameters").show();
      $("#editParameters").hide();
      action=3;
    })
    $('#putEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").show();
      $("#createParameters").hide();
      $("#editParameters").hide();
      action=4;
    })
    $('#getEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").show();
      $("#createParameters").hide();
      $("#editParameters").hide();
      action=5;
    })
    $('#deleteEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").show();
      $("#createParameters").hide();
      $("#editParameters").hide();
      action=6;
    })

})

function processForm(){
  var operacion=new operaciones();
  var server=document.getElementById("server").value;
  var locationServer=""
  var answer=requestForm.typeAnswer.value;
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
      operacion.getEntity(locationServer,entity);
      break;

    case 3:
    console.log($('#jsonpost').val());
      var post=JSON.parse($('#jsonpost').val());
      console.log(post);
      operacion.postEntity(locationServer,post);
      break;
    case 4:
      var editParameters=["","","",""];
      editParameters[0]=$('#editID').val();;
      editParameters[1]=$('#editNEpisodes').val();
      editParameters[2]=$('#editNSeasons').val();
      editParameters[3]=$('#editStartDate').val();
      console.log(editParameters);
      operacion.putEntityID(locationServer,editParameters);
      break;
    case 5:
      var id=$('#IDSelected').val();
       var entity=$('#entitySelected').val();
      console.log(id);
      operacion.getEntityID(locationServer,id,entity);
      break;
    case 6:
      let password = prompt("Introduce your password for deleting an Entity","passworddelete");
      var id=$('#IDSelected').val();
      var entity=$('#entitySelected').val();
      console.log(id);
      operacion.deleteEntityID(locationServer,entity,id,password);
      
      break;
  }
}
