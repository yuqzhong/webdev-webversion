
var mongojs = require('mongojs');
var q = require('q');
var db = mongojs('wam_summer1_2017');


module.exports = {
    findAll: findAll
};

function findAll(collectionName) {
    var deferred = q.defer();
    var userCollection = db.collection(collectionName);
    userCollection.find(function (err, docs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs);
        }

    });

    return deferred.promise;
}