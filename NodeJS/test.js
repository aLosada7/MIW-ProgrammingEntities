var request = require('superagent');
var expect = require('expect.js');
  
describe('Suite one', function(){
 it ('prueba',function(done){
   request.get('http://156.35.95.85:8081/TVSeries/2').end(function(res,status){
    expect(res).to.exist;
    done();
   });
  });
});