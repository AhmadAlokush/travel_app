express = require('express'),
    location = require('./routes/locations');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/locations', location.findAll);
app.get('/locations/:id', location.findById);
app.post('/locations', location.addLocation);
app.post('/locations/:id', location.initializeDB);
app.put('/locations/:id', location.updateLocation);
app.delete('/locations/:id', location.deleteLocation);

app.listen(3000);
console.log('Listening on port 3000...');