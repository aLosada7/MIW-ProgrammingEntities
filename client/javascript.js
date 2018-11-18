$(document).ready(function(){
    $("#panelExecution").hide();
    var action=0;
    $('#getEntitys').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").show();
      $("#selectEntityParameter").hide();
      $("#selectIDParameter").hide();
      $("#createParameters").hide();
      action=1;
    })
    $('#getEntity').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").show();
      $("#selectIDParameter").hide();
      $("#createParameters").hide();
      action=2;
    })
    $('#postEntity').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").hide();
      $("#selectIDParameter").hide();
      $("#createParameters").show();
      action=3;
    })
    $('#putEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").hide();
      $("#selectIDParameter").hide();
      $("#createParameters").show();
      action=4;
    })
    $('#getEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").hide();
      $("#selectIDParameter").show();
      $("#createParameters").hide();
      action=5;
    })
    $('#getEntityID').on('click', function () {
      $("#panelExecution").show();
      $("#noParameters").hide();
      $("#selectEntityParameter").hide();
      $("#selectIDParameter").show();
      $("#createParameters").hide();
      action=6;
    })

})

function processForm(){
  var server=document.getElementById("server").value;
  var answer=requestForm.typeAnswer.value;
  alert(server + " " + answer);
}
