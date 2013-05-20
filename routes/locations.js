var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure,
ObjectID = mongo.ObjectID;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('locationsdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'locationsdb' database");
        db.collection('locations', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'locations' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
exports.initializeDB = function() {
 console.log("The 'locations' collection doesn't exist. Creating it with sample data...");
 populateDB();
};


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving location: ' + id);
    db.collection('locations', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

// exports.findAll = function(req, res) {
//     db.collection('locations', function(err, collection) {
//         collection.find().toArray(function(err, items) {
//             res.write(items);
//         });
//     });
// };

exports.findAll = function(cb) {
    db.collection('locations', function(err, collection) {
        collection.find().toArray(cb);
    });
};

exports.addLocation = function(req, res) {
    var location = req.body;
    console.log('Adding location: ' + JSON.stringify(location));
    db.collection('locations', function(err, collection) {
        collection.insert(location, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateLocation = function(req, res) {
    var id = req.params.id;
    var location = req.body;
    console.log('Updating location: ' + id);
    console.log(JSON.stringify(location));
    db.collection('locations', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, location, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating location: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(location);
            }
        });
    });
}

exports.deleteLocation = function(req, res) {
    var id = req.params.id;
    console.log('Deleting location: ' + id);
    db.collection('locations', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var locations = [
    {
        name: "Mount Roraima, Venezuela",
        description: "A mountain surrounded by 400-meter cliffs",
        image_url: "https://s3.amazonaws.com/gohere/roraima.jpg"
    },
    {
      name: "Paris, France",
      description: "The capital of romance, wine and cheese.",
      image_url: "https://s3.amazonaws.com/gohere/paris.jpg"
    },
    {
      name: "Door to Hell, Turmenistan",
      description: "A fire has burned in this abandoned coal mine since 1971.",
      image_url: "https://s3.amazonaws.com/gohere/derveza.jpg"
    },
    {
      name: "Angkor Wat, Cambodia",
      description: "An amazing Hindu temple built in the 12th century and preserved today. The largest in the world.",
      image_url: "https://s3.amazonaws.com/gohere/angkor.jpg"
    },
    {
      name: "Mont Saint Michel, France",
      description: "A unique tidal island jutting out of the sea, with centuries of history behind it. Near the beautiful beaches of Normandy.",
      image_url: "https://s3.amazonaws.com/gohere/mont_st_michel.jpg"
    },
    {
        name: "Iceland",
        description: "Beautiful country. Inspiring people. Amazing arts.",
        image_url: "https://s3.amazonaws.com/gohere/iceland.jpg"
    }];

    db.collection('locations', function(err, collection) {
        collection.insert(locations, {safe:true}, function(err, result) {});
    });

};