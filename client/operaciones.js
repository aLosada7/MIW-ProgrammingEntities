class operaciones{

	getEntities(locationServer){
		$.get(locationServer+"/", function (response,status) {
	      console.log(response);
	      $("#response").html(response);
	      $("#serverCode").val(status);
	    });
	}

	getEntity(locationServer,entity){
		console.log("aqui");
		$.get(locationServer+"/"+entity, function (response) {
			console.log(response);
			if(locationServer=="http://156.35.95.85:8082"){
				let data=JSON.parse(response);
				console.log(data);
				$("#response").html(JSON.stringify(data, undefined, 2));
			}else{
	      console.log(response);
	      $("#response").html(JSON.stringify(response, undefined, 2));
	  }
	    });
	}

	postEntity(locationServer,entity,post){
		$.ajax({
		    // la URL para la petición
		    url : locationServer+"/"+entity,
		 
		    // la información a enviar
		    // (también es posible utilizar una cadena de datos)
		    data : { newEntity : post },
		 
		    // especifica si será una petición POST o GET
		    type : 'POST',
		 
		    // el tipo de información que se espera de respuesta
		    dataType : 'json',
		 
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(response) {
		        console.log("aqui");
		        $("#response").html(response);
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
		$.get(locationServer+"/"+entity+"/"+id, function (response) {
	      	console.log(response);
	      	$("#selectEntityParameter").hide();
      		$("#selectIDParameter").hide();
      		$("#showOption").html('<textarea class="form-control" rows="10" name="jsonput" id="jsonput"></textarea><button type="button" class="btn btn-primary" id="#finalPutEntityId">Run it </button>');
      		if(locationServer=="http://156.35.95.85:8082"){
				let data=JSON.parse(response);
				console.log(data);
				document.getElementById('jsonput').value = JSON.stringify(data, undefined, 2);
			}else
      		document.getElementById('jsonput').value = JSON.stringify(response, undefined, 2);
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
		 
		    // especifica si será una petición POST o GET
		    type : 'PUT',
		 
		    // el tipo de información que se espera de respuesta
		    dataType : 'json',
		 
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(response) {
		        console.log("aqui");
		    },
		 
		    // código a ejecutar si la petición falla;
		    // son pasados como argumentos a la función
		    // el objeto de la petición en crudo y código de estatus de la petición
		    error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    }
		});
	}

	getEntityID(locationServer,id,entity){
		console.log("aqui");
		$.get(locationServer+"/"+entity+"/"+id, function (response) {
			 console.log(response);
			if(locationServer=="http://156.35.95.85:8082"){
				let data=JSON.parse(response);
				console.log(data);
				$("#response").html(JSON.stringify(data, undefined, 2));
			}else{
	      console.log(response);
	      $("#response").html(JSON.stringify(response, undefined, 2));
	      console.log(response.status);
	      $("#serverCode").val(response.status);
	  }
	    });
	}

	deleteEntityID(locationServer,entity,id,password){
		$.ajax({
		    // la URL para la petición
		    url : locationServer+"/"+entity+"/"+id,
		 	data : { password : password },
		 	type : 'DELETE',

		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(response) {
		    },
		 
		    // código a ejecutar si la petición falla;
		    // son pasados como argumentos a la función
		    // el objeto de la petición en crudo y código de estatus de la petición
		    error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    },
		 
		    // código a ejecutar sin importar si la petición falló o no
		    complete : function(xhr, status) {
		        alert('Petición realizada');
		    }
		});
	}
}