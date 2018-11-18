$(document).ready(function(){
    $(".errorContactForm").hide();

})

function validate() {
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
  event.returnValue = valido;
}
