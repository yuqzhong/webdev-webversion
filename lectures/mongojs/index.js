var mongojs = require('mongojs');
var db = mongojs('webdev_summer1');
var q = require('q');


db.insert = insert;
db.update = update;
db.find = find;
db.remove = remove;


module.exports = db;

// insert('myCollection', {username: 'alice', first: 'alice', last: 'wonder'})
//     .then(function (newUser) {
//         console.log(newUser)
//     });

find('myCollection')
    .then(function (users) {
        console.log(users);
    });

function remove(collection, filter) {
    var deffered = q.defer();
    var userCollection = db.collection(collection);
    userCollection.remove(filter, function (err, docs) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(docs);
        }

    });

    return deffered.promise;
}


function update(collection, filter, newDoc) {
    var deffered = q.defer();
    var userCollection = db.collection(collection);
    userCollection.update(filter, newDoc, function (err, status) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(status);
        }

    });

    return defferd.promise;
}

function find(collection, filter) {
    var deffered = q.defer();
    var userCollection = db.collection(collection);
    userCollection.insert(filter, function (err, docs) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(docs);
        }

    });

    return deffered.promise;
}

function insert(collectionName, doc) {
    var deffered = q.defer();
    var userCollection = db.collection(collectionName);
    userCollection.insert(doc, function (err, doc) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(doc);
        }

    });

    return deffered.promise;

}