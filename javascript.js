var comienzo = ["He makes", "They cancelled", "Did you enjoy",
"The car crashed", "She has just passed", "The cup broke",
"Don't open", "She sold", "The boy sivered", "I haven't read"];
var respuestas=["* intransitive","the concert","* intransitive","* intransitive","the house",
"her driving test","the last chapter","the door","his own bread","the weeding"];
var sentences = ["He makes his own bread",
"They cancelled the weeding",
"Did you enjoy the concert",
"The car crashed * intransitive",
"She has just passed her driving test",
"The cup broke * intransitive",
"Don't open the door",
"She sold the house",
"The boy shivered * intransitive",
"I haven't read the last chapter"];
var frasesFinales=["","","","","","","","","","",""];
var respuestasCorrectas = 0;
var remaining = sentences.length;
var jugando = 0;
document.getElementById("frase").innerHTML = comienzo[0];
document.getElementById("remaining").innerHTML = remaining;
var opciones="<ol id='seleccionado'>";
for (var i = 0; i < respuestas.length; i++) {
  opciones=opciones+"<li id='"+i+"' class='ui-widget-content draggable'>"+respuestas[i]+"</li>"
}
opciones=opciones+"</ol>";
console.log(opciones);
document.getElementById("opciones").innerHTML = opciones;
var seleccion="";
var seleccionAnterior="";
var final="";
function avanzar(){
  if(jugando!=9){
    jugando++;
    seleccion="";
    document.getElementById("frase").innerHTML = comienzo[jugando];
    $("#select-result").html(seleccion);
    if(frasesFinales[jugando].length > comienzo[jugando].length){
      for (var i = 0; i < 10; i++) {
        if(frasesFinales[jugando].indexOf(respuestas[i]) != -1){
          $("#select-result").html(respuestas[i]);
        }
      }
    }
  }
}

function atras(){
  if(jugando!=0){
    jugando--;
    seleccion="";
    document.getElementById("frase").innerHTML = comienzo[jugando];
    $("#select-result").html(seleccion);
    if(frasesFinales[jugando].length > comienzo[jugando].length){
      for (var i = 0; i < 10; i++) {
        if(frasesFinales[jugando].indexOf(respuestas[i]) != -1){
          $("#select-result").html(respuestas[i]);
        }
      }
    }
  }
}

function comprobar() {
  final="";
  if(remaining != 0){
    final=final+"<p>Quedan preguntas por responder</p>";
  }
  respuestasCorrectas=0;
  for (var i = 0; i < 10; i++) {
    console.log(sentences[i] + " " + frasesFinales[i]);
    if(sentences[i] == frasesFinales[i]){
      respuestasCorrectas++;
    }
  }
  console.log(respuestasCorrectas);
  final=final+"<p>Respuestas correctas: "+respuestasCorrectas+"</p>";
  $("#results").html(final);

}

$(function() {
  $("#seleccionado").selectable({

    stop : function() {

      $(".ui-selected", this).each(function() {
        var index = $("#seleccionado li").index(this);
        console.log(respuestas[index]);
        seleccion=respuestas[index];
      });
    }
  });

  // Segundo click
  $("#selectable").selectable({

    stop : function() {
        if(frasesFinales[jugando].length <= comienzo[jugando].length){
          remaining--;
          document.getElementById("remaining").innerHTML = remaining;
        }else if(seleccionAnterior != ""){
          console.log(seleccionAnterior);
          for (var i = 0; i < respuestas.length; i++) {
            if(respuestas[i] == seleccionAnterior){
              $("#"+i).show();
              break;
            }
          }
        }

        frasesFinales[jugando]=comienzo[jugando]+" "+seleccion;
        console.log(frasesFinales[jugando]);

        for (var i = 0; i < respuestas.length; i++) {
          if(respuestas[i] == seleccion){
            $("#"+i).hide();
            break;
          }
          seleccionAnterior=seleccion;
        }

        $("#select-result").html(seleccion);

    }
    /*stop : function() {
      remaining--;
      //$(this).hide();
      console.log(comienzo[jugando]+ui.draggable.text());
      if(comienzo[jugando]+ui.draggable.text() == sentences[0]){
        respuestasCorrectas++;
      }
      jugando++;
      for (var i = 0; i < respuestas.length; i++) {
        if(ui.draggable.text() == respuestas[i]){
          $("#"+i).hide();
        }
      }
      document.getElementById("remaining").innerHTML = remaining;
      document.getElementById("frase").innerHTML = comienzo[jugando];

      console.log(respuestasCorrectas);
    }*/
});
});
