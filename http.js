// var http = require('http');

// http.createServer(function (request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('[{"description": "A mountain surrounded by 400-meter cliffs", "image_url": "https://s3.amazonaws.com/gohere/roraima.jpg", "name": "Mount Roraima, Venezuela"}, {"description": "The capital of romance, wine and cheese.", "image_url": "https://s3.amazonaws.com/gohere/paris.jpg", "name": "Paris, France"}, {"description": "Beautiful country. Inspiring people. Amazing arts.", "image_url": "https://s3.amazonaws.com/gohere/iceland.jpg", "name": "Iceland"}, {"description": "A fire has burned in this abandoned coal mine since 1971.", "image_url": "https://s3.amazonaws.com/gohere/derveza.jpg", "name": "Door to Hell, Turmenistan"}, {"description": "An amazing Hindu temple built in the 12th century and preserved today. The largest in the world.", "image_url": "https://s3.amazonaws.com/gohere/angkor.jpg", "name": "Angkor Wat, Cambodia"}, {"description": "A unique tidal island jutting out of the sea, with centuries of history behind it. Near the beautiful beaches of Normandy.", "image_url": "https://s3.amazonaws.com/gohere/mont_st_michel.jpg", "name": "Mont Saint Michel, France"}]');
// }).listen(8080);


var http = require('http'),
location = require('./locations');



http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});

  var callback = function(err, items) {
    if (!err) {
      response.write(JSON.stringify(items));
    }
    response.end();
  };
  location.findAll(callback);
}).listen(9999);
