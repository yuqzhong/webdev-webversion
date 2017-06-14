const app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


// start all url with '/aps' ('/rest' is also popular)
// :userId: path params
app.get('/api/assignment/user/:userId', findUserById);
app.get('/api/assignment/user', isAdmin, findAllUsers);
// app.get('/api/assignment/user', isAdmin, findAllUsers);

app.post('/api/assignment/user', isAdmin, createUser);
app.put('/api/assignment/user/:userId', isAdmin, updateUser);
app.delete('/api/assignment/user/:userId', isAdmin, deleteUser);

app.post('/api/assignment/login', passport.authenticate('local'), login);
app.get('/api/assignment/loggedin', loggedin);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.get('/api/assignment/checkAdmin', checkAdmin);
app.delete('/api/assignment/unregister', unregister);


function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}


//////////actural function/////////////////

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        })
}

function register(req, res) {
    var userObj = req.body;
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    // console.log(req.user);
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    // console.log(req.user);
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    res.json(req.user);
}


function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}


function updateUser(req, res) {
    var user = req.body;
    console.log(user);
    var userId = req.params.userId;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        })


}


function createUser(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}


function findUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    res.json(user)
                        .sendStatus(200);
                } else {
                }
                res.sendStatus(404);
            });

    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user)
                } else {
                }
                res.sendStatus(404);
            })

    }
    else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
        // res.json(users);
    }


}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}