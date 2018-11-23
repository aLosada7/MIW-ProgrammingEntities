class operaciones{

	getEntities(locationServer){
		$.get(locationServer+"/getEntities/", function (response) {
	      console.log(response);
	      $("#response").html(JSON.stringify(response.series, undefined, 2));
	      console.log(response.status);
	      $("#serverCode").val(response.status);
	    });
	}

	getEntity(locationServer,entity){
		console.log("aqui");
		$.get(locationServer+"/getEntity/"+entity, function (response) {
			console.log("aqui");
			if(locationServer=="http://156.35.95.85:8082"){
				let data=JSON.parse(response);
				console.log(data);
				$("#response").html(JSON.stringify(data, undefined, 2));
			}else{
	      console.log(response);
	      $("#response").html(JSON.stringify(response.listEntities, undefined, 2));
	      console.log(response.status);
	      $("#serverCode").val(response.status);
	  }
	    });
	}

	postEntity(locationServer,post){
		$.ajax({
		    // la URL para la petición
		    url : locationServer+'/postEntity/',
		 
		    // la información a enviar
		    // (también es posible utilizar una cadena de datos)
		    data : { newEntity : post },
		 
		    // especifica si será una petición POST o GET
		    type : 'POST',
		 
		    // el tipo de información que se espera de respuesta
		    dataType : 'json',
		 
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(json) {
		        console.log("aqui");
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

	putEntityID(locationServer,editParameters){
		$.ajax({
		    // la URL para la petición
		    url : locationServer+'/editEntityID/',
		 	data : { edit : editParameters },
		 	type:'PUT',
		 	dataType: 'json',
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(json) {
		        console.log("aqui");
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

	getEntityID(locationServer,id){
		console.log("aqui");
		$.get(locationServer+"/getEntityID/", {"id":id}, function (response) {
			 console.log(response);
			if(locationServer=="http://156.35.95.85:8082"){
				let data=JSON.parse(response);
				console.log(data);
				$("#response").html(JSON.stringify(data, undefined, 2));
			}else{
	      console.log(response);
	      $("#response").html(JSON.stringify(response.result, undefined, 2));
	      console.log(response.status);
	      $("#serverCode").val(response.status);
	  }
	    });
	}

	deleteEntityID(locationServer,id,password){
		$.ajax({
		    // la URL para la petición
		    url : locationServer+'/deleteEntityID/',
		 	data : { id : id,
		 	password : password },
		 	type : 'DELETE',

		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(json) {
		        console.log("aqui");
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