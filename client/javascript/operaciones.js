
class operaciones{

	getEntities(locationServer){
		$.get(locationServer+"/", function (response,status) {
	      console.log(response);
	      $("#informationGet").html(response);
	      $("#informationResponse").hide();
	    });
	}

	getEntity(locationServer,server,answer,entity){
		console.log(answer);
		$.ajax({
			url:locationServer+"/"+entity,
			//contentType: answer ,
			 type : 'GET',	
			 headers:{
			 	"accept":answer
			 } ,
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(response,status) {
				console.log(response);
				console.log(status);
				$("#informationGet").html("");
		      $("#informationResponse").show();
		      	if(answer=="text/html"){
					$("#response").html(response);
				}
				else if(server=="NodeJS"){
					console.log(JSON.stringify(response, undefined, 2));
					$("#response").html(JSON.stringify(response, undefined, 2));
					console.log($("#response"));
				}else{
					let data=JSON.parse(response);
					console.log(data);
					$("#response").html(JSON.stringify(data, undefined, 2));
				}
				$("#contentType").val(answer);
		      	$("#serverCode").val(status);
	      },
	      	error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    }
	  
	    });
	}

	postEntity(locationServer,entity,post){
		$.ajax({
		    // la URL para la petición
		    url : locationServer+"/"+entity,
		 
		    // la información a enviar
		    // (también es posible utilizar una cadena de datos)
		    data : { newEntity : post },//JSON.stringify(post),
		 
		    // especifica si será una petición POST o GET
		    type : 'POST',
		 
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(response) {
		    	$("#panelExecution").hide();
		        $("#response").html(response);
		        $("#serverCode").val("200");
		        $("#contentType").val("application/json");
		    },
		 
		    // código a ejecutar si la petición falla;
		    // son pasados como argumentos a la función
		    // el objeto de la petición en crudo y código de estatus de la petición
		    error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    }
		});
	}

	getEditData(locationServer,id,entity){
		$.ajax({
			url:locationServer+"/"+entity+"/"+id,
			//contentType: "application/json" ,
			 type : 'GET',	
			 headers:{
			 	"accept":"application/json"
			 } ,
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(response,status) {
				console.log(response);
	      	$("#selectEntityParameter").hide();
      		$("#selectIDParameter").hide();
      		$("#showOption").html('<textarea class="form-control" rows="10" name="jsonput" id="jsonput"></textarea>');
      		if(locationServer!="http://156.35.95.85:8081"){
				let data=JSON.parse(response);
				console.log(data);
				document.getElementById('jsonput').value = JSON.stringify(data, undefined, 2);
			}else
      		document.getElementById('jsonput').value = JSON.stringify(response, undefined, 2);
	      },
	      	error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    }
	  
	    });
	}

	putEntityID(locationServer,entity,id,put,password){
		$.ajax({
		    // la URL para la petición
		    url : locationServer+"/"+entity+"/"+id,
		 
		    // la información a enviar
		    // (también es posible utilizar una cadena de datos)
		    data : { updateEntity : put,
		    password: password },
		    type : 'PUT',
		    success : function(response) {
		        console.log(response);
		         $("#panelExecution").hide();
		        $("#processButton").show();
		        $("#informationGet").html("");
		        $("#response").html(response);
		        $("#showOption").html("");
		    },
		    error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    }
		});
	}

	getEntityID(locationServer,server,answer,id,entity){
		$.ajax({
			url:locationServer+"/"+entity+"/"+id,
			//contentType: answer,
			 type : 'GET',	
			 headers:{
			 	"accept":answer
			 } ,
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(response,status) {
				console.log(response);
			if(response =="Wrong id introduced"){
				$("#response").html(response);
			}
			else{
				if(answer=="text/html"){
					$("#response").html(response);
				}
				else if(server=="NodeJS"){
					console.log(JSON.stringify(response, undefined, 2));
					$("#response").html(JSON.stringify(response, undefined, 2));
					console.log($("#response"));
				}else{
					let data=JSON.parse(response);
					console.log(data);
					$("#response").html(JSON.stringify(data, undefined, 2));
				}
			}
	      	$("#contentType").val(answer);
		    $("#serverCode").val(status);
	      $("#informationGet").html("");
	      $("#informationResponse").show();
	      },
	      	error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    }
	  
	    });
	}

	deleteEntityID(locationServer,entity,id,password){
		$.ajax({
		    // la URL para la petición
		    url : locationServer+"/"+entity+"/"+id,
		 	data : { password : password },
		 	type : 'DELETE',
		    success : function(response) {
		    	$("#panelExecution").hide();
		        $("#response").html(response);
		        $("#serverCode").val("200");
		        $("#contentType").val("application/json");
		    },
		    error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    },
		});
	}
}