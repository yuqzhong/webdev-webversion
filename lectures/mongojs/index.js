var mongojs = require('mongojs');
var db = mongojs('zhong-yuqing-webdev');
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
//
// find('myCollection', {username:'alice'})
//     .then(function (users) {
//         console.log(users);
//     });

function remove(collection, filter) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.remove(filter, function (err, docs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs);
        }

    });

    return deferred.promise;
}


function update(collection, filter, newDoc) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.update(filter, newDoc, function (err, status) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(status);
        }

    });

    return defferd.promise;
}


function find(collection, filter) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.find(filter, function (err, docs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs);
        }

    });

    return deferred.promise;
}

function insert(collectionName, doc) {
    var deferred = q.defer();
    var userCollection = db.collection(collectionName);
    userCollection.insert(doc, function (err, doc) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(doc);
        }

    });

    return deferred.promise;

}

