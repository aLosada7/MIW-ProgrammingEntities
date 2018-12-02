var request = require('superagent');
var expect = require('expect.js');
  
describe('Suite one', function(){
 it ('prueba',function(done){
   request.get('http://156.35.95.85:8081/TVSeries/1').set('accept', "application/json").end(function(err,res,body){
   	console.log(res.body)
    expect(res.body).to.exist;
    done();
   });
  });
 it ('prueba2',function(done){
   request.get('http://156.35.95.85:8081/TVSeries').set('accept', "application/json").end(function(err,res,body){
   	console.log(res.body)
    expect(res.body).to.exist;
    done();
   });
  });
 it ('prueba3 wrong id',function(done){
   request.get('http://156.35.95.85:8081/TVSeries/100').end(function(err,res,text){
    console.log(res.text);
    expect(res.text).to.exist;
    expect(res.text).to.equal("Wrong id introduced"); 
    done();
   });
  });
});