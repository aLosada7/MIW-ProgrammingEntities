var nodemailer = require('nodemailer');
// email sender function
exports.sendMail=function(req, res){

// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aallvariccoo@gmail.com',
            pass: 'chispi13'
        }
    });

// Definimos el email
var mailOptions = {
    from: 'Remitente',
    to: req.body.info[0],
    subject: 'Confirmación envio consulta',
    text: 'Hola '+req.body.info[1]+'. Esta es tu consulta: '+req.body.info[2]
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, error.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};