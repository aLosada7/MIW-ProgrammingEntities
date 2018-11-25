$(document).ready(function(){
    $(".errorContactForm").hide();

})

function validateForm() {
  let valido = true;
  email = contactForm.email.value;
  if (email == '') {
      valido = false;
  }
  name = contactForm.name.value;
  if (valido && name == '') {
      valido = false;
  }
  surnames = contactForm.surnames.value;
  if (valido && surnames == '') {
      valido = false;
  }
  phone = contactForm.phoneNumber.value;
  if (valido && phone == '') {
      valido = false;
  }
  con = contactForm.consult.value;
  if (valido && con == '') {
      valido = false;
  }

  if(valido==false){
     $(".errorContactForm").show();
  }
  $.ajax({
        // la URL para la petición
        url : "http://156.35.95.85:8081/email",
     
        // especifica si será una petición POST o GET
        type : 'POST',
     
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
  event.returnValue = valido;
}
